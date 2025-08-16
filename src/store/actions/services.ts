import { AppDispatch } from "../store";
import {
  FETCH_SERVICES,
  FETCH_SERVICES_SUCCESS,
  FETCH_SERVICES_FAILURE,
  FETCH_SERVICE,
  FETCH_SERVICE_SUCCESS,
  FETCH_SERVICE_FAILURE,
  FETCH_PUBLIC_SERVICES,
  FETCH_PUBLIC_SERVICES_SUCCESS,
  FETCH_PUBLIC_SERVICES_FAILURE,
  FETCH_PUBLIC_SERVICE,
  FETCH_PUBLIC_SERVICE_SUCCESS,
  FETCH_PUBLIC_SERVICE_FAILURE,
} from "../actionTypes";
import {
  fetchWithToken,
  putWithToken,
  deleteWithToken,
  fetchNoToken,
  patchWithToken,
} from "@/app/api/index";
import servicesEndpoint from "../endpoint/services";
import { postWithToken } from "@/app/api/index";
import { asyncActionWrapper } from "@/utils/asyncAction";

// Admin actions
export const fetchServices = (payload: any, accessToken: string) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_SERVICES });

    fetchWithToken(servicesEndpoint.fetchServices(payload), accessToken)
      .then((response) => {
        dispatch({
          type: FETCH_SERVICES_SUCCESS,
          payload: { data: response },
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_SERVICES_FAILURE,
          payload: { error: error.message },
        });
      });
  };
};

export const fetchService = (payload: number, accessToken: string) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_SERVICE });

    fetchWithToken(servicesEndpoint.fetchService(payload), accessToken)
      .then((response) => {
        dispatch({
          type: FETCH_SERVICE_SUCCESS,
          payload: { data: response },
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_SERVICE_FAILURE,
          payload: { error: error.message },
        });
      });
  };
};

export const createService =
  (
    payload: any,
    accessToken: string,
    onSuccess: () => void,
    onFailure: (error: string) => void
  ) =>
  async () => {
    await asyncActionWrapper(
      () =>
        postWithToken(servicesEndpoint.createService(), accessToken, payload),
      onSuccess,
      onFailure
    );
  };

export const updateService =
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
          servicesEndpoint.updateService(payload.id),
          accessToken,
          payload.data
        ),
      onSuccess,
      onFailure
    );
  };

export const deleteService =
  (
    payload: any,
    accessToken: string,
    onSuccess: () => void,
    onFailure: (error: string) => void
  ) =>
  async () => {
    await asyncActionWrapper(
      () =>
        patchWithToken(servicesEndpoint.deleteService(), accessToken, payload),
      onSuccess,
      onFailure
    );
  };

export const restoreService =
  (
    payload: any,
    accessToken: string,
    onSuccess: () => void,
    onFailure: (error: string) => void
  ) =>
  async () => {
    await asyncActionWrapper(
      () =>
        patchWithToken(servicesEndpoint.restoreService(), accessToken, payload),
      onSuccess,
      onFailure
    );
  };

export const permanentDeleteService =
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
          servicesEndpoint.permanentDeleteService(),
          accessToken,
          payload,
          null
        ),
      onSuccess,
      onFailure
    );
  };

// Public actions
export const fetchPublicServices = (option: any, key: string) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_PUBLIC_SERVICES, meta: { key } });

    fetchNoToken(servicesEndpoint.fetchPublicServices(option))
      .then((response) => {
        dispatch({
          type: FETCH_PUBLIC_SERVICES_SUCCESS,
          payload: { data: response },
          meta: { key },
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_PUBLIC_SERVICES_FAILURE,
          payload: { error: error.message },
          meta: { key },
        });
      });
  };
};

export const fetchPublicService = (id: string) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_PUBLIC_SERVICE });
    fetchNoToken(servicesEndpoint.fetchPublicService(id))
      .then((response) => {
        dispatch({
          type: FETCH_PUBLIC_SERVICE_SUCCESS,
          payload: { data: response },
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_PUBLIC_SERVICE_FAILURE,
          payload: { error: error.message },
        });
      });
  };
};
