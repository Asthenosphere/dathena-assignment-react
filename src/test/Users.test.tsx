import React from "react";
import UsersPage from "../pages/users/UsersPage";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";

configure({ adapter: new Adapter() });

describe("users component", () => {
  it("should render users correctly", () => {
    const component = shallow(<UsersPage />);
    expect(component.getElements()).toMatchSnapshot();
  });
});
