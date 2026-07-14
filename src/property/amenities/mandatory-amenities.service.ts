// src/property/amenities/mandatory-amenities.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateMandatoryAmenitiesDto } from './dto/mandatory-amenities.dto';

@Injectable()
export class MandatoryAmenitiesService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrUpdate(userId: string, dto: CreateMandatoryAmenitiesDto) {
    const existing = await this.prisma.mandatoryAmenities.findUnique({ where: { userId } });
    const data = {
      userId,
      airConditioning: dto.airConditioning,
      laundry: dto.laundry,
      newspaper: dto.newspaper,
      parking: dto.parking,
      roomService: dto.roomService,
      smokeDetector: dto.smokeDetector,
      smokingRooms: dto.smokingRooms,
      swimmingPools: dto.swimmingPools,
      wifi: dto.wifi,
      lounge: dto.lounge,
      reception: dto.reception,
      bar: dto.bar,
    };

    if (existing) {
      return this.prisma.mandatoryAmenities.update({
        where: { userId },
        data,
      });
    }

    return this.prisma.mandatoryAmenities.create({ data });
  }

  async getByUser(userId: string) {
    const record = await this.prisma.mandatoryAmenities.findUnique({ where: { userId } });
    if (!record) {
      throw new NotFoundException('Mandatory amenities not found');
    }
    return record;
  }
}
