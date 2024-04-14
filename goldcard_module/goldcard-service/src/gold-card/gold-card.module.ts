import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GoldCardMicroServiceController } from "./gold-card.controller";
import { CardCriteriaService } from "./service/card-rules.service";
import { PayerCardEligibilityService } from "./service/card-eligibility.service";
import { GoldCardingCriteria } from "./typeorm/entities/CardCriteria";
import { PayerGoldCardingEligibility } from "./typeorm/entities/CardEligibility";
import { NatsClientModule } from "src/nats-client/nats-client.module";
import { ProviderCptMetricService } from "./service/provider-cpt-metrics.service";
import { ProviderCptMetrics } from "./typeorm/entities/ProviderCptMetrics";
import { CardEvaluationService } from "./service/card-evaluation.service";
import { ProviderGoldCardingStatus } from "./typeorm/entities/CardLevel";
import { GoldCardingEvaluationResults } from "./typeorm/entities/CardEvaluationResults";
import { GoldCardLevelService } from "./service/card-level.service";


@Module({
    imports: [
        TypeOrmModule.forFeature([
            GoldCardingCriteria,
            PayerGoldCardingEligibility,
            ProviderCptMetrics,
            ProviderGoldCardingStatus,
            GoldCardingEvaluationResults
        ]), NatsClientModule],
    controllers: [GoldCardMicroServiceController],
    providers: [CardCriteriaService,
        PayerCardEligibilityService,
        ProviderCptMetricService,
        GoldCardLevelService,
        CardEvaluationService]
})
export class GoldCardModule { }