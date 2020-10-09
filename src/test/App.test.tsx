import React from "react";
import App from "../App";
import ReactDOM from "react-dom";

test("app should render without crashing", () => {
  const root = document.createElement("root");
  ReactDOM.render(<App />, root);
  ReactDOM.unmountComponentAtNode(root);
});
