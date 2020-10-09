import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";

import UserForm from "../components/UserForm";

import { User } from "../interfaces/User";
import { IonButton, IonDatetime, IonInput } from "@ionic/react";

configure({ adapter: new Adapter() });

const users: User[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@gmail.com",
    dob: new Date(1595493789),
  },
];

describe("UserForm", () => {
  const wrapper = shallow(
    <UserForm
      users={users}
      isUserFormVisible={true}
      setIsUserFormVisible={() => {}}
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

  it("renders user form correctly", () => {
    expect(wrapper.getElements()).toMatchSnapshot();
  });

  it("renders three input fields correctly", () => {
    expect(wrapper.find(IonInput).length).toEqual(3);
  });

  it("renders two buttons correctly", () => {
    expect(wrapper.find(IonButton).length).toEqual(2);
  });

  it("renders a date picker correctly", () => {
    expect(wrapper.find(IonDatetime).length).toEqual(1);
  });
});
