import React, { useState } from "react";
import { createGpon } from "../../services";
import { useDispatch, useSelector } from "react-redux";
import { mapActions } from "../../store/map/reducer";
import { updateGpons } from "../../store/map/actions";
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
  const latlang = useSelector((state) => state.map.latlang);
  const dispatch = useDispatch();
  const [splitter, setSplitter] = useState(2);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [description, setDescription] = useState("");

  const handleSplitterChange = (e, { value }) => {
    setSplitter(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        identifier: id,
        name: name,
        splitter: splitter,
        marker: {
          type: "GPON",
          latitude: latlang.lat,
          longitude: latlang.lng,
          address: address,
          notes: note,
          description: description,
        },
      };

      const response = await createGpon(data);
      if (response.status === 201) {
        dispatch(mapActions.updateLatLang(null));
        dispatch(updateGpons());
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleReset = (e) => {
    e.preventDefault();
    setId("");
    setName("");
    setAddress("");
    setNote("");
    setDescription("");
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
            <Form onSubmit={handleSubmit} onReset={handleReset}>
              <Form.Field required>
                <label>ID</label>
                <input
                  placeholder="Must be unique"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
              </Form.Field>
              <Form.Field required>
                <label>Name</label>
                <input
                  placeholder="Client name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
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
                <input disabled value={latlang ? latlang.lat : ""} />
              </Form.Field>
              <Form.Field required>
                <label>Longitude</label>
                <input disabled value={latlang ? latlang.lng : ""} />
              </Form.Field>
              <Form.TextArea
                required
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
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

export default AddGpon;
