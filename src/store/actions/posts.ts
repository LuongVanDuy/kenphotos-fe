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
  FETCH_PUBLIC_POSTS,
  FETCH_PUBLIC_POSTS_SUCCESS,
  FETCH_PUBLIC_POSTS_FAILURE,
  FETCH_PUBLIC_POST,
  FETCH_PUBLIC_POST_SUCCESS,
  FETCH_PUBLIC_POST_FAILURE,
} from "../actionTypes";
import { fetchWithToken, putWithToken, deleteWithToken, fetchNoToken, patchWithToken } from "@/app/api/index";
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

export const createPost = (payload: any, onSuccess: () => void, onFailure: (error: string) => void) => {
  return (dispatch: AppDispatch) => {
    postWithToken(postsEndpoint.createPost(), payload)
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

export const fetchPost = (id: number) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_POST });
    fetchWithToken(postsEndpoint.fetchPost(id))
      .then((response) => {
        dispatch({
          type: FETCH_POST_SUCCESS,
          payload: { data: response },
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_POST_FAILURE,
          payload: { error: error.message },
        });
      });
  };
};

export const updatePost = (id: number, payload: any, onSuccess?: (response: any) => void, onFailure?: (error: string) => void) => {
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

export const deletePost = (payload: any, onSuccess: () => void, onFailure: (error: string) => void) => {
  return (dispatch: AppDispatch) => {
    patchWithToken(postsEndpoint.deletePost(), payload)
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

export const fetchPublicPost = (id: string) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_PUBLIC_POST });
    fetchNoToken(postsEndpoint.fetchPublicPost(id))
      .then((response) => {
        dispatch({
          type: FETCH_PUBLIC_POST_SUCCESS,
          payload: { data: response },
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_PUBLIC_POST_FAILURE,
          payload: { error: error.message },
        });
      });
  };
};
