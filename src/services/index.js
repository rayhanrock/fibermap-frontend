import api from "../boot/axios";

export async function getNetworkPoint(params = {}) {
  try {
    const { data, status } = await api.get("/network/", {
      params,
    });
    return { data, status, error: null };
  } catch (error) {
    return { data: null, status: null, error };
  }
}
export async function createClient(params = {}) {
  try {
    const { data, status } = await api.post("/client/", params);

    return { data, status, error: null };
  } catch (error) {
    return { data: null, status: null, error };
  }
}

export async function createJunction(params = {}) {
  try {
    const { data, status } = await api.post("/junction/", params);

    return { data, status, error: null };
  } catch (error) {
    return { data: null, status: null, error };
  }
}
