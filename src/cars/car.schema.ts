import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from 'src/users/user.schema';

export type CatDocument = HydratedDocument<Car>;

@Schema()
export class Car {
  @Prop()
  model: string;

  @Prop()
  year: number;

  @Prop()
  color: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
  owner: User;
}

export const CatSchema = SchemaFactory.createForClass(Car);