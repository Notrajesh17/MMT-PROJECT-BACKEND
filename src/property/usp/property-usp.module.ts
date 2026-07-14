// src/property/usp/property-usp.module.ts

import { Module } from '@nestjs/common';
import { PropertyUspService } from './property-usp.service';
import { PropertyUspController } from './property-usp.controller';
import { PrismaService } from '../../prisma.service';

@Module({
  controllers: [PropertyUspController],
  providers: [PropertyUspService, PrismaService],
})
export class PropertyUspModule {}
