// src/property/amenities/dto/amenities.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class CreateAmenitiesDto {
  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  mandatory: string[];

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  basicFacilities: string[];

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  generalServices: string[];

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  outdoorActivities: string[];

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  commonAreas: string[];

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  foodAndDrink: string[];

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  healthWellness: string[];

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  businessCenter: string[];

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  beautyAndSpa: string[];
}

export class UpdateAmenitiesDto extends CreateAmenitiesDto {}
