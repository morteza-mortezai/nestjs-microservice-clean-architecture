import { Controller, Get, } from '@nestjs/common';
import { BillingService } from './billing.service';
import { MessagePattern, Payload, RmqContext, Ctx } from '@nestjs/microservices'
import { RmqService } from '@app/common'
import { RMQ_MESSAGES } from '../constants/rmq.constants';
import { Observable, from } from 'rxjs';
@Controller()
export class BillingController {
  constructor(
    private readonly billingService: BillingService,
    private readonly rmqService: RmqService
  ) { }

  @Get('u')
  getHello(): string {
    return this.billingService.getHello();
  }
  @MessagePattern(RMQ_MESSAGES.GET_USER_BY_ID)
  order(@Payload() data: number[], @Ctx() context: RmqContext): Observable<number> {
    this.billingService.order(data);
    // this.rmqService.ack(context)
    return from(data);
  }
}
