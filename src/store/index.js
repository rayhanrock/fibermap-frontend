import { configureStore } from "@reduxjs/toolkit";
import mapSlice from "./map/reducer";

const store = configureStore({
  reducer: { map: mapSlice.reducer },
});

export default store;
