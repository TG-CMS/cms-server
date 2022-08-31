import { IsNotEmpty, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
export class CategorieSchema {
  @IsNotEmpty()
  name: string;
}
export class TagSchema {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  description: string;
  @IsOptional()
  categorieId: number;
}
export class TagUpdateSchema extends PartialType(TagSchema) {}
