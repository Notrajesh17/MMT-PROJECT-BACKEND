// src/property/amenities/mandatory-amenities.module.ts

import { Module } from '@nestjs/common';
import { MandatoryAmenitiesService } from './mandatory-amenities.service';
import { MandatoryAmenitiesController } from './mandatory-amenities.controller';
import { PrismaService } from '../../prisma.service';

@Module({
  controllers: [MandatoryAmenitiesController],
  providers: [MandatoryAmenitiesService, PrismaService],
})
export class MandatoryAmenitiesModule {}
