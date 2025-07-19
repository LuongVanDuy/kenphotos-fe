import { fetchWithToken } from "@/app/api";
import { AppDispatch } from "../store";
import { FETCH_MEDIA, FETCH_MEDIA_FAILURE, FETCH_MEDIA_SUCCESS } from "../actionTypes";
import media from "../endpoint/media";

export const fetchMedia = (accessToken: any, option: any) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_MEDIA });
    fetchWithToken(media.fetchMedia(option), accessToken)
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
