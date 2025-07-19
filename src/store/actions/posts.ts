import { fetchWithToken } from "@/app/api";
import { AppDispatch } from "../store";
import { FETCH_POSTS, FETCH_POSTS_FAILURE, FETCH_POSTS_SUCCESS } from "../actionTypes";
import posts from "../endpoint/posts";

export const fetchPosts = (accessToken: any, option: any) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_POSTS });
    fetchWithToken(posts.fetchPosts(option), accessToken)
      .then((response) => {
        dispatch({
          type: FETCH_POSTS_SUCCESS,
          payload: { data: response },
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_POSTS_FAILURE,
          payload: { error: error.message },
        });
      });
  };
};
