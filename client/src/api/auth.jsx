import { API_HOST } from "../utils/constant";

export function signUpApi(user) {
  const url = `${API_HOST}/register`;
  const { repeatPassword, ...userTemp } = user;
  const modifiedUser = {
    ...userTemp,
    email: user.email.toLowerCase(),
    birthDate: Date.now(),
  };
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(modifiedUser),
  };
  console.log(modifiedUser);
  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
      return { code: 404, message: "Email already in use." };
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}
