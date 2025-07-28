import { fetchWithToken, postWithToken, putWithToken, deleteWithToken } from "@/app/api";
import {
  FETCH_USER,
  FETCH_USER_FAILURE,
  FETCH_USER_SUCCESS,
  FETCH_USERS,
  FETCH_USERS_FAILURE,
  FETCH_USERS_SUCCESS,
  UPDATE_USER,
  UPDATE_USER_FAILURE,
  UPDATE_USER_SUCCESS,
} from "../actionTypes";
import { AppDispatch } from "../store";
import userEndpoint from "../endpoint/users";

export const fetchUsers = (accessToken: any, option: any) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_USERS });
    fetchWithToken(userEndpoint.fetchUsers(option), accessToken)
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

export const createUser = (payload: any, onSuccess: () => void, onFailure: (error: string) => void) => {
  return (dispatch: AppDispatch) => {
    postWithToken(userEndpoint.createUser(), payload)
      .then((response) => {
        if (response) {
          onSuccess();
        }
      })
      .catch((error) => {
        const errorMessage = error && error.message ? error.message : "Unknown error";
        onFailure(errorMessage);
      });
  };
};

export const fetchUser = (id: number) => {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_USER });
    try {
      const response = await fetchWithToken(userEndpoint.fetchUser(String(id)));
      dispatch({
        type: FETCH_USER_SUCCESS,
        payload: { data: response },
      });
      return { payload: { data: response } };
    } catch (error: any) {
      dispatch({
        type: FETCH_USER_FAILURE,
        payload: { error: error?.message || "Unknown error" },
      });
      throw new Error(error?.message || "Unknown error");
    }
  };
};

// export const updateUser = (accessToken: string | any, payload: any, onSuccess: () => void, onFailure: (error: string) => void) => {
//   return (dispatch: AppDispatch) => {
//     putWithToken(users.updateUser(payload.id), accessToken, payload.data)
//       .then((response) => {
//         if (response) {
//           onSuccess();
//         }
//       })
//       .catch((error) => {
//         const errorMessage = error && error.message ? error.message : "Unknown error";
//         onFailure(errorMessage);
//       });
//   };
// };

// export const deleteUser = (accessToken: string | any, payload: any, onSuccess: () => void, onFailure: (error: string) => void) => {
//   return (dispatch: AppDispatch) => {
//     deleteWithToken(users.deleteUser(payload), accessToken)
//       .then((response) => {
//         if (response) {
//           onSuccess();
//         }
//       })
//       .catch((error) => {
//         const errorMessage = error && error.message ? error.message : "Unknown error";
//         onFailure(errorMessage);
//       });
//   };
// };

export const deleteUser = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      await deleteWithToken(userEndpoint.deleteUser(String(id)));
      return { success: true };
    } catch (error: any) {
      throw new Error(error?.message || "Unknown error");
    }
  };
};
