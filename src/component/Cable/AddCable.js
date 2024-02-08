import React, { useState } from "react";
import { createCable } from "../../services";
import { useDispatch, useSelector } from "react-redux";
import { mapActions } from "../../store/map/reducer";
import { updateCables } from "../../store/map/actions";
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
import isEmptyStirng from "../../utility/isEmptyStirng";
import { toast } from "react-toastify";
import handleError from "../../utility/handleError";

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
  // { key: "7", text: "48", value: "48" },
];

const AddCable = ({ visible }) => {
  console.log("add cable visible");
  const dispatch = useDispatch();
  const drawLine = useSelector((state) => state.map.drawLine);
  const [id, setId] = useState("");

  const [cableType, setCableType] = useState("");
  const [core, setCore] = useState("");
  const [startFrom, setStartFrom] = useState("");
  const [startingPoint, setStartingPoint] = useState("");
  const [endFrom, setEndFrom] = useState("");
  const [endingPoint, setEndingPoint] = useState("");
  const [length, setLength] = useState("");
  const [note, setNote] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEmptyStirng(id)) {
      toast.error("Please enter Identifier");
      return;
    } else if (isEmptyStirng(cableType)) {
      toast.error("Please select cable type");
      return;
    } else if (core === "") {
      toast.error("Please select cable core");
      return;
    } else if (isEmptyStirng(startFrom)) {
      toast.error("Please select start from");
      return;
    } else if (!startingPoint) {
      toast.error("Please select starting point");
      return;
    } else if (isEmptyStirng(endFrom)) {
      toast.error("Please select end from");
      return;
    } else if (!endingPoint) {
      toast.error("Please select ending point");
      return;
    } else if (isEmptyStirng(length)) {
      toast.error("Please enter cable length in meters");
      return;
    }
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
        dispatch(mapActions.setDrawLine(null));
        dispatch(updateCables());
        toast.success("Cable created successfully");
        handleReset();
      }
      if (response.error) {
        handleError(response.error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleReset = () => {
    setId("");
    setCableType("");
    setCore("");
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
              <Icon
                size="tiny"
                link
                name="close"
                onClick={() => dispatch(mapActions.setDrawLine(null))}
              />

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
                <ModelDropDown
                  getValue={(value) => {
                    setStartFrom(value);
                    setStartingPoint(null);
                  }}
                />
              </Form.Field>
              <Form.Field required>
                <label>Starting Point</label>
                <SearchModelDropdown
                  getValue={setStartingPoint}
                  optionsType={startFrom}
                />
              </Form.Field>
              <Form.Field required>
                <label>End from</label>
                <ModelDropDown
                  getValue={(value) => {
                    setEndFrom(value);
                    setEndingPoint(null);
                  }}
                />
              </Form.Field>
              <Form.Field required>
                <label>Ending Point</label>
                <SearchModelDropdown
                  getValue={setEndingPoint}
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

export default React.memo(AddCable);
