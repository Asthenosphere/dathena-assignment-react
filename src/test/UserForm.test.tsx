import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";

import UserForm from "../components/UserForm";

import { User } from "../interfaces/User";

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

it("renders user form correctly", () => {
  const form = shallow(
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
  expect(form.getElements()).toMatchSnapshot();
});
