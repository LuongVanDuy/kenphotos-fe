import { AppDispatch } from "../store";
import { FETCH_CATEGORIES, FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAILURE } from "../actionTypes";
import { fetchWithToken, putWithToken, deleteWithToken } from "@/app/api/index";
import categoriesEndpoint from "../endpoint/categories";
import { postWithToken } from "@/app/api/index";

export const fetchCategories = (option: any) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_CATEGORIES });
    fetchWithToken(categoriesEndpoint.fetchCategories(option))
      .then((response) => {
        dispatch({
          type: FETCH_CATEGORIES_SUCCESS,
          payload: { data: response },
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_CATEGORIES_FAILURE,
          payload: { error: error.message },
        });
      });
  };
};

export const createCategory = (payload: any, onSuccess?: (response: any) => void, onFailure?: (error: string) => void) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await postWithToken(categoriesEndpoint.createCategory(), payload);
      if (onSuccess) onSuccess(response);
      return response;
    } catch (error: any) {
      const errorMessage = error?.message || "Unknown error";
      if (onFailure) onFailure(errorMessage);
      throw new Error(errorMessage);
    }
  };
};

export const fetchCategoryDetail = (id: number, onSuccess?: (response: any) => void, onFailure?: (error: string) => void) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await fetchWithToken(categoriesEndpoint.fetchCategory(String(id)));
      if (onSuccess) onSuccess(response);
      return response;
    } catch (error: any) {
      const errorMessage = error?.message || "Unknown error";
      if (onFailure) onFailure(errorMessage);
      throw new Error(errorMessage);
    }
  };
};

export const updateCategory = (id: number, payload: any, onSuccess?: (response: any) => void, onFailure?: (error: string) => void) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await putWithToken(categoriesEndpoint.updateCategory(String(id)), payload);
      if (onSuccess) onSuccess(response);
      return response;
    } catch (error: any) {
      const errorMessage = error?.message || "Unknown error";
      if (onFailure) onFailure(errorMessage);
      throw new Error(errorMessage);
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
