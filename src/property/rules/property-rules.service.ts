import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreatePropertyRulesDto } from './dto/property-rules.dto';

@Injectable()
export class PropertyRulesService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrUpdate(userId: string, dto: CreatePropertyRulesDto) {
    const existing = await this.prisma.propertyRules.findUnique({ where: { userId } });

    const data = {
      userId,
      coupleRule: dto.coupleRule,
      guestRule: dto.guestRule,
      otherRule: dto.otherRule, // ✅ fixed field name
      petRule: dto.petRule,
      checkInTime: dto.checkInTime,     // ✅ new field
      checkOutTime: dto.checkOutTime,   // ✅ new field
    };

    if (existing) {
      return this.prisma.propertyRules.update({
        where: { userId },
        data,
      });
    }

    return this.prisma.propertyRules.create({data});
  }

  async getByUser(userId: string) {
    const record = await this.prisma.propertyRules.findUnique({ where: { userId } });
    if (!record) {
      throw new NotFoundException('Property rules not found');
    }
    return record;
  }
}
