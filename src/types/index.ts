export type ApiResponse = {
  status: number;
  data: any;
};

export type ActionType = {
  type: string;
  payload?: any;
};

export type StateType = {
  loading: boolean;
  error: boolean;
  message: string;
  detail: any;
  list: any[];
  total?: number;
};
