import { NestFactory } from '@nestjs/core';
import { MailerModule } from './mailer.module';
import { EnvironmentService } from './infrastructure/environment/environment.service';
import { RMQ_SERVICES } from '@app/common/constants/rmq.constant';
import { ValidationPipe } from '@nestjs/common'
import { MicroserviceExceptionFilter } from '@app/common/filter/rpc-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(MailerModule);
  app.useGlobalPipes(new ValidationPipe());
  const environmentService = app.get<EnvironmentService>(EnvironmentService)
  app.useGlobalFilters(new MicroserviceExceptionFilter());
  app.connectMicroservice(environmentService.getRabbitMQOptions(RMQ_SERVICES.MAILER))
  await app.startAllMicroservices()
  await app.listen(3002)

}
bootstrap();



