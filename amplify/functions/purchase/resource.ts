import { defineFunction } from '@aws-amplify/backend';

export const purchase = defineFunction({
  // optionally specify a name for the Function (defaults to directory name)
  name: 'purchase',
  // optionally specify a path to your handler (defaults to "./handler.ts")
  entry: './handler.ts',
});
export const createCheckoutSession = defineFunction({
  // optionally specify a name for the Function (defaults to directory name)
  name: 'createCheckoutSession',
  // optionally specify a path to your handler (defaults to "./handler.ts")
  entry: './handler.ts',
});
