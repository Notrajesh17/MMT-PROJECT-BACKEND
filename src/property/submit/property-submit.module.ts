// src/property/submit/property-submit.module.ts

import { Module } from '@nestjs/common';
import { PropertySubmitService } from './property-submit.service';
import { PropertySubmitController } from './property-submit.controller';
import { PrismaService } from '../../prisma.service';

@Module({
  controllers: [PropertySubmitController],
  providers: [PropertySubmitService, PrismaService],
})
export class PropertySubmitModule {}
