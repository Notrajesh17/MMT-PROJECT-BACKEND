// src/property/usp/property-usp.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreatePropertyUspDto } from './dto/property-usp.dto';

@Injectable()
export class PropertyUspService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrUpdate(userId: string, dto: CreatePropertyUspDto) {
    const existing = await this.prisma.propertyUSP.findUnique({ where: { userId } });
    const data = {
      userId,
      ageOfProperty: dto.ageOfProperty,
      historicalEventAvailable: dto.historicalEvent,
      historicalEventDesc: dto.historicalEvent ? dto.description : null,
      propertyOwnerDescription: dto.propertyOwnerDescription,
      nearbyPlaces: dto.nearbyPlaces,
    };

    if (existing) {
      return this.prisma.propertyUSP.update({
        where: { userId },
        data,
      });
    }

    return this.prisma.propertyUSP.create({ data });
  }

  async getByUser(userId: string) {
    const record = await this.prisma.propertyUSP.findUnique({ where: { userId } });
    if (!record) {
      throw new NotFoundException('Property USP not found');
    }
    return record;
  }
}
