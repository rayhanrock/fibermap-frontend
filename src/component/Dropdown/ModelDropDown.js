import React from "react";
import { Dropdown } from "semantic-ui-react";
import { useState } from "react";
const options = [
  { key: 1, text: "Pop", value: 1 },
  { key: 2, text: "Client", value: 2 },
  { key: 3, text: "Junction", value: 3 },
  { key: 4, text: "Gpon", value: 4 },
];

const ModelDropDown = ({ getValue }) => {
  const [value, setValue] = useState(null);

  const handleChange = (e, { value }) => {
    setValue(value);
    getValue(value);
  };

  return (
    <Dropdown
      fluid
      onChange={handleChange}
      options={options}
      selection
      value={value}
    />
  );
};

export default ModelDropDown;
