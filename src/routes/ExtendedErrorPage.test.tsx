import ErrorPage from "./ExtendedErrorPage";
import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import Root from "./Root";
import React from "react";

describe("ExtendedErrorPage", () => {
  const renderComponent = (initialPageEntry: string) => {
    const router = createMemoryRouter(
      [
        { path: "/", element: <Root />, errorElement: <ErrorPage /> },
        {
          path: "/errorpage",
          element: <div>No error</div>,
          errorElement: <ErrorPage />,
          loader: async () => {
            throw new Error("Loading Error");
          },
        },
      ],
      {
        initialEntries: [initialPageEntry],
      }
    );

    render(<RouterProvider router={router} />);
  };

  it("should render error page when route is not found", async () => {
    renderComponent("/wrongurl");
    expect(await screen.findByText("Not Found")).toBeInTheDocument();
  });
});
