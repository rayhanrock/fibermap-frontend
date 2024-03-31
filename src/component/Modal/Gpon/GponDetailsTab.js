import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Button, Confirm, Dropdown, Form } from "semantic-ui-react";
import {
  deleteClient,
  deleteGpon,
  getGpon,
  updateGpon,
} from "../../../services";
import handleError from "../../../utility/handleError";
import { updateCables, updateGpons } from "../../../store/map/actions";
import { useDispatch } from "react-redux";

const gponTypeOptions = [
  { key: 1, text: "Epon", value: "Epon" },
  { key: 2, text: "Gpon", value: "Gpon" },
];

const GponDetailsTab = ({ gponId, modalClose }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const addressInputRef = useRef();
  const notesInputRef = useRef();
  const descriptionInputRef = useRef();
  const [gponType, setGponType] = useState("");

  const [confirmSubmit, setConfirmSubmit] = useState(false);

  useEffect(() => {
    getGponDetails(gponId);
  }, []);

  const getGponDetails = async (id) => {
    const { data, status, error } = await getGpon(id);
    if (status === 200) {
      addressInputRef.current.value = data.marker.address;
      notesInputRef.current.value = data.marker.notes;
      descriptionInputRef.current.value = data.marker.description;
      setGponType(data.name);
    }
    if (error) {
      handleError(error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    addressInputRef.current.focus();
    toast.info("You can now edit the  details.");
  };

  const handleSave = async () => {
    const payload = {
      name: gponType,
      marker: {
        address: addressInputRef.current.value,
        notes: notesInputRef.current.value,
        description: descriptionInputRef.current.value,
      },
    };
    const response = await updateGpon(gponId, payload);
    if (response.status === 200) {
      setIsEditing(false);

      toast.success("TJ Box updated successfully.");
      dispatch(updateGpons());
    }
    if (response.error) {
      handleError(response.error);
    }
  };

  const handleDelete = async () => {
    const response = await deleteGpon(gponId);
    if (response.status === 204) {
      modalClose();
      toast.success("Tj Box deleted successfully.");

      dispatch(updateGpons());
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
      <Form.Group widths="equal">
        <Form.Field>
          <label>Type</label>
          <Dropdown
            fluid
            options={gponTypeOptions}
            selection
            value={gponType}
            onChange={(e, { value }) => {
              setGponType(value);
            }}
            disabled={!isEditing}
          />
        </Form.Field>
        <Form.Field>
          <label>Address</label>
          <input ref={addressInputRef} readOnly={!isEditing} />
        </Form.Field>
      </Form.Group>

      <Form.Field>
        <label>Notes</label>
        <textarea readOnly={!isEditing} ref={notesInputRef} rows={3} />
      </Form.Field>
      <Form.Field>
        <label>Description</label>

        <textarea ref={descriptionInputRef} readOnly={!isEditing} rows={3} />
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
export default GponDetailsTab;
