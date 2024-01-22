import React, {
  createContext,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  getClients,
  getJunctions,
  getGpons,
  getPops,
  getCables,
} from "../services";

const defaultValues = {
  latlang: null,
  setlatlang: () => {},
  drawLine: null,
  setDrawLine: () => {},

  highlightPath: null,
  setHighlightPath: () => {},

  pops: null,
  updatePops: () => {},
  clients: null,
  updateClients: () => {},
  junctions: null,
  updateJunctions: () => {},
  gpons: null,
  updateGpons: () => {},

  cables: null,
  updateCables: () => {},
};

const MapContext = createContext(defaultValues);

export const MapContextProvider = ({ children }) => {
  const [latlang, setlatlang] = useState(defaultValues.latlang);
  const [drawLine, setDrawLine] = useState(defaultValues.drawLine);
  const [pops, setPops] = useState(defaultValues.pops);
  const [clients, setclients] = useState(defaultValues.clients);
  const [junctions, setJunctions] = useState(defaultValues.junctions);
  const [gpons, setGpons] = useState(defaultValues.gpons);
  const [cables, setCables] = useState(defaultValues.cables);

  const [highlightPath, setHighlightPath] = useState(
    defaultValues.highlightPath
  );

  const updatePops = useCallback(async () => {
    try {
      const { data, status } = await getPops();
      if (status === 200) {
        setPops(data);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);
  const updateClients = useCallback(async () => {
    try {
      const { data, status } = await getClients();
      if (status === 200) {
        setclients(data);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);
  const updateJunctions = useCallback(async () => {
    try {
      const { data, status } = await getJunctions();
      if (status === 200) {
        setJunctions(data);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);
  const updateGpons = useCallback(async () => {
    try {
      const { data, status } = await getGpons();
      if (status === 200) {
        setGpons(data);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);
  const updateCables = useCallback(async () => {
    try {
      const { data, status } = await getCables();
      if (status === 200) {
        setCables(data);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);
  useEffect(() => {
    updatePops();
    updateClients();
    updateJunctions();
    updateGpons();
    updateCables();
  }, []);

  const contextValue = useMemo(
    () => ({
      latlang,
      setlatlang,
      drawLine,
      setDrawLine,
      highlightPath,
      setHighlightPath,
      pops,
      updatePops,
      clients,
      updateClients,
      junctions,
      updateJunctions,
      gpons,
      updateGpons,
      cables,
      updateCables,
    }),
    [latlang, drawLine, highlightPath, pops, clients, junctions, gpons, cables]
  );

  return (
    <MapContext.Provider value={contextValue}>{children}</MapContext.Provider>
  );
};

export default MapContext;
