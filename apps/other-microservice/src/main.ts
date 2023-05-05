import { NestFactory } from '@nestjs/core';
import { OtherMicroserviceModule } from './other-microservice.module';
import { EnvironmentService } from './environment/environment.service';
import { RMQ_SERVICES } from '@app/common/constants/rmq.constant';

async function bootstrap() {
  const app = await NestFactory.create(OtherMicroserviceModule);

  const environmentService = app.get<EnvironmentService>(EnvironmentService)

  const microservice = app.connectMicroservice(environmentService.getRabbitMQOptions(RMQ_SERVICES.USERS))

  await app.startAllMicroservices()
  await app.listen(3002)
}
bootstrap();
