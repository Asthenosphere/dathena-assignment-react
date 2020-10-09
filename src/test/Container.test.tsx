import React from "react";
import Container from "../components/Container";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";

configure({ adapter: new Adapter() });

it("renders conatiner correctly", () => {
  const container = shallow(<Container>Hello</Container>);
  expect(container.getElements()).toMatchSnapshot();
});
