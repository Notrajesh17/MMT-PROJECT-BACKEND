// src/property/usp/dto/property-usp.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
  ValidateIf,
} from 'class-validator';

export class CreatePropertyUspDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  ageOfProperty: number;

  @ApiProperty()
  @IsBoolean()
  historicalEvent: boolean;

  @ApiProperty({ required: false })
  @ValidateIf((o) => o.historicalEvent === true)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  propertyOwnerDescription: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  nearbyPlaces: string[];
}

export class UpdatePropertyUspDto extends CreatePropertyUspDto {}
