import { Controller, Inject } from "@nestjs/common";
import { ClientProxy, EventPattern, MessagePattern, Payload } from "@nestjs/microservices";
import { ProviderDto } from "./dto/provider.dto";
import { EHRProviderService } from "./services/provider.service";
import { EHRCptCodeService } from "./services/cpt-code.service";
import { CptCodeDto } from "./dto/cpt-code.dto";
import { ProviderCptApprovalDto } from "./dto/provider-cpt-approval.dto";
import { EHRCptApprovalService } from "./services/cpt_approval.service";


@Controller()
export class EHRProviderMicroServiceController {

    constructor(
        @Inject('NATS_SERVICE') private natsClient: ClientProxy,
        private providerService:EHRProviderService,
        private cptCodeService: EHRCptCodeService,
        private cptApprovalService: EHRCptApprovalService
        ){}

    @MessagePattern('create_provider')
    createProvider(@Payload() data:ProviderDto | ProviderDto[]){
        return this.providerService.create(data);
    }

    @MessagePattern('update_provider')
    updateProvider(@Payload() data:ProviderDto){
        return this.providerService.update(data);
    }

    @MessagePattern('delete_provider')
    deleteProvider(@Payload() uuid:string){
        return this.providerService.delete(uuid);
    }

    @MessagePattern('create_cpt_code')
    createCptCode(@Payload() data:CptCodeDto | CptCodeDto[]){
        return this.cptCodeService.create(data);
    }

    @MessagePattern('update_cpt_code')
    updateCptCode(@Payload() data:CptCodeDto){
        return this.cptCodeService.update(data);
    }

    @MessagePattern('delete_cpt_code')
    deleteCptCode(@Payload() uuid:string){
        return this.cptCodeService.delete(uuid);
    }

    @EventPattern('create_cpt_approval')
    async createCptApproval(@Payload() data: ProviderCptApprovalDto | ProviderCptApprovalDto[]){
        const newApprovalRequest = await this.cptApprovalService.create(data);
        if(newApprovalRequest){
            this.natsClient.emit('provider_cpt_approval_requested',newApprovalRequest);
        }
        
        return newApprovalRequest;
    }

    @EventPattern('update_cpt_approval')
    updateCptApproval(@Payload() data:ProviderCptApprovalDto){
        return this.cptApprovalService.update(data);
    }
}