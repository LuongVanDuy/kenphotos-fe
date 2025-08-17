import {
  FETCH_ORDERS,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,
  FETCH_ORDER,
  FETCH_ORDER_SUCCESS,
  FETCH_ORDER_FAILURE,
} from '../actionTypes'

interface ServiceState {
  list: any[]
  total: number
  detail: any
  loading: boolean
  error: boolean
  message: string
}

const initialState: ServiceState = {
  list: [],
  total: 0,
  detail: null,
  loading: true,
  error: false,
  message: '',
}

const ordersReducer = (state = initialState, action: any) => {
  switch (action.type) {
    // Admin actions
    case FETCH_ORDERS:
      return {
        ...state,
        loading: true,
        error: false,
      }
    case FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload.data.data || [],
        total: action.payload.data.total || 0,
      }
    case FETCH_ORDERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload.error,
      }

    case FETCH_ORDER:
      return {
        ...state,
        loading: true,
        error: false,
      }
    case FETCH_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        detail: action.payload.data,
      }
    case FETCH_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload.error,
      }

    default:
      return state
  }
}

export default ordersReducer
