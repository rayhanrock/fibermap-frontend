import React, { useState, useEffect } from "react";
import { Dropdown } from "semantic-ui-react";
import { useSelector } from "react-redux";

const SearchModelDropdown = ({ getValue, optionsType }) => {
  const clients = useSelector((state) => state.map.clients);
  const pops = useSelector((state) => state.map.pops);
  const junctions = useSelector((state) => state.map.junctions);
  const gpons = useSelector((state) => state.map.gpons);

  const [value, setValue] = useState(null);
  const optionSelection = {
    CLIENT: clients,
    POP: pops,
    JUNCTION: junctions,
    TJ_BOX: gpons,
  };

  useEffect(() => {
    setValue(null);
  }, [optionsType]);

  const options = optionSelection[optionsType]
    ? optionSelection[optionsType].map((item) => {
        return {
          key: item.id,
          text: item.identifier,
          value: item.id,
        };
      })
    : [];

  console.log("options", options);
  const handleChange = (e, { value }) => {
    setValue(value);
    getValue(value);
  };

  return (
    <Dropdown
      selection
      fluid
      labeled
      options={options}
      search
      onChange={handleChange}
      placeholder="Select starting point"
      value={value}
    />
  );
};

export default React.memo(SearchModelDropdown);
