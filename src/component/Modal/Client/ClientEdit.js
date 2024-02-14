import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Button, Confirm, Form } from "semantic-ui-react";
import { deleteClient, getClient, updateClient } from "../../../services";
import handleError from "../../../utility/handleError";
import { updateCables, updateClients } from "../../../store/map/actions";
import { useDispatch } from "react-redux";

const ClientEdit = ({ clientId, modalClose }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const nameInputRef = useRef();
  const addressInputRef = useRef();
  const notesInputRef = useRef();
  const descriptionInputRef = useRef();
  const mobileInputRef = useRef();

  const [confirmSubmit, setConfirmSubmit] = useState(false);

  useEffect(() => {
    getClientDetails(clientId);
  }, []);

  const getClientDetails = async (id) => {
    const { data, status, error } = await getClient(id);
    if (status === 200) {
      nameInputRef.current.value = data.name;
      addressInputRef.current.value = data.marker.address;
      notesInputRef.current.value = data.marker.notes;
      descriptionInputRef.current.value = data.marker.description;
      mobileInputRef.current.value = data.mobile_number;
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
      mobile_number: mobileInputRef.current.value,
      marker: {
        address: addressInputRef.current.value,
        notes: notesInputRef.current.value,
        description: descriptionInputRef.current.value,
      },
    };
    const response = await updateClient(clientId, payload);
    if (response.status === 200) {
      toast.success("Client details updated successfully.");
      dispatch(updateClients());
    }
    if (response.error) {
      handleError(response.error);
    }
    setIsEditing(false);
  };

  const handleDelete = async () => {
    const response = await deleteClient(clientId);
    if (response.status === 204) {
      modalClose();
      toast.success("Client deleted successfully.");

      dispatch(updateClients());
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
          <label>Client Name</label>
          <input name="name" readOnly={!isEditing} ref={nameInputRef} />
        </Form.Field>
        <Form.Field>
          <label>Mobile number</label>
          <input name="mobile" readOnly={!isEditing} ref={mobileInputRef} />
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
export default ClientEdit;
