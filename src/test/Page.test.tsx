import React from "react";
import { render } from "@testing-library/react";
import Page from "../pages/Page";

test("page should have a title of Page", async () => {
  const { findAllByText } = render(<Page />);
  await findAllByText("Page");
});
