import { 
    Controller, 
    Get,
    Post } from '@nestjs/common';
import { CarsService } from './car.service';

@Controller('car')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  async getAllCars() {
    return this.carsService.findAll();
  }

  @Post()
  async createCar(@Body() post: PostDto, @Req() req: RequestWithUser) {
    return this.carsService.create(post, req.user);
  }

}
