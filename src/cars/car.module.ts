import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CarsController } from './car.controller';
import { CarsService } from './car.service';
import { Car, CarSchema } from './Car.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Car.model, schema: CarSchema }])]
  ,
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}