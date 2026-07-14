// src/property/submit/property-submit.controller.ts

import { Controller, Post, Param } from '@nestjs/common';
import { PropertySubmitService } from './property-submit.service';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Property Submission')
@ApiBearerAuth('JWT')
@Controller('api/property/submit')
export class PropertySubmitController {
  constructor(private readonly propertySubmitService: PropertySubmitService) {}

  @Post(':userId')
  @ApiOperation({ summary: 'Submit property for approval' })
  @ApiResponse({ status: 200, description: 'Property submitted.' })
  async submit(@Param('userId') userId: string) {
    const result = await this.propertySubmitService.submit(userId);
    return { data: result };
  }

  @Post('approve/:userId')
  @ApiOperation({ summary: 'Simulate approval after 48 hours' })
  @ApiResponse({ status: 200, description: 'Property approved.' })
  async approve(@Param('userId') userId: string) {
    const result = await this.propertySubmitService.simulateApproval(userId);
    return { data: result };
  }
}
