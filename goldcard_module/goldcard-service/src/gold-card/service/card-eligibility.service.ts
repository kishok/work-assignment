import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PayerGoldCardingEligibility } from "../typeorm/entities/CardEligibility";
import { PayerGoldCardingEligibilityDto } from "../dto/payer-gold-carding-eligility.dto";



@Injectable()
export class PayerCardEligibilityService {

    constructor(@InjectRepository(PayerGoldCardingEligibility) private cardEligibilityRepository:Repository<any>){}

    save(cardEligibilityDto: PayerGoldCardingEligibilityDto | PayerGoldCardingEligibilityDto[]){
        const cardEligibilityEntities = Array.isArray(cardEligibilityDto) ? cardEligibilityDto.map(item => this.cardEligibilityRepository.create(item)) : this.cardEligibilityRepository.create(cardEligibilityDto);
        return this.cardEligibilityRepository.save(cardEligibilityEntities);
    }

    delete(uuid:string){
        return this.cardEligibilityRepository.delete(uuid);
    }

}