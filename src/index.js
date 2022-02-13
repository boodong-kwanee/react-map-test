import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Router from "./Router";
import GlobalStyles from "./styles/GlobalStyles";

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <HashRouter>
      <GlobalStyles />
      <Router />
    </HashRouter>
  </QueryClientProvider>,
  document.getElementById("root")
);
