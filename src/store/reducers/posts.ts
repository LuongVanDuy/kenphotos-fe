import { ActionType, StateType } from "@/types";
import { FETCH_MEDIA, FETCH_MEDIA_FAILURE, FETCH_MEDIA_SUCCESS } from "../actionTypes";

const initialState: StateType = {
  loading: true,
  error: false,
  message: "",
  detail: {},
  list: [],
};

const postReducer = (state = initialState, action: ActionType) => {
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
    default:
      return state;
  }
};

export default postReducer;
