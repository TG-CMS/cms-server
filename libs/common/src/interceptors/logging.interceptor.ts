import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FastifyRequest } from 'fastify';
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private log = new Logger(LoggingInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const name = context.getClass().name;
    const req = context.switchToHttp().getRequest<FastifyRequest<any>>();
    const method = req.method;
    const platform = req.headers.platform || 'web';
    const version = req.headers.version || 'v1.0.0';
    const uid = req.cookies.cid || '';
    const url = req.url;
    const data = {
      uid,
      platform,
      version,
    };
    return next.handle().pipe(
      tap(() => {
        this.log.log(
          `${name} ${method}  ${url} ${(Date.now() - now) / 1000}s`,
          JSON.stringify(data),
        );
      }),
    );
  }
}
