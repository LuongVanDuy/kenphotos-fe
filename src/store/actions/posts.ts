import { AppDispatch } from "../store";
import {
  FETCH_POSTS,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  FETCH_POST,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILURE,
  FETCH_PUBLIC_POSTS,
  FETCH_PUBLIC_POSTS_SUCCESS,
  FETCH_PUBLIC_POSTS_FAILURE,
  FETCH_PUBLIC_POST,
  FETCH_PUBLIC_POST_SUCCESS,
  FETCH_PUBLIC_POST_FAILURE,
} from "../actionTypes";
import {
  fetchWithToken,
  putWithToken,
  deleteWithToken,
  fetchNoToken,
  patchWithToken,
} from "@/app/api/index";
import postsEndpoint from "../endpoint/posts";
import { postWithToken } from "@/app/api/index";
import { asyncActionWrapper } from "@/utils/asyncAction";

export const fetchPosts = (payload: any, accessToken: string) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_POSTS });

    fetchWithToken(postsEndpoint.fetchPosts(payload), accessToken)
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

export const fetchPost = (payload: number, accessToken: string) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_POST });

    fetchWithToken(postsEndpoint.fetchPost(payload), accessToken)
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

export const createPost =
  (
    payload: any,
    accessToken: string,
    onSuccess: () => void,
    onFailure: (error: string) => void
  ) =>
  async () => {
    await asyncActionWrapper(
      () => postWithToken(postsEndpoint.createPost(), accessToken, payload),
      onSuccess,
      onFailure
    );
  };

export const updatePost =
  (
    payload: any,
    accessToken: string,
    onSuccess: () => void,
    onFailure: (error: string) => void
  ) =>
  async () => {
    await asyncActionWrapper(
      () =>
        putWithToken(
          postsEndpoint.updatePost(payload.id),
          accessToken,
          payload.data
        ),
      onSuccess,
      onFailure
    );
  };

export const deletePost =
  (
    payload: any,
    accessToken: string,
    onSuccess: () => void,
    onFailure: (error: string) => void
  ) =>
  async () => {
    await asyncActionWrapper(
      () => patchWithToken(postsEndpoint.deletePost(), accessToken, payload),
      onSuccess,
      onFailure
    );
  };

export const restorePost =
  (
    payload: any,
    accessToken: string,
    onSuccess: () => void,
    onFailure: (error: string) => void
  ) =>
  async () => {
    await asyncActionWrapper(
      () => patchWithToken(postsEndpoint.restorePost(), accessToken, payload),
      onSuccess,
      onFailure
    );
  };

export const permanentDeletePost =
  (
    payload: any,
    accessToken: string,
    onSuccess: () => void,
    onFailure: (error: string) => void
  ) =>
  async () => {
    await asyncActionWrapper(
      () =>
        deleteWithToken(
          postsEndpoint.permanentDeletePost(),
          accessToken,
          payload,
          null
        ),
      onSuccess,
      onFailure
    );
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
