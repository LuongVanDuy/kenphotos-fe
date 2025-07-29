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

interface ServiceState {
  list: any[];
  total: number;
  detail: any;
  loading: boolean;
  error: boolean;
  message: string;
  // Public state
  listPublic: any[];
  totalPublic: number;
  detailPublic: any;
}

const initialState: ServiceState = {
  list: [],
  total: 0,
  detail: null,
  loading: false,
  error: false,
  message: "",
  listPublic: [],
  totalPublic: 0,
  detailPublic: null,
};

const servicesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    // Admin actions
    case FETCH_SERVICES:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_SERVICES_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload.data.data || [],
        total: action.payload.data.total || 0,
      };
    case FETCH_SERVICES_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload.error,
      };

    case FETCH_SERVICE:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_SERVICE_SUCCESS:
      return {
        ...state,
        loading: false,
        detail: action.payload.data,
      };
    case FETCH_SERVICE_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload.error,
      };

    // Public actions
    case FETCH_PUBLIC_SERVICES:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_PUBLIC_SERVICES_SUCCESS:
      return {
        ...state,
        loading: false,
        listPublic: action.payload.data.data || [],
        totalPublic: action.payload.data.total || 0,
      };
    case FETCH_PUBLIC_SERVICES_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload.error,
      };

    case FETCH_PUBLIC_SERVICE:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_PUBLIC_SERVICE_SUCCESS:
      return {
        ...state,
        loading: false,
        detailPublic: action.payload.data,
      };
    case FETCH_PUBLIC_SERVICE_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload.error,
      };

    default:
      return state;
  }
};

export default servicesReducer;
