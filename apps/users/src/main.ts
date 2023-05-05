import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { RMQ_SERVICES } from '@app/common/constants/rmq.constant';
import { EnvironmentService } from './infrastructure/config/environment/environment.service';
import { GLOBAL_API_PREFIX } from './infrastructure/config/constants/app.constant';
import { GlobalExceptionFilter } from '@app/common/filter/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(GLOBAL_API_PREFIX)
  const environmentService = app.get<EnvironmentService>(EnvironmentService)
  app.connectMicroservice(environmentService.getRabbitMQOptions(RMQ_SERVICES.USERS))
  app.useGlobalFilters(new GlobalExceptionFilter());
  await app.startAllMicroservices()
  app.listen(environmentService.getAppPort())

}
bootstrap();

// const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
//   transport: Transport.RMQ,
//   options: {
//     urls: ['amqp://localhost:5672'],
//     queue: 'users',
//     queueOptions: {
//       durable: true
//     },
//   },
// });
// await app.listen();

// const app = await NestFactory.create(AppModule);
// app.connectMicroservice({
//   transport: Transport.TCP,
//   options: {
//     port: 3001,
//   },
// });
// await app.startAllMicroservices();
// await app.listen(3001);