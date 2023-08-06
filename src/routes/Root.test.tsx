import { render, screen } from "@testing-library/react";
import Root from "./Root";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("Root", () => {
  it("should render child in outlet correctly", () => {
    render(
      <MemoryRouter initialEntries={["/root/outlet"]}>
        <Routes>
          <Route path="/root" element={<Root />}>
            <Route path="outlet" element={<div>Within Outlet</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("Within Outlet")).toBeInTheDocument();
  });
});
