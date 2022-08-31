import { Injectable } from '@nestjs/common';
import * as pMap from 'p-map';
import { ApiException, PrismaService } from '@app/common';
import {
  TranslateLangSchema,
  TranslateSchema,
  TranslateUpdateSchema,
  TranslateUpdateLangSchema,
  TranslateSpaceUpdateSchema,
  TranslateSpaceSchema,
  TranslateSourceTextSchema,
  TranslateSourceUpdateSchema,
  TranslateUpdateLangTextSchema,
  SourceTextSchema,
} from '@/schemas';

@Injectable()
export class TranslateService {
  constructor(private readonly prismaService: PrismaService) {}

  async getTranslates() {
    return await this.prismaService.translate.findMany({
      include: {
        targetLang: true,
        sourceLang: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async getTranslate(id: number) {
    const select = {
      id: true,
      name: true,
      lang: true,
    };
    return await this.prismaService.translate.findUnique({
      where: { id },
      include: {
        targetLang: {
          select,
        },
        sourceLang: {
          select,
        },
        space: true,
      },
    });
  }

  async createTranslate(data: TranslateSchema) {
    const { name, description, targetLang, sourceLangId } = data;
    return await this.prismaService.translate.create({
      data: {
        name,
        description,
        sourceLangId,
        targetLang: {
          connect: targetLang.map((id) => ({ id })),
        },
      },
    });
  }

  async updateTranslate(id: number, data: TranslateUpdateSchema) {
    const { name, description, targetLang, sourceLangId } = data;
    const item = await this.prismaService.translate.findFirst({
      where: {
        id,
      },
    });
    if (!item) {
      throw new ApiException(`${id} 不存在`);
    }
    return await this.prismaService.translate.update({
      where: { id },
      data: {
        name,
        description,
        sourceLangId,
        targetLang: {
          connect: targetLang.map((id) => ({ id })),
        },
      },
    });
  }

  async getTranslateLangs() {
    return await this.prismaService.translateLang.findMany();
  }

  async createTranslateLang(data: TranslateLangSchema) {
    const { lang } = data;
    const item = await this.prismaService.translateLang.findFirst({
      where: {
        lang,
      },
    });
    if (item) {
      throw new ApiException(`${lang} 已存在`);
    }
    return await this.prismaService.translateLang.create({ data });
  }

  async updateTranslateLang(id: number, data: TranslateUpdateLangSchema) {
    const { lang, ...other } = data;
    const has = await this.prismaService.translateLang.count({
      where: { id },
    });
    if (!has) {
      throw new ApiException(`${id} 不存在`);
    }
    const item = await this.prismaService.translateLang.findFirst({
      where: {
        lang,
      },
    });
    if (item) {
      throw new ApiException(`${lang} 已存在`);
    }
    return await this.prismaService.translateLang.update({
      where: {
        id,
      },
      data: other,
    });
  }

  async getTranslateSpaces(translateId: number) {
    return await this.prismaService.translateSpace.findMany({
      where: {
        translateId,
      },
    });
  }

  async createTranslateSpace(data: TranslateSpaceSchema) {
    data.translateId = Number(data.translateId);
    return await this.prismaService.translateSpace.create({
      data,
    });
  }

  async updateTranslateSpace(id: number, data: TranslateSpaceUpdateSchema) {
    const has = await this.prismaService.translateLang.findUnique({
      where: { id },
    });
    if (!has) {
      throw new ApiException(`${id} 不存在`);
    }
    await this.prismaService.translateSpace.update({
      where: {
        id,
      },
      data,
    });
  }

  async getTranslateSpace(id: number) {
    return await this.prismaService.translateSpace.findUnique({
      where: {
        id,
      },
      include: {
        translate: {
          include: {
            targetLang: true,
          },
        },
      },
    });
  }

  async getSpaceSource(spaceId: number) {
    return this.prismaService.translateSourceText.findMany({
      where: {
        spaceId,
      },
      include: {
        translateText: {
          select: {
            id: true,
            translateText: true,
            langId: true,
            translateLang: {
              select: {
                lang: true,
                name: true,
              },
            },
          },
        },
      },
    });
  }

  async createSpaceSource(data: TranslateSourceTextSchema) {
    const success = [];
    const error = [];
    data.translateId = Number(data.translateId);
    data.spaceId = Number(data.spaceId);
    const { translateTexts, translateId, spaceId } = data;
    if (translateTexts.length > 50) {
      throw new ApiException(`最大同时添加50条`);
    }
    const { targetLang, space } = await this.prismaService.translate.findUnique(
      {
        where: { id: translateId },
        include: {
          targetLang: true,
          space: {
            select: {
              id: true,
            },
          },
        },
      },
    );
    const spaces = space.map((item) => item.id);
    if (!targetLang.length) {
      throw new ApiException(`${translateId} 未绑定翻译语言`);
    }
    if (!spaces.includes(spaceId)) {
      throw new ApiException(
        `项目:${translateId} 空间:${spaceId} 该空间不存在`,
      );
    }

    const mapper = async (item: SourceTextSchema) => {
      const { key } = item;
      const text = await this.prismaService.translateSourceText.findFirst({
        where: {
          spaceId,
          key,
        },
      });
      if (text) {
        error.push(key);
        return;
      }
      const { id: sourceTextId } =
        await this.prismaService.translateSourceText.create({
          data: Object.assign(item, { spaceId }),
        });
      const translates = targetLang.map((item) => ({
        spaceId,
        sourceTextId,
        langId: item.id,
      }));
      await this.prismaService.translateLangText.createMany({
        data: translates,
      });
      success.push(key);
    };
    await pMap(translateTexts, mapper, { concurrency: 5 });
    return {
      success,
      error,
    };
  }

  async updateSpaceSource(id: number, data: TranslateSourceUpdateSchema) {
    const text = await this.prismaService.translateSourceText.findUnique({
      where: {
        id,
      },
    });
    if (!text) {
      throw new ApiException(`${id} 不存在`);
    }
    return this.prismaService.translateSourceText.update({
      where: { id },
      data,
    });
  }

  async updateSpaceTranslateText(
    id: number,
    data: TranslateUpdateLangTextSchema,
  ) {
    return this.prismaService.translateLangText.update({
      where: { id },
      data,
    });
  }
}
