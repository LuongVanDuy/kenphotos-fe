import { AppDispatch } from "../store";
import {
  FETCH_CATEGORIES,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  FETCH_CATEGORY,
  FETCH_CATEGORY_SUCCESS,
  FETCH_CATEGORY_FAILURE,
} from "../actionTypes";
import {
  fetchWithToken,
  putWithToken,
  deleteWithToken,
  patchWithToken,
} from "@/app/api/index";
import categoriesEndpoint from "../endpoint/categories";
import { postWithToken } from "@/app/api/index";
import { asyncActionWrapper } from "@/utils/asyncActionWrapper";

export const fetchCategories = (payload: any, accessToken: string) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_CATEGORIES });
    fetchWithToken(categoriesEndpoint.fetchCategories(payload), accessToken)
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

export const fetchCategory = (payload: number, accessToken: string) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_CATEGORY });
    fetchWithToken(categoriesEndpoint.fetchCategory(payload), accessToken)
      .then((response) => {
        dispatch({
          type: FETCH_CATEGORY_SUCCESS,
          payload: { data: response },
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_CATEGORY_FAILURE,
          payload: { error: error.message },
        });
      });
  };
};

export const createCategory =
  (
    payload: any,
    accessToken: string,
    onSuccess: () => void,
    onFailure: (error: string) => void
  ) =>
  async () => {
    await asyncActionWrapper(
      () =>
        postWithToken(
          categoriesEndpoint.createCategory(),
          payload,
          accessToken
        ),
      onSuccess,
      onFailure
    );
  };

export const updateCategory =
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
          categoriesEndpoint.updateCategory(payload.id),
          payload.data,
          accessToken
        ),
      onSuccess,
      onFailure
    );
  };

export const deleteCategory =
  (
    payload: any,
    accessToken: string,
    onSuccess: () => void,
    onFailure: (error: string) => void
  ) =>
  async () => {
    await asyncActionWrapper(
      () =>
        patchWithToken(
          categoriesEndpoint.deleteCategory(),
          accessToken,
          payload
        ),
      onSuccess,
      onFailure
    );
  };

export const restoreCategory =
  (
    payload: any,
    accessToken: string,
    onSuccess: () => void,
    onFailure: (error: string) => void
  ) =>
  async () => {
    await asyncActionWrapper(
      () =>
        patchWithToken(
          categoriesEndpoint.restoreCategory(),
          accessToken,
          payload
        ),
      onSuccess,
      onFailure
    );
  };

export const permanentDeleteCategory =
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
          categoriesEndpoint.permanentDeleteCategory(),
          accessToken,
          payload
        ),
      onSuccess,
      onFailure
    );
  };
