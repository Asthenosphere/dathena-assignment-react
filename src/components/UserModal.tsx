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
import moment from "moment";

import "./UserModal.scss";
import { pencil } from "ionicons/icons";
import { deleteUser, updateUser } from "../services/userService";
import { isValidEmail } from "../utils/validationUtils";

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

// Modal to display the user's details.
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
  const [savedFirstName, setSavedFirstName] = useState<string>(
    user ? user.firstName : ""
  );
  const [savedLastName, setSavedLastName] = useState<string>(
    user ? user.lastName : ""
  );
  const [email, setEmail] = useState<string>(user ? user.email : "");
  const [dob, setDob] = useState<string>(
    user ? new Date(user.dob).toString() : Date.now().toString()
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isUpdated, setIsUpdated] = useState<boolean>(false);

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
          }, 1000);
        } catch (error) {
          console.log(error);
        }
      }
    );
  };

  // Handle the delete action.
  const handleUpdate = async () => {
    loadingCallback(true);
    const userObject = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      dob: new Date(dob).getTime(),
    };
    try {
      await updateUser(userObject, user.id.toString());
      userCallback();
      setIsUpdated(true);
      setSavedFirstName(firstName);
      setSavedLastName(lastName);
      setTimeout(() => {
        loadingCallback(false);
        alertCallback(
          "Success",
          `User ${firstName + " " + lastName} has been updated successfully`,
          false,
          () => {}
        );
        userCallback();
        setIsUpdated(true);
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  // Checks if the user's inputs are valid.
  const validateInputs = () => {
    return (
      firstName.length > 0 &&
      lastName.length > 0 &&
      firstName.trim().length !== 0 &&
      isValidEmail(email) &&
      dob
    );
  };

  // Checks if the user has made any change to the details.
  const validateChange = () => {
    return (
      firstName !== user.firstName ||
      lastName !== user.lastName ||
      email !== user.email ||
      Math.floor(new Date(dob).getTime() / 86400) !==
        Math.floor(new Date(user.dob).getTime() / 86400)
    );
  };

  return (
    <IonModal
      cssClass='modal'
      isOpen={isUserModalVisible}
      backdropDismiss={false}
      onDidDismiss={() => {
        setIsUserModalVisible(false);
        setIsEditing(false);
      }}
      id={user.id.toString()}
    >
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='end'>
            <IonButton
              onClick={() => {
                if (validateChange() && !isUpdated) {
                  alertCallback(
                    "Notice",
                    "You have unsaved changes, are you sure you want to leave?",
                    true,
                    () => {
                      setFirstName(user.firstName);
                      setLastName(user.lastName);
                      setEmail(user.email);
                      setDob(new Date(user.dob).toString());
                      setIsUserModalVisible(false);
                      setIsUpdated(false);
                    }
                  );
                } else {
                  setIsUserModalVisible(false);
                }
              }}
            >
              Close
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRow class='ion-padding ion-justify-content-center'>
          {user && savedLastName && <div id='circle'>{savedLastName[0]}</div>}
        </IonRow>
        <IonRow class='ion-padding ion-justify-content-center'>
          {user && (
            <IonText style={{ fontWeight: "bold" }}>
              {savedFirstName + " " + savedLastName}
            </IonText>
          )}
        </IonRow>
        <IonRow class='ion-justify-content-center ion-padding-bottom'>
          <IonButton
            size='small'
            mode='ios'
            fill={isEditing ? "outline" : "solid"}
            onClick={() => {
              setIsEditing(!isEditing);
            }}
          >
            <IonIcon icon={pencil} />
          </IonButton>
        </IonRow>
        <IonItem color='light' lines='none'>
          <IonLabel>
            <IonText style={{ fontWeight: "bold" }}>User Details</IonText>
          </IonLabel>
        </IonItem>
        <IonGrid class='ion-padding'>
          <IonList>
            <IonItem>
              <IonLabel
                color={
                  firstName.length > 0 && firstName.trim().length === 0
                    ? "danger"
                    : "primary"
                }
                position='floating'
              >
                First Name
              </IonLabel>
              <IonInput
                value={firstName}
                color={isEditing ? undefined : "medium"}
                readonly={!isEditing}
                onIonChange={(event: CustomEvent) => {
                  setFirstName(event.detail.value);
                }}
              />
            </IonItem>
            <IonItem>
              <IonLabel
                color={
                  firstName.length > 0 && firstName.trim().length === 0
                    ? "danger"
                    : "primary"
                }
                position='floating'
              >
                Last Name
              </IonLabel>
              <IonInput
                value={lastName}
                readonly={!isEditing}
                color={isEditing ? undefined : "medium"}
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
                readonly={!isEditing}
                color={isEditing ? undefined : "medium"}
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
                readonly={!isEditing}
                max={moment(new Date()).format("YYYY-MM-DD")}
                style={!isEditing ? { color: "#A0A1A8" } : undefined}
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
                disabled={!isEditing || !validateInputs() || !validateChange()}
                onClick={handleUpdate}
              >
                Save User
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
      </IonContent>
    </IonModal>
  );
};

export default UserModal;
