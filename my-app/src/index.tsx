import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import promise from "redux-promise-middleware";
import { composeWithDevTools } from "redux-devtools-extension";

import { rootReducer } from "./reducers";

const store = createStore(
  rootReducer,
  { catalogue: [], cart: [] },
  composeWithDevTools(applyMiddleware(promise))
);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
