import React, { useState } from "react";
import { User } from "../interfaces/User";
import {
  IonButton,
  IonButtons,
  IonCol,
  IonDatetime,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonRow,
  IonText,
  IonToolbar,
} from "@ionic/react";

import { createUser } from "../services/userService";

interface UserFormProps {
  isUserFormVisible: boolean;
  setIsUserFormVisible: (status: boolean) => void;
  userCallback: () => void;
  loadingCallback: (status: boolean) => void;
  alertCallback: (header: string, message: string, handler: () => void) => void;
}

const UserForm: React.FC<UserFormProps> = (props: UserFormProps) => {
  const {
    isUserFormVisible,
    setIsUserFormVisible,
    userCallback,
    loadingCallback,
    alertCallback,
  } = props;
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [dob, setDob] = useState<string>(Date.now().toString());

  const handleSubmit = async () => {
    loadingCallback(true);
    const userObject = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      dob: new Date(dob).getTime(),
    };
    try {
      await createUser(userObject);
      userCallback();
      setTimeout(() => {
        loadingCallback(false);
        alertCallback(
          "Success",
          `User ${firstName + " " + lastName} has been created successfully`,
          () => {
            userCallback();
          }
        );
        setIsUserFormVisible(false);
      }, 500);
    } catch (error) {
      loadingCallback(false);
      alertCallback("Error", error.message, () => {
        userCallback();
      });
    }
  };

  return (
    <IonModal
      cssClass='modal'
      isOpen={isUserFormVisible}
      onDidDismiss={() => setIsUserFormVisible(false)}
    >
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='end'>
            <IonButton onClick={() => setIsUserFormVisible(false)}>
              Close
            </IonButton>
          </IonButtons>
        </IonToolbar>

        <IonRow class='ion-padding-top ion-justify-content-center'>
          <IonText style={{ fontWeight: "bold", fontSize: "32px" }}>
            New User
          </IonText>
        </IonRow>
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
              <IonLabel color='primary' position='floating'>
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
                displayFormat='DD MMM YYYY'
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
              >
                Create User
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonHeader>
    </IonModal>
  );
};

export default UserForm;
