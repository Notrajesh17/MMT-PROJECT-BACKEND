import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PropertyRulesService } from './property-rules.service';
import { CreatePropertyRulesDto } from './dto/property-rules.dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { UserId } from '../../common/decorators/user.decorator';

@ApiTags('Property Rules')
@ApiBearerAuth('JWT')
@Controller('api/property/rules')
export class PropertyRulesController {
  constructor(private readonly propertyRulesService: PropertyRulesService) {}

  @Post()
  @ApiOperation({ summary: 'Create or update property rules' })
  @ApiBody({ type: CreatePropertyRulesDto })
  @ApiResponse({ status: 201, description: 'Property rules created/updated.' })
  async create(
    @UserId() userId: string,
    @Body() dto: CreatePropertyRulesDto,
  ) {
    const result = await this.propertyRulesService.createOrUpdate(userId, dto);
    return { data: result };
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get property rules by user ID' })
  @ApiResponse({ status: 200, description: 'Property rules fetched.' })
  async getByUser(@Param('userId') userId: string) {
    const result = await this.propertyRulesService.getByUser(userId);
    return { data: result };
  }
}
