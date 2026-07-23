import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { UserId } from '../../common/decorators/user.decorator';
import { AmenitiesService } from './amenities.service';
import { CreateAmenitiesDto } from './dto/amenities.dto';

@ApiTags('Amenities')
@ApiBearerAuth('JWT')
@Controller('api/property/amenities')
export class AmenitiesController {
  constructor(
    private readonly amenitiesService: AmenitiesService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create or update amenities' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Amenities created or updated successfully.',
  })
  async create(
    @UserId() userId: string,
    @Body() dto: CreateAmenitiesDto,
  ): Promise<{ data: unknown }> {
    const amenities = await this.amenitiesService.createOrUpdate(userId, dto);

    return {
      data: amenities,
    };
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get amenities by user ID' })
  @ApiParam({
    name: 'userId',
    description: 'User ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Amenities fetched successfully.',
  })
  async getByUser(
    @Param('userId') userId: string,
  ): Promise<{ data: unknown }> {
    const amenities = await this.amenitiesService.getByUser(userId);

    return {
      data: amenities,
    };
  }
}
