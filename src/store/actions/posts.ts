import { AppDispatch } from "../store";
import {
  FETCH_POSTS,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  FETCH_POST,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILURE,
  CREATE_POST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  UPDATE_POST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
  DELETE_POST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  FETCH_PUBLIC_POSTS,
  FETCH_PUBLIC_POSTS_SUCCESS,
  FETCH_PUBLIC_POSTS_FAILURE,
} from "../actionTypes";
import { fetchWithToken, putWithToken, deleteWithToken, fetchNoToken } from "@/app/api/index";
import postsEndpoint from "../endpoint/posts";
import { postWithToken } from "@/app/api/index";

export const fetchPosts = (option: any) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_POSTS });
    fetchWithToken(postsEndpoint.fetchPosts(option))
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

export const fetchPost = (id: number) => {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_POST });
    try {
      const response = await fetchWithToken(postsEndpoint.fetchPost(String(id)));
      dispatch({
        type: FETCH_POST_SUCCESS,
        payload: { data: response },
      });
      return { payload: { data: response } };
    } catch (error: any) {
      dispatch({
        type: FETCH_POST_FAILURE,
        payload: { error: error?.message || "Unknown error" },
      });
      throw new Error(error?.message || "Unknown error");
    }
  };
};

export const createPost = (
  payload: any,
  onSuccess?: (response: any) => void,
  onFailure?: (error: string) => void
) => {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: CREATE_POST });
    try {
      const response = await postWithToken(postsEndpoint.createPost(), payload);
      dispatch({
        type: CREATE_POST_SUCCESS,
        payload: { data: response },
      });
      if (onSuccess) onSuccess(response);
      return response;
    } catch (error: any) {
      const errorMessage = error?.message || "Unknown error";
      dispatch({
        type: CREATE_POST_FAILURE,
        payload: { error: errorMessage },
      });
      if (onFailure) onFailure(errorMessage);
      throw new Error(errorMessage);
    }
  };
};

export const updatePost = (
  id: number,
  payload: any,
  onSuccess?: (response: any) => void,
  onFailure?: (error: string) => void
) => {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: UPDATE_POST });
    try {
      const response = await putWithToken(postsEndpoint.updatePost(String(id)), payload);
      dispatch({
        type: UPDATE_POST_SUCCESS,
        payload: { data: response },
      });
      if (onSuccess) onSuccess(response);
      return response;
    } catch (error: any) {
      const errorMessage = error?.message || "Unknown error";
      dispatch({
        type: UPDATE_POST_FAILURE,
        payload: { error: errorMessage },
      });
      if (onFailure) onFailure(errorMessage);
      throw new Error(errorMessage);
    }
  };
};

export const deletePost = (id: number) => {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: DELETE_POST });
    try {
      await deleteWithToken(postsEndpoint.deletePost(String(id)));
      dispatch({
        type: DELETE_POST_SUCCESS,
        payload: { id },
      });
    } catch (error: any) {
      dispatch({
        type: DELETE_POST_FAILURE,
        payload: { error: error?.message || "Unknown error" },
      });
      throw new Error(error?.message || "Unknown error");
    }
  };
};

//
export const fetchPublicPosts = (option: any) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_PUBLIC_POSTS });
    fetchNoToken(postsEndpoint.fetchPublicPosts(option))
      .then((response) => {
        dispatch({
          type: FETCH_PUBLIC_POSTS_SUCCESS,
          payload: { data: response },
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_PUBLIC_POSTS_FAILURE,
          payload: { error: error.message },
        });
      });
  };
};
