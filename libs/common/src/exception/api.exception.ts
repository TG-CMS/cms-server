import { HttpStatus, HttpException } from '@nestjs/common';
import { apiStatus } from '../enum';
import { WsException } from '@nestjs/websockets';

export class ApiException extends HttpException {
  public code: apiStatus = 1;
  public errorMessage: string | null = null;
  _status: HttpStatus = 200;
  constructor(
    errorMessage: string,
    apiCode: apiStatus = 1,
    statusCode: HttpStatus = 200,
  ) {
    super(errorMessage, statusCode);
    this._status = statusCode;
    this.code = apiCode;
    this.errorMessage = errorMessage;
  }
}
export class ApiWsException extends WsException {
  constructor(errorMessage: string, apiCode: apiStatus = 1) {
    super({ status: apiCode, message: errorMessage });
  }
}
