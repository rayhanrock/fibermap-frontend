import {
  getClients,
  getJunctions,
  getGpons,
  getPops,
  getCables,
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

export const updateJunctions = () => {
  return async (dispatch) => {
    try {
      const { data, status } = await getJunctions();
      if (status === 200) {
        dispatch(mapActions.setJunctions(data));
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
