import { render, screen } from "@testing-library/react";
import { LinkBehavior } from ".";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

describe("LinkBehavior", () => {
  const Wrapper = () => {
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <LinkBehavior href="test">Link</LinkBehavior>,
        },
      ],
      { initialEntries: ["/"] }
    );
    return <RouterProvider router={router} />;
  };

  it("should render component correctly", () => {
    render(<Wrapper />);
    expect(screen.getByText("Link")).toHaveAttribute("href", "/test");
  });
});
