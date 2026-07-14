// src/property/status/property-status.module.ts

import { Module } from '@nestjs/common';
import { PropertyStatusService } from './property-status.service';
import { PropertyStatusController } from './property-status.controller';
import { PrismaService } from '../../prisma.service';

@Module({
  controllers: [PropertyStatusController],
  providers: [PropertyStatusService, PrismaService],
})
export class PropertyStatusModule {}
