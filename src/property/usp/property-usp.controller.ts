// src/property/usp/property-usp.controller.ts

import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PropertyUspService } from './property-usp.service';
import { CreatePropertyUspDto } from './dto/property-usp.dto';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserId } from '../../common/decorators/user.decorator';

@ApiTags('Property USP')
@ApiBearerAuth('JWT')
@Controller('api/property/usp')
export class PropertyUspController {
  constructor(private readonly propertyUspService: PropertyUspService) {}

  @Post()
  @ApiOperation({ summary: 'Create or update property USP' })
  @ApiResponse({ status: 201, description: 'Property USP created/updated.' })
  async create(
    @UserId() userId: string,
    @Body() dto: CreatePropertyUspDto,
  ) {
    const result = await this.propertyUspService.createOrUpdate(userId, dto);
    return { data: result };
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get property USP by user ID' })
  @ApiResponse({ status: 200, description: 'Property USP fetched.' })
  async getByUser(@Param('userId') userId: string) {
    const result = await this.propertyUspService.getByUser(userId);
    return { data: result };
  }
}
