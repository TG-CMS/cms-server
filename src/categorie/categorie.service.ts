import { Injectable } from '@nestjs/common';
import { ApiException, PrismaService } from '@app/common';
import {
  CategorieSchema,
  TagSchema,
  TagUpdateSchema,
} from '@/schemas/index.js';

@Injectable()
export class CategorieService {
  constructor(private readonly prismaService: PrismaService) {}
  async getCategories() {
    return this.prismaService.categorie.findMany({
      select: {
        id: true,
        name: true,
        tag: {
          select: {
            id: true,
            name: true,
            categorieId: true,
          },
        },
      },
    });
  }
  async categories(data: CategorieSchema) {
    return this.prismaService.categorie.create({
      data,
    });
  }

  async categoriesTag(data: TagSchema) {
    return this.prismaService.tag.create({
      data,
    });
  }
  async categorieUpdateTag(id: number, data: TagUpdateSchema) {
    const tag = await this.prismaService.tag.findUnique({
      where: { id },
    });
    if (!tag) {
      throw new ApiException(`${id} 不存在`);
    }
    return await this.prismaService.tag.update({
      where: {
        id,
      },
      data,
    });
  }
}
