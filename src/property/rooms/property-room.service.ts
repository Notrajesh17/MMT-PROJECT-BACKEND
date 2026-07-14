// src/property/rooms/property-rooms.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreatePropertyRoomDto } from './dto/property-room.dto';

@Injectable()
export class PropertyRoomsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreatePropertyRoomDto, imageUrls: string[]) {
    return this.prisma.propertyRoom.create({
      data: {
        userId,
        roomTypeName: dto.roomTypeName,
        floorNumber: dto.floorNumber,
        totalRooms: dto.totalRooms,
        roomType: dto.roomType,
        bedType: dto.bedType,
        roomView: dto.roomView,
        smokingAllowed: dto.smokingAllowed,
        extraBedAllowed: dto.extraBedAllowed,
        amenities: dto.amenities,
        availabilityStart: dto.availabilityStart,
        availabilityEnd: dto.availabilityEnd,
        baseAdult: dto.baseAdult,
        maxAdult: dto.maxAdult,
        maxChildren: dto.maxChildren,
        maxOccupancy: dto.maxOccupancy,
        baseRate: dto.baseRate,
        extraAdultCharge: dto.extraAdultCharge,
        childCharge: dto.childCharge,
        totalRoomsInProperty: dto.totalRoomsInProperty,
        uploadRoomImageUrls: imageUrls,
      },
    });
  }

  async findAllByUser(userId: string) {
    const rooms = await this.prisma.propertyRoom.findMany({ where: { userId } });
    if (!rooms || rooms.length === 0) {
      throw new NotFoundException('No rooms found for this user');
    }
    return rooms;
  }
}
