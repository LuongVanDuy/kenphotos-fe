import { fetchWithToken, postWithToken, putWithToken, deleteWithToken } from "@/app/api";
import { AppDispatch } from "../store";
import settings from "../endpoint/settings";
import { FETCH_SETTING, FETCH_SETTING_FAILURE, FETCH_SETTING_SUCCESS } from "../actionTypes";

export const fetchSetting = (namespace: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_SETTING });
    try {
      const response = await fetchWithToken(settings.fetchSetting(namespace));
      dispatch({
        type: FETCH_SETTING_SUCCESS,
        payload: { data: response },
      });
      return { payload: { data: response } };
    } catch (error: any) {
      dispatch({
        type: FETCH_SETTING_FAILURE,
        payload: { error: error?.message || "Unknown error" },
      });
      throw new Error(error?.message || "Unknown error");
    }
  };
};

export const upsertSetting = (payload: any, onSuccess: () => void, onFailure: (error: string) => void) => {
  return (dispatch: AppDispatch) => {
    putWithToken(settings.upsertSetting(payload.namespace), payload.data)
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
