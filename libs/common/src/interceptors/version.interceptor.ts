import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { valid } from 'semver';
import { ApiException } from '@app/common';
@Injectable()
export class VersionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const req = context.switchToHttp().getRequest();
    const version = req.headers.version || 'v1.0.0';
    if (valid(version) === null) throw new ApiException('版本号格式错误');
    return next.handle();
  }
}
