import { Inject, Injectable, Logger } from '@nestjs/common';
import { REDIS_CLIENT } from '../common/redis/redis.constants.js';
import { Redis } from 'ioredis';

@Injectable()
export class IdepmotencyService {
  private readonly logger = new Logger(IdepmotencyService.name);

  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {}

  async reserve(key: string, ttlSeconds: number): Promise<boolean> {
    const result = await this.redis.set(key, 1, 'EX', ttlSeconds, 'NX');
    return result === 'OK';
  }

  async release(key: string): Promise<void> {
    await this.redis.del(key);
    this.logger.debug(`Released idempotency key: ${key}`);
  }
}
