// src/property/rooms/property-rooms.module.ts

import { Module } from '@nestjs/common';
import { PropertyRoomsService } from './property-room.service';
import { PropertyRoomsController } from './property-room.controller';
import { PrismaService } from '../../prisma.service';
import { S3Service } from '../../utils/s3.service';

@Module({
  controllers: [PropertyRoomsController],
  providers: [PropertyRoomsService, PrismaService, S3Service],
})
export class PropertyRoomsModule {}
