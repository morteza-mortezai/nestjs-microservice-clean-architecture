import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { EnvironmentService } from './infrastructure/config/environment/environment.service';
import { GLOBAL_API_PREFIX } from './infrastructure/config/constants/app.constant';
import { RMQ_SERVICES } from '@app/common/constants/rmq.constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(GLOBAL_API_PREFIX)
  const environmentService = app.get<EnvironmentService>(EnvironmentService)
  app.connectMicroservice(environmentService.getRabbitMQOptions(RMQ_SERVICES.USERS));
  await app.startAllMicroservices()
}
bootstrap();

