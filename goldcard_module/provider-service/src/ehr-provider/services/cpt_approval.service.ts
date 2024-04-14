import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProviderCptApproval } from "src/ehr-provider/typeorm/entities/CptApproval";
import { ProviderCptApprovalDto } from "../dto/provider-cpt-approval.dto";

@Injectable()
export class EHRCptApprovalService {

    constructor(@InjectRepository(ProviderCptApproval) private cptApprovalRepository:Repository<any>){}

    create(cptApprovalDto: ProviderCptApprovalDto | ProviderCptApprovalDto[]){
        const cptApprovalEntities = Array.isArray(cptApprovalDto) ? cptApprovalDto.map(item => this.cptApprovalRepository.create(item)) : this.cptApprovalRepository.create(cptApprovalDto);
        return this.cptApprovalRepository.save(cptApprovalEntities);
    }

    update(cptApprovalDto:ProviderCptApprovalDto){
        const cptApprovalEntity = this.cptApprovalRepository.create(cptApprovalDto);
        return this.cptApprovalRepository.update({ id : cptApprovalDto.id } ,cptApprovalEntity);
    }


}