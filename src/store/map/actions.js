import {
  getClients,
  getTJBoxs,
  getGpons,
  getPops,
  getCables,
  getResellers,
} from "../../services";
import { mapActions } from "./reducer";

export const updatePops = () => {
  return async (dispatch) => {
    try {
      const { data, status } = await getPops();
      if (status === 200) {
        dispatch(mapActions.setPops(data));
      }
    } catch (error) {
      console.error(error);
    }
  };
};
export const updateClients = () => {
  return async (dispatch) => {
    try {
      const { data, status } = await getClients();
      if (status === 200) {
        dispatch(mapActions.setClients(data));
      }
    } catch (error) {
      console.error(error);
    }
  };
};
export const updateResellers = () => {
  return async (dispatch) => {
    try {
      const { data, status } = await getResellers();
      if (status === 200) {
        console.log("data", data);
        dispatch(mapActions.setResellers(data));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateTJBoxs = () => {
  return async (dispatch) => {
    try {
      const { data, status } = await getTJBoxs();
      if (status === 200) {
        dispatch(mapActions.setTJBoxs(data));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateGpons = () => {
  return async (dispatch) => {
    try {
      const { data, status } = await getGpons();
      if (status === 200) {
        dispatch(mapActions.setGpons(data));
      }
    } catch (error) {
      console.error(error);
    }
  };
};
export const updateCables = () => {
  return async (dispatch) => {
    try {
      const { data, status } = await getCables();
      if (status === 200) {
        dispatch(mapActions.setCables(data));
      }
    } catch (error) {
      console.error(error);
    }
  };
};
