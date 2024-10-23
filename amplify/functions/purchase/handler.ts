import type { Handler } from 'aws-lambda';
const stripe = require('stripe')('sk_test_SwtYhjSmikelVkceYwWJcXCY00XzfdVhWO');

export const handler: Handler = async (event, context) => {
  // your function code goes here
  const { name } = event.arguments;
  console.log('name', name);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: name,
          },
          unit_amount: 500, // price in cents
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:3000/success.html',
    cancel_url: 'http://localhost:3000/cancel.html',
  });
  return { url: session.url };
};
