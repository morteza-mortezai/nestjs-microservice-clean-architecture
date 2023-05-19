import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { EnvironmentService } from './infrastructure/config/environment/environment.service';
import { GLOBAL_API_PREFIX } from './infrastructure/config/constants/app.constant';
import { GlobalExceptionFilter } from '@app/common/filter/exception.filter';
import { MicroserviceExceptionFilter } from '@app/common/filter/rpc-exception.filter';
import { RMQ_SERVICES } from '@app/common/constants/rmq.constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(GLOBAL_API_PREFIX)
  const environmentService = app.get<EnvironmentService>(EnvironmentService)

  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalFilters(new MicroserviceExceptionFilter());

  app.connectMicroservice(environmentService.getRabbitMQOptions(RMQ_SERVICES.USERS));
  await app.startAllMicroservices()
  // app.listen(environmentService.getAppPort())
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