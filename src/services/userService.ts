import axios, { AxiosError, AxiosResponse } from "axios";
import { API } from "../constants/api";
import {
  DELETE_USER_ERROR,
  NEW_USER_ERROR,
  USERS_ERROR,
  UPDATE_USER_ERROR,
} from "../constants/errors";
import { UserDetails, User } from "../interfaces/User";

export const getUsers = async (): Promise<User[]> => {
  return await axios
    .get(API.BASE + API.USERS)
    .then((response: AxiosResponse) => {
      const users = response.data;
      if (response.status === 200) {
        return users as User[];
      }
      throw new Error(USERS_ERROR);
    })
    .catch((error: AxiosError | Error) => {
      throw new Error(USERS_ERROR);
    });
};

export const createUser = async (details: UserDetails): Promise<void> => {
  return await axios
    .post(API.BASE + API.CREATE_USER, details)
    .then((response: AxiosResponse) => {
      if (response.status === 200) {
        return;
      }
      throw new Error(NEW_USER_ERROR);
    })
    .catch((error: AxiosError | Error) => {
      throw new Error(NEW_USER_ERROR);
    });
};

export const updateUser = async (
  details: UserDetails,
  id: string
): Promise<void> => {
  return await axios
    .post(`${API.BASE + API.UPDATE_USER}/${id}`, details)
    .then((response: AxiosResponse) => {
      if (response.status === 200) {
        return;
      }
      throw new Error(UPDATE_USER_ERROR);
    })
    .catch((error: AxiosError | Error) => {
      throw error;
    });
};

export const deleteUser = async (id: number): Promise<void> => {
  return await axios
    .post(`${API.BASE + API.DELETE_USER}/${id}`)
    .then((response: AxiosResponse) => {
      if (response.status === 200) {
        return;
      }
      throw new Error(DELETE_USER_ERROR);
    })
    .catch((error: AxiosError | Error) => {
      throw error;
    });
};
