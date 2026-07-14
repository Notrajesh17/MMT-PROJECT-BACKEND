// src/auth/auth.service.ts

import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service'; // <-- Import from PrismaModule
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import { SignupDto, LoginDto } from './dto';

@Injectable()
export class AuthService {
  private readonly saltRounds = 10;
  private otpStore = new Map<string, string>();
  private mailTransporter: any;

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {
    const port = process.env.EMAIL_PORT
      ? parseInt(process.env.EMAIL_PORT, 10)
      : 587;

    this.mailTransporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST!,
      port,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER!,
        pass: process.env.EMAIL_PASS!,
      },
    });
  }

  async signup(dto: SignupDto) {
    const { email, password, phone, username } = dto;

    const [existingByEmail, existingByPhone, existingByUsername] =
      await Promise.all([
        this.prisma.user.findUnique({ where: { email } }),
        this.prisma.user.findUnique({ where: { phone } }),
        this.prisma.user.findUnique({ where: { username } }),
      ]);

    if (existingByEmail) {
      throw new BadRequestException('Email is already registered');
    }
    if (existingByPhone) {
      throw new BadRequestException('Phone number is already registered');
    }
    if (existingByUsername) {
      throw new BadRequestException('Username is already taken');
    }

    const hashedPassword = await bcrypt.hash(password, this.saltRounds);

    const createdUser = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        phone,
        username,
      },
    });

    const token = this.jwtService.sign({
      sub: createdUser.id,
      email: createdUser.email,
    });
    return { access_token: token };
  }

  async login(dto: LoginDto) {
    const { email, password } = dto;
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });
    return { access_token: token };
  }

  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundException('No user found with this email');
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    this.otpStore.set(email, otp);

    const mailOptions: any = {
      from: process.env.EMAIL_FROM!,
      to: email,
      subject: 'Your Password Reset OTP',
      text: `Your OTP to reset password is: ${otp}. It will expire in 10 minutes.`,
    };

    await this.mailTransporter.sendMail(mailOptions);
    return { message: 'OTP sent to your email address' };
  }

  async resetPassword(email: string, otp: string, newPassword: string) {
    const storedOtp = this.otpStore.get(email);
    if (!storedOtp || storedOtp !== otp) {
      throw new UnauthorizedException('Invalid or expired OTP');
    }

    const hashed = await bcrypt.hash(newPassword, this.saltRounds);

    await this.prisma.user.update({
      where: { email },
      data: { password: hashed },
    });

    this.otpStore.delete(email);
    return { message: 'Password has been reset successfully' };
  }
}
