import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ORDER_EVENTS } from '../orders/events/order-events.constants.js';
import { OrderCreatedEvent } from '../orders/events/order-created.event.js';
import { safeListener } from '../common/utils/safe-listener.util.js';

@Injectable()
export class NotificationsListener {
  private readonly logger = new Logger(NotificationsListener.name);

  @OnEvent(ORDER_EVENTS.CREATED)
  async handleOrderCreated(event: OrderCreatedEvent): Promise<void> {
    await safeListener(NotificationsListener.name, ORDER_EVENTS.CREATED, () => {
      this.logger.log(
        `Sending confirmation email for order ${event.orderId} to user ${event.userId}`,
      );

      this.logger.log(
        `Confirmation email queued for order ${event.orderId} - total: ${event.total.toFixed(2)}`,
      );
    });
  }
}
