import { AppDispatch } from "../store";
import {
  FETCH_CATEGORIES,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
} from "../actionTypes";
import { fetchWithToken, putWithToken, deleteWithToken } from "@/app/api/index";
import categoriesEndpoint from "../endpoint/categories";
import { postWithToken } from "@/app/api/index";

export const fetchCategories = (option: any) => {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_CATEGORIES });
    try {
      const endpoint = categoriesEndpoint.fetchCategories(option);
      const response = await fetchWithToken(endpoint);
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

export const createCategory = (payload: any) => {
  return async (dispatch: AppDispatch) => {
    try {
      await postWithToken(categoriesEndpoint.createCategory(), payload);
    } catch (error: any) {
      throw new Error(error?.message || "Unknown error");
    }
  };
};

export const fetchCategoryDetail = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await fetchWithToken(
        categoriesEndpoint.fetchCategory(String(id))
      );
      return response;
    } catch (error: any) {
      throw new Error(error?.message || "Unknown error");
    }
  };
};

export const updateCategory = (id: number, payload: any) => {
  return async (dispatch: AppDispatch) => {
    try {
      await putWithToken(
        categoriesEndpoint.updateCategory(String(id)),
        payload
      );
    } catch (error: any) {
      throw new Error(error?.message || "Unknown error");
    }
  };
};

export const deleteCategory = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      await deleteWithToken(categoriesEndpoint.deleteCategory(String(id)));
    } catch (error: any) {
      throw new Error(error?.message || "Unknown error");
    }
  };
};
