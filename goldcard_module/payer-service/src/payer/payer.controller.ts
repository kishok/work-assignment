import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { PayerDto } from "./dto/payer.dto";
import { PayerService } from "./service/payer.service";


@Controller()
export class PayerMicroServiceController {

    constructor(private payerService:PayerService){}

    @MessagePattern('create_payer')
    createPayer(@Payload() data:PayerDto | PayerDto[]){
        return this.payerService.create(data);
    }

    @MessagePattern('update_payer')
    updatePayer(@Payload() data:PayerDto){
        return this.payerService.update(data);
    }

    @MessagePattern('delete_payer')
    deletePayer(@Payload() uuid:string){
        return this.payerService.delete(uuid);
    }

}