import { Body, Controller, Inject, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";


@Controller()
export class GoldCardController {
    
    constructor(@Inject('NATS_SERVICE') private natsClient:ClientProxy){}

    @Post('cpt_metrics')
    saveProviderCptMetrics(@Body() body) {
       return this.natsClient.send('save_provider_cpt_metrics',body);
    }
    
}