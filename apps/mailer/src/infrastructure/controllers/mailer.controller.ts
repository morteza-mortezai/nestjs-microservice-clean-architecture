import { RMQ_MESSAGES } from '@app/common/constants/rmq.constant';
import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices'
@Controller()
export class MailerController {

  @EventPattern(RMQ_MESSAGES.NEW_USER_CREATED) // TODO : print user
  getHello(): string {
    console.log('hi********')
    return 'Hello'
  }
}
