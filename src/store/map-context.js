import { createContext, useMemo, useState } from "react";

const defaultValues = {
  latlang: null,
  setlatlang: () => {},
  cable: null,
  setCable: () => {},
};

const MapContext = createContext(defaultValues);

export const MapContextProvider = (props) => {
  const [latlang, setlatlang] = useState(defaultValues.latlang);
  const [cable, setCable] = useState(defaultValues.cable);

  const contextValue = useMemo(
    () => ({
      latlang,
      setlatlang,
      cable,
      setCable,
    }),
    [latlang, cable]
  );

  return (
    <MapContext.Provider value={contextValue}>
      {props.children}
    </MapContext.Provider>
  );
};

export default MapContext;
