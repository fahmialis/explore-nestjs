import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // add logger
  const logger = new Logger();

  logger.log(
    `<<<<<<<<<<<<<<listening on port ${process.env.PORT}>>>>>>>>>>>>>>`,
  );

  // run pipes
  app.useGlobalPipes(new ValidationPipe());

  // enable app level interceptor
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(process.env.PORT);
}
bootstrap();
