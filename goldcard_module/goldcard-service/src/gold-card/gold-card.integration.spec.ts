/**
 * * Dependencies
 */
import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { GoldCardMicroServiceController } from './gold-card.controller';
import { ProviderCptApprovalDto } from './dto/provider-cpt-approval.dto';
import { GoldCardModule } from './gold-card.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoldCardingCriteria } from './typeorm/entities/CardCriteria';
import { PayerGoldCardingEligibility } from './typeorm/entities/CardEligibility';
import { ProviderCptMetrics } from './typeorm/entities/ProviderCptMetrics';
import { ProviderGoldCardingStatus } from './typeorm/entities/CardLevel';
import { GoldCardingEvaluationResults } from './typeorm/entities/CardEvaluationResults';

describe('Gold Card Module Integration', () => {
  let controller: GoldCardMicroServiceController;

  // * connect to db
  beforeAll(async () => {

    const goldCardModule: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: '172.20.0.2',
            port: 5432,
            database: 'healthcare_db',
            entities: [ GoldCardingCriteria,
              PayerGoldCardingEligibility,
              ProviderCptMetrics,
              ProviderGoldCardingStatus,
              GoldCardingEvaluationResults],
            logging: true,
            username: 'kishok',
            password: 'pg$236',
            synchronize: false
        }), 
       GoldCardModule
      ]
    }).compile();

    controller = goldCardModule.get<GoldCardMicroServiceController>(GoldCardMicroServiceController);
  });

  describe('CRUD User', () => {
    const payload: ProviderCptApprovalDto = {
        "provider_id": "f527d6b3-eb4f-4c97-bd78-d4a86b1c42bb",
        "cpt_code": "94321",
        "readmission": false,
        "treatment_guideline_adherence": true,
        "patient_satisfaction" : 7,
        "recovery_rate": 8,
        "cost_efficiency": 6, 
        "submission_date" : "2024-04-14",
        "payer_id":"e7e0b516-e74e-4323-a086-532ede344fc0"
    }

    // * create user
    it('Should evaluate the Provider Performance Metrics with gold card criteria', async () => {
      const startTime: number = Date.now();

      const res: any = await controller.processCptApproval(payload);

      expect(typeof res.cardEligibility.is_eligible === 'boolean').toBeTruthy();
    
    });

 
  });
});