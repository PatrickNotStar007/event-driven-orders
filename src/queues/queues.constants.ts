export const QUEUE_NAMES = {
  INVENTORY: 'inventory-events',
  NOTIFICATIONS: 'notifications-events',
  PAYMENTS: 'payments-events',
} as const;

export const ALL_ORDER_QUEUE_NAMES = Object.values(QUEUE_NAMES);
