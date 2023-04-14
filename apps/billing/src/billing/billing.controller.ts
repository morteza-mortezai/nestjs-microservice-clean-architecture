import { Controller, Get } from '@nestjs/common';
import { BillingService } from './billing.service';
import { EventPattern, Payload, RmqContext, Ctx } from '@nestjs/microservices'
import { RmqService } from '@app/common'
@Controller()
export class BillingController {
  constructor(
    private readonly billingService: BillingService,
    private readonly rmqService: RmqService
  ) { }

  @Get()
  getHello(): string {
    return this.billingService.getHello();
  }
  @EventPattern('order_created')
  order(@Payload() data: any, @Ctx() context: RmqContext) {
    this.billingService.order(data);
    this.rmqService.ack(context)
  }
}
