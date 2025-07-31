import { fetchWithToken, postWithToken, putWithToken, deleteWithToken, patchWithToken } from "@/app/api";
import { AppDispatch } from "../store";
import settings from "../endpoint/settings";
import { FETCH_SETTING, FETCH_SETTING_FAILURE, FETCH_SETTING_SUCCESS } from "../actionTypes";
import { asyncActionWrapper } from "@/utils/asyncActionWrapper";

export const fetchSetting = (payload: any, accessToken: any) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_SETTING });
    fetchWithToken(settings.fetchSetting(payload), accessToken)
      .then((response) => {
        dispatch({
          type: FETCH_SETTING_SUCCESS,
          payload: { data: response },
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_SETTING_FAILURE,
          payload: { error: error.message },
        });
      });
  };
};

export const upsertSetting = (payload: any, accessToken: string, onSuccess: () => void, onFailure: (error: string) => void) => async () => {
  await asyncActionWrapper(() => putWithToken(settings.upsertSetting(payload.namespace), accessToken, payload.data), onSuccess, onFailure);
};
