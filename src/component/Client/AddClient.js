import React, { useState } from "react";
import { createClient } from "../../services";
import { useDispatch, useSelector } from "react-redux";
import { mapActions } from "../../store/map/reducer";
import { updateClients } from "../../store/map/actions";
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

const AddClient = ({ show, hide }) => {
  console.log("add junction");
  const dispatch = useDispatch();
  const latlang = useSelector((state) => state.map.latlang);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        identifier: id,
        name: name,
        marker: {
          type: "CLIENT",
          latitude: latlang.lat,
          longitude: latlang.lng,
          address: address,
          notes: note,
          description: description,
        },
        mobile_number: mobile,
      };

      const response = await createClient(data);
      if (response.status === 201) {
        dispatch(mapActions.updateLatLang(null));
        dispatch(updateClients());
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleReset = (e) => {
    e.preventDefault();
    setId("");
    setName("");
    setMobile("");
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

              <Header.Content>Create Client</Header.Content>
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
                <label>Mobile Number</label>
                <input
                  placeholder="01734567890"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </Form.Field>
              <Form.Field required>
                <label>Latitude</label>
                <input value={latlang ? latlang.lat : ""} disabled />
              </Form.Field>
              <Form.Field required>
                <label>Longitude</label>
                <input value={latlang ? latlang.lng : ""} disabled />
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

export default AddClient;
