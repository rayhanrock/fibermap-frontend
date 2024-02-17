import React, { useEffect, useState } from "react";
import { getGponCoreDetails } from "../../../services";
import {
  connectCores,
  disconnectCores,
  addGponInputCable,
  removeGponInputCable,
  gponInputAssignCore,
  gponInputWithdrawCore,
} from "../../../services";
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
import handleError from "../../../utility/handleError";

const GponConnectionTab = ({ gponId }) => {
  const [cableDetails, setCableDetails] = useState(null);
  console.log("gpon", cableDetails);
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
    getCoreDetails(gponId);
  }, []);

  const getCoreDetails = async (id) => {
    try {
      const { data, status } = await getGponCoreDetails(id);
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
        getCoreDetails(gponId);
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
        getCoreDetails(gponId);
      }
    } catch (error) {
      return { data: null, status: null, error };
    }
  };

  const addAsInputCable = async (cableId) => {
    const payload = {
      cable_id: cableId,
    };

    const { status, error } = await addGponInputCable(gponId, payload);
    if (status === 200) {
      onReset();
      getCoreDetails(gponId);
    }
    if (error) {
      handleError(error);
    }
  };

  const removeInputCable = async () => {
    const { status, error } = await removeGponInputCable(gponId);
    if (status === 200) {
      onReset();
      getCoreDetails(gponId);
    }
    if (error) {
      handleError(error);
    }
  };

  const handleInputAssignCore = async (coreId) => {
    const payload = {
      core_id: coreId,
    };
    try {
      const { status } = await gponInputAssignCore(gponId, payload);
      if (status === 200) {
        onReset();
        getCoreDetails(gponId);
      }
    } catch (error) {
      return { data: null, status: null, error };
    }
  };
  const handleInputWithdrawCore = async (coreId) => {
    const payload = {
      core_id: coreId,
    };
    try {
      const { status } = await gponInputWithdrawCore(gponId, payload);
      if (status === 200) {
        onReset();
        getCoreDetails(gponId);
      }
    } catch (error) {
      return { data: null, status: null, error };
    }
  };
  const onSelect = async (data, isGponOutput = false) => {
    if (connection.left && connection.right) {
      return;
    }
    if (!connection.left) {
      setConnection((prev) => ({ ...prev, left: data }));
    } else {
      setConnection((prev) => ({ ...prev, right: data }));
    }

    if (isGponOutput) {
      const cores = cableDetails.out.output_cores.map((core) => core.id);
      setDisableButtonList((prev) => [...prev, ...cores]);
    } else {
      const cores = [];
      cableDetails.output_cables.forEach((cable) => {
        cable.cores.forEach((core) => {
          cores.push(core.id);
        });
      });

      setDisableButtonList((prev) => [...prev, ...cores]);
    }
  };
  const onReset = () => {
    setDisableButtonList([]);
    setHighlight([]);
    setConnection({
      left: null,
      right: null,
    });
  };

  const highlightConnectedCore = async (core) => {
    if (!core.connected_to) return;
    setHighlight([core.connected_to.id, core.id]);
  };

  return (
    <>
      <Message
        header="Input Cable"
        color="teal"
        style={{ textAlign: "center" }}
      />
      {cableDetails?.input_cable ? (
        <Grid columns={2}>
          <GridRow>
            <GridColumn width={5}>
              <Message attached header="cable details" />
              <Segment attached>
                <p>
                  <b>CABLE ID : </b> {cableDetails.input_cable.identifier}
                </p>
                <p>
                  <b>Total Core : </b>
                  {cableDetails.input_cable.number_of_cores}
                </p>
                <p>
                  <b>CABLE length : </b>
                  {cableDetails.input_cable.length}
                </p>
                <Button onClick={removeInputCable} negative compact>
                  Remove Input Cable
                </Button>
              </Segment>
            </GridColumn>
            <GridColumn width={11}>
              <Message attached header="Splitter core details" />
              <Segment attached textAlign="center">
                {cableDetails.input_cable.cores.map((core) => (
                  <p key={core.id}>
                    <b>CORE NUMBER : {core.core_number}</b> &nbsp; &nbsp;
                    {core.connected_to ? (
                      <>
                        <Button basic compact color={core.color}>
                          Used
                        </Button>
                        <Button
                          compact
                          color="red"
                          onClick={() => handleInputWithdrawCore(core.id)}
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
                          onClick={() => handleInputAssignCore(core.id)}
                        >
                          Assign
                        </Button>
                      </>
                    )}
                    &nbsp; &nbsp; Connected with -
                    <b>
                      {core.last_point.type} - ({core.last_point.identifier})
                    </b>
                  </p>
                ))}
              </Segment>
            </GridColumn>
          </GridRow>
        </Grid>
      ) : (
        <Segment textAlign="center" secondary attached>
          No data to show
        </Segment>
      )}

      <Message
        header={`${cableDetails?.type} Out`}
        color="teal"
        style={{ textAlign: "center" }}
      />
      <Grid columns={2}>
        <GridRow>
          <GridColumn width={5}>
            <Message attached header={`${cableDetails?.type} Configuration`} />
            <Segment attached>
              <p>
                <b> {`Type : 1X${cableDetails?.out.number_of_splitter}`}</b>
              </p>
            </Segment>
          </GridColumn>
          <GridColumn width={11}>
            <Message attached header="Splitter core details" />
            <Segment attached textAlign="center">
              {cableDetails?.out.output_cores?.map((core) => (
                <p
                  key={core.id}
                  onClick={() => highlightConnectedCore(core)}
                  style={
                    highlight.includes(core.id)
                      ? { backgroundColor: "#1EA1A1" }
                      : null
                  }
                >
                  <span
                    key={core.id}
                    style={
                      (connection.left && connection.left.coreId === core.id) ||
                      (connection.right && connection.right.coreId === core.id)
                        ? { display: "block", backgroundColor: "#90EE90" }
                        : {}
                    }
                  >
                    <b>Output : {core.core_number}</b> &nbsp; &nbsp;
                    {core.connected_to !== null ? (
                      <>
                        <Button basic compact color="grey">
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
                        <Button basic compact color="grey">
                          Unused
                        </Button>
                        <Button
                          compact
                          color="blue"
                          disabled={disableButtonList.includes(core.id)}
                          onClick={() => {
                            onSelect(
                              {
                                cableId: null,
                                cableIdentifier: null,
                                coreId: core.id,
                                color: null,
                              },
                              true
                            );
                          }}
                        >
                          Select
                        </Button>
                      </>
                    )}
                  </span>
                </p>
              ))}
            </Segment>
          </GridColumn>
        </GridRow>
      </Grid>
      {connection.left && (
        <Segment textAlign="center">
          <SegmentGroup horizontal>
            <Segment>
              <Header as="h4">
                {connection.left.cableIdentifier
                  ? `Cable : ${connection.left.cableIdentifier} | Core : ${connection.left.coreId} (${connection.left.color})`
                  : `Gpon Splitter output no : ${connection.left.coreId}`}
              </Header>
            </Segment>
            <Segment>----- Connected with -----</Segment>
            <Segment secondary>
              <Header as="h4" disabled={connection.right ? false : true}>
                {connection.right
                  ? connection.right.cableIdentifier
                    ? `Cable : ${connection.right.cableIdentifier} | Core : ${connection.right.coreId} (${connection.right.color})`
                    : `Gpon Splitter output no : ${connection.right.coreId}`
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
      <Message
        header="Outcable Cable Details"
        color="teal"
        style={{ textAlign: "center" }}
      />
      {cableDetails?.output_cables.length > 0 ? (
        <Grid columns={2}>
          {cableDetails?.output_cables.map((cable, index) => (
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
                  <Button
                    onClick={() => addAsInputCable(cable.id)}
                    primary
                    compact
                  >
                    Add as input cable
                  </Button>
                </Segment>
              </GridColumn>
              <GridColumn width={11}>
                <Message attached header="Splitter core details" />
                <Segment attached textAlign="center">
                  {cable.cores?.map((core) => (
                    <p
                      key={core.id}
                      onClick={() => highlightConnectedCore(core)}
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
                          {core.last_point.type} - ({core.last_point.identifier}
                          )
                        </b>
                      </span>
                    </p>
                  ))}
                </Segment>
              </GridColumn>
            </GridRow>
          ))}
        </Grid>
      ) : (
        <Segment textAlign="center" secondary attached>
          No data to show
        </Segment>
      )}
    </>
  );
};

export default GponConnectionTab;
