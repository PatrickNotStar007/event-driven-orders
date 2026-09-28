import { BullModule } from '@nestjs/bullmq';
import { BullBoardModule } from '@bull-board/nestjs';
import { Module } from '@nestjs/common';
import { QUEUE_NAMES } from './queues.constants.js';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';

@Module({
  imports: [
    BullModule.registerQueue({
      name: QUEUE_NAMES.ORDER_EVENTS,
    }),
    BullBoardModule.forFeature({
      name: QUEUE_NAMES.ORDER_EVENTS,
      adapter: BullMQAdapter,
    }),
  ],
  exports: [BullModule],
})
export class QueuesModule {}
