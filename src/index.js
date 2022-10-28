import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import { WordsContextProvider } from "./assets/components/Context";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode>
  // <WordsContextProvider>
  <App />
  // </WordsContextProvider>
  // </React.StrictMode>
);
