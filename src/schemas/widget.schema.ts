import { IsNotEmpty, IsOptional, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';
import { PageSchema } from './pagination.schema';
export class WidgetSource {
  @IsNotEmpty()
  type: string;
  @IsNotEmpty()
  npm: string;
  @IsNotEmpty()
  version: string;
  @IsNotEmpty()
  registry: string;
  @IsNotEmpty()
  repository: string;
}
export class WidgetSchema {
  @IsNotEmpty()
  enName: string;
  @IsNotEmpty()
  categories: number[];
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  thumbnail: string;
  @IsNotEmpty()
  version: string;
  @IsOptional()
  assets: Record<string, any>;
  @IsNotEmpty()
  dependencies: Record<string, any>;
  @IsNotEmpty()
  schema: Record<string, any>;
  @IsOptional()
  mock: Record<string, any>;
  @Type(() => WidgetSource)
  source: Record<string, any>;
}
export class WidgetUpdateSchema extends PartialType(WidgetSchema) {}
export class WidgetPageSchema extends PageSchema {
  @IsOptional()
  categories: number[];
  @IsOptional()
  enName: string;
  @IsOptional()
  name: string;
}

export class WidgetSyncSchema {
  @IsArray()
  @Type(() => WidgetSchema)
  widgets: WidgetSchema[];
}
