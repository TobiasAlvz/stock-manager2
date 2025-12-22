import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { StockContextProvider } from "./contexts/StockContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StockContextProvider>
      <RouterProvider router={router} />{" "}
    </StockContextProvider>{" "}
  </React.StrictMode>
);
