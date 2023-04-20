import { Injectable } from '@nestjs/common';

@Injectable()
export class BillingService {
  getHello(): string {
    return 'Hello World!!!!!!';
  }

  order(data) {
    console.log('bill is cretaed ', data)
    return 'hi'
  }
}
