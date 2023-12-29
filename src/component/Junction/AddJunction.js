import React, { useEffect, useState } from "react";
import {
  Grid,
  Header,
  Segment,
  Sidebar,
  Button,
  Icon,
  Form,
  Message,
} from "semantic-ui-react";

const AddJunction = ({ show, hide }) => {
  return (
    <Sidebar
      as={Segment}
      animation="overlay"
      vertical
      visible={show}
      direction="right"
      style={{
        background: "#ffffff",
        width: "30%",
        padding: "1rem",
      }}
    >
      <Grid padded>
        <Grid.Row>
          <Grid.Column>
            <Header as="h3" dividing>
              <Icon size="tiny" link name="close" onClick={() => hide()} />

              <Header.Content>Create Junction</Header.Content>
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Message info>Please click on the map to get coordinate </Message>
            <Form>
              <Form.Field required>
                <label>ID</label>
                <input placeholder="Must be unique" />
              </Form.Field>
              <Form.Field required>
                <label>Name</label>
                <input placeholder="Junction name" />
              </Form.Field>

              <Form.Field required>
                <label>Latitude</label>
                <input disabled />
              </Form.Field>
              <Form.Field required>
                <label>Longitude</label>
                <input disabled />
              </Form.Field>
              <Form.TextArea required label="Address" />
              <Form.TextArea label="Note" />
              <Form.TextArea label="Description" />

              <Button secondary type="submit">
                Submit
              </Button>
              <Button color="red" type="submit">
                Clear
              </Button>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Sidebar>
  );
};

export default AddJunction;
