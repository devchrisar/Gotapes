import { API_HOST } from "../utils/constant";
import { getTokenApi } from "./auth";

export async function getUserApi(id) {
  const url = `${API_HOST}/visit-profile?id=${id}`;
  const token = getTokenApi();
  const headers = {
    Authorization: `Bearer${token}`,
  };
  const params = {
    headers,
  };

  try {
    const response = await fetch(url, params);

    if (response.status >= 400) {
      throw new Error("Invalid token");
    }

    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
}

export async function uploadBannerApi(file) {
  const url = `${API_HOST}/upload_Banner`;
  const token = getTokenApi();

  const formData = new FormData();
  formData.append("banner", file);

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const params = {
    method: "POST",
    headers,
    body: formData,
  };

  try {
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (err) {
    return err.message;
  }
}

export async function uploadAvatarApi(file) {
  const url = `${API_HOST}/upload_Avatar`;
  const token = getTokenApi();

  const formData = new FormData();
  formData.append("avatar", file);

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const params = {
    method: "POST",
    headers,
    body: formData,
  };

  try {
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (err) {
    return err.message;
  }
}

export async function updateInfoApi(data) {
  const url = `${API_HOST}/alter-profile`;
  const token = getTokenApi();
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const params = {
    method: "PUT",
    headers,
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (err) {
    return err.message;
  }
}

export async function searchUserApi(search) {
  const url = `${API_HOST}/search?${search}`;
  const token = getTokenApi();
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const params = {
    headers,
  };

  try {
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (err) {
    return err.message;
  }
}
