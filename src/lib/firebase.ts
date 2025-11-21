import { createClient } from '@blinkdotnew/sdk';

// Initialize Blink SDK (cast to any to avoid strict SDK type issues across project)
const _blink = createClient({
  projectId: 'trivandrum-one-smart-city-platform-mfrrlq54',
  authRequired: false,
  auth: { mode: 'headless' }
});

// Export as any to avoid TypeScript errors when accessing dynamic tables
export const blink: any = _blink;
export const auth: any = _blink.auth;
export const db: any = _blink.db;
