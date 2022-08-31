import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { withExclude } from 'prisma-exclude';
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private _exclude: any;
  constructor() {
    super();
    this._exclude = withExclude(this);
  }
  async middleware() {
    this.$use(async (params, next) => {
      const before = Date.now();
      const result = await next(params);
      const after = Date.now();
      console.log(
        `Query ${params.model}.${params.action} took ${after - before}ms`,
      );
      return result;
    });
  }
  async onModuleInit() {
    await this.middleware();
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
  public exclude<T = any>(name: string, fields: string[]): Required<T> {
    return this._exclude.$exclude(name, fields);
  }
}
