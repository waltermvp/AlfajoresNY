import type { Handler } from "aws-lambda";
const stripe = require("stripe")("sk_test_SwtYhjSmikelVkceYwWJcXCY00XzfdVhWO");

//TODO: Use stripe to manage products

// This could be a database of products or static product data
const products = {
  prod_12345: { name: "Large Alfajores Box", price: 2000 }, // Price is in cents (e.g., $20.00)
  prod_12346: { name: "Alfajores Box", price: 1500 }, // Price is in cents (e.g., $20.00)
  prod_12347: { name: "Small Alfajores Box", price: 1300 }, // Price is in cents (e.g., $20.00)
  // Add more products as needed
};

interface EventArguments {
  arguments: {
    productId: keyof typeof products;
    quantity: number;
  };
}

export const handler: Handler = async (event: EventArguments, context) => {
  const { productId, quantity } = event.arguments;

  console.log("productId", productId);
  console.log("quantity", quantity);
  // Ensure the product exists
  const product = products[productId];
  if (!product) {
    return { error: `Product with ID ${productId} not found` };
  }

  console.log("context", context);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
          },
          unit_amount: 500, // price in cents
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    //TODO: Update urls and plug in env variables

    success_url: "http://localhost:8081/success",
    cancel_url: "http://localhost:8081/cancel",
  });
  console.log("session", session);
  return { url: session.url, id: session.id };
};
