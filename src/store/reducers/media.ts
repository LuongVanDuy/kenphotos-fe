import { ActionType, StateType } from "@/types";
import {
  FETCH_MEDIA,
  FETCH_MEDIA_SUCCESS,
  FETCH_MEDIA_FAILURE,
  UPLOAD_MEDIA,
  UPLOAD_MEDIA_SUCCESS,
  UPLOAD_MEDIA_FAILURE,
} from "../actionTypes";

const initialState: StateType = {
  loading: true,
  error: false,
  message: "",
  detail: {},
  list: [],
  uploadLoading: false,
  uploadError: false,
  uploadMessage: "",
};

const mediaReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case FETCH_MEDIA:
      return {
        ...state,
        loading: true,
      };
    case FETCH_MEDIA_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload.data.data,
        total: action.payload.data.total,
        error: false,
      };
    case FETCH_MEDIA_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        list: [],
      };
    case UPLOAD_MEDIA:
      return {
        ...state,
        uploadLoading: true,
        uploadError: false,
        uploadMessage: "",
      };
    case UPLOAD_MEDIA_SUCCESS:
      return {
        ...state,
        uploadLoading: false,
        uploadError: false,
        uploadMessage: "Upload successful",
        // Add uploaded file to list if needed
        list: action.payload.data
          ? [action.payload.data, ...state.list]
          : state.list,
      };
    case UPLOAD_MEDIA_FAILURE:
      return {
        ...state,
        uploadLoading: false,
        uploadError: true,
        uploadMessage: action.payload.error || "Upload failed",
      };
    default:
      return state;
  }
};

export default mediaReducer;
