import { RmqService } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { RMQ_SERVICE } from './constants/rmq.constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const rmqService = app.get<RmqService>(RmqService)
  app.connectMicroservice(rmqService.getOptions('BILLING'))

  await app.startAllMicroservices()
}
bootstrap();
