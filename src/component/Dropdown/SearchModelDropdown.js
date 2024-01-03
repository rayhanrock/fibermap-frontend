import { useEffect, useState, useContext } from "react";
import MapContext from "../../store/map-context";
import { Dropdown } from "semantic-ui-react";

const SearchClient = ({ getValue, optionsType }) => {
  const { clients, pops, junctions, gpons } = useContext(MapContext);
  const [value, setValue] = useState(null);

  const optionSelection = {
    CLIENT: clients,
    POP: pops,
    JUNCTION: junctions,
    GPON: gpons,
  };

  const options =
    optionSelection[optionsType] &&
    optionSelection[optionsType].map((item) => {
      return {
        key: item.id,
        text: item.name,
        value: item.id,
      };
    });
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
      value={value}
      placeholder="Select starting point"
    />
  );
};

export default SearchClient;
