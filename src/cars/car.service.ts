import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Car, CarDocument } from './Car.schema';

@Injectable()
export class CarsService {
  constructor(
    @InjectModel(Car.name) private carsModel: Model<CarDocument>,
  ) {}

  
  async findAll() {
    const findQuery = this.carsModel
      .find()
      .sort({ _id: 1 })
      .populate('author');

    const results = await findQuery;

    return { results};
  }
  
  async create(CarData: CarDto, author: User) {
    const createdCar = new this.carsModel({
      ...CarData,
      author,
    });
    await createdCar.populate('categories').populate('series').execPopulate();
    return createdCar.save();
  }
}
