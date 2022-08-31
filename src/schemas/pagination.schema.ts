import { IsNumber, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';
import { IsDefault } from '@app/common';

export class PageSchema {
  @IsOptional()
  @IsNumber()
  @IsDefault(1)
  page: number;
  @IsDefault(20)
  @IsNumber()
  @IsOptional()
  pageSize: number;
  @IsDefault('asc')
  @IsOptional()
  order: 'asc' | 'desc';
  @IsDefault('id')
  @IsOptional()
  orderBy: string;
  @Expose()
  public skip: number;
  @Expose()
  public take: number;
  public _orderBy: Record<string, any>;
  constructor(options: Partial<PageSchema>) {
    Object.assign(this, options || {});
    const { pageSize = 20, page = 1, orderBy, order } = options || {};
    this.skip = (page - 1) * pageSize;
    this.take = pageSize;
    this._orderBy = {
      [orderBy]: order,
    };
  }
}
