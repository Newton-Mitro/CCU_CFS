import { Module } from '@nestjs/common';
import { CustomersService } from './application/customers.service';
import { OrganizationsService } from './application/organizations.service';
import { PeoplesService } from './application/peoples.service';
import { CustomersController } from './presentation/controllers/customers.controller';
import { OrganizationsController } from './presentation/controllers/organizations.controller';
import { PeoplesController } from './presentation/controllers/peoples.controller';
import { MongooseKYCModelsModule } from './infrastructure/mongoose-kyc-models.module';

@Module({
  imports: [MongooseKYCModelsModule],
  controllers: [
    CustomersController,
    PeoplesController,
    OrganizationsController,
  ],
  providers: [PeoplesService, OrganizationsService, CustomersService],
})
export class KYCModule {}
