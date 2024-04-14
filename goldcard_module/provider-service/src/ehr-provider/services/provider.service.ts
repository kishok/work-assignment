import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Provider } from "src/ehr-provider/typeorm/entities/Provider";
import { Repository } from "typeorm";
import { ProviderDto } from "../dto/provider.dto";


@Injectable()
export class EHRProviderService {

    constructor(@InjectRepository(Provider) private providerRepository:Repository<any>){}

    create(providerDto: ProviderDto | ProviderDto[]){
        const providerEntities = Array.isArray(providerDto) ? providerDto.map(item => this.providerRepository.create(item)) : this.providerRepository.create(providerDto);
        return this.providerRepository.save(providerEntities);
    }

    update(providerDto:ProviderDto){
        const providerEntity = this.providerRepository.create(providerDto);
        return this.providerRepository.update({ provider_id : providerDto.provider_id } ,providerEntity);
    }

    delete(uuid:string){
        return this.providerRepository.delete(uuid);
    }

}