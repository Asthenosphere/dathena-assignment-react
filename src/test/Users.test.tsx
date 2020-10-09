import React from "react";
import UsersPage from "../pages/users/UsersPage";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";

configure({ adapter: new Adapter() });

describe("users", () => {
  it("should render users correctly", () => {
    const wrapper = shallow(<UsersPage />);
  });
});
