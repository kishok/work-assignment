import { Module } from "@nestjs/common";
import { GoldCardController } from "./goldcard.controller";
import { NatsClientModule } from "src/nats-client/nats-client.module";


@Module({
    imports:[NatsClientModule],
    controllers: [GoldCardController],
    providers: []
})
export class GoldCardModule {}