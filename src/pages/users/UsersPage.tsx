import {
  IonButtons,
  IonCard,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { User } from "../../interfaces/User";
import { getUsers } from "../../services/userService";
import "./UsersPage.css";

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);
  const [isUserModalVisible, setIsUserModalVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allUsers = await getUsers();
        setUsers(allUsers);
      } catch (error) {
        setIsAlertVisible(true);
      }
    };
    fetchData();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Users</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>Users</IonTitle>
          </IonToolbar>
        </IonHeader>
        {users.length > 0 ? (
          <>
            {users.map((user, index) => {
              return (
                <IonCard>
                  <IonCardTitle>
                    {user.firstName + " " + user.lastName}
                  </IonCardTitle>
                </IonCard>
              );
            })}
          </>
        ) : (
          <></>
        )}
      </IonContent>
    </IonPage>
  );
};

export default UsersPage;
