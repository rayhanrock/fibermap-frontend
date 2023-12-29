import React, { useEffect, useState } from "react";
import {
  Grid,
  Header,
  Segment,
  Sidebar,
  Button,
  Icon,
  Form,
  Dropdown,
  Message,
} from "semantic-ui-react";
const splitterOptions = [
  { key: 1, text: "2", value: 2 },
  { key: 2, text: "4", value: 4 },
  { key: 3, text: "8", value: 8 },
  { key: 4, text: "12", value: 12 },
  { key: 5, text: "16", value: 16 },
  { key: 6, text: "32", value: 32 },
];

const AddGpon = ({ show, hide }) => {
  const [splitter, setsplitter] = useState(2);
  const handleSplitterChange = (e, { value }) => {
    setsplitter(value);
  };
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

              <Header.Content>Create Gpon</Header.Content>
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
                <input placeholder="Client name" />
              </Form.Field>
              <Form.Field required>
                <label>Splitter</label>
                <Dropdown
                  fluid
                  onChange={handleSplitterChange}
                  options={splitterOptions}
                  selection
                  value={splitter}
                />
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

export default AddGpon;
