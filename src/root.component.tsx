import * as React from "react";
/* istanbul ignore file -- @preserve */
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  reportWebVitals,
  consoleReportHandler,
} from "@yoonghan/walcron-microfrontend-shared";
import appRoute from "./routes/appRoute";

const router = createBrowserRouter([
  appRoute({
    onSignIn: () => {
      //do nothing
    },
    onSignOut: () => {
      //do nothing
    },
  }),
]);

export default function Root(props) {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

reportWebVitals(consoleReportHandler);
