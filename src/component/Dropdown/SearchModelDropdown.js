import { useState, useContext, useEffect } from "react";
import MapContext from "../../store/map-context";
import { Dropdown } from "semantic-ui-react";

const SearchModelDropdown = ({ getValue, optionsType }) => {
  const { clients, pops, junctions, gpons } = useContext(MapContext);
  const [value, setValue] = useState(null);
  const optionSelection = {
    CLIENT: clients,
    POP: pops,
    JUNCTION: junctions,
    GPON: gpons,
  };

  useEffect(() => {
    setValue(null);
  }, [optionsType]);

  const options = optionSelection[optionsType]?.map((item) => ({
    key: item.id,
    text: item.name,
    value: item.id,
  }));

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

export default SearchModelDropdown;
