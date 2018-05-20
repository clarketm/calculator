import React from "react";
import { Calculator } from "./Calculator";

import renderer from "react-test-renderer";

it("renders without crashing", () => {
  const rendered = renderer.create(<Calculator />).toJSON();
  expect(rendered).toBeTruthy();
});
