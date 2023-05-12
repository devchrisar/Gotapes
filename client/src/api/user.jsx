import { API_HOST } from "../utils/constant";
import { getTokenApi } from "./auth";

export function getUserApi(id) {
  const url = `${API_HOST}/visit-profile?id=${id}`;
  const params = {
    headers: {
      Authorization: `Bearer${getTokenApi()}`,
    },
  };
  return fetch(url, params)
    .then((response) => {
      if (response.status >= 400) throw null;
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}
