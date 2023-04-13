import { RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';

@Module({
  imports: [
    RmqModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({ RMQ_URI: Joi.string().required(), RMQ_BILLING_QUEUE: Joi.string().required() }),
      envFilePath: './apps/billing/.env'
    })
  ],
  controllers: [BillingController],
  providers: [BillingService],

})
export class BillingModule { }
