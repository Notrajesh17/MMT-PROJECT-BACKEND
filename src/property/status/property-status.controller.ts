// src/property/status/property-status.controller.ts

import { Controller, Get, Param } from '@nestjs/common';
import { PropertyStatusService } from './property-status.service';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Property Status')
@ApiBearerAuth('JWT')
@Controller('api/property/status')
export class PropertyStatusController {
  constructor(private readonly propertyStatusService: PropertyStatusService) {}

  @Get(':userId')
  @ApiOperation({ summary: 'Get property submission status for a user' })
  @ApiResponse({ status: 200, description: 'Property status fetched.' })
  async getStatus(@Param('userId') userId: string) {
    const statusRecord = await this.propertyStatusService.getStatus(userId);
    return { status: statusRecord.status };
  }
}
