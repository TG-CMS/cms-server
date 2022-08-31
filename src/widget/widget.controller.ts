import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  WidgetPageSchema,
  WidgetSchema,
  WidgetSyncSchema,
  WidgetUpdateSchema,
} from '@/schemas';
import { WidgetService } from './widget.service';
@Controller('widgets')
export class WidgetController {
  constructor(private widgetService: WidgetService) {}
  @Get()
  getWidgets(@Query() params: WidgetPageSchema) {
    return this.widgetService.getWidgets(params);
  }

  @Get(':id')
  getWidget(@Param('id', ParseIntPipe) id: number) {
    return this.widgetService.getWidget(id);
  }
  @Get('version/:id')
  getWidgetVersion(@Param('id', ParseIntPipe) id: number) {
    return this.widgetService.getWidgetVersion(id);
  }
  @Post()
  createWidget(@Body() data: WidgetSchema) {
    return this.widgetService.createWidget(data);
  }
  @Put(':id')
  updateWidget(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: WidgetUpdateSchema,
  ) {
    return this.widgetService.updateWidget(id, data);
  }

  @Post('sync')
  syncWidget(@Body() data: WidgetSyncSchema) {
    return this.widgetService.syncWidget(data);
  }
}
