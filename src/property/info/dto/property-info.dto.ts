// property-info.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePropertyInfoDto {
  @ApiProperty()
  @IsString()
  hotelName!: string;

  @ApiProperty()
  @IsString()
  businessOwnerName!: string;

  @ApiProperty()
  @IsString()
  designation!: string;

  @ApiProperty()
  @IsString()
  contact1Phone!: string;

  @ApiProperty()
  @IsEmail()
  contact1Email!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  contact1Landline?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  contact2Phone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  contact2Email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  contact2Landline?: string;

  @ApiProperty()
  @IsString()
  locationLocality!: string;

  @ApiProperty()
  @IsString()
  locationStreet!: string;

  @ApiProperty()
  @IsString()
  locationCity!: string;

  @ApiProperty()
  @IsString()
  locationState!: string;

  @ApiProperty()
  @IsString()
  locationCountry!: string;

  @ApiProperty()
  @IsString()
  locationPincode!: string;

  @ApiProperty()
  @IsString()
  propertyType!: string;

  @ApiProperty()
  @IsString()
  propertyRelationship!: string;

  @ApiProperty()
  @IsBoolean()
  onLease!: boolean;

  @ApiProperty()
  @IsNumber()
  totalRooms!: number;

  @ApiProperty()
  @IsBoolean()
  registerOnOTAs!: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  commissionPercentToOTAs?: number;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  @IsOptional()
  uploadIntroVideo?: any;
}


export class UpdatePropertyInfoDto extends CreatePropertyInfoDto {}
