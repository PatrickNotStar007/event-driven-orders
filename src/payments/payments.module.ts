import { Module } from '@nestjs/common';
import { PaymentGatewayService } from './payment-gateway.service.js';
import { PaymentsProcessor } from './payment.processor.js';
import { IdepmotencyService } from './idempotency.service.js';

@Module({
  providers: [PaymentGatewayService, PaymentsProcessor, IdepmotencyService],
  exports: [PaymentsProcessor],
})
export class PaymentsModule {}
