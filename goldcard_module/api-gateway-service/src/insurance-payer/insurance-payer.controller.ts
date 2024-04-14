import { Controller, Post, Inject, Body, Put, Delete, Param } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";


@Controller()
export class InsurancePayerController {
    
    constructor(@Inject('NATS_SERVICE') private natsClient:ClientProxy){}

    @Post('payer')
    createPayer(@Body() body) {
       return this.natsClient.send('create_payer',body);
    }

    @Put('payer')
    updatePayer(@Body() body) {
       return this.natsClient.send('update_payer',body);
    }

    @Delete('payer/:uuid')
    deletePayer(@Param('uuid') id) {
       return this.natsClient.send('delete_payer',id);
    }


    @Post('card_rules')
    createCardRules(@Body() body) {
       return this.natsClient.send('create_card_rules',body);
    }

    @Put('card_rules')
    updateCardRules(@Body() body) {
       return this.natsClient.send('update_card_rules',body);
    }

    @Delete('card_rules/:uuid')
    deleteCardRules(@Param('uuid') id) {
       return this.natsClient.send('delete_card_rules',id);
    }

    @Post('card_eligibility')
    createCardEligibility(@Body() body) {
       return this.natsClient.send('create_card_eligibility',body);
    }

    @Put('card_eligibility')
    updateCardEligibility(@Body() body) {
       return this.natsClient.send('update_card_eligibility',body);
    }

}