import { Module } from '@nestjs/common';
import { PaymentGatewayService } from './payment-gateway.service.js';
import { PaymentsProcessor } from './payment.processor.js';

@Module({
  providers: [PaymentGatewayService, PaymentsProcessor],
  exports: [PaymentsProcessor],
})
export class PaymentsModule {}
