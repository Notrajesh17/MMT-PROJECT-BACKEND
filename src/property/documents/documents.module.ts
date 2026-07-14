// src/property/documents/documents.module.ts

import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { PrismaService } from '../../prisma.service';
import { S3Service } from '../../utils/s3.service';

@Module({
  controllers: [DocumentsController],
  providers: [DocumentsService, PrismaService, S3Service],
})
export class DocumentsModule {}
