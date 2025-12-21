/**
 * costTime:ms
 */
export interface Log {
  id: number;
  operateNickname: string;
  operateTime: string;
  className: string;
  methodName: string;
  methodParams: string;
  returnValue: string;
  costTime: number;
}
export interface PageQueryDTO {
  page: number;
  pageSize: number;
  operateNickname?: string;
  type: number;
  startTime?: string;
  endTime?: string;
}
export interface PageQueryVO {
  total: number;
  rows: Log[];
}
