import React, {
  createContext,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from "react";
import { getNetworkPoint } from "../services";

const defaultValues = {
  latlang: null,
  setlatlang: () => {},
  cable: null,
  setCable: () => {},
  networkPoint: null,
  updateNetworkPoint: () => {},
};

const MapContext = createContext(defaultValues);

export const MapContextProvider = (props) => {
  const [latlang, setlatlang] = useState(defaultValues.latlang);
  const [cable, setCable] = useState(defaultValues.cable);
  const [networkPoint, setNetworkPoint] = useState(defaultValues.networkPoint);

  const updateNetworkPoint = useCallback(async () => {
    try {
      const { data, status } = await getNetworkPoint();
      if (status === 200) {
        setNetworkPoint(data);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);
  useEffect(() => {
    updateNetworkPoint();
  }, []);

  const contextValue = useMemo(
    () => ({
      latlang,
      setlatlang,
      cable,
      setCable,
      networkPoint,
      updateNetworkPoint,
    }),
    [latlang, cable, networkPoint, setlatlang, setCable, updateNetworkPoint]
  );

  return (
    <MapContext.Provider value={contextValue}>
      {props.children}
    </MapContext.Provider>
  );
};

export default MapContext;
