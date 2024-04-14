import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CptCodeDto } from "../dto/cpt-code.dto";
import { CptCode } from "src/ehr-provider/typeorm/entities/CptCodes";



@Injectable()
export class EHRCptCodeService {

    constructor(@InjectRepository(CptCode) private cptCodeRepository:Repository<any>){}

    create(cptCodeDto: CptCodeDto | CptCodeDto[]){
        const cptCodeEntities = Array.isArray(cptCodeDto) ? cptCodeDto.map(item => this.cptCodeRepository.create(item)) : this.cptCodeRepository.create(cptCodeDto);
        return this.cptCodeRepository.save(cptCodeEntities);
    }

    update(cptCodeDto:CptCodeDto){
        const cptCodeEntity = this.cptCodeRepository.create(cptCodeDto);
        return this.cptCodeRepository.update({ code : cptCodeDto.code } ,cptCodeEntity);
    }

    delete(uuid:string){
        return this.cptCodeRepository.delete(uuid);
    }

}