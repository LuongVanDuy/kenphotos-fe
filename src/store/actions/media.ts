import {
  fetchWithToken,
  postWithToken,
  deleteWithToken,
  putWithToken,
} from "@/app/api";
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

export const uploadMedia = (accessToken: any, formData: FormData) => {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: UPLOAD_MEDIA });

    try {
      const response = await fetch(
        `${process.env.apiUrl}/${media.uploadMedia()}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage =
          errorData?.message || `HTTP error! status: ${response.status}`;
        throw new Error(errorMessage);
      }

      const data = await response.json();

      dispatch({
        type: UPLOAD_MEDIA_SUCCESS,
        payload: { data },
      });

      return data;
    } catch (error: any) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      dispatch({
        type: UPLOAD_MEDIA_FAILURE,
        payload: { error: errorMessage },
      });
      throw error;
    }
  };
};

