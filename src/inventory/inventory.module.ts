import { Module } from '@nestjs/common';
import { InventoryProcess } from './inventory.processor.js';

@Module({
  providers: [InventoryProcess],
})
export class InventoryModule {}
