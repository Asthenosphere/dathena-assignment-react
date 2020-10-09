import React, { useState } from "react";
import { User } from "../interfaces/User";
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonDatetime,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { createUser } from "../services/userService";
import { isValidEmail } from "../utils/validationUtils";

interface UserFormProps {
  users: User[];
  isUserFormVisible: boolean;
  setIsUserFormVisible: (status: boolean) => void;
  userCallback: () => void;
  loadingCallback: (status: boolean) => void;
  alertCallback: (
    header: string,
    message: string,
    hasConfirm: boolean,
    confirmHandler: () => void
  ) => void;
}

const UserForm: React.FC<UserFormProps> = (props: UserFormProps) => {
  const {
    users,
    isUserFormVisible,
    setIsUserFormVisible,
    userCallback,
    loadingCallback,
    alertCallback,
  } = props;
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [dob, setDob] = useState<string | undefined>(undefined);

  const handleSubmit = async () => {
    loadingCallback(true);
    const userObject = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      dob: new Date(dob!).getTime(),
    };
    if (
      users.filter((x) => {
        return x.email === email;
      }).length > 0
    ) {
      loadingCallback(false);
      alertCallback(
        "Notice",
        "A user with the same email address has been found. Please try another email address.",
        false,
        () => {}
      );
      return;
    }
    try {
      await createUser(userObject);
      userCallback();
      setTimeout(() => {
        loadingCallback(false);
        alertCallback(
          "Success",
          `User ${firstName + " " + lastName} has been created successfully`,
          false,
          () => {}
        );
        setIsUserFormVisible(false);
        userCallback();
      }, 500);
    } catch (error) {
      loadingCallback(false);
      alertCallback("Error", error.message, false, () => {});
    }
  };

  const validateInputs = () => {
    return (
      firstName.length > 0 && lastName.length > 0 && isValidEmail(email) && dob
    );
  };

  return (
    <IonModal
      cssClass='modal'
      isOpen={isUserFormVisible}
      onDidDismiss={() => setIsUserFormVisible(false)}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>New User</IonTitle>
          <IonButtons slot='end'>
            <IonButton onClick={() => setIsUserFormVisible(false)}>
              Close
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid class='ion-padding-bottom ion-padding-horizontal'>
          <IonList>
            <IonItem>
              <IonLabel color='primary' position='floating'>
                First Name
              </IonLabel>
              <IonInput
                value={firstName}
                onIonChange={(event: CustomEvent) => {
                  setFirstName(event.detail.value);
                }}
              />
            </IonItem>
            <IonItem>
              <IonLabel color='primary' position='floating'>
                Last Name
              </IonLabel>
              <IonInput
                value={lastName}
                onIonChange={(event: CustomEvent) => {
                  setLastName(event.detail.value);
                }}
              />
            </IonItem>
            <IonItem>
              <IonLabel
                color={
                  email.length > 0 && !isValidEmail(email)
                    ? "danger"
                    : "primary"
                }
                position='floating'
              >
                Email
              </IonLabel>
              <IonInput
                value={email}
                onIonChange={(event: CustomEvent) => {
                  setEmail(event.detail.value);
                }}
              />
            </IonItem>
            <IonItem>
              <IonLabel color='primary' position='floating'>
                Date of Birth
              </IonLabel>
              <IonDatetime
                name='dob'
                displayFormat='DD MM YYYY'
                value={dob}
                onIonChange={(event: CustomEvent) => {
                  setDob(event.detail.value);
                }}
              />
            </IonItem>
          </IonList>
          <br />
          <IonRow class='ion-padding'>
            <IonCol>
              <IonButton
                expand='block'
                color='primary'
                shape='round'
                onClick={handleSubmit}
                disabled={!validateInputs()}
              >
                Create User
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonModal>
  );
};

export default UserForm;
