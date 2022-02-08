import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, HashRouter } from "react-router-dom";
import Router from "./Router";
import GlobalStyles from "./styles/GlobalStyles";

console.log("RENDER");

ReactDOM.render(
  <HashRouter>
    <GlobalStyles />
    <Router />
  </HashRouter>,
  document.getElementById("root")
);
