import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateOrderRequest } from './dto/create-order.request';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Get()
  getHello(): string {
    return this.ordersService.getHello();
  }

  @Post()
  craete(@Body() body: CreateOrderRequest) {
    return this.ordersService.create(body);
  }
}
