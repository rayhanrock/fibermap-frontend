import React, { useEffect, useState, useContext } from "react";
import MapContext from "../../store/map-context";
import {
  Grid,
  Header,
  Segment,
  Sidebar,
  Button,
  Icon,
  Form,
  Dropdown,
} from "semantic-ui-react";
import ModelDropDown from "../Dropdown/ModelDropDown";
import SearchClient from "./SearchClient";

const cableOptions = [
  { key: "1", text: "Line", value: "line" },
  { key: "2", text: "Underground", value: "underground" },
  { key: "3", text: "Wireless", value: "wireless" },
];
const coreOptions = [
  { key: "1", text: "2", value: "2" },
  { key: "2", text: "4", value: "4" },
  { key: "3", text: "8", value: "8" },
  { key: "4", text: "12", value: "12" },
  { key: "5", text: "24", value: "24" },
  { key: "6", text: "36", value: "36" },
  { key: "7", text: "48", value: "48" },
];

const AddCable = ({ visible, hide }) => {
  const context = useContext(MapContext);
  const [cableType, setCableType] = useState(null);
  const [core, setCore] = useState(null);

  return (
    <Sidebar
      as={Segment}
      animation="overlay"
      vertical
      visible={visible}
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

              <Header.Content>Create Cable</Header.Content>
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Form>
              <Form.Field required>
                <label>Cable ID</label>
                <input placeholder="Must be unique" />
              </Form.Field>
              <Form.Field required>
                <label>Type</label>
                <Dropdown
                  selection
                  options={cableOptions}
                  value={cableType}
                  onChange={(e, { value }) => setCableType(value)}
                />
              </Form.Field>
              <Form.Field required>
                <label>Start from</label>
                <ModelDropDown getValue={(value) => console.log(value)} />
              </Form.Field>
              <Form.Field required>
                <label>Starting Point</label>
                <SearchClient getValue={(value) => console.log(value)} />
              </Form.Field>
              <Form.Field required>
                <label>End from</label>
                <ModelDropDown getValue={(value) => console.log(value)} />
              </Form.Field>
              <Form.Field required>
                <label>Ending Point</label>
                <SearchClient getValue={(value) => console.log(value)} />
              </Form.Field>
              <Form.Field required>
                <label>Core</label>
                <Dropdown
                  selection
                  options={coreOptions}
                  value={core}
                  onChange={(e, { value }) => setCore(value)}
                />
              </Form.Field>
              <Form.Field required>
                <label>Length (meter)</label>
                <input placeholder="10" />
              </Form.Field>
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

export default AddCable;
