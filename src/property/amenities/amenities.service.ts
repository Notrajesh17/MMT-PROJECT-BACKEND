// src/property/amenities/amenities.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateAmenitiesDto } from './dto/amenities.dto';

@Injectable()
export class AmenitiesService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrUpdate(userId: string, dto: CreateAmenitiesDto) {
    const existing = await this.prisma.amenities.findUnique({ where: { userId } });
    const data = {
      userId,
      mandatory: dto.mandatory,
      basicFacilities: dto.basicFacilities,
      generalServices: dto.generalServices,
      outdoorActivities: dto.outdoorActivities,
      commonAreas: dto.commonAreas,
      foodAndDrink: dto.foodAndDrink,
      healthWellness: dto.healthWellness,
      businessCenter: dto.businessCenter,
      beautyAndSpa: dto.beautyAndSpa,
    };

    if (existing) {
      return this.prisma.amenities.update({
        where: { userId },
        data,
      });
    }

    return this.prisma.amenities.create({ data });
  }

  async getByUser(userId: string) {
    const record = await this.prisma.amenities.findUnique({ where: { userId } });
    if (!record) {
      throw new NotFoundException('Amenities not found');
    }
    return record;
  }
}
