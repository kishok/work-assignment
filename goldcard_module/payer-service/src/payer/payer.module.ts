import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Payer } from "src/typeorm/entities/Payer";
import { PayerMicroServiceController } from "./payer.controller";
import { PayerService } from "./service/payer.service";


@Module({
    imports:[TypeOrmModule.forFeature([Payer])],
    controllers: [PayerMicroServiceController],
    providers: [PayerService]
})
export class InsurancePayerModule {}