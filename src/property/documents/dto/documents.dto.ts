// src/property/documents/dto/documents.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

export enum DocumentCategory {
  LEGAL = 'Legal Docs',
  OWNERSHIP = 'Ownership/Lease',
  ID_PROOF = 'ID Proof',
  FINANCIAL = 'Financial Docs',
  COMPLIANCE = 'Compliance',
  CERTIFICATIONS = 'Certifications',
  SPECIAL_LICENSES = 'Special Licenses',
}

export class UploadDocumentDto {
  @ApiProperty({
    enum: DocumentCategory,
    enumName: 'DocumentCategory',
    description: 'Category of the document',
  })
  @IsEnum(DocumentCategory)
  @IsNotEmpty()
  category: DocumentCategory;

  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
