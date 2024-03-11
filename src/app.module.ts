import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RequestResponseInterceptor } from './common/interceptors/request-response.interceptor';
import { DatabaseModule } from './common/mongoose/database.module';
import { MongooseKYCModelsModule } from './kyc/infrastructure/mongoose-kyc-models.module';
import { KycModule } from './kyc/kyc.module';
import { SubsidiaryLedgerAccountModule } from './subsidiary-accounting/subsidiary-ledgers/subsidiary-ledger-account.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    MongooseKYCModelsModule,
    KycModule,
    SubsidiaryLedgerAccountModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestResponseInterceptor,
    },
  ],
})
export class AppModule {}
