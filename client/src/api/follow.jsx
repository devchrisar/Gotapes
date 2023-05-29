import { API_HOST } from "../utils/constant";
import { getTokenApi } from "./auth";

export async function checkFollowApi(idUser) {
  const url = `${API_HOST}/check_Relation?id=${idUser}`;
  const token = getTokenApi();
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const params = {
    headers: headers,
  };
  try {
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (err) {
    return err.message;
  }
}

export async function followUserApi(idUser) {
  const url = `${API_HOST}/higher_Relation?id=${idUser}`;
  const token = getTokenApi();
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const params = {
    headers: headers,
    method: "POST",
  };
  try {
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (err) {
    return err.message;
  }
}

export async function unfollowUserApi(idUser) {
  const url = `${API_HOST}/lower_Relation?id=${idUser}`;
  const token = getTokenApi();
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const params = {
    headers: headers,
    method: "DELETE",
  };
  try {
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (err) {
    return err.message;
  }
}
