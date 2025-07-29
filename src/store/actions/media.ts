import {
  fetchWithToken,
  postWithTokenFormData,
  deleteWithToken,
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
import { asyncActionWrapper } from "@/utils/asyncActionWrapper";

export const fetchMedia = (payload: any, accessToken: string) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_MEDIA });

    fetchWithToken(media.fetchMedia(payload), accessToken)
      .then((response) => {
        dispatch({
          type: FETCH_MEDIA_SUCCESS,
          payload: { data: response },
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_MEDIA_FAILURE,
          payload: { error: error.message },
        });
      });
  };
};

export const uploadMedia = (
  formData: FormData,
  accessToken: string,
  onSuccess: (response: any) => void,
  onFailure: (error: string) => void
) => {
  return async () => {
    await asyncActionWrapper(
      () => postWithTokenFormData(media.uploadMedia(), formData, accessToken),
      onSuccess,
      onFailure
    );
  };
};

export const deleteMedia =
  (
    payload: string[],
    accessToken: string,
    onSuccess: () => void,
    onFailure: (error: string) => void
  ) =>
  async () => {
    await asyncActionWrapper(
      () => deleteWithToken(media.deleteMedia(), accessToken, payload, null),
      onSuccess,
      onFailure
    );
  };
