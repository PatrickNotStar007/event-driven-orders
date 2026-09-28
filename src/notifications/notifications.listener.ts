import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ORDER_EVENTS } from '../orders/events/order-events.constants.js';
import { OrderCreatedEvent } from '../orders/events/order-created.event.js';

@Injectable()
export class NotificationsListener {
  private readonly logger = new Logger(NotificationsListener.name);

  @OnEvent(ORDER_EVENTS.CREATED)
  handleOrderCreated(event: OrderCreatedEvent): void {
    this.logger.log(
      `Sending confirmation email for order ${event.orderId} to user ${event.userId}`,
    );

    this.logger.log(
      `Confirmation email queued for order ${event.orderId} - total: ${event.total.toFixed(2)}`,
    );
  }
}
