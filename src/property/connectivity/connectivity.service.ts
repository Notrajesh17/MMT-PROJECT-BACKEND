// src/property/connectivity/connectivity.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateConnectivityDto } from './dto/connectivity.dto';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class ConnectivityService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrUpdate(userId: string, dto: CreateConnectivityDto) {
    const existing = await this.prisma.connectivity.findUnique({ where: { userId } });
    const data = {
      userId,
      channelManagerUsed: dto.channelManagerUsed,
      connectedWithTravelAgency: dto.connectedWithTravelAgency,
    };

    if (existing) {
      return this.prisma.connectivity.update({
        where: { userId },
        data,
      });
    }

    return this.prisma.connectivity.create({ data });
  }

  async getByUser(userId: string) {
    const record = await this.prisma.connectivity.findUnique({ where: { userId } });
    if (!record) {
      throw new NotFoundException('Connectivity info not found');
    }
    return record;
  }
}
