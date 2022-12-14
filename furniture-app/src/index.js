import { NotificationsProvider } from "@mantine/notifications";
import { MantineProvider } from "@mantine/core";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import ScrollToTop from "./Components/scrollToTop";

ReactDOM.render(
  <BrowserRouter>
    <NotificationsProvider style={{ top: "80px" }} position="top-right">
      <ScrollToTop />
      <App></App>
    </NotificationsProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
