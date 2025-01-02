import React from "react";
import ReactDOM from "react-dom/client"; // Note the change to react-dom/client
import { Provider } from "react-redux";
import store from "./redux/store"; // Import your Redux store
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")); // Use createRoot
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
