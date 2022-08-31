import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpResponse, ApiException, apiStatus } from '@app/common';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<HttpResponse<T>> {
    const call$ = next.handle();
    return call$.pipe(
      map((data) => this.toBaseResponse(data)),
      catchError((err) => throwError(new ApiException(err))),
    );
  }

  toBaseResponse(data: any) {
    return {
      code: apiStatus.Success,
      message: '请求成功',
      data,
    };
  }
}
