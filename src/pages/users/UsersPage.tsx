import {
  IonAlert,
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonMenuButton,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useReducer } from "react";
import moment from "moment";
import { User } from "../../interfaces/User";
import { getUsers } from "../../services/userService";
import "./UsersPage.css";
import { addOutline } from "ionicons/icons";
import Container from "../../components/Container";
import UserModal from "../../components/UserModal";
import UserForm from "../../components/UserForm";

interface UsersPageState {
  users: User[];
  currentUser: User | null;
  isAlertVisible: boolean;
  alertHeader: string;
  alertMessage: string;
  alertHandler: () => void;
  isUserModalVisible: boolean;
  isUserFormVisible: boolean;
  isLoading: boolean;
}

const UsersPage: React.FC = () => {
  const [state, setState] = useReducer(
    (s: UsersPageState, a: Partial<UsersPageState>) => ({
      ...s,
      ...a,
    }),
    {
      users: [],
      currentUser: null,
      isAlertVisible: false,
      alertHeader: "",
      alertMessage: "",
      alertHandler: () => {},
      isUserModalVisible: false,
      isUserFormVisible: false,
      isLoading: true,
    }
  );

  const fetchData = async () => {
    try {
      const allUsers = await getUsers();
      await setState({ users: allUsers });
      setState({ isLoading: false });
    } catch (error) {
      setState({
        alertHeader: "Error",
        alertMessage: "There was a problem fetching the users.",
        isAlertVisible: true,
        alertHandler: () => {},
      });
    }
  };

  const userCallback = () => {
    fetchData();
  };

  const loadingCallback = (status: boolean) => {
    setState({ isLoading: status });
  };

  const alertCallback = (
    header: string,
    message: string,
    handler: () => void
  ) => {
    setState({
      alertHeader: header,
      alertMessage: message,
      alertHandler: handler,
      isAlertVisible: true,
    });
  };

  useEffect(() => {
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
        {state.currentUser && (
          <UserModal
            key={state.currentUser.id}
            user={state.currentUser!}
            isUserModalVisible={state.isUserModalVisible}
            setIsUserModalVisible={(status: boolean) => {
              setState({ isUserModalVisible: status });
            }}
            userCallback={userCallback}
            loadingCallback={loadingCallback}
            alertCallback={alertCallback}
          />
        )}
        <UserForm
          isUserFormVisible={state.isUserFormVisible}
          setIsUserFormVisible={(status: boolean) => {
            setState({ isUserFormVisible: status });
          }}
          userCallback={userCallback}
          loadingCallback={loadingCallback}
          alertCallback={alertCallback}
        />
        {state.users.length > 0 ? (
          <IonList>
            {state.users.map((user, index) => {
              return (
                <IonItem
                  key={index}
                  button
                  color={index % 2 === 0 ? "light" : undefined}
                  onClick={() => {
                    setState({ currentUser: user, isUserModalVisible: true });
                  }}
                >
                  <IonLabel>
                    <h2 style={{ fontWeight: "bold" }}>
                      {user.firstName + " " + user.lastName}
                    </h2>
                    <h3>{"Email: " + user.email}</h3>
                    <h3>
                      {"Date of Birth: " +
                        moment(user.dob!).format("DD MMM YYYY")}
                    </h3>
                  </IonLabel>
                </IonItem>
              );
            })}
          </IonList>
        ) : (
          <Container>
            <IonText>No users found</IonText>
          </Container>
        )}
        <IonFab vertical='bottom' horizontal='end' slot='fixed'>
          <IonFabButton
            color='secondary'
            onClick={() => setState({ isUserFormVisible: true })}
          >
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>
        <IonLoading
          isOpen={state.isLoading}
          onDidDismiss={() => {
            setState({ isLoading: false });
          }}
          message={"Loading..."}
          duration={5000}
          spinner='crescent'
        />
        <IonAlert
          isOpen={state.isAlertVisible}
          header={state.alertHeader}
          message={state.alertMessage}
          backdropDismiss={false}
          buttons={[
            {
              text: "OK",
              handler: state.alertHandler,
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default UsersPage;
