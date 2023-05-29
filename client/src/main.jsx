import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import extendTheme from "./theme/index.jsx";
import "react-datepicker/dist/react-datepicker.css";
import "./App.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={extendTheme}>
    <App />
  </ChakraProvider>
);
