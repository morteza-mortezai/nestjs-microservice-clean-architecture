import { Module } from '@nestjs/common';
import { BillingModule } from './billing/billing.module';
import { EnvironmentModule } from './environment/environment.module';


@Module({
  imports: [
    BillingModule, EnvironmentModule
  ],
  controllers: [],
  providers: [],

})
export class AppModule { }
