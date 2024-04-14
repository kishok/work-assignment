import { Module } from "@nestjs/common";
import { NatsClientModule } from "src/nats-client/nats-client.module";
import { InsurancePayerController } from "./insurance-payer.controller";


@Module({
    imports:[NatsClientModule],
    controllers: [InsurancePayerController],
    providers: []
})
export class InsurancePayerModule {}