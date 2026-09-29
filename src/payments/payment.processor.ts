import { Processor, WorkerHost } from '@nestjs/bullmq';
import { QUEUE_NAMES } from '../queues/queues.constants.js';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { PaymentGatewayService } from './payment-gateway.service.js';
import { OrderCreatedEvent } from '../orders/events/order-created.event.js';
import { ORDER_EVENTS } from '../orders/events/order-events.constants.js';

@Processor(QUEUE_NAMES.PAYMENTS)
export class PaymentsProcessor extends WorkerHost {
  private readonly logger = new Logger(PaymentsProcessor.name);

  constructor(private readonly paymentGateway: PaymentGatewayService) {
    super();
  }

  async process(job: Job<OrderCreatedEvent, void, string>): Promise<void> {
    if (job.name !== ORDER_EVENTS.CREATED) {
      return;
    }

    const event = job.data;

    this.logger.log(
      `Processing payment for order ${event.orderId} [attempt ${job.attemptsMade + 1}]`,
    );

    await this.paymentGateway.charge(event.orderId, event.total);

    if (job.attemptsMade === 0) {
      throw new Error(
        'Failed to persist payment confirmation after successful charge',
      );
    }

    this.logger.log(`Payment confirmed for order ${event.orderId}`);

    await Promise.resolve(null);
  }
}
