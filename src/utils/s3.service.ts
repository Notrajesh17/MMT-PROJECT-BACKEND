// src/utils/s3.service.ts

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class S3Service {
  private s3: S3;
  private bucketName: string;

  constructor() {
    this.s3 = new S3({
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
    this.bucketName = process.env.AWS_S3_BUCKET_NAME!;

  }

  async uploadFile(fileBuffer: Buffer, originalName: string, folder: string): Promise<string> {
    const key = `${folder}/${uuidv4()}-${originalName}`;
    try {
      const uploadResult = await this.s3
        .upload({
          Bucket: this.bucketName,
          Key: key,
          Body: fileBuffer,
        })
        .promise();
      return uploadResult.Location;
    } catch (error) {
      throw new InternalServerErrorException('Failed to upload to S3');
    }
  }
}
