import { Controller, Inject, Logger } from "@nestjs/common";
import { ClientProxy, EventPattern, MessagePattern, Payload } from "@nestjs/microservices";
import { CardCriteriaService } from "./service/card-rules.service";
import { PayerCardEligibilityService } from "./service/card-eligibility.service";
import { GoldCardingCriteriaDto } from "./dto/gold-carding-criteria.dto";
import { ProviderCptMetricService } from "./service/provider-cpt-metrics.service";
import { ProviderCptMetricsDto } from "./dto/provider-cpt-metrics.dto";
import { ProviderCptApprovalDto } from "./dto/provider-cpt-approval.dto";
import { CardEvaluationService } from "./service/card-evaluation.service";
import { sendError } from "src/helpers/request-response.utility";
import { GoldCardLevelService } from "./service/card-level.service";


@Controller()
export class GoldCardMicroServiceController {

    constructor(
        @Inject('NATS_SERVICE') private natsClient: ClientProxy,
        private cardCriteriaService: CardCriteriaService,
        private cardEligibilityService: PayerCardEligibilityService,
        private providerCptMetricService: ProviderCptMetricService,
        private cardEvaluationService: CardEvaluationService,
        private cardLevelService: GoldCardLevelService
    ) { }


    @MessagePattern('create_card_rules')
    createCardRules(@Payload() data: GoldCardingCriteriaDto | GoldCardingCriteriaDto[]) {
        return this.cardCriteriaService.create(data);
    }

    @MessagePattern('update_card_rules')
    updateCardRules(@Payload() data: GoldCardingCriteriaDto) {
        return this.cardCriteriaService.update(data);
    }

    @MessagePattern('delete_card_rules')
    deleteCardRules(@Payload() uuid: string) {
        return this.cardCriteriaService.delete(uuid);
    }


    @MessagePattern('save_provider_cpt_metrics')
    createCptMetrics(@Payload() data: ProviderCptMetricsDto | ProviderCptMetricsDto[]) {
        return this.providerCptMetricService.create(data);
    }

    @EventPattern('provider_cpt_approval_requested')
    async processProviderCPTApproval(@Payload() data: ProviderCptApprovalDto) {
        try {

            //TODO Save Provider CPT Metrics to compute later for evaulation (not in scope)
            const { cardEligibility } = await this.processCptApproval(data);

            //Update Cpt Approval status to provider
            this.natsClient.emit('update_cpt_approval',
                {
                    id: data.id,
                    approval_status: cardEligibility.is_eligible,
                    denial_reason: cardEligibility.reason,
                });

        } catch (error) {
            const statusCode = error.getStatus();
            const message = error.message;
            return sendError(message, statusCode);
        }
    }

    async processCptApproval(data: ProviderCptApprovalDto) {
        try {
            const previousCptMetrics = await this.providerCptMetricService.findBy({
                provider_id: data.provider_id,
                cpt_code: data.cpt_code
            });

            const cptMetricsCriteria = await this.cardCriteriaService.findBy({
                payer_id: data.payer_id,
                cpt_code: data.cpt_code
            });


            const { evaluation_results, cardEligibility, providerCardStatus } = this.cardEvaluationService.evaulateCptMetrics(cptMetricsCriteria, previousCptMetrics, { provider_id: data.provider_id, payer_id: data.payer_id, cpt_code: data.cpt_code });

            const promises = [
                this.cardEvaluationService.save(evaluation_results),
                this.cardEligibilityService.save(cardEligibility),
                this.cardLevelService.save(providerCardStatus),
            ];

            await Promise.all(promises);

            return { cardEligibility };

        } catch (error) {
            throw error;
        }
    }
}