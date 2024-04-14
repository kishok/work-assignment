import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Payer } from "src/typeorm/entities/Payer";
import { PayerDto } from "../dto/payer.dto";


@Injectable()
export class PayerService {

    constructor(@InjectRepository(Payer) private payerRepository:Repository<any>){}

    create(payerDto: PayerDto | PayerDto[]){
        const payerEntities = Array.isArray(payerDto) ? payerDto.map(item => this.payerRepository.create(item)) : this.payerRepository.create(payerDto);
        return this.payerRepository.save(payerEntities);
    }

    update(payerDto:PayerDto){
        const payerEntity = this.payerRepository.create(payerDto);
        return this.payerRepository.update({ id : payerDto.id } ,payerEntity);
    }

    delete(uuid:string){
        return this.payerRepository.delete(uuid);
    }

}