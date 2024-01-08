import React, { useEffect, useState } from "react";
import { getClientCoreDetails } from "../../../services";
import {
  Grid,
  GridRow,
  GridColumn,
  Segment,
  Message,
  Button,
} from "semantic-ui-react";

const ClientConnectionTab = ({ clientId }) => {
  const [cableDetails, setCableDetails] = useState(null);
  const getCoreDetails = async (id) => {
    try {
      const { data, status } = await getClientCoreDetails(id);
      if (status === 200) {
        setCableDetails(data);
      }
    } catch (error) {
      return { data: null, status: null, error };
    }
  };
  console.log("cableDetails", cableDetails);

  useEffect(() => {
    getCoreDetails(clientId);
  }, []);

  return (
    <Grid columns={2}>
      {cableDetails?.map((cable) => (
        <GridRow stretched>
          <GridColumn>
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
                <b>CABLE length : </b>
                {cable.length}
              </p>
            </Segment>
          </GridColumn>
          <GridColumn>
            <Message attached header="core details" />
            <Segment attached textAlign="center">
              {cable.cores?.map((core) => (
                <p>
                  <b>CORE NUMBER : {core.core_number}</b> &nbsp; &nbsp;
                  {core.assigned ? (
                    <>
                      <Button basic compact color={core.color}>
                        Used
                      </Button>
                      <Button compact color="red">
                        Remove
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button basic compact color={core.color}>
                        Unused
                      </Button>
                      <Button compact color="blue">
                        Assign
                      </Button>
                    </>
                  )}
                </p>
              ))}
            </Segment>
          </GridColumn>
        </GridRow>
      ))}
    </Grid>
  );
};

export default ClientConnectionTab;
