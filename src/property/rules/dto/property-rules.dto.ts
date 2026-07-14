import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePropertyRulesDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  coupleRule: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  guestRule: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  otherRule: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  petRule: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  checkInTime: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  checkOutTime: string;
}

export class UpdatePropertyRulesDto extends CreatePropertyRulesDto {}
