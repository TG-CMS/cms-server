import { IsNotEmpty, IsArray } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
export class TranslateSchema {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  sourceLangId: number;
  @IsNotEmpty()
  targetLang: number[];
}
export class TranslateUpdateSchema extends PartialType(TranslateSchema) {}
export class TranslateLangSchema {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  lang: string;
}
export class TranslateUpdateLangSchema extends PartialType(
  TranslateLangSchema,
) {}

export class TranslateSpaceSchema {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  translateId: number;
  @IsNotEmpty()
  description: string;
}
export class TranslateSpaceUpdateSchema extends PartialType(
  TranslateSpaceSchema,
) {}

export class SourceTextSchema {
  // @IsNotEmpty()
  // spaceId: number;
  @IsNotEmpty()
  key: string;
  @IsNotEmpty()
  sourceText: string;
}
export class TranslateSourceTextSchema {
  @IsArray()
  @Type(() => SourceTextSchema)
  translateTexts: SourceTextSchema[];
  @IsNotEmpty()
  translateId: number;
  @IsNotEmpty()
  spaceId: number;
}
export class TranslateSourceUpdateSchema extends PartialType(
  TranslateSourceTextSchema,
) {}
export class TranslateLangTextSchema {
  // @IsNotEmpty()
  // textId: string;
  // @IsNotEmpty()
  // spaceId: number;
  // @IsNotEmpty()
  // textLangId: number;
  @IsNotEmpty()
  translateText: string;
  // @IsNotEmpty()
  // sourceTextId: number;
}

export class TranslateUpdateLangTextSchema extends PartialType(
  TranslateLangTextSchema,
) {}
