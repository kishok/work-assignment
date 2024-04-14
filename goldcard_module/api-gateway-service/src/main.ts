import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RpcExceptionToHttpExceptionFilter } from './rpc-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new RpcExceptionToHttpExceptionFilter());
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT,()=>{
    console.log(`Running API Gateway Service on port ${PORT}`)
  });
}
bootstrap();
