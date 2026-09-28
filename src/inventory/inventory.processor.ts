import { Processor, WorkerHost } from '@nestjs/bullmq';
import { QUEUE_NAMES } from '../queues/queues.constants.js';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { OrderCreatedEvent } from '../orders/events/order-created.event.js';
import { ORDER_EVENTS } from '../orders/events/order-events.constants.js';

@Processor(QUEUE_NAMES.INVENTORY)
export class InventoryProcess extends WorkerHost {
  private readonly logger = new Logger(InventoryProcess.name);

  async process(job: Job<OrderCreatedEvent, void, string>): Promise<void> {
    if (job.name !== ORDER_EVENTS.CREATED) {
      return;
    }

    const event = job.data;

    this.logger.log(
      `Reserving stock for order ${event.orderId} (${event.items.length} item(s) [attempt ${job.attemptsMade + 1}]`,
    );

    for (const item of event.items) {
      this.logger.log(
        `=> reserved ${item.quantity}x product ${item.productId}`,
      );
    }

    this.logger.log(`Stock reservation complete for order ${event.orderId}`);

    await Promise.resolve(null);
  }
}
