import {
  IonAlert,
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
  hasConfirm: boolean;
  alertHeader: string;
  alertMessage: string;
  alertHandler: () => void;
  confirmHandler: () => void;
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
      hasConfirm: false,
      alertHeader: "",
      alertMessage: "",
      alertHandler: () => {
        setState({ isAlertVisible: false });
      },
      confirmHandler: () => {
        setState({ isAlertVisible: false });
      },
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
        alertHandler: () => {
          setState({ isAlertVisible: false });
        },
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
    hasConfirm: boolean,
    confirmHandler: () => void
  ) => {
    setState({
      alertHeader: header,
      alertMessage: message,
      hasConfirm: hasConfirm,
      isAlertVisible: true,
      confirmHandler: confirmHandler,
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
          users={state.users}
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
          duration={8000}
          spinner='crescent'
        />
        <IonAlert
          isOpen={state.isAlertVisible}
          header={state.alertHeader}
          message={state.alertMessage}
          backdropDismiss={false}
          buttons={
            state.hasConfirm
              ? [
                  {
                    text: "Cancel",
                    role: "cancel",
                    handler: state.alertHandler,
                  },
                  {
                    text: "Proceed",
                    handler: () => {
                      state.confirmHandler();
                      setState({ isAlertVisible: false });
                    },
                  },
                ]
              : [
                  {
                    text: "OK",
                    handler: () => {
                      state.alertHandler();
                      setState({ isAlertVisible: false });
                    },
                  },
                ]
          }
        />
      </IonContent>
    </IonPage>
  );
};

export default UsersPage;
