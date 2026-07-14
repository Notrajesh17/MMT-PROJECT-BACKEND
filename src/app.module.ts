// src/app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma.module';
import { AuthModule } from './auth/auth.module';

import { PropertyInfoModule } from './property/info/property-info.module';
import { PropertyRoomsModule } from './property/rooms/property-room.module';
import { ConnectivityModule } from './property/connectivity/connectivity.module';
import { PropertyUspModule } from './property/usp/property-usp.module';
import { AmenitiesModule } from './property/amenities/amenities.module';
import { MandatoryAmenitiesModule } from './property/amenities/mandatory-amenities.module';
import { DocumentsModule } from './property/documents/documents.module';
import { PropertyRulesModule } from './property/rules/property-rules.module';
import { PropertyStatusModule } from './property/status/property-status.module';
import { PropertySubmitModule } from './property/submit/property-submit.module';

import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard'; // Already implemented in your code

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,       // <-- Make PrismaService globally available
    AuthModule,         // <-- Our authentication module
    PropertyInfoModule,
    PropertyRoomsModule,
    ConnectivityModule,
    PropertyUspModule,
    AmenitiesModule,
    MandatoryAmenitiesModule,
    DocumentsModule,
    PropertyRulesModule,
    PropertyStatusModule,
    PropertySubmitModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // Protect ALL routes by default
    },
  ],
})
export class AppModule {}
