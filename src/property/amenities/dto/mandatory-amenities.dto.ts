// src/property/amenities/dto/mandatory-amenities.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class CreateMandatoryAmenitiesDto {
  @ApiProperty()
  @IsBoolean()
  airConditioning: boolean;

  @ApiProperty()
  @IsBoolean()
  laundry: boolean;

  @ApiProperty()
  @IsBoolean()
  newspaper: boolean;

  @ApiProperty()
  @IsBoolean()
  parking: boolean;

  @ApiProperty()
  @IsBoolean()
  roomService: boolean;

  @ApiProperty()
  @IsBoolean()
  smokeDetector: boolean;

  @ApiProperty()
  @IsBoolean()
  smokingRooms: boolean;

  @ApiProperty()
  @IsBoolean()
  swimmingPools: boolean;

  @ApiProperty()
  @IsBoolean()
  wifi: boolean;

  @ApiProperty()
  @IsBoolean()
  lounge: boolean;

  @ApiProperty()
  @IsBoolean()
  reception: boolean;

  @ApiProperty()
  @IsBoolean()
  bar: boolean;
}

export class UpdateMandatoryAmenitiesDto extends CreateMandatoryAmenitiesDto {}
