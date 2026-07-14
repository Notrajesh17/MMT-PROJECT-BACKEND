// src/property/status/property-status.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class PropertyStatusService {
  constructor(private readonly prisma: PrismaService) {}

  async getStatus(userId: string) {
    const record = await this.prisma.propertyStatus.findUnique({ where: { userId } });
    if (!record) {
      throw new NotFoundException('Property status not found');
    }
    return record;
  }
}
