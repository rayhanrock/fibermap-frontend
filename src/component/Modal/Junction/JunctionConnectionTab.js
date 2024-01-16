import React, { useEffect, useState } from "react";
import { getJunctionCoreDetails } from "../../../services";
import { connectCores, disconnectCores } from "../../../services";
import {
  Grid,
  GridRow,
  GridColumn,
  Segment,
  Message,
  Button,
  SegmentGroup,
  Header,
} from "semantic-ui-react";

const JunctionConnectionTab = ({ junctionId }) => {
  const [cableDetails, setCableDetails] = useState(null);
  console.log("hukkkkaa", cableDetails);
  const [connection, setConnection] = useState({
    left: null,
    right: null,
  });
  const [highlight, setHighlight] = useState([]);
  const [disableButtonList, setDisableButtonList] = useState([]);
  // const [connection, setConnection] = useState({
  //   left: { cableIdentifier: null, coreId: null, color: null },
  //   right: { cableIdentifier: null, coreId: null, color: null },
  // });
  useEffect(() => {
    getCoreDetails(junctionId);
  }, []);

  const getCoreDetails = async (id) => {
    try {
      const { data, status } = await getJunctionCoreDetails(id);
      if (status === 200) {
        setCableDetails(data);
      }
    } catch (error) {
      return { data: null, status: null, error };
    }
  };
  const onConnect = async () => {
    if (!connection.left || !connection.right) {
      return;
    }
    const payload = {
      core_from: connection.left.coreId,
      core_to: connection.right.coreId,
    };
    try {
      const { status } = await connectCores(payload);
      if (status === 201) {
        getCoreDetails(junctionId);
        onReset();
      }
    } catch (error) {
      return { data: null, status: null, error };
    }
  };

  const onRemove = async (coreFrom, coreTo) => {
    const payload = {
      core_from: coreFrom,
      core_to: coreTo,
    };
    try {
      const { status } = await disconnectCores(payload);
      if (status === 204) {
        onReset();
        getCoreDetails(junctionId);
      }
    } catch (error) {
      return { data: null, status: null, error };
    }
  };

  const onSelect = async (data) => {
    if (connection.left && connection.right) {
      return;
    }
    if (!connection.left) {
      setConnection((prev) => ({ ...prev, left: data }));
    } else {
      setConnection((prev) => ({ ...prev, right: data }));
    }
    const cable = cableDetails.find((cable) => cable.id === data.cableId);
    const core = cable.cores.map((core) => core.id);
    setDisableButtonList((prev) => [...prev, ...core]);
  };
  const onReset = () => {
    setDisableButtonList([]);
    setHighlight([]);
    setConnection({
      left: null,
      right: null,
    });
  };

  const highlightConnectedCore = async (cableId, coreId) => {
    const cable = cableDetails.find((cable) => cable.id === cableId);
    const core = cable.cores.find((core) => core.id === coreId);

    if (!core.connected_to) return;

    setHighlight([core.connected_to.id, coreId]);
  };

  return (
    <>
      {connection.left && (
        <Segment textAlign="center">
          <SegmentGroup horizontal>
            <Segment>
              <Header as="h4">
                {connection.left &&
                  `Cable : ${connection.left.cableIdentifier} | Core : ${connection.left.coreId} (${connection.left.color})`}
              </Header>
            </Segment>
            <Segment>----- Connected with -----</Segment>
            <Segment secondary>
              <Header as="h4" disabled={connection.right ? false : true}>
                {connection.right
                  ? `Cable : ${connection.right.cableIdentifier} | Core : ${connection.right.coreId} (${connection.right.color})`
                  : "SELECT ANOTHER TO CONNECT"}
              </Header>
            </Segment>
          </SegmentGroup>
          {connection.left && connection.right && (
            <Button positive onClick={onConnect}>
              Connect
            </Button>
          )}
          <Button negative onClick={onReset}>
            Reset
          </Button>
        </Segment>
      )}
      <Grid columns={2}>
        {cableDetails?.map((cable, index) => (
          <GridRow key={index}>
            <GridColumn width={5}>
              <Message attached header="cable details" />
              <Segment attached>
                <p>
                  <b>CABLE ID : </b> {cable.identifier}
                </p>
                <p>
                  <b>Total Core : </b>
                  {cable.number_of_cores}
                </p>
                <p>
                  <b>Cable length : </b>
                  {cable.length}
                </p>
              </Segment>
            </GridColumn>
            <GridColumn width={11}>
              <Message attached header="core details" />
              <Segment attached textAlign="center">
                {cable.cores?.map((core) => (
                  <p
                    key={core.id}
                    onClick={() => highlightConnectedCore(cable.id, core.id)}
                    style={
                      highlight.includes(core.id)
                        ? { backgroundColor: "#1EA1A1" }
                        : null
                    }
                  >
                    <span
                      key={core.id}
                      style={
                        (connection.left &&
                          connection.left.coreId === core.id) ||
                        (connection.right &&
                          connection.right.coreId === core.id)
                          ? { display: "block", backgroundColor: "#90EE90" }
                          : {}
                      }
                    >
                      <b>CORE NUMBER : {core.core_number}</b> &nbsp; &nbsp;
                      {core.connected_to !== null ? (
                        <>
                          <Button basic compact color={core.color}>
                            Connected
                          </Button>
                          <Button
                            compact
                            color="red"
                            onClick={() => {
                              onRemove(core.id, core.connected_to.id);
                            }}
                          >
                            Remove
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button basic compact color={core.color}>
                            Unused
                          </Button>
                          <Button
                            compact
                            color="blue"
                            disabled={disableButtonList.includes(core.id)}
                            onClick={() => {
                              onSelect({
                                cableId: cable.id,
                                cableIdentifier: cable.identifier,
                                coreId: core.id,
                                color: core.color,
                              });
                            }}
                          >
                            Select
                          </Button>
                        </>
                      )}
                      &nbsp; &nbsp; Connected with -
                      <b>
                        {core.last_point.type} - ({core.last_point.identifier})
                      </b>
                    </span>
                  </p>
                ))}
              </Segment>
            </GridColumn>
          </GridRow>
        ))}
      </Grid>
    </>
  );
};

export default JunctionConnectionTab;
