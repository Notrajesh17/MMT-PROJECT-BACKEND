import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreatePropertyInfoDto } from './dto/property-info.dto';

@Injectable()
export class PropertyInfoService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrUpdate(userId: string, dto: CreatePropertyInfoDto, introVideoUrl?: string) {
    const existing = await this.prisma.propertyInfo.findUnique({ where: { userId } });
    const data = {
      userId,
      hotelName: dto.hotelName,
      businessOwnerName: dto.businessOwnerName,
      designation: dto.designation,
      contact1Phone: dto.contact1Phone,
      contact1Email: dto.contact1Email,
      contact1Landline: dto.contact1Landline,
      contact2Phone: dto.contact2Phone,
      contact2Email: dto.contact2Email,
      contact2Landline: dto.contact2Landline,
      locationLocality: dto.locationLocality,
      locationStreet: dto.locationStreet,
      locationCity: dto.locationCity,
      locationState: dto.locationState,
      locationCountry: dto.locationCountry,
      locationPincode: dto.locationPincode,
      propertyType: dto.propertyType,
      propertyRelationship: dto.propertyRelationship,
      onLease: dto.onLease,
      totalRooms: dto.totalRooms,
      registerOnOTAs: dto.registerOnOTAs,
      commissionPercentToOTAs: dto.commissionPercentToOTAs,
      uploadIntroVideoUrl: introVideoUrl,
    };

    if (existing) {
      return this.prisma.propertyInfo.update({
        where: { userId },
        data,
      });
    }

    return this.prisma.propertyInfo.create({
      data,
    });
  }

  async getByUser(userId: string) {
    const record = await this.prisma.propertyInfo.findUnique({ where: { userId } });
    if (!record) {
      throw new NotFoundException('Property info not found');
    }
    return record;
  }
}
