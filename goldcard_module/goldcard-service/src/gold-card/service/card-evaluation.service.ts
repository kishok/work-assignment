import { Injectable, Logger } from "@nestjs/common";
import { GoldCardingCriteriaDto } from "../dto/gold-carding-criteria.dto";
import { ProviderCptMetricsDto } from "../dto/provider-cpt-metrics.dto";
import { Criteria_Reasons, determineLevel } from "../criteria-helper";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GoldCardingEvaluationResults } from "../typeorm/entities/CardEvaluationResults";
import { GoldCardingEvaluationResultsDto } from "../dto/gold-carding-evaluation-results.dto";

@Injectable()
export class CardEvaluationService {

    constructor(@InjectRepository(GoldCardingEvaluationResults) private cardEvaluationRepository:Repository<any>) { }


    evaulateCptMetrics(rules: GoldCardingCriteriaDto[], performanceMetrics: ProviderCptMetricsDto[], metaData: { provider_id: string, payer_id: string, cpt_code: string }) {

        let evaluation_results = [];

        for (const criteria of rules) {

            const matchFound = performanceMetrics.find(m => m.metric == criteria.metric);

            if (matchFound) {
                evaluation_results.push({
                    provider_id: metaData.provider_id,
                    criteria_id: criteria.criteria_id,
                    evaluation_date: new Date().toISOString(),
                    meets_criteria: matchFound.value == criteria.threshold,
                    actual_value: matchFound.value
                });
            }

        }

        //cardEligibility 

        if (evaluation_results.length == 0) {
            return;
        }

        const isAnyCriteriaMet = evaluation_results.some(p => p.meets_criteria);

        const cardEligibility = {
            payer_id: metaData.payer_id,
            provider_id: metaData.provider_id,
            cpt_code: metaData.cpt_code,
            is_eligible: isAnyCriteriaMet,
            reason: isAnyCriteriaMet ? null : Criteria_Reasons[rules[0].metric]
        }

        //provider cardStatus 
        const [withoutTime] = new Date().toISOString().split('T');
        const providerCardStatus = {
            provider_id: metaData.provider_id,
            criteria_met: isAnyCriteriaMet,
            gold_carding_level: determineLevel(evaluation_results, 'meets_criteria', true),
            valid_from: withoutTime,
            valid_until: withoutTime
        }

        return { evaluation_results, cardEligibility, providerCardStatus };

    }

    save(cardEvaluationDto: GoldCardingEvaluationResultsDto | GoldCardingEvaluationResultsDto[]){
        const cardEvaluationEntities = Array.isArray(cardEvaluationDto) ? cardEvaluationDto.map(item => this.cardEvaluationRepository.create(item)) : this.cardEvaluationRepository.create(cardEvaluationDto);
        return this.cardEvaluationRepository.save(cardEvaluationEntities);
    }

    delete(uuid:string){
        return this.cardEvaluationRepository.delete(uuid);
    }


}