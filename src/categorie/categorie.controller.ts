import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CategorieService } from './categorie.service';
import { CategorieSchema, TagSchema, TagUpdateSchema } from '@/schemas';
@Controller('categories')
export class CategorieController {
  constructor(private categorieService: CategorieService) {}

  @Get()
  getCategories() {
    return this.categorieService.getCategories();
  }
  @Post()
  categories(@Body() data: CategorieSchema) {
    return this.categorieService.categories(data);
  }
  @Put('/:id')
  categorieUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: CategorieSchema,
  ) {}

  @Post('tag')
  categoriesTag(@Body() data: TagSchema) {
    return this.categorieService.categoriesTag(data);
  }
  @Put('tag/:id')
  categorieTagUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: TagUpdateSchema,
  ) {
    return this.categorieService.categorieUpdateTag(id, data);
  }
}
