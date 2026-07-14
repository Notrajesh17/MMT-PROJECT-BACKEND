// src/property/info/property-info.module.ts

import { Module } from '@nestjs/common';
import { PropertyInfoService } from './property-info.service';
import { PropertyInfoController } from './property-info.controller';
import { PrismaService } from '../../prisma.service';
import { S3Service } from '../../utils/s3.service';

@Module({
  controllers: [PropertyInfoController],
  providers: [PropertyInfoService, PrismaService, S3Service],
})
export class PropertyInfoModule {}
