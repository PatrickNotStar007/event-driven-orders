import { Logger } from '@nestjs/common';

const logger = new Logger('EventListenerError');

export async function safeListener(
  listenerName: string,
  eventName: string,
  fn: () => Promise<void> | void,
) {
  try {
    await fn();
  } catch (error) {
    const err = error as Error;
    logger.error(
      `Listener "${listenerName}" failed while handling "${eventName}": ${err.message}`,
      err.stack,
    );
  }
}
