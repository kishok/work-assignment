import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GoldCardingCriteria } from "../typeorm/entities/CardCriteria";
import { GoldCardingCriteriaDto } from "../dto/gold-carding-criteria.dto";


@Injectable()
export class CardCriteriaService {

    constructor(@InjectRepository(GoldCardingCriteria) private cardCriteriaRepository:Repository<any>){}

    create(cardCriteriaDto: GoldCardingCriteriaDto | GoldCardingCriteriaDto[]){
        const cardCriteriaEntities = Array.isArray(cardCriteriaDto) ? cardCriteriaDto.map(item => this.cardCriteriaRepository.create(item)) : this.cardCriteriaRepository.create(cardCriteriaDto);
        return this.cardCriteriaRepository.save(cardCriteriaEntities);
    }

    update(cardCriteriaDto:GoldCardingCriteriaDto){
        const cardCriteriaEntity = this.cardCriteriaRepository.create(cardCriteriaDto);
        return this.cardCriteriaRepository.update({ criteria_id : cardCriteriaDto.criteria_id } ,cardCriteriaEntity);
    }

    delete(uuid:string){
        return this.cardCriteriaRepository.delete(uuid);
    }

    findBy(payerCpt: { 'payer_id': string , 'cpt_code': string }){
        return this.cardCriteriaRepository.findBy(payerCpt);
    }

}