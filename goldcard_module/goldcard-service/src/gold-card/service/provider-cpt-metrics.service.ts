import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProviderCptMetrics } from "../typeorm/entities/ProviderCptMetrics";
import { ProviderCptMetricsDto } from "../dto/provider-cpt-metrics.dto";


@Injectable()
export class ProviderCptMetricService {

    constructor(@InjectRepository(ProviderCptMetrics) private cptMetricRepository:Repository<any>){}

    create(providerCptMetricsDto: ProviderCptMetricsDto | ProviderCptMetricsDto[]){
        const CptMetricEntities = Array.isArray(providerCptMetricsDto) ? providerCptMetricsDto.map(item => this.cptMetricRepository.create(item)) : this.cptMetricRepository.create(providerCptMetricsDto);
        return this.cptMetricRepository.save(CptMetricEntities);
    }

    findBy(providerCpt: { 'provider_id': string , 'cpt_code': string }){
        return this.cptMetricRepository.findBy(providerCpt);
    }


}