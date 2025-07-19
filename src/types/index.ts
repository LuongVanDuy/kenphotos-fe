export type ApiResponse = {
  status: number;
  data: any;
};

export type ActionType = {
  type: string;
  payload?: any;
};

export type StateType = {
  loadingList?: boolean;
  loading: boolean;
  loadingPublic?: boolean;
  error: boolean;
  message: string;
  detail: any;
  info?: any;
  list: any[];
  listPublic?: any[];
  total?: number;
  listTop?: any[];
  listStatistics?: any[];
  listDay?: any[];
  loadingTop?: boolean;
  loadingDay?: boolean;
  loadingStatistics?: boolean;
};
