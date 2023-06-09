import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { EnvironmentService } from './infrastructure/environment/environment.service'
import { GLOBAL_API_PREFIX } from './infrastructure/constants/app.constant'
import { GlobalExceptionFilter } from '@app/common/filter/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(GLOBAL_API_PREFIX)
  const environmentService = app.get(EnvironmentService);
  app.useGlobalFilters(new GlobalExceptionFilter());
  await app.listen(environmentService.getAppPort());
}
bootstrap();
