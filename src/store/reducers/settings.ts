import { ActionType, StateType } from "@/types";

import {
  FETCH_PUBLIC_SETTING,
  FETCH_PUBLIC_SETTING_FAILURE,
  FETCH_PUBLIC_SETTING_SUCCESS,
  FETCH_SETTING,
  FETCH_SETTING_FAILURE,
  FETCH_SETTING_SUCCESS,
} from "../actionTypes";

const initialState: StateType = {
  loading: true,
  error: false,
  message: "",
  detail: {},
  list: [],
};

const settingsReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case FETCH_SETTING:
      return {
        ...state,
        loading: true,
        error: false,
        message: "",
        id: "",
      };
    case FETCH_SETTING_SUCCESS:
      return {
        ...state,
        loading: false,
        detail: action.payload.data,
        error: false,
      };
    case FETCH_SETTING_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        detail: {},
      };
    case FETCH_PUBLIC_SETTING:
      return {
        ...state,
        loading: true,
        error: false,
        message: "",
        id: "",
      };
    case FETCH_PUBLIC_SETTING_SUCCESS:
      return {
        ...state,
        loading: false,
        detail: action.payload.data,
        error: false,
      };
    case FETCH_PUBLIC_SETTING_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        detail: {},
      };
    default:
      return state;
  }
};

export default settingsReducer;
