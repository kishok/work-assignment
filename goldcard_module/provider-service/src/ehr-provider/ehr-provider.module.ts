import { Module } from "@nestjs/common";
import { EHRProviderMicroServiceController } from "./ehr-provider.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Provider } from "src/ehr-provider/typeorm/entities/Provider";
import { EHRProviderService } from "./services/provider.service";
import { EHRCptCodeService } from "./services/cpt-code.service";
import { CptCode } from "src/ehr-provider/typeorm/entities/CptCodes";
import { ProviderCptApproval } from "src/ehr-provider/typeorm/entities/CptApproval";
import { EHRCptApprovalService } from "./services/cpt_approval.service";
import { NatsClientModule } from "src/nats-client/nats-client.module";


@Module({
    imports:[TypeOrmModule.forFeature([Provider,CptCode,ProviderCptApproval]),NatsClientModule],
    controllers: [EHRProviderMicroServiceController],
    providers: [EHRProviderService,EHRCptCodeService,EHRCptApprovalService]
})
export class EHRProviderModule {}