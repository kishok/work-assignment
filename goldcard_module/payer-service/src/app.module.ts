import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InsurancePayerModule } from './payer/payer.module';
import { Payer } from './typeorm/entities/Payer';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      database: process.env.POSTGRES_DB,
      entities: [Payer],
      logging: true,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      synchronize: false
    }), 
    InsurancePayerModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
