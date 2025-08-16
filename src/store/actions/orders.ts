import { AppDispatch } from "../store";
import {
  FETCH_ORDERS,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,
  FETCH_ORDER,
  FETCH_ORDER_SUCCESS,
  FETCH_ORDER_FAILURE,
} from "../actionTypes";
import {
  fetchWithToken,
  putWithToken,
  deleteWithToken,
  fetchNoToken,
  patchWithToken,
} from "@/app/api/index";
import orderEndpoint from "../endpoint/orders";
import { postWithToken } from "@/app/api/index";
import { asyncActionWrapper } from "@/utils/asyncAction";

// Admin actions
export const fetchOrders = (payload: any, accessToken: string) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_ORDERS });

    fetchWithToken(orderEndpoint.fetchOrders(payload), accessToken)
      .then((response) => {
        dispatch({
          type: FETCH_ORDERS_SUCCESS,
          payload: { data: response },
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_ORDERS_FAILURE,
          payload: { error: error.message },
        });
      });
  };
};

export const fetchOrder = (payload: number, accessToken: string) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_ORDER });

    fetchWithToken(orderEndpoint.fetchOrder(payload), accessToken)
      .then((response) => {
        dispatch({
          type: FETCH_ORDER_SUCCESS,
          payload: { data: response },
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_ORDER_FAILURE,
          payload: { error: error.message },
        });
      });
  };
};

export const createOrder =
  (
    payload: any,
    accessToken: string,
    onSuccess: () => void,
    onFailure: (error: string) => void
  ) =>
  async () => {
    await asyncActionWrapper(
      () => postWithToken(orderEndpoint.createOrder(), accessToken, payload),
      onSuccess,
      onFailure
    );
  };

export const updateOrder =
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
          orderEndpoint.updateOrder(payload.id),
          accessToken,
          payload.data
        ),
      onSuccess,
      onFailure
    );
  };

export const deleteOrder =
  (
    payload: any,
    accessToken: string,
    onSuccess: () => void,
    onFailure: (error: string) => void
  ) =>
  async () => {
    await asyncActionWrapper(
      () => patchWithToken(orderEndpoint.deleteOrder(), accessToken, payload),
      onSuccess,
      onFailure
    );
  };

export const restoreOrder =
  (
    payload: any,
    accessToken: string,
    onSuccess: () => void,
    onFailure: (error: string) => void
  ) =>
  async () => {
    await asyncActionWrapper(
      () => patchWithToken(orderEndpoint.restoreOrder(), accessToken, payload),
      onSuccess,
      onFailure
    );
  };

export const permanentDeleteOrder =
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
          orderEndpoint.permanentDeleteOrder(),
          accessToken,
          payload,
          null
        ),
      onSuccess,
      onFailure
    );
  };
