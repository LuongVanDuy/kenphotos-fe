import { AppDispatch } from "../store";
import { FETCH_POSTS, FETCH_POSTS_FAILURE, FETCH_POSTS_SUCCESS } from "../actionTypes";
import { fetchWithToken } from "@/app/api/index";
import postsEndpoint from "../endpoint/posts";
import { getSession } from "next-auth/react";
import { postWithToken } from "@/app/api/index";
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

export const createPostCategory = (data: { name: string; slug: string; description: string; parentId: number }) => {
  return async () => {
    const session = await getSession();
    const accessToken = session?.accessToken;
    if (!accessToken) throw new Error("No access token");
    return postWithToken("/v1/tour/categories", accessToken, data);
  };
};
