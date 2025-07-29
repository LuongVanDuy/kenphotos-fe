import { fetchWithToken, postWithToken, putWithToken, deleteWithToken } from "@/app/api";
import { FETCH_USER, FETCH_USER_FAILURE, FETCH_USER_SUCCESS, FETCH_USERS, FETCH_USERS_FAILURE, FETCH_USERS_SUCCESS } from "../actionTypes";
import { AppDispatch } from "../store";
import users from "../endpoint/users";
import { asyncActionWrapper } from "@/utils/asyncActionWrapper";

export const fetchUsers = (payload: any, accessToken: any) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_USERS });
    fetchWithToken(users.fetchUsers(payload), accessToken)
      .then((response) => {
        dispatch({
          type: FETCH_USERS_SUCCESS,
          payload: { data: response },
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_USERS_FAILURE,
          payload: { error: error.message },
        });
      });
  };
};

export const fetchUser = (payload: number, accessToken: any) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_USER });
    fetchWithToken(users.fetchUser(payload), accessToken)
      .then((response) => {
        dispatch({
          type: FETCH_USER_SUCCESS,
          payload: { data: response },
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_USER_FAILURE,
          payload: { error: error.message },
        });
      });
  };
};

export const createUser = (payload: any, accessToken: string, onSuccess: () => void, onFailure: (error: string) => void) => async () => {
  await asyncActionWrapper(() => postWithToken(users.createUser(), accessToken, payload), onSuccess, onFailure);
};

export const updateUser = (payload: any, accessToken: string, onSuccess: () => void, onFailure: (error: string) => void) => async () => {
  await asyncActionWrapper(() => putWithToken(users.updateUser(payload.id), accessToken, payload.data), onSuccess, onFailure);
};

export const deleteUser = (id: number, accessToken: string, onSuccess: () => void, onFailure: (error: string) => void) => async () => {
  await asyncActionWrapper(() => deleteWithToken(users.deleteUser(id), accessToken), onSuccess, onFailure);
};
