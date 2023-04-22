import { createProxyMiddleware } from 'http-proxy-middleware';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { EnvironmentService } from './infrastructure/environment/environment.service'
import { USER_ENDPOINTS } from './infrastructure/constants/endpoint.constant'
import { GLOBAL_API_PREFIX } from './infrastructure/constants/app.constant'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(GLOBAL_API_PREFIX)
  const environmentService = app.get(EnvironmentService);
  // TODO use 

  //
  const USERS_SERVICE_URL = "http://localhost:3331";

  // Proxy endpoints
  app.use('/api/user', createProxyMiddleware({
    target: "http://localhost:3001",
    changeOrigin: true,
  }));


  await app.listen(environmentService.getAppPort());
}
bootstrap();
