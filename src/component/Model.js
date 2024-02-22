import React from "react";
import { Dropdown } from "semantic-ui-react";
import { useState } from "react";
import Pop from "./Pop";
import Client from "./Client";
import Junction from "./Junction";
import Gpon from "./Gpon";
const options = [
  { key: 1, text: "Pop", value: 1 },
  { key: 2, text: "Client", value: 2 },
  // { key: 3, text: "Junction", value: 3 },
  { key: 4, text: "TJ Box", value: 4 },
];

const Models = () => {
  const [value, setValue] = useState(1);

  const handleChange = (e, { value }) => {
    setValue(value);
  };

  // Map the option values to corresponding components
  const componentMapping = {
    1: Pop,
    2: Client,
    3: Junction,
    4: Gpon,
  };
  const SelectedComponent = componentMapping[value];

  return (
    <>
      <Dropdown
        fluid
        onChange={handleChange}
        options={options}
        selection
        value={value}
      />
      {SelectedComponent && <SelectedComponent />}
    </>
  );
};

export default Models;
