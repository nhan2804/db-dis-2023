import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { SheetsModule } from './sheets/sheets.module';
import { FilterMiddleware } from './middleware/filter.middleware';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { LocalStrategy } from './auth/strategy/auth.local';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/strategy/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/auth.guard';
import { ConfigModule } from '@nestjs/config';
import { DepartmentsModule } from './departments/departments.module';
import { DoctorsModule } from './doctors/doctors.module';
import { PatientsModule } from './patients/patients.module';
import { TicketsModule } from './tickets/tickets.module';
import { MedicalRecordsModule } from './medical-records/medical-records.module';
import { HospitalizationSlipModule } from './hospitalization-slip/hospitalization-slip.module';
import { MedicinesModule } from './medicines/medicines.module';
import { ServicesModule } from './services/services.module';
import { PrescriptionsModule } from './prescriptions/prescriptions.module';
import { BillsModule } from './bills/bills.module';
// const hostname = 'vmi819824.contaboserver.net';
@Module({
  imports: [
    SheetsModule,
    ProjectsModule,
    MongooseModule.forRoot(
      `mongodb://194.233.83.119:27017,194.233.83.119:27018,194.233.83.119:27019/?replicaSet=rs00&serverSelectionTimeoutMS=15000&connectTimeoutMS=10000`,
    ),
    AuthModule,
    UsersModule,
    PassportModule,
    JwtModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DepartmentsModule,

    DoctorsModule,
    PatientsModule,

    TicketsModule,
    MedicalRecordsModule,
    HospitalizationSlipModule,
    MedicinesModule,
    ServicesModule,
    PrescriptionsModule,
    BillsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/*');
    consumer
      .apply(FilterMiddleware)
      .exclude({ path: '/public/*', method: RequestMethod.ALL })
      .forRoutes('/*');
  }
}
