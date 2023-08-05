import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  reportWebVitals,
  consoleReportHandler,
} from "@yoonghan/walcron-microfrontend-shared";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
]);

export default function Root(props) {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

reportWebVitals(consoleReportHandler);
