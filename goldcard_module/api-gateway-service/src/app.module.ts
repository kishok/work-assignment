import { Module } from '@nestjs/common';
import { EHRProviderModule } from './ehr-provider/ehr-provider.module';
import { InsurancePayerModule } from './insurance-payer/insurance-payer.module';
import { GoldCardModule } from './goldcard/goldcard.module';

@Module({
  imports: [
    EHRProviderModule,
    InsurancePayerModule,
    GoldCardModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
