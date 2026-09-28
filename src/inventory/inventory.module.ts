import { Module } from '@nestjs/common';
import { InventoryListener } from './inventory.listener.js';

@Module({
  providers: [InventoryListener],
})
export class InventoryModule {}
