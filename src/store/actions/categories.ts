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
import { asyncActionWrapper } from "@/utils/asyncAction";

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

export const fetchCategory = (id: number, accessToken: string) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_CATEGORY });
    fetchWithToken(categoriesEndpoint.fetchCategory(id), accessToken)
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
          accessToken,
          payload
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
          accessToken,
          payload.data
        ),
      onSuccess,
      onFailure
    );
  };

export const updateCategoryDefault =
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
          categoriesEndpoint.updateCategoryDefault(payload.id),
          accessToken,
          payload.data
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
          payload,
          null
        ),
      onSuccess,
      onFailure
    );
  };
