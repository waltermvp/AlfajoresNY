import type { Handler } from "aws-lambda";
const ZIP_CODE_ARRAY = ["1001", "11356", "11368", "11709"];

export const handler: Handler = async (event, context) => {
  const { zipcode } = event.arguments;

  console.log("zipcode", zipcode);
  // Ensure the product exists
  // @ts-ignore
  // const product = products[productId];
  // if (!product) {
  //   return { error: `Product with ID ${productId} not found` };
  // }

  // const session = await stripe.checkout.sessions.create({
  //   payment_method_types: ["card"],
  //   shipping_address_collection: { allowed_countries: ZIP_CODE_ARRAY },
  //   phone_number_collection: { enabled: true },
  //   line_items: [
  //     {
  //       price_data: {
  //         currency: "usd",
  //         product_data: {
  //           name: product.name,
  //         },
  //         unit_amount: product.price, // price in cents
  //       },
  //       quantity: 1,
  //     },
  //   ],
  //   mode: "payment",
  //   //TODO: Update urls and plug in env variables

  //   success_url: "http://localhost:8081/success",
  //   cancel_url: "http://localhost:8081/cancel",
  //   // cancel_url: `http://localhost:3000/#/order`,
  // });
  const returnParams = { success: true };
  return returnParams;
};
