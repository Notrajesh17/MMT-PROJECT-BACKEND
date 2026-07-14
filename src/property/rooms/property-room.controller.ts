// src/property/rooms/property-rooms.controller.ts

import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  Body,
  Get,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PropertyRoomsService } from './property-room.service';
import { CreatePropertyRoomDto } from './dto/property-room.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { S3Service } from '../../utils/s3.service';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { UserId } from '../../common/decorators/user.decorator';
import { plainToInstance } from 'class-transformer';

@ApiTags('Property Rooms')
@ApiBearerAuth('JWT')
@Controller('api/property/rooms')
export class PropertyRoomsController {
  constructor(
    private readonly propertyRoomsService: PropertyRoomsService,
    private readonly s3Service: S3Service,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a room type for the property' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        roomTypeName: { type: 'string' },
        floorNumber: { type: 'number' },
        totalRooms: { type: 'number' },
        roomType: { type: 'string' },
        bedType: { type: 'string' },
        roomView: { type: 'string' },
        smokingAllowed: { type: 'boolean' },
        extraBedAllowed: { type: 'boolean' },
        amenities: { type: 'array', items: { type: 'string' } },
        availabilityStart: { type: 'string'},
        availabilityEnd: { type: 'string' },
        baseAdult: { type: 'number' },
        maxAdult: { type: 'number' },
        maxChildren: { type: 'number' },
        maxOccupancy: { type: 'number' },
        baseRate: { type: 'number' },
        extraAdultCharge: { type: 'number' },
        childCharge: { type: 'number' },
        totalRoomsInProperty: { type: 'number' },
        uploadRoomImages: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
        },
      },
    },
  })
  @UseInterceptors(FileFieldsInterceptor([{ name: 'uploadRoomImages', maxCount: 5 }]))
  @ApiResponse({ status: 201, description: 'Room created.' })
  async create(
    @UserId() userId: string,
    @Body() body: any,
    @UploadedFiles() files: { uploadRoomImages?: Express.Multer.File[] },
  ) {
    // Normalize amenities
    if (body.amenities && typeof body.amenities === 'string') {
      body.amenities = [body.amenities];
    }

    // Explicit number parsing
    const numericFields = [
      'floorNumber',
      'totalRooms',
      'baseAdult',
      'maxAdult',
      'maxChildren',
      'maxOccupancy',
      'baseRate',
      'extraAdultCharge',
      'childCharge',
      'totalRoomsInProperty',
    ];
    for (const field of numericFields) {
      if (body[field]) {
        body[field] = Number(body[field]);
      }
    }

    // Boolean parsing
    body.smokingAllowed = body.smokingAllowed === 'true' || body.smokingAllowed === true;
    body.extraBedAllowed = body.extraBedAllowed === 'true' || body.extraBedAllowed === true;

    // DTO transformation
    const createDto = plainToInstance(CreatePropertyRoomDto, body);

    let imageUrls: string[] = [];
    if (files?.uploadRoomImages?.length) {
      const uploads = await Promise.all(
        files.uploadRoomImages.map((file) =>
          this.s3Service.uploadFile(file.buffer, file.originalname, 'room-images'),
        ),
      );
      imageUrls = uploads;
    }

    const result = await this.propertyRoomsService.create(userId, createDto, imageUrls);
    return { data: result };
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get all room types for a user' })
  @ApiResponse({ status: 200, description: 'Rooms fetched.' })
  async findAll(@Param('userId') userId: string) {
    const rooms = await this.propertyRoomsService.findAllByUser(userId);
    return { data: rooms };
  }
}
