import { Inject, Injectable } from '@nestjs/common';
import { BILLING_SERVICE } from './constants/services';
import { CreateOrderRequest } from './dto/create-order.request';
import { OrderRepository } from './orders.repository';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs'
@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepository: OrderRepository,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy
  ) { }

  getHello(): string {
    return 'Hello World!';
  }

  async create(createOrderRequest: CreateOrderRequest) {
    try {
      const order = await this.orderRepository.create(createOrderRequest)
      await lastValueFrom(this.billingClient.emit('order_created', order))
    } catch (error) {
      console.log('error in order service', error)
    }
  }

}
