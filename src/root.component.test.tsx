import { render } from "@testing-library/react";
import Root from "./root.component";

describe("Root component", () => {
  it("should be in the document", () => {
    const { getByText } = render(<Root name="Testapp" />);
    expect(
      getByText("This site is used for user up-keep and authentication.")
    ).toBeInTheDocument();
  });
});
