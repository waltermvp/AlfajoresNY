import { a, type ClientSchema, defineData } from '@aws-amplify/backend';

import { purchase } from '../functions/purchase/resource';
import { sayHello } from '../functions/say-hello/resource';
import { validate } from '../functions/validate/resource';

// import { validateZipCode } from '../functions/validateZipCode/resource';

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any unauthenticated user can "create", "read", "update", 
and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  sayHello: a
    .query()
    .arguments({
      name: a.string(),
    })
    .returns(a.string())
    .handler(a.handler.function(sayHello))
    .authorization((allow) => [allow.guest()]),

  validate: a
    .query()
    .arguments({
      zipCode: a.string(),
    })
    .returns(
      a.customType({
        success: a.boolean().required(),
        name: a.string(),
        city: a.string(),
        zip: a.string(),
        error: a.string(),
      }),
    )
    .handler(a.handler.function(validate))
    .authorization((allow) => [allow.guest()]),

  purchase: a
    .query()
    .arguments({
      quantity: a.integer(),
      productId: a.string(),
    })
    .returns(
      a.customType({
        url: a.string(),
        id: a.string(),
        error: a.string(),
      }),
    )
    .handler(a.handler.function(purchase))
    .authorization((allow) => [allow.guest()]),

  // Order: a
  //   .model({
  //     orderId: a.string(),
  //     userId: a.string(),
  //     productIds: a.string().array(),
  //     totalAmount: a.float(),
  //     status: a.string(),
  //     createdAt: a.string(),
  //   })
  //   .authorization((allow) => [allow.guest()]),

  // Product: a
  //   .model({
  //     productId: a.string(),
  //     name: a.string(),
  //     description: a.string(),
  //     price: a.float(),
  //     stock: a.integer(),
  //   })
  //   .authorization((allow) => [allow.guest()]),

  // User: a
  //   .model({
  //     name: a.string(),
  //     email: a.string(),
  //     address: a.string(),
  //     phoneNumber: a.string(),
  //   })
  //   .authorization((allow) => [allow.guest()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'iam',
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
