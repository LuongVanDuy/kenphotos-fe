import { AppDispatch } from "../store";
import {
  FETCH_CATEGORIES,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
} from "../actionTypes";
import { fetchWithToken } from "@/app/api/index";
import categoriesEndpoint from "../endpoint/categories";
import { getSession } from "next-auth/react";
import { postWithToken } from "@/app/api/index";

export const fetchCategories = (option: any) => {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_CATEGORIES });
    try {
      const session = await getSession();
      const accessToken = session?.accessToken;
      if (!accessToken) throw new Error("No access token");
      const endpoint = categoriesEndpoint.fetchCategories(option);
      const response = await fetchWithToken(endpoint, accessToken);
      dispatch({
        type: FETCH_CATEGORIES_SUCCESS,
        payload: { data: response.data, total: response.total },
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_CATEGORIES_FAILURE,
        payload: { error: error?.message || "Unknown error" },
      });
    }
  };
};

export const createPostCategory = (data: {
  name: string;
  slug: string;
  description: string;
  parentId: number;
}) => {
  return async () => {
    const { getSession } = await import("next-auth/react");
    const session = await getSession();
    const accessToken = session?.accessToken;
    if (!accessToken) throw new Error("No access token");
    return postWithToken("/v1/tour/categories", accessToken, data);
  };
};
