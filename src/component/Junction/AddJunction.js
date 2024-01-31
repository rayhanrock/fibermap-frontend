import React, { useState } from "react";
import { createJunction } from "../../services";
import { useDispatch, useSelector } from "react-redux";
import { mapActions } from "../../store/map/reducer";
import { updateJunctions } from "../../store/map/actions";
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
import isEmptyStirng from "../../utility/isEmptyStirng";
import handleError from "../../utility/handleError";
import { toast } from "react-toastify";

const AddJunction = ({ show, setShow }) => {
  console.log("add junction");
  const dispatch = useDispatch();
  const latlang = useSelector((state) => state.map.latlang);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEmptyStirng(id)) {
      toast.error("Please enter Identifier");
      return;
    } else if (isEmptyStirng(name)) {
      toast.error("Please enter junction name");
      return;
    } else if (isEmptyStirng(address)) {
      toast.error("Please enter address");
      return;
    } else if (latlang === null) {
      toast.error("Click on map to select location");
      return;
    }

    const data = {
      identifier: id,
      name: name,
      marker: {
        type: "JUNCTION",
        latitude: latlang.lat,
        longitude: latlang.lng,
        address: address,
        notes: note,
        description: description,
      },
    };

    const response = await createJunction(data);
    if (response.status === 201) {
      dispatch(mapActions.updateLatLang(null));
      dispatch(updateJunctions());
      setShow(false);

      toast.success("Junction Created successfully");
      handleReset();
    }
    if (response.error) {
      handleError(response.error);
    }
  };
  const handleReset = () => {
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
              <Icon
                size="tiny"
                link
                name="close"
                onClick={() => setShow(false)}
              />

              <Header.Content>Create Junction</Header.Content>
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Message info>Please click on the map to get coordinate </Message>
            <Form onSubmit={handleSubmit} onReset={handleReset} noValidate>
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
                  placeholder="Junction name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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

export default AddJunction;
