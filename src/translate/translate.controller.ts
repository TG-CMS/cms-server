import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  ParseIntPipe,
  Body,
} from '@nestjs/common';
import { TranslateService } from './translate.service';
import {
  TranslateLangSchema,
  TranslateLangTextSchema,
  TranslateSchema,
  TranslateSourceTextSchema,
  TranslateSourceUpdateSchema,
  TranslateSpaceSchema,
  TranslateSpaceUpdateSchema,
  TranslateUpdateLangSchema,
  TranslateUpdateLangTextSchema,
  TranslateUpdateSchema,
} from '@/schemas';

@Controller('translates')
export class TranslateController {
  constructor(private translateService: TranslateService) {}

  @Get()
  getTranslates() {
    return this.translateService.getTranslates();
  }

  @Get('/:id')
  getTranslate(@Param('id', ParseIntPipe) id: number) {
    return this.translateService.getTranslate(id);
  }

  @Post()
  createTranslate(@Body() data: TranslateSchema) {
    return this.translateService.createTranslate(data);
  }

  @Put('/:translateId')
  updateTranslate(
    @Param('translateId', ParseIntPipe) translateId: number,
    @Body() data: TranslateUpdateSchema,
  ) {
    return this.translateService.updateTranslate(translateId, data);
  }

  @Get('/langs')
  getTranslateLangs() {
    return this.translateService.getTranslateLangs();
  }

  @Post('/langs')
  createTranslateLang(@Body() data: TranslateLangSchema) {
    return this.translateService.createTranslateLang(data);
  }
  @Post('/langs/:id')
  updateTranslateLang(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: TranslateUpdateLangSchema,
  ) {
    return this.translateService.updateTranslateLang(id, data);
  }

  @Get('/:translateId/spaces')
  getTranslateSpaces(@Param('translateId', ParseIntPipe) translateId: number) {
    return this.translateService.getTranslateSpaces(translateId);
  }

  @Post('/spaces')
  createTranslateSpace(@Body() data: TranslateSpaceSchema) {
    return this.translateService.createTranslateSpace(data);
  }

  @Put('/spaces/:id')
  updateTranslateSpace(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: TranslateSpaceUpdateSchema,
  ) {
    return this.translateService.updateTranslateSpace(id, data);
  }
  @Get('/spaces/:id')
  getTranslateSpace(@Param('id', ParseIntPipe) id: number) {
    return this.translateService.getTranslateSpace(id);
  }

  @Get('/spaces/source/:spacesId')
  getSpaceSource(@Param('spacesId', ParseIntPipe) id: number) {
    return this.translateService.getSpaceSource(id);
  }

  @Post('/spaces/source')
  createSpaceSource(@Body() data: TranslateSourceTextSchema) {
    return this.translateService.createSpaceSource(data);
  }

  @Put('/spaces/source/:sourceId')
  updateSpaceSource(
    @Param('sourceId', ParseIntPipe) id: number,
    @Body() data: TranslateSourceUpdateSchema,
  ) {
    return this.translateService.updateSpaceSource(id, data);
  }

  @Put('/spaces/translate/:translateId')
  updateTranslateSpaceText(
    @Param('translateId', ParseIntPipe) id: number,
    @Body() data: TranslateUpdateLangTextSchema,
  ) {
    return this.translateService.updateSpaceTranslateText(id, data);
  }
}
