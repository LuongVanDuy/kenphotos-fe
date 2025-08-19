import {
  fetchWithToken,
  postWithToken,
  putWithToken,
  deleteWithToken,
  patchWithToken,
  fetchNoToken,
} from "@/app/api";
import { AppDispatch } from "../store";
import settings from "../endpoint/settings";
import {
  FETCH_PUBLIC_SETTING,
  FETCH_PUBLIC_SETTING_FAILURE,
  FETCH_PUBLIC_SETTING_SUCCESS,
  FETCH_SETTING,
  FETCH_SETTING_FAILURE,
  FETCH_SETTING_SUCCESS,
} from "../actionTypes";
import { asyncActionWrapper } from "@/utils/asyncAction";

export const fetchSetting = (payload: any, accessToken: any) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_SETTING });
    return fetchWithToken(settings.fetchSetting(payload), accessToken)
      .then((response) => {
        const action = {
          type: FETCH_SETTING_SUCCESS,
          payload: { data: response },
        };
        dispatch(action);
        return action; // Return the action so component can access the data
      })
      .catch((error) => {
        const action = {
          type: FETCH_SETTING_FAILURE,
          payload: { error: error.message },
        };
        dispatch(action);
        throw error; // Re-throw so component can handle error
      });
  };
};

export const upsertSetting =
  (
    payload: any,
    accessToken: string,
    onSuccess: () => void,
    onFailure: (error: string) => void
  ) =>
  async () => {
    await asyncActionWrapper(
      () =>
        putWithToken(
          settings.upsertSetting(payload.namespace),
          accessToken,
          payload.data
        ),
      onSuccess,
      onFailure
    );
  };

export const fetchPublicSetting = (payload: any) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_PUBLIC_SETTING });

    fetchNoToken(settings.fetchPublicSetting(payload))
      .then((response) => {
        dispatch({
          type: FETCH_PUBLIC_SETTING_SUCCESS,
          payload: { data: response },
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_PUBLIC_SETTING_FAILURE,
          payload: { error: error.message },
        });
      });
  };
};
