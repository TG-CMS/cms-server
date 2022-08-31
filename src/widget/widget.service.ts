import { Injectable } from '@nestjs/common';
import { ApiException, PrismaService, getLatestVersion } from '@app/common';
import {
  WidgetPageSchema,
  WidgetUpdateSchema,
  WidgetSchema,
  WidgetSyncSchema,
} from '@/schemas';
import { gt } from 'semver';
import * as pMap from 'p-map';
@Injectable()
export class WidgetService {
  constructor(private readonly prismaService: PrismaService) {}
  async getWidgets(params) {
    const {
      take,
      _orderBy: orderBy,
      skip,
      pageSize,
      page,
    } = new WidgetPageSchema(params);
    const [total, rows] = await this.prismaService.$transaction([
      this.prismaService.widget.count(),
      this.prismaService.widget.findMany({
        skip,
        take,
        orderBy,
      }),
    ]);
    return {
      total,
      rows,
      pageSize,
      page,
    };
  }

  async getWidget(id: number) {
    return await this.prismaService.widget.findUnique({
      where: {
        id,
      },
      include: {
        versions: true,
      },
    });
  }
  async createWidget(data: WidgetSchema) {
    const {
      enName,
      name,
      description,
      categories,
      schema = {},
      mock = {},
      dependencies = {},
      assets,
      thumbnail,
      version,
      source = {},
    } = data;
    const widget = await this.prismaService.widget.findUnique({
      where: {
        enName,
      },
    });
    if (widget) {
      throw new ApiException(`${enName} 已存在`);
    }
    return await this.prismaService.widget.create({
      data: {
        enName,
        name,
        description,
        categories: {
          connect: categories.map((id) => ({ id })),
        },
        versions: {
          create: {
            schema,
            dependencies,
            assets,
            thumbnail,
            version,
            mock,
            source,
          },
        },
      },
    });
  }

  async getWidgetVersion(widgetId: number) {
    return await this.prismaService.widgetVersion.findMany({
      where: {
        widgetId,
      },
      select: {
        version: true,
      },
    });
  }
  async updateWidget(id: number, data: WidgetUpdateSchema) {
    const {
      name,
      description,
      categories = [],
      schema = {},
      mock = {},
      dependencies = {},
      assets,
      thumbnail,
      version,
      source = {},
    } = data;
    const widget = await this.prismaService.widget.findUnique({
      where: {
        id,
      },
      include: {
        versions: {
          select: {
            id: true,
            widgetId: true,
            version: true,
          },
        },
      },
    });
    if (!widget) {
      throw new ApiException(`${id} widgetId不存在`);
    }
    const versions = widget.versions.map((item) => item.version);
    if (versions.includes(version)) {
      throw new ApiException(`版本v${version} 已存在,更新失败`);
    }
    const lastVersion = await getLatestVersion(version, versions);
    if (!gt(version, lastVersion || '0.0.0')) {
      throw new ApiException(`当前版本v${version} 小于v${lastVersion},请升级`);
    }
    return await this.prismaService.widget.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        categories: {
          connect: categories.map((id) => ({ id })),
        },
        versions: {
          create: {
            schema,
            dependencies,
            assets,
            thumbnail,
            version,
            mock,
            source,
          },
        },
      },
    });
  }

  async syncWidget(data: WidgetSyncSchema) {
    if (!data.widgets.length) {
      throw new ApiException(`请添加同步组件`);
    }
    if (data.widgets.length > 50) {
      throw new ApiException(`超过最大同步数量:${50}`);
    }
    const maper = async (item) => {
      const {
        enName,
        name,
        description,
        categories = [],
        schema = {},
        mock = {},
        dependencies = {},
        assets,
        thumbnail,
        version,
        source = {},
      } = item;
      const widget = await this.prismaService.widget.findUnique({
        where: {
          enName,
        },
        include: {
          versions: {
            select: {
              id: true,
              widgetId: true,
              version: true,
            },
          },
        },
      });
      const versions = widget?.versions.map((item) => item.version) ?? [];
      const error = {
        widget: {
          enName,
          name,
        },
        message: null,
      };
      if (versions.includes(version)) {
        error.message = `版本v${version} 已存在,请升级版本号后更新`;
        return error;
      }
      const lastVersion = await getLatestVersion(version, versions);
      if (!gt(version, lastVersion || '0.0.0')) {
        error.message = `当前版本v${version} 小于v${lastVersion},请升级`;

        return error;
      }
      await this.prismaService.widget.upsert({
        where: {
          enName,
        },
        update: {
          name,
          description,
          categories: {
            connect: categories.map((id) => ({ id })),
          },
          versions: {
            create: {
              schema,
              dependencies,
              assets,
              thumbnail,
              version,
              mock,
              source,
            },
          },
        },
        create: {
          enName,
          name,
          description,
          categories: {
            connect: categories.map((id) => ({ id })),
          },
          versions: {
            create: {
              schema,
              dependencies,
              assets,
              thumbnail,
              version,
              mock,
              source,
            },
          },
        },
      });
      return error;
    };
    return await pMap(data.widgets, maper, { concurrency: 4 });
  }
}
