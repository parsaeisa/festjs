import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<Car>;

@Schema()
export class Car {
  @Prop()
  model: string;

  @Prop()
  year: number;

  @Prop()
  color: string;
}

export const CatSchema = SchemaFactory.createForClass(Car);