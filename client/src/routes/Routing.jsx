import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignInSignUp from "../page/SignInSignUp/SignInSignUp";
import { map } from "lodash";
import configRouting from "./configRouting";

export default function Routing(props) {
  const { user, setRefreshCheckLogin } = props;

  const isAuthenticated = user !== null;
  const isSecureRoute = (route) => route.secure !== false;

  return (
    <Router>
      <Routes>
        {map(configRouting, (route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              isAuthenticated || !isSecureRoute(route) ? (
                <route.page setRefreshCheckLogin={setRefreshCheckLogin} />
              ) : (
                <SignInSignUp setRefreshCheckLogin={setRefreshCheckLogin} />
              )
            }
          />
        ))}
      </Routes>
    </Router>
  );
}
