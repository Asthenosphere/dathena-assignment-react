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

import "./UserModal.scss";
import { documentTextOutline } from "ionicons/icons";
import { deleteUser, updateUser } from "../services/userService";

interface UserDetailsModalProps {
  user: User;
  isUserModalVisible: boolean;
  setIsUserModalVisible: (status: boolean) => void;
  userCallback: () => void;
  loadingCallback: (status: boolean) => void;
  alertCallback: (
    header: string,
    message: string,
    hasConfirm: boolean,
    confirmHandler: () => void
  ) => void;
}

const UserModal: React.FC<UserDetailsModalProps> = (
  props: UserDetailsModalProps
) => {
  const {
    user,
    isUserModalVisible,
    setIsUserModalVisible,
    userCallback,
    loadingCallback,
    alertCallback,
  } = props;
  const [firstName, setFirstName] = useState<string>(
    user ? user.firstName : ""
  );
  const [lastName, setLastName] = useState<string>(user ? user.lastName : "");
  const [email, setEmail] = useState<string>(user ? user.email : "");
  const [dob, setDob] = useState<string>(
    user ? new Date(user.dob).toString() : Date.now().toString()
  );

  const handleDelete = () => {
    alertCallback(
      "Notice",
      "Are you sure you want delete this user?",
      true,
      () => {
        loadingCallback(true);
        try {
          deleteUser(user.id!);
          userCallback();
          setTimeout(() => {
            loadingCallback(false);
            alertCallback(
              "Success",
              `User ${
                firstName + " " + lastName
              } has been deleted successfully`,
              false,
              () => {}
            );
            setIsUserModalVisible(false);
            userCallback();
          }, 500);
        } catch (error) {
          console.log(error);
        }
      }
    );
  };

  const handleUpdate = () => {
    loadingCallback(true);
    const userObject = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      dob: new Date(dob).getTime(),
    };
    try {
      updateUser(userObject, user.id.toString());
      userCallback();
      setTimeout(() => {
        loadingCallback(false);
        alertCallback(
          "Success",
          `User ${firstName + " " + lastName} has been updated successfully`,
          false,
          () => {}
        );
        userCallback();
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <IonModal
      cssClass='modal'
      isOpen={isUserModalVisible}
      onDidDismiss={() => setIsUserModalVisible(false)}
      id={user.id.toString()}
    >
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='end'>
            <IonButton onClick={() => setIsUserModalVisible(false)}>
              Close
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonRow class='ion-padding ion-justify-content-center'>
          {user && user.lastName && <div id='circle'>{user.lastName[0]}</div>}
        </IonRow>
        <IonRow class='ion-padding ion-justify-content-center'>
          {user && (
            <IonText style={{ fontWeight: "bold" }}>
              {user.firstName + " " + user.lastName}
            </IonText>
          )}
        </IonRow>
        <IonItem color='light' lines='none'>
          <IonLabel>
            <IonText style={{ fontWeight: "bold" }}>User Details</IonText>
          </IonLabel>
          <IonIcon icon={documentTextOutline} slot='end'></IonIcon>
        </IonItem>
        <IonGrid class='ion-padding'>
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
                onClick={handleUpdate}
              >
                Update User
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton
                expand='block'
                color='danger'
                shape='round'
                onClick={handleDelete}
              >
                Delete User
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonHeader>
    </IonModal>
  );
};

export default UserModal;
