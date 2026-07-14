// src/property/documents/documents.service.ts

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { UploadDocumentDto, DocumentCategory } from './dto/documents.dto';

@Injectable()
export class DocumentsService {
  constructor(private readonly prisma: PrismaService) {}

  async upload(userId: string, dto: UploadDocumentDto, fileUrl: string) {
    try {
      return this.prisma.document.create({
        data: {
          userId,
          category: dto.category,
          fileUrl,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error saving document record');
    }
  }

  async getByUser(userId: string) {
    return this.prisma.document.findMany({ where: { userId } });
  }
}
