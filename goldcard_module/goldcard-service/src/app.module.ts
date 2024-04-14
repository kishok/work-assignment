import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoldCardModule } from './gold-card/gold-card.module';
import { GoldCardingCriteria } from './gold-card/typeorm/entities/CardCriteria';
import { PayerGoldCardingEligibility } from './gold-card/typeorm/entities/CardEligibility';
import { ProviderCptMetrics } from './gold-card/typeorm/entities/ProviderCptMetrics';
import { ProviderGoldCardingStatus } from './gold-card/typeorm/entities/CardLevel';
import { GoldCardingEvaluationResults } from './gold-card/typeorm/entities/CardEvaluationResults';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      database: process.env.POSTGRES_DB,
      entities: [ GoldCardingCriteria,
        PayerGoldCardingEligibility,
        ProviderCptMetrics,
        ProviderGoldCardingStatus,
        GoldCardingEvaluationResults],
      logging: true,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD
    }), 
    GoldCardModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
