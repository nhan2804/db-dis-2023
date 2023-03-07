import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiceSchema } from './entities/service.entity';

@Module({
  controllers: [ServicesController],
  providers: [ServicesService],
  imports: [
    MongooseModule.forFeature([
      {
        name: ServicesModule.name,
        schema: ServiceSchema,
      },
    ]),
  ],
})
export class ServicesModule {}
