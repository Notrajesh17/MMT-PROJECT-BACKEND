// src/auth/dto/index.ts

import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

class EmailDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;
}

class PasswordDto {
  @ApiProperty({ example: 'veryStrongPassword123' })
  @IsString()
  @MinLength(6)
  password: string;
}

class EmailPasswordDto extends EmailDto {
  @ApiProperty({ example: 'veryStrongPassword123' })
  @IsString()
  @MinLength(6)
  password: string;
}

export class SignupDto extends EmailPasswordDto {
  @ApiProperty({ example: '+911234567890' })
  @IsPhoneNumber('IN')
  phone: string;

  @ApiProperty({ example: 'john_doe' })
  @IsString()
  @IsNotEmpty()
  @Length(3, 30)
  username: string;
}

export class LoginDto extends EmailPasswordDto {}

export class ForgotPasswordDto extends EmailDto {}

export class ResetPasswordDto extends EmailDto {
  @ApiProperty({ example: '123456' })
  @IsString()
  @Length(6, 6)
  otp: string;

  @ApiProperty({ example: 'newStrongPassword456' })
  @IsString()
  @MinLength(6)
  newPassword: string;
}
