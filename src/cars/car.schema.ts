import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from 'src/users/user.schema';

export type CarDocument = HydratedDocument<Car>;

@Schema()
export class Car {
  @Prop()
  model: string;

  @Prop()
  year: number;

  @Prop()
  color: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;
}

export const CarSchema = SchemaFactory.createForClass(Car);