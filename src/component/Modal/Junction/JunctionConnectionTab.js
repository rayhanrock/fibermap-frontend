import React, { useEffect, useState } from "react";
import { getJunctionCoreDetails } from "../../../services";
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
  const [connection, setConnection] = useState({
    left: null,
    right: null,
  });
  // const [connection, setConnection] = useState({
  //   left: { cableId: null, coreId: null, color: null },
  //   right: { cableId: null, coreId: null, color: null },
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

  const handle = async () => {};
  const onSelect = async (data) => {
    if (connection.left && connection.right) {
      return;
    }
    if (!connection.left) {
      setConnection({ ...connection, left: data });
    } else {
      setConnection({ ...connection, right: data });
    }
  };

  const onReset = () => {
    setConnection({
      left: null,
      right: null,
    });
  };

  const highlightConnectedCore = async (data) => {
    console.log(data);
  };

  return (
    <>
      {connection.left && (
        <Segment textAlign="center">
          <SegmentGroup horizontal>
            <Segment>
              <Header as="h4">
                {connection.left &&
                  `Cable : ${connection.left.cableId} | Core : ${connection.left.coreId} (${connection.left.color})`}
              </Header>
            </Segment>
            <Segment>----- Connected with -----</Segment>
            <Segment secondary>
              <Header as="h4" disabled={connection.right ? false : true}>
                {connection.right
                  ? `Cable : ${connection.right.cableId} | Core : ${connection.right.coreId} (${connection.right.color})`
                  : "SELECT ANOTHER TO CONNECT"}
              </Header>
            </Segment>
          </SegmentGroup>
          {connection.left && connection.right && (
            <Button positive onClick={handle}>
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
          <GridRow stretched key={index}>
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
                    onClick={() => highlightConnectedCore(core.id)}
                    style={{}}
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
                      {core.assigned ? (
                        <>
                          <Button basic compact color={core.color}>
                            Connected
                          </Button>
                          <Button compact color="red" onClick={() => {}}>
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
                            onClick={() => {
                              onSelect({
                                cableId: cable.identifier,
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
