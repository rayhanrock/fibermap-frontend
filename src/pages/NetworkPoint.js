import React from "react";
import { Grid, Segment, Message } from "semantic-ui-react";
import Models from "../component/Model";
import Map from "../component/Map";

export default function NetworkPoint() {
  return (
    <Grid padded>
      <Grid.Column width={3}>
        <Message success header="MODELS" style={{ textAlign: "center" }} />
        <Segment>
          <Models />
        </Segment>
      </Grid.Column>
      <Grid.Column width={13}>
        <Segment>
          <Map />
        </Segment>
      </Grid.Column>
    </Grid>
  );
}
