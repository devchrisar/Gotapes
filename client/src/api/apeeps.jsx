import { API_HOST } from "../utils/constant";
import { getTokenApi } from "./auth";

export async function addApeepsApi(message, gifUrl) {
  const url = `${API_HOST}/tweet`;
  const token = getTokenApi();
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const data = {
    Message: message,
    GIFurl: gifUrl,
  };

  const params = {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(url, params);
    if (response.status >= 200 && response.status < 300) {
      return { code: response.status, message: "Apeep sent" };
    }
    return { code: 500, message: "internal server error" };
  } catch (error) {
    return error;
  }
}

export async function getApeepsApi(IDuser, page = 1) {
  const url = `${API_HOST}/read-tweets?id=${IDuser}&page=${page}`;
  const token = getTokenApi();
  const params = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
}

export async function getApeepsFollowersApi(page = 1) {
  const url = `${API_HOST}/read_followers_tweets?page=${page}`;
  const token = getTokenApi();
  const params = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
}
