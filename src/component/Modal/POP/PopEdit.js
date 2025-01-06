import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import {
  Button,
  Confirm,
  Dropdown,
  Form,
  Input,
  Segment,
} from "semantic-ui-react";
import { getPop, updatePop, deletePop } from "../../../services";
import handleError from "../../../utility/handleError";
import { updateCables, updatePops } from "../../../store/map/actions";
import { useDispatch } from "react-redux";

const popTypeOptions = [
  { key: 1, text: "OLT", value: "OLT" },
  { key: 2, text: "Switch", value: "Switch" },
];

const PopEdit = ({ popId, modalClose }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const nameInputRef = useRef();
  const [prevName, setPrevName] = useState("");
  const addressInputRef = useRef();
  const notesInputRef = useRef();
  const descriptionInputRef = useRef();
  const [popType, setPopType] = useState("");
  const [latLng, setLatLng] = useState("");

  const [confirmSubmit, setConfirmSubmit] = useState(false);

  useEffect(() => {
    getPopDetails(popId);
  }, []);

  const getPopDetails = async (id) => {
    const { data, status, error } = await getPop(id);
    if (status === 200) {
      nameInputRef.current.value = data.name;
      addressInputRef.current.value = data.marker.address;
      notesInputRef.current.value = data.marker.notes;
      descriptionInputRef.current.value = data.marker.description;
      setLatLng(`[${data.marker.latitude}, ${data.marker.longitude}]`);

      setPopType(data.pop_type);
      setPrevName(data.name);
    }
    if (error) {
      handleError(error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    nameInputRef.current.focus();
    toast.info("You can now edit the client details.");
  };

  const handleSave = async () => {
    const payload = {
      name: nameInputRef.current.value,
      pop_type: popType,
      marker: {
        address: addressInputRef.current.value,
        notes: notesInputRef.current.value,
        description: descriptionInputRef.current.value,
      },
    };
    const response = await updatePop(popId, payload);
    if (response.status === 200) {
      setIsEditing(false);
      toast.success("Pop details updated successfully.");
      dispatch(updatePops());
      if (response.data.name !== prevName) {
        setPrevName(response.data.name);
        dispatch(updateCables());
      }
    }
    if (response.error) {
      handleError(response.error);
    }
  };
  const handleDelete = async () => {
    const response = await deletePop(popId);
    if (response.status === 204) {
      modalClose();
      toast.success("Pop deleted successfully.");

      dispatch(updatePops());
      dispatch(updateCables());
    }
    if (response.error) {
      handleError(response.error);
    }
  };
  const handleConfirm = () => {
    setConfirmSubmit(false);
    handleDelete();
  };
  const showConfirmSubmit = () => {
    setConfirmSubmit(true);
  };

  return (
    <Form>
      <Form.Field>
        <Segment secondary>
          <Input
            readOnly
            action={{
              color: "primary",
              labelPosition: "right",
              icon: "copy",
              content: "Copy",
              onClick: () => {
                navigator.clipboard.writeText(latLng);
                toast.success("Copied to clipboard");
              },
            }}
            value={`latitude and longitude : ${latLng}`}
          />
        </Segment>
      </Form.Field>
      <Form.Group widths="equal">
        <Form.Field>
          <label>Pop Name</label>
          <input name="name" readOnly={!isEditing} ref={nameInputRef} />
        </Form.Field>
        <Form.Field>
          <label>Type</label>
          <Dropdown
            fluid
            options={popTypeOptions}
            selection
            value={popType}
            onChange={(e, { value }) => {
              setPopType(value);
            }}
            disabled={!isEditing}
          />
        </Form.Field>
      </Form.Group>
      <Form.Field>
        <label>Address</label>
        <input name="address" ref={addressInputRef} readOnly={!isEditing} />
      </Form.Field>
      <Form.Field>
        <label>Notes</label>
        <textarea
          name="notes"
          readOnly={!isEditing}
          ref={notesInputRef}
          rows={3}
        />
      </Form.Field>
      <Form.Field>
        <label>Description</label>

        <textarea
          name="description"
          ref={descriptionInputRef}
          readOnly={!isEditing}
          rows={3}
        />
      </Form.Field>
      <Form.Group widths="equal">
        {isEditing ? (
          <Button fluid secondary onClick={handleSave}>
            Save
          </Button>
        ) : (
          <Button fluid secondary onClick={handleEditClick}>
            Edit
          </Button>
        )}
        <Button fluid color="red" onClick={showConfirmSubmit}>
          Delete
        </Button>
      </Form.Group>

      <Confirm
        className="secondary"
        open={confirmSubmit}
        cancelButton="No"
        confirmButton="Yes"
        onCancel={() => setConfirmSubmit(false)}
        onConfirm={handleConfirm}
      />
    </Form>
  );
};
export default PopEdit;
