import { Injectable, NestMiddleware, Res } from '@nestjs/common';
import { nanoid } from 'nanoid';
import * as cookie from 'cookie';
import type { FastifyRequest, FastifyReply } from 'fastify';
@Injectable()
export class CookieMiddleware implements NestMiddleware {
  use(req: FastifyRequest, response: any, next: () => void) {
    const cookies = cookie.parse(req.headers.cookie || '');
    // console.log(Object.keys(response));
    if (!cookies.cid) {
      const data = cookie.serialize('cid', nanoid(), {
        httpOnly: true,
        path: '/',
      });
      const prev = response.getHeader('Set-Cookie') || [];
      const header = Array.isArray(prev) ? prev.concat(data) : [prev, data];
      response.setHeader('Set-Cookie', header);
    }
    next();
  }
}
