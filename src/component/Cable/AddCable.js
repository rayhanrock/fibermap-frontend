import React, { useState, useContext } from "react";
import MapContext from "../../store/map-context";
import { createCable } from "../../services";

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
import SearchModelDropdown from "../Dropdown/SearchModelDropdown";

const cableOptions = [
  { key: "1", text: "Line", value: "LINE" },
  { key: "2", text: "Underground", value: "UNDERGROUND" },
  { key: "3", text: "Wireless", value: "WIRELESS" },
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
  console.log("add cable");

  const { drawLine, updateCables, setDrawLine } = useContext(MapContext);
  const [id, setId] = useState(null);

  const [cableType, setCableType] = useState(null);
  const [core, setCore] = useState(null);
  const [startFrom, setStartFrom] = useState(null);
  const [startingPoint, setStartingPoint] = useState(null);
  const [endFrom, setEndFrom] = useState(null);
  const [endingPoint, setEndingPoint] = useState(null);
  const [length, setLength] = useState(null);
  const [note, setNote] = useState(null);
  const [description, setDescription] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        identifier: id,
        type: cableType,
        start_from: startFrom,
        starting_point: startingPoint,
        end_to: endFrom,
        ending_point: endingPoint,
        number_of_cores: core,
        length: length,
        notes: note,
        description: description,
        polyline: drawLine,
      };

      const response = await createCable(data);
      if (response.status === 201) {
        // setDrawLine(null);
        updateCables();
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleReset = (e) => {
    e.preventDefault();
    setId("");
    setCableType("");
    setCore("");
    setStartFrom("");
    setEndFrom("");
    setLength("");
    setNote("");
    setDescription("");
  };

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
            <Form onSubmit={handleSubmit} onReset={handleReset}>
              <Form.Field required>
                <label>Cable ID</label>
                <input
                  placeholder="Must be unique"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
              </Form.Field>
              <Form.Field required>
                <label>Type</label>
                <Dropdown
                  fluid
                  selection
                  options={cableOptions}
                  value={cableType}
                  onChange={(e, { value }) => setCableType(value)}
                />
              </Form.Field>
              <Form.Field required>
                <label>Start from</label>
                <ModelDropDown getValue={(value) => setStartFrom(value)} />
              </Form.Field>
              <Form.Field required>
                <label>Starting Point</label>
                <SearchModelDropdown
                  getValue={(value) => setStartingPoint(value)}
                  optionsType={startFrom}
                />
              </Form.Field>
              <Form.Field required>
                <label>End from</label>
                <ModelDropDown getValue={(value) => setEndFrom(value)} />
              </Form.Field>
              <Form.Field required>
                <label>Ending Point</label>
                <SearchModelDropdown
                  getValue={(value) => setEndingPoint(value)}
                  optionsType={endFrom}
                />
              </Form.Field>
              <Form.Field required>
                <label>Core</label>
                <Dropdown
                  fluid
                  selection
                  options={coreOptions}
                  value={core}
                  onChange={(e, { value }) => setCore(value)}
                />
              </Form.Field>
              <Form.Field required>
                <label>Length (meter)</label>
                <input
                  placeholder="10"
                  onChange={(e) => setLength(e.target.value)}
                  value={length}
                />
              </Form.Field>
              <Form.TextArea
                label="Note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <Form.TextArea
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <Button secondary type="submit">
                Submit
              </Button>
              <Button color="red" type="reset">
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
