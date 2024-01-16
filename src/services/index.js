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

export async function getClientConnectedPaths(id = 0) {
  try {
    const { data, status } = await api.get(`client/${id}/paths/`, {});
    return { data, status, error: null };
  } catch (error) {
    return { data: null, status: null, error };
  }
}

export async function updateCoreAssignStatus(id = 0, payload = {}) {
  try {
    const { data, status } = await api.patch(
      `core/${id}/update-assign-status/`,
      payload
    );
    return { data, status, error: null };
  } catch (error) {
    return { data: null, status: null, error };
  }
}

export async function getJunctionCoreDetails(id) {
  try {
    const { data, status } = await api.get(`junction-details/${id}/cores/`, {});
    return { data, status, error: null };
  } catch (error) {
    return { data: null, status: null, error };
  }
}

export async function getPopConnectedPaths(id = 0) {
  try {
    const { data, status } = await api.get(`pop/${id}/paths/`, {});
    return { data, status, error: null };
  } catch (error) {
    return { data: null, status: null, error };
  }
}
export async function getPopCoreDetails(id) {
  try {
    const { data, status } = await api.get(`pop-details/${id}/cores/`, {});
    return { data, status, error: null };
  } catch (error) {
    return { data: null, status: null, error };
  }
}
export async function getGponCoreDetails(id = 0) {
  try {
    const { data, status } = await api.get(`gpon-details/${id}/cores/`, {});
    return { data, status, error: null };
  } catch (error) {
    return { data: null, status: null, error };
  }
}
export async function addGponInputCable(id = 0, payload = {}) {
  try {
    const { data, status } = await api.post(
      `gpon/${id}/add-input-cable/`,
      payload
    );
    return { data, status, error: null };
  } catch (error) {
    return { data: null, status: null, error };
  }
}

export async function removeGponInputCable(id = 0) {
  try {
    const { data, status } = await api.get(`gpon/${id}/remove-input-cable/`);
    return { data, status, error: null };
  } catch (error) {
    return { data: null, status: null, error };
  }
}

export async function gponInputAssignCore(id = 0, payload = {}) {
  try {
    const { data, status } = await api.post(`gpon/${id}/assign-core/`, payload);
    return { data, status, error: null };
  } catch (error) {
    return { data: null, status: null, error };
  }
}
export async function gponInputWithdrawCore(id = 0, payload = {}) {
  try {
    const { data, status } = await api.post(
      `gpon/${id}/withdraw-core/`,
      payload
    );
    return { data, status, error: null };
  } catch (error) {
    return { data: null, status: null, error };
  }
}
export async function connectCores(payload = {}) {
  try {
    const { data, status } = await api.post(`connect-cores/`, payload);
    return { data, status, error: null };
  } catch (error) {
    return { data: null, status: null, error };
  }
}

export async function disconnectCores(payload = {}) {
  try {
    const { data, status } = await api.post(`disconnect-cores/`, payload);
    return { data, status, error: null };
  } catch (error) {
    return { data: null, status: null, error };
  }
}
