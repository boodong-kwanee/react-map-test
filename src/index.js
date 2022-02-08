import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import GlobalStyles from "./styles/GlobalStyles";

console.log("RENDER");

ReactDOM.render(
  <BrowserRouter>
    <GlobalStyles />
    <Router />
  </BrowserRouter>,
  document.getElementById("root")
);
