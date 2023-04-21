import { RmqService } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { RMQ_MESSAGES, RMQ_SERVICES } from './infrastructure/constants/rmq.constants';
import { EnvironmentService } from './infrastructure/environment/environment.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const environmentService = app.get<EnvironmentService>(EnvironmentService)
  app.connectMicroservice(environmentService.getRabbitMQOptions(RMQ_SERVICES.USERS))

  await app.startAllMicroservices()
}
bootstrap();
