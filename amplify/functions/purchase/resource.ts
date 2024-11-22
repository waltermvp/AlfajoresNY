import { defineFunction, secret } from '@aws-amplify/backend';

export const purchase = defineFunction({
  // optionally specify a name for the Function (defaults to directory name)
  name: 'purchase',
  // optionally specify a path to your handler (defaults to "./handler.ts")
  entry: './handler.ts',
  environment: {
    STRIPE_SECRET: secret('STRIPE_SECRET'),
  },
});
