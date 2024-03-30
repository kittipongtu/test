import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app";
import reportWebVitals from "./report-web-vitals";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./redux/store/index";

import { LoadingProvider } from "./components/global/full-loading";
import { AlertProvider } from "./components/global/context-alert-dialog";

ReactDOM.render(
  <>
    <BrowserRouter>
      <Provider store={store}>
        <LoadingProvider>
          <AlertProvider>
            <App />
          </AlertProvider>
        </LoadingProvider>
      </Provider>
    </BrowserRouter>
  </>,
  document.getElementById("root")
);

reportWebVitals();
