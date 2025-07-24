import { mediaApi } from "@/services/api";
import { AppDispatch } from "../store";
import { FETCH_MEDIA, FETCH_MEDIA_FAILURE, FETCH_MEDIA_SUCCESS } from "../actionTypes";

export const fetchMedia = (option: any) => {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_MEDIA });

    try {
      const response = await mediaApi.getMedia(option);

      if (response.success) {
        dispatch({
          type: FETCH_MEDIA_SUCCESS,
          payload: { data: response.data },
        });
      } else {
        dispatch({
          type: FETCH_MEDIA_FAILURE,
          payload: { error: response.error },
        });
      }
    } catch (error) {
      dispatch({
        type: FETCH_MEDIA_FAILURE,
        payload: { error: error instanceof Error ? error.message : 'Unknown error' },
      });
    }
  };
};
