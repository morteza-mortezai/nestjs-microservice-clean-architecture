import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { EnvironmentService } from './infrastructure/environment/environment.service';
import { GLOBAL_API_PREFIX } from './infrastructure/constants/app.constant'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(GLOBAL_API_PREFIX)
  const environmentService = app.get(EnvironmentService);
  // TODO use 
  await app.listen(environmentService.getAppPort());
}
bootstrap();
