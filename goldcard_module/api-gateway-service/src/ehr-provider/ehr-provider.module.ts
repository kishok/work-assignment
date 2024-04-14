import { Module } from "@nestjs/common";
import { EHRProviderController } from "./ehr-provider.controller";
import { NatsClientModule } from "src/nats-client/nats-client.module";


@Module({
    imports:[NatsClientModule],
    controllers: [EHRProviderController],
    providers: []
})
export class EHRProviderModule {}