import { NestFactory } from '@nestjs/core';
import { MailerModule } from './mailer.module';
import { EnvironmentService } from './infrastructure/environment/environment.service';
import { RMQ_SERVICES } from '@app/common/constants/rmq.constant';
import { ValidationPipe } from '@nestjs/common'
async function bootstrap() {
  const app = await NestFactory.create(MailerModule);
  app.useGlobalPipes(new ValidationPipe());
  const environmentService = app.get<EnvironmentService>(EnvironmentService)
  const microservice = app.connectMicroservice(environmentService.getRabbitMQOptions(RMQ_SERVICES.USERS))
  await app.startAllMicroservices()
  await app.listen(3002)

}
bootstrap();



