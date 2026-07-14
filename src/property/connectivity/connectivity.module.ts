// src/property/connectivity/connectivity.module.ts

import { Module } from '@nestjs/common';
import { ConnectivityService } from './connectivity.service';
import { ConnectivityController } from './connectivity.controller';
import { PrismaService } from '../../prisma.service';

@Module({
  controllers: [ConnectivityController],
  providers: [ConnectivityService, PrismaService],
})
export class ConnectivityModule {}
