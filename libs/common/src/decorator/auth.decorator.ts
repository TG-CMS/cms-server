import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@app/common';
export function Auth() {
  return applyDecorators(UseGuards(JwtAuthGuard));
}
