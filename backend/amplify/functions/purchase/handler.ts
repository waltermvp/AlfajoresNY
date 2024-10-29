import type { Handler } from "aws-lambda";
const stripe = require("stripe")("sk_test_SwtYhjSmikelVkceYwWJcXCY00XzfdVhWO");

export const handler: Handler = async (event, context) => {
  // your function code goes here
  const { name } = event.arguments;
  console.log("name:", name);
  console.log("context", context);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: name,
          },
          unit_amount: 500, // price in cents
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:8081/success",
    cancel_url: "http://localhost:8081/cancel",
  });
  console.log("session", session);
  return { url: session.url, id: session.id };
};
