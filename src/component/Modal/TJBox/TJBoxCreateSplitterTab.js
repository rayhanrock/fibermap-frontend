import { useState } from "react";
import { toast } from "react-toastify";
import { Button, Dropdown, Form } from "semantic-ui-react";
import isEmptyStirng from "../../../utility/isEmptyStirng";
import { createGpon } from "../../../services";
import handleError from "../../../utility/handleError";

const splitterTypeOptions = [
  { key: 1, text: "Epon", value: "Epon" },
  { key: 2, text: "Gpon", value: "Gpon" },
];

const splitterOptions = [
  { key: 1, text: "2", value: 2 },
  { key: 2, text: "4", value: 4 },
  { key: 3, text: "8", value: 8 },
  { key: 4, text: "12", value: 12 },
  { key: 5, text: "16", value: 16 },
  { key: 6, text: "32", value: 32 },
];
const TJBoxCreateSplitterTab = ({ tjboxId }) => {
  const [id, setId] = useState("");
  const [splitter, setSplitter] = useState(2);

  const [splitterType, setSplitterType] = useState("");
  const handleCreateSplitter = async () => {
    if (isEmptyStirng(id)) {
      toast.error("Please enter ID");
      return;
    } else if (isEmptyStirng(splitterType)) {
      toast.error("Please enter gpon type");
      return;
    }

    const data = {
      identifier: id,
      name: splitterType,
      splitter: splitter,
      tj_box: tjboxId,
    };

    console.log(data);
    const response = await createGpon(data);
    if (response.status === 201) {
      toast.success("Splitter created successfully");
      handleReset();
    }
    if (response.error) {
      handleError(response.error);
    }
  };

  const handleReset = () => {
    setId("");
    setSplitterType("");
    setSplitter(2);
  };
  return (
    <Form>
      <Form.Field required>
        <label>ID</label>
        <input
          placeholder="Must be unique"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <label>Type</label>
        <Dropdown
          fluid
          options={splitterTypeOptions}
          selection
          value={splitterType}
          onChange={(e, { value }) => {
            console.log(value);
            setSplitterType(value);
          }}
        />
      </Form.Field>
      <Form.Field required>
        <label>Splitter</label>
        <Dropdown
          fluid
          onChange={(e, { value }) => {
            setSplitter(value);
          }}
          options={splitterOptions}
          selection
          value={splitter}
        />
      </Form.Field>

      <Form.Group>
        <Button fluid color="green" onClick={handleCreateSplitter}>
          Create
        </Button>
      </Form.Group>
    </Form>
  );
};

export default TJBoxCreateSplitterTab;
