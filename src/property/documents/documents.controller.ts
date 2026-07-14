// src/property/documents/documents.controller.ts

import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Get,
  Param,
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { UploadDocumentDto } from './dto/documents.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from '../../utils/s3.service';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiConsumes, ApiBody, ApiResponse } from '@nestjs/swagger';
import { UserId } from '../../common/decorators/user.decorator';

@ApiTags('Property Documents')
@ApiBearerAuth('JWT')
@Controller('api/property/documents')
export class DocumentsController {
  constructor(
    private readonly documentsService: DocumentsService,
    private readonly s3Service: S3Service,
  ) {}

@Post()
@ApiOperation({ summary: 'Upload a document' })
@ApiConsumes('multipart/form-data')
@ApiBody({ type: UploadDocumentDto })  // ✅ Automatically uses the DTO schema
@UseInterceptors(FileInterceptor('file'))
@ApiResponse({ status: 201, description: 'Document uploaded.' })
async upload(
  @UserId() userId: string,
  @Body() dto: UploadDocumentDto,
  @UploadedFile() file: Express.Multer.File,
) {
  const fileUrl = await this.s3Service.uploadFile(file.buffer, file.originalname, 'documents');
  const result = await this.documentsService.upload(userId, dto, fileUrl);
  return { data: result };
}


  @Get(':userId')
  @ApiOperation({ summary: 'Get all documents for a user' })
  @ApiResponse({ status: 200, description: 'Documents fetched.' })
  async getByUser(@Param('userId') userId: string) {
    const docs = await this.documentsService.getByUser(userId);
    return { data: docs };
  }
}
