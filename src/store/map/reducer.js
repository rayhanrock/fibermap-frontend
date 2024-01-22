import { createSlice } from "@reduxjs/toolkit";

const mapSlice = createSlice({
  name: "map",
  initialState: {
    latlang: null,
    drawLine: null,
    pops: null,
    clients: null,
    junctions: null,
    gpons: null,
    cables: null,
    highlightPath: null,
  },
  reducers: {
    updateLatLang: (state, action) => {
      state.latlang = action.payload;
    },
    setDrawLine: (state, action) => {
      console.log("setDrawLine", action.payload);
      state.drawLine = action.payload;
    },
    setPops: (state, action) => {
      state.pops = action.payload;
    },
    setClients: (state, action) => {
      state.clients = action.payload;
    },
    setJunctions: (state, action) => {
      state.junctions = action.payload;
    },
    setGpons: (state, action) => {
      state.gpons = action.payload;
    },
    setCables: (state, action) => {
      state.cables = action.payload;
    },
    setHighlightPath: (state, action) => {
      state.highlightPath = action.payload;
    },
  },
});

export const mapActions = mapSlice.actions;
export default mapSlice;
