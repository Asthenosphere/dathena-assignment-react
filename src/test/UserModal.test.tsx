import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";

import UserModal from "../components/UserModal";

import { User } from "../interfaces/User";
import { log } from "console";
import { IonButton, IonDatetime, IonInput } from "@ionic/react";

configure({ adapter: new Adapter() });

const user = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@gmail.com",
  dob: new Date(1595493789),
};

describe("UserModal", () => {
  const wrapper = shallow(
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
    expect(wrapper.getElements()).toMatchSnapshot();
  });

  it("renders four buttons correctly", () => {
    expect(wrapper.find(IonButton).length).toEqual(4);
  });

  it("renders three input fields", () => {
    expect(wrapper.find(IonInput).length).toEqual(3);
  });

  it("renders a date picker correctly", () => {
    expect(wrapper.find(IonDatetime).length).toEqual(1);
  });
});
