import { createSlice } from "@reduxjs/toolkit";

const mapSlice = createSlice({
  name: "map",
  initialState: {
    modelLatlang: null,
    latlang: null,
    drawLine: null,
    pops: null,
    clients: null,
    resellers: null,
    tjboxs: null,
    gpons: null,
    cables: null,
    highlightPath: null,
  },
  reducers: {
    setModelLatlang: (state, action) => {
      state.modelLatlang = action.payload;
    },
    updateLatLang: (state, action) => {
      state.latlang = action.payload;
    },
    setDrawLine: (state, action) => {
      state.drawLine = action.payload;
    },
    setPops: (state, action) => {
      state.pops = action.payload;
    },
    setClients: (state, action) => {
      state.clients = action.payload;
    },
    setResellers: (state, action) => {
      state.resellers = action.payload;
    },
    setTJBoxs: (state, action) => {
      state.tjboxs = action.payload;
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
