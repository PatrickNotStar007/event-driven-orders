import { Processor, WorkerHost } from '@nestjs/bullmq';
import { QUEUE_NAMES } from '../queues/queues.constants.js';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { OrderCreatedEvent } from '../orders/events/order-created.event.js';
import { ORDER_EVENTS } from '../orders/events/order-events.constants.js';

@Processor(QUEUE_NAMES.ORDER_EVENTS)
export class NotificationProcess extends WorkerHost {
  private readonly logger = new Logger(NotificationProcess.name);

  async process(job: Job<OrderCreatedEvent, void, string>): Promise<void> {
    if (job.name !== ORDER_EVENTS.CREATED) {
      return;
    }

    const event = job.data;

    this.logger.log(
      `Sending confirmation email for order ${event.orderId} to user ${event.userId}`,
    );

    this.logger.log(
      `Confirmation email queued for order ${event.orderId} - total: ${event.total.toFixed(2)}`,
    );

    await Promise.resolve(null);
  }
}
