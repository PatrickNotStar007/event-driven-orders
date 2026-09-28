import { Module } from '@nestjs/common';
import { NotificationProcess } from './notification.processor.js';

@Module({
  providers: [NotificationProcess],
})
export class NotificationsModule {}
