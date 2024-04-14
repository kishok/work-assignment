import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule,{
    transport:Transport.NATS,
    options:{
      servers: ['nats://nats']
    }
  });
  app.useGlobalPipes(new ValidationPipe({
    skipMissingProperties: true,
    exceptionFactory: (validationErrors: ValidationError[] = []) => {
      console.log(validationErrors);
      return new BadRequestException('Input Validation Failed...');
    },
  }));
  await app.listen();
}
bootstrap();