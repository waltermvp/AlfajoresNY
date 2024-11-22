import {
  loadStripe,
  type RedirectToCheckoutServerOptions,
} from '@stripe/stripe-js';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import React, { useState } from 'react';
import { Linking, ScrollView, StyleSheet } from 'react-native';
import { useMediaQuery } from 'react-responsive';

import { type CardPurchaseProps, type PurchaseProps } from '@/api/posts/types';
import { Alfajor } from '@/components/alfajor';
import { Card } from '@/components/card';
import { ZipInput } from '@/components/zip-input';
import { FocusAwareStatusBar, SafeAreaView } from '@/ui';
import { Text, View } from '@/ui';

import type { Schema } from '../../amplify/data/resource';
import outputs from '../../amplify_outputs.json';

Amplify.configure(outputs);

// eslint-disable-next-line max-lines-per-function
export default function Onboarding() {
  // const router = useRouter();
  const clientA = generateClient<Schema>();

  // Zip Code
  const [error, setError] = useState<undefined | string>();
  const [zipCode, setZipCode] = useState<string | undefined>();
  // const isSmallScreen = useMediaQuery({ minWidth: 576 });
  // const isMediumScreen = useMediaQuery({ minWidth: 768 });
  const isLargeScreen = useMediaQuery({ minWidth: 992 });

  const handleBuyNow = async ({ productId, quantity }: CardPurchaseProps) => {
    console.log('quantity', quantity, productId);
    if (!zipCode) {
      setError('Please enter a valid zip code');
      return;
    }
    // how can i tell if im in safari or chrome
    if (window.navigator.userAgent.includes('Chrome')) {
      handlePurhcaseChrome({ quantity, productId, zipCode });
    } else {
      handlePurchaseSafari({ quantity, productId, zipCode });
    }
  };

  const handlePurchaseSafari = async ({
    quantity,
    productId,
  }: PurchaseProps) => {
    console.log('handlePurchaseSafari', quantity, productId);
    const stripe = await loadStripe(
      'pk_test_51FQ3zILbRVJMADhd041XnBP5OX1WBVjwH7Nl7wIAssk6WKIxiULFqi3OrQDaDaY00eXx1MAJ9Mju8JbqFJNDTY5q00rpaGrLVb',
    );

    console.log(quantity, 'passing to quantity purchase');
    console.log(productId, 'passing to productId purchase');
    const response = await clientA.queries.purchase({
      quantity,
      productId,
    });

    console.log('response', JSON.stringify(response.data, null, 2));

    if (response.errors) {
      console.error(response.errors);
      return;
    }

    const data = response.data;
    console.log('data', data);

    if (!data || !data.url) {
      console.error('No data found');
      return;
    }

    const stripeProps: RedirectToCheckoutServerOptions = {
      sessionId: data.id ?? '',
    };

    stripe
      ?.redirectToCheckout(stripeProps)
      .then((result: { error?: { message: string } }) => {
        if (result.error) {
          // Display error to your customer (e.g., insufficient funds)
          console.error(result.error.message);
        }
      });
  };

  const handlePurhcaseChrome = async ({
    quantity,
    productId,
  }: PurchaseProps) => {
    const result = await clientA.queries.purchase({ quantity, productId });
    console.log('result.data', result.data);

    if (result.data) {
      const parsedData = result.data;

      if (parsedData?.url) {
        console.log('URL:', parsedData.url);
        console.log('ID:', parsedData.id);
        Linking.openURL(parsedData.url);
      } else {
        console.log('Failed to parse data.');
      }
    }
  };

  return (
    <ScrollView>
      <View
        style={{ backgroundColor: 'black' }}
        className="flex h-full items-center  justify-center "
      >
        <FocusAwareStatusBar />

        <View className="w-full flex-1 justify-center">
          <Alfajor style={{ width: '75%', alignSelf: 'center' }} />
        </View>
        <View className="justify-end ">
          <Text className="my-3 text-center text-5xl font-bold   color-white">
            ALFAJORES NY
          </Text>
          <Text className="mb-2 text-center text-lg text-gray-100">
            Delicious Peruvian Alfajores, made with love in New York
          </Text>

          <Text className="my-1 pt-6 text-left text-lg color-white">
            🇵🇪 Peruvian Recipe
          </Text>
          <Text className="my-1 text-left text-lg   color-white">
            👴🏼 More than 25 years of selling alfajores in NYC
            {/* 🕰️ */}
          </Text>
          <Text className="my-1 text-left text-lg   color-white">
            ⏱️ Delivered Fresh within 72 hours
          </Text>
          {/* <Text className="my-1 text-left text-lg">
            💪 well maintained third-party libraries
          </Text> */}
        </View>
        <View className="justify-left mb-2 ">
          <ZipInput
            callBack={({ success, zip }) => {
              if (success) {
                setZipCode(zip);
              }
            }}
          />
        </View>
        <View
          className="mt-1 flex flex-row"
          style={[
            {
              flexDirection: !isLargeScreen ? 'column' : 'row',
              opacity: zipCode ? 1 : 0.4, // Slightly more transparent
              pointerEvents: zipCode ? 'auto' : 'none', // Prevent interactions when disabled
            },
            !zipCode && styles.grayscaleEffect, // Apply grayscale effect style
          ]}
        >
          {products.map((product) => (
            <Card
              key={product.id}
              loading={false}
              onPress={handleBuyNow}
              userId={0}
              id={product.id}
              image={product.image}
              title={product.name}
              body={product.body}
              price={product.price}
            />
          ))}
        </View>
        <SafeAreaView className="mt-6 flex flex-row"></SafeAreaView>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    flexDirection: 'row',
  },
  grayscaleEffect: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Add a subtle overlay for a grayscale look
  },
});
const products = [
  {
    name: 'Large Alfajores Box',
    price: 2000,
    id: 'prod_12345',
    body: 'Delicious fresh box of our largest alfajor. Contains 4',
    image:
      'https://dta56yysqj9ke.cloudfront.net/eyJidWNrZXQiOiJhbXBsaWZ5LWRxZmluYjB3cXFpczMtbWFpLWFsZmFqb3Jlc2RyaXZlYnVja2V0ZTNjNy03bjF6a3R0NWY5cmMiLCJrZXkiOiJJTUdfMDEzOS5KUEcifQ==',
  }, // Price is in cents (e.g., $20.00)
  {
    name: 'Alfajores Box',
    price: 1500,
    id: 'prod_12346',
    body: 'Delicious fresh box of our standard alfajor. Contains 6',
    image:
      'https://dta56yysqj9ke.cloudfront.net/eyJidWNrZXQiOiJhbXBsaWZ5LWRxZmluYjB3cXFpczMtbWFpLWFsZmFqb3Jlc2RyaXZlYnVja2V0ZTNjNy03bjF6a3R0NWY5cmMiLCJrZXkiOiJJTUdfMDEzOS5KUEcifQ==',
  }, // Price is in cents (e.g., $20.00)
  {
    name: 'Small Alfajores Box',
    price: 1300,
    id: 'prod_12347',
    body: 'Delicious fresh box of our largest alfajor. Contains 12',
    image:
      'https://dta56yysqj9ke.cloudfront.net/eyJidWNrZXQiOiJhbXBsaWZ5LWRxZmluYjB3cXFpczMtbWFpLWFsZmFqb3Jlc2RyaXZlYnVja2V0ZTNjNy03bjF6a3R0NWY5cmMiLCJrZXkiOiJJTUdfMDEzOS5KUEcifQ==',
  }, // Price is in cents (e.g., $20.00)
  // Add more products as needed
];
