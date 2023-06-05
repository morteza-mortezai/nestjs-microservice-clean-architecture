import { createProxyMiddleware } from 'http-proxy-middleware';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { EnvironmentService } from './infrastructure/environment/environment.service'
import { USERS_SERVICE_URL } from './infrastructure/constants/endpoint.constant'
import { GLOBAL_API_PREFIX } from './infrastructure/constants/app.constant'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(GLOBAL_API_PREFIX)
  const environmentService = app.get(EnvironmentService);

  // Proxy endpoints
  app.use('/api/user', createProxyMiddleware({
    target: USERS_SERVICE_URL,
    changeOrigin: true,
  }));


  await app.listen(environmentService.getAppPort());
}
bootstrap();
