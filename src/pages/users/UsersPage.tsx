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
  IonSearchbar,
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
  searchText: string;
}

const UsersPage: React.FC = () => {
  // State of the users page.
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
      searchText: "",
    }
  );

  // Fetch all users from server.
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

  // Callback function for child components to update.
  const userCallback = () => {
    fetchData();
  };

  // Callback function to update loading spinner.
  const loadingCallback = (status: boolean) => {
    setState({ isLoading: status });
  };

  // Callback function to update Alert.
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

  // Fetch users upon landing.
  useEffect(() => {
    fetchData();
  }, []);

  // Filtered list of users based on search text entered.
  // The matching is based on the matching of keywords present in first name and last name.
  const filteredUsers =
    state.searchText.length > 0
      ? state.users.filter((x) => {
          return (
            x.firstName
              .toLowerCase()
              .indexOf(state.searchText.toLowerCase()) !== -1 ||
            x.lastName.toLowerCase().indexOf(state.searchText.toLowerCase()) !==
              -1
          );
        })
      : state.users;

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
        <IonSearchbar
          animated={true}
          value={state.searchText}
          onIonChange={(e): void => setState({ searchText: e.detail.value })}
        />

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
        {filteredUsers.length > 0 ? (
          <IonList class='ion-no-padding'>
            {filteredUsers.map((user, index) => {
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
