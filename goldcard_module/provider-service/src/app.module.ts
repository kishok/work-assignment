import { Module } from '@nestjs/common';
import { EHRProviderModule } from './ehr-provider/ehr-provider.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from './ehr-provider/typeorm/entities/Provider';
import { CptCode } from './ehr-provider/typeorm/entities/CptCodes';
import { ProviderCptApproval } from './ehr-provider/typeorm/entities/CptApproval';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      database: process.env.POSTGRES_DB,
      entities: [Provider,CptCode,ProviderCptApproval],
      logging: true,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      synchronize: false
    }), 
    EHRProviderModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
