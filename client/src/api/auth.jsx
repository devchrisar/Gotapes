import { API_HOST, TOKEN } from "../utils/constant";
import jwtDecode from "jwt-decode";
import Cookie from "js-cookie";

export function signUpApi(user) {
  const url = `${API_HOST}/register`;
  const { repeatPassword, ...userTemp } = user;
  const modifiedUser = {
    ...userTemp,
    email: user.email.toLowerCase(),
    birthDate: new Date().toISOString(),
    password: user.GoogleSignUp ? "" : user.password,
  };
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(modifiedUser),
  };
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

export function signInApi(user) {
  const url = `${API_HOST}/login`;
  const data = {
    ...user,
    email: user.email.toLowerCase(),
  };
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
      return {
        message:
          "the account does not exist / or the email or password are incorrect",
      };
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function setTokenApi(token) {
  Cookie.set(TOKEN, token, {
    expires: 1,
    secure: true,
    sameSite: "strict",
    path: "/",
  });
}

export function getTokenApi() {
  return Cookie.get(TOKEN);
}

export function LogoutApi() {
  Cookie.remove(TOKEN);
}

function isExpiredToken(token) {
  const { exp } = jwtDecode(token);
  const expirationDate = new Date(exp * 1000);
  const timeOut = expirationDate.getTime() - new Date().getTime();

  if (timeOut < 0) return true;
  return null;
}

export function isUserLogedApi() {
  const token = getTokenApi();
  if (!token) {
    LogoutApi();
    return null;
  }
  if (isExpiredToken(token)) {
    LogoutApi();
  }
  return jwtDecode(token);
}

export function checkGoogleAccountExists(email) {
  const checkEmailUrl = `${API_HOST}/check-email?email=${encodeURIComponent(
    email
  )}`;

  return fetch(checkEmailUrl)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("The account does not exist. Please register first.");
      }
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
      throw new Error("Internal server error, try again later");
    });
}
