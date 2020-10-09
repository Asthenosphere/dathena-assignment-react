import React from "react";
import UsersPage from "../pages/users/UsersPage";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import { IonFabButton } from "@ionic/react";

configure({ adapter: new Adapter() });

describe("UsersPage", () => {
  const wrapper = shallow(<UsersPage />);

  it("renders users correctly", () => {
    expect(wrapper.getElements()).toMatchSnapshot();
  });

  it("renders a fab button correctly", () => {
    expect(wrapper.find(IonFabButton).length).toEqual(1);
  });
});
