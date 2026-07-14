// src/property/submit/property-submit.service.ts

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class PropertySubmitService {
  constructor(private readonly prisma: PrismaService) {}

  async submit(userId: string) {
    const existing = await this.prisma.propertyStatus.findUnique({ where: { userId } });

    // Ensure that all required sections exist before submission
    const info = await this.prisma.propertyInfo.findUnique({ where: { userId } });
    const rooms = await this.prisma.propertyRoom.findMany({ where: { userId } });
    const connectivity = await this.prisma.connectivity.findUnique({ where: { userId } });
    const usp = await this.prisma.propertyUSP.findUnique({ where: { userId } });
    const amenities = await this.prisma.amenities.findUnique({ where: { userId } });
    const mandatoryAmenities = await this.prisma.mandatoryAmenities.findUnique({ where: { userId } });
    const documents = await this.prisma.document.findMany({ where: { userId } });
    const rules = await this.prisma.propertyRules.findUnique({ where: { userId } });

    if (!info || rooms.length === 0 || !connectivity || !usp || !amenities || !mandatoryAmenities || documents.length === 0 || !rules) {
      throw new BadRequestException('All sections must be completed before submission');
    }

    const now = new Date();
    if (existing) {
      if (existing.status !== 'draft') {
        throw new BadRequestException(`Cannot submit. Current status is "${existing.status}"`);
      }
      return this.prisma.propertyStatus.update({
        where: { userId },
        data: { status: 'submitted', updatedAt: now },
      });
    }

    return this.prisma.propertyStatus.create({
      data: {
        userId,
        status: 'submitted',
      },
    });
  }

  async simulateApproval(userId: string) {
    const statusRecord = await this.prisma.propertyStatus.findUnique({ where: { userId } });
    if (!statusRecord) {
      throw new NotFoundException('Property not found. Cannot approve.');
    }
    const submittedAt = statusRecord.updatedAt;
    const now = new Date();
    const diffMs = now.getTime() - submittedAt.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    if (statusRecord.status !== 'submitted') {
      throw new BadRequestException(`Cannot approve. Current status is "${statusRecord.status}"`);
    }
    if (diffHours < 48) {
      throw new BadRequestException('Approval can only be simulated after 48 hours of submission.');
    }

    return this.prisma.propertyStatus.update({
      where: { userId },
      data: { status: 'approved', updatedAt: now },
    });
  }
}
