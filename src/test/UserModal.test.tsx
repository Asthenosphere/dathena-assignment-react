import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";

import UserModal from "../components/UserModal";

import { User } from "../interfaces/User";
import { log } from "console";

configure({ adapter: new Adapter() });

const user = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@gmail.com",
  dob: new Date(1595493789),
};

describe("UserModal", () => {
  const modal = shallow(
    <UserModal
      user={user}
      isUserModalVisible={true}
      setIsUserModalVisible={() => {}}
      userCallback={() => {}}
      loadingCallback={() => {}}
      alertCallback={(
        header: string,
        message: string,
        hasConfirm: boolean,
        confirmHandler: () => void
      ) => {}}
    />
  );

  it("renders user modal correctly", () => {
    expect(modal.getElements()).toMatchSnapshot();
  });

  it("should have an four fields", () => {
    expect(modal).toBe(1);
    expect(modal.find("ion-input").length).toEqual(4);
  });
});
