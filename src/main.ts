import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExecptionFilter } from './filters/http-execption/http-execption.filter';
import { TransformInterceptor } from './interceptor/transform/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExecptionFilter());

  await app.listen(3000);
}
bootstrap();
