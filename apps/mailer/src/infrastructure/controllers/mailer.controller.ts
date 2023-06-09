import { RMQ_EVENTS } from '@app/common/constants/rmq.constant';
import { Controller, Inject } from '@nestjs/common';
import { EventPattern, Payload, Ctx, RmqContext } from '@nestjs/microservices'
import { UsecaseProxyModule } from '../usecase-proxy/usecase-proxy.module';
import { UserM } from '../../domain/model/user';
import { UsecaseProxy } from '../usecase-proxy/usecase-proxy';
import { ConfirmMailUsecase } from '../../usecase/sendConfirmMail.usecase'
@Controller()
export class MailerController {
  constructor(
    @Inject(UsecaseProxyModule.SEND_CONFIRM_EMAIL_USECASES_PROXY)
    private readonly confirmMailUsecase: UsecaseProxy<ConfirmMailUsecase>,
  ) { }
  @EventPattern(RMQ_EVENTS.NEW_USER_CREATED)
  async sendConfirmationMail(@Payload() newUser: UserM, @Ctx() context: RmqContext) {
    const result = await this.confirmMailUsecase.getInstance().sendEmail(newUser)
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);
    return result
  }
}
