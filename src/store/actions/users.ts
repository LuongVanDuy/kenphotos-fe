import { fetchWithToken } from "@/app/api";
import { FETCH_USERS, FETCH_USERS_FAILURE, FETCH_USERS_SUCCESS } from "../actionTypes";
import { AppDispatch } from "../store";
import users from "../endpoint/users";

export const fetchUsers = (accessToken: any, option: any) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_USERS });
    fetchWithToken(users.fetchUsers(option), accessToken)
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
