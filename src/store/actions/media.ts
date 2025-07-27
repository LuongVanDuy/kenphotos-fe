import { fetchWithToken, postWithTokenFormData } from "@/app/api";
import {
  FETCH_MEDIA,
  FETCH_MEDIA_SUCCESS,
  FETCH_MEDIA_FAILURE,
  UPLOAD_MEDIA,
  UPLOAD_MEDIA_SUCCESS,
  UPLOAD_MEDIA_FAILURE,
} from "../actionTypes";
import { AppDispatch } from "../store";
import media from "../endpoint/media";

export const fetchMedia = (accessToken: any, option: any) => {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_MEDIA });
    try {
      const response = await fetchWithToken(
        media.fetchMedia(option),
        accessToken
      );
      dispatch({
        type: FETCH_MEDIA_SUCCESS,
        payload: { data: response },
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_MEDIA_FAILURE,
        payload: { error: error.message },
      });
    }
  };
};

export const uploadMedia = (
  accessToken: any,
  formData: FormData,
  onSuccess: (response: any) => void,
  onFailure: (error: string) => void
) => {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: UPLOAD_MEDIA });

    try {
      const response = await postWithTokenFormData(
        media.uploadMedia(),
        formData,
        null
      );

      if (response) {
        dispatch({
          type: UPLOAD_MEDIA_SUCCESS,
          payload: { data: response },
        });
        onSuccess(response);
      }
    } catch (error: any) {
      const errorMessage = error.message || "Upload failed";
      dispatch({
        type: UPLOAD_MEDIA_FAILURE,
        payload: { error: errorMessage },
      });
      onFailure(errorMessage);
    }
  };
};
