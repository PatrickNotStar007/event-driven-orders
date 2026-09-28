import { Module } from '@nestjs/common';
import { NotificationsListener } from './notifications.listener.js';

@Module({
  providers: [NotificationsListener],
})
export class NotificationsModule {}
