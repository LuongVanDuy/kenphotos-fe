import { postApi } from "@/services/api";
import { AppDispatch } from "../store";
import { FETCH_POSTS, FETCH_POSTS_FAILURE, FETCH_POSTS_SUCCESS } from "../actionTypes";

export const fetchPosts = (option: any) => {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_POSTS });

    try {
      const response = await postApi.getPosts(option);

      if (response.success) {
        dispatch({
          type: FETCH_POSTS_SUCCESS,
          payload: { data: response.data },
        });
      } else {
        dispatch({
          type: FETCH_POSTS_FAILURE,
          payload: { error: response.error },
        });
      }
    } catch (error) {
      dispatch({
        type: FETCH_POSTS_FAILURE,
        payload: { error: error instanceof Error ? error.message : 'Unknown error' },
      });
    }
  };
};
