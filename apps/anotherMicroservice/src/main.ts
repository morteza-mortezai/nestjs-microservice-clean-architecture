import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);


  const microservice = app.connectMicroservice({
    Transport: Transport.RMQ,

  })

  await app.startAllMicroservices()
  await app.listen(3002)
  console.log('app is run on', 3002)
}
bootstrap();
