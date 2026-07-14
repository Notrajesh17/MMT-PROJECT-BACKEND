// src/property/rules/property-rules.module.ts

import { Module } from '@nestjs/common';
import { PropertyRulesService } from './property-rules.service';
import { PropertyRulesController } from './property-rules.controller';
import { PrismaService } from '../../prisma.service';

@Module({
  controllers: [PropertyRulesController],
  providers: [PropertyRulesService, PrismaService],
})
export class PropertyRulesModule {}
