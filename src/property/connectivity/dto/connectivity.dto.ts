// src/property/connectivity/dto/connectivity.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateConnectivityDto {
  @ApiProperty()
  @IsBoolean()
  channelManagerUsed: boolean;

  @ApiProperty()
  @IsBoolean()
  connectedWithTravelAgency: boolean;

  @ApiProperty()
  @IsString()
  channelManagerName:string;

  @ApiProperty()
  @IsString()
  travelAgencyName:string;
}

export class UpdateConnectivityDto extends CreateConnectivityDto {}
