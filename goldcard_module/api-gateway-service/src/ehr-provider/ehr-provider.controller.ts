import { Controller, Post, Inject, Req, Body, Put, Delete, Param } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";



@Controller()
export class EHRProviderController {
    
    constructor(@Inject('NATS_SERVICE') private natsClient:ClientProxy){}

    @Post('provider')
    createProvider(@Body() body) {
       return this.natsClient.send('create_provider',body);
    }

    @Put('provider')
    updateProvider(@Body() body) {
       return this.natsClient.send('update_provider',body);
    }

    @Delete('provider/:uuid')
    deleteProvider(@Param('uuid') id) {
       return this.natsClient.send('delete_provider',id);
    }


    @Post('cpt_code')
    createCPTCode(@Body() body) {
       return this.natsClient.send('create_cpt_code',body);
    }

    @Put('cpt_code')
    updateCPTCode(@Body() body) {
       return this.natsClient.send('update_cpt_code',body);
    }

    @Delete('cpt_code/:uuid')
    deleteCPTCode(@Param('uuid') id) {
       return this.natsClient.send('delete_cpt_code',id);
    }

    @Post('provider_cpt_approval')
    createCPTApproval(@Body() body) {
       return this.natsClient.emit('create_cpt_approval',body);
    }

    @Put('provider_cpt_approval')
    updateCPTApproval(@Body() body) {
       return this.natsClient.emit('update_cpt_approval',body);
    }

}