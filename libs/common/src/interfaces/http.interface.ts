import { apiStatus } from '../enum';

export interface HttpResponse<T> {
  code: apiStatus;
  message: string;
  data?: T;
}
