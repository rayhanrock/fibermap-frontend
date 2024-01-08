import api from "../boot/axios";

export async function createPop(params = {}) {
  try {
    const { data, status } = await api.post("/pop/create/", params);

    return { data, status, error: null };
  } catch (error) {
    return { data: null, status: null, error };
  }
}

export async function getPops(params = {}) {
  try {
    const { data, status } = await api.get("/pop/", {
      params,
    });
    return { data, status, error: null };
  } catch (error) {
    return { data: null, status: null, error };
  }
}
export async function createClient(params = {}) {
  try {
    const { data, status } = await api.post("/client/create/", params);

    return { data, status, error: null };
  } catch (error) {
    return { data: null, status: null, error };
  }
}
export async function getClients(params = {}) {
  try {
    const { data, status } = await api.get("/client/", {
      params,
    });
    return { data, status, error: null };
  } catch (error) {
    return { data: null, status: null, error };
  }
}

export async function createJunction(params = {}) {
  try {
    const { data, status } = await api.post("/junction/create/", params);

    return { data, status, error: null };
  } catch (error) {
    return { data: null, status: null, error };
  }
}
export async function getJunctions(params = {}) {
  try {
    const { data, status } = await api.get("/junction/", {
      params,
    });
    return { data, status, error: null };
  } catch (error) {
    return { data: null, status: null, error };
  }
}

export async function createGpon(params = {}) {
  try {
    const { data, status } = await api.post("/gpon/create/", params);

    return { data, status, error: null };
  } catch (error) {
    return { data: null, status: null, error };
  }
}
export async function getGpons(params = {}) {
  try {
    const { data, status } = await api.get("/gpon/", {
      params,
    });
    return { data, status, error: null };
  } catch (error) {
    return { data: null, status: null, error };
  }
}
export async function createCable(params = {}) {
  try {
    const { data, status } = await api.post("/cable/create/", params);

    return { data, status, error: null };
  } catch (error) {
    return { data: null, status: null, error };
  }
}
export async function getCables(params = {}) {
  try {
    const { data, status } = await api.get("/cable/", {
      params,
    });
    return { data, status, error: null };
  } catch (error) {
    return { data: null, status: null, error };
  }
}

export async function getClientCoreDetails(id) {
  try {
    const { data, status } = await api.get(`client-details/${id}/cores/`, {});
    return { data, status, error: null };
  } catch (error) {
    return { data: null, status: null, error };
  }
}
