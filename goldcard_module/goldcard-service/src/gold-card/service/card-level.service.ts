import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProviderGoldCardingStatus } from "../typeorm/entities/CardLevel";
import { ProviderGoldCardingStatusDto } from "../dto/provider-gold-carding-status.dto";



@Injectable()
export class GoldCardLevelService {

    constructor(@InjectRepository(ProviderGoldCardingStatus) private cardLevelRepository:Repository<ProviderGoldCardingStatusDto>){}

    save(cardLevelDto: ProviderGoldCardingStatusDto){
        const cardLevelEntities = this.cardLevelRepository.create(cardLevelDto);
        return this.cardLevelRepository.save(cardLevelEntities);
    }

    delete(uuid:string){
        return this.cardLevelRepository.delete(uuid);
    }


}