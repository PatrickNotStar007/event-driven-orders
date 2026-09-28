import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OrderCreatedEvent } from '../orders/events/order-created.event.js';
import { AuditLogEntry } from './audit-log.entry.js';
import { safeListener } from '../common/utils/safe-listener.util.js';

@Injectable()
export class AuditListener {
  private readonly logger = new Logger(AuditListener.name);

  private readonly entries: AuditLogEntry[] = [];

  @OnEvent('order.*')
  async handleOrderNamespaceEvent(paylaod: OrderCreatedEvent): Promise<void> {
    await safeListener(AuditListener.name, 'order.*', () => {
      const entry: AuditLogEntry = {
        orderId: paylaod.orderId,
        eventNamespace: 'order.*',
        capturedAt: new Date(),
        summary: `Order ${paylaod.orderId} - total ${paylaod.total.toFixed(2)} - ${paylaod.items.length} item(s)`,
      };

      this.entries.push(entry);

      this.logger.log(`Audit entry recorded: ${entry.summary}`);
    });
  }

  findAll(): AuditLogEntry[] {
    return this.entries;
  }
}
