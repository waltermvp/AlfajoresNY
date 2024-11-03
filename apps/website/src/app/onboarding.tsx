import { loadStripe, RedirectToCheckoutServerOptions } from '@stripe/stripe-js';
import { type Schema } from '../../../../amplify/data/resource';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import { useRouter } from 'expo-router';
import React from 'react';
import { Linking, ScrollView } from 'react-native';
import { useMediaQuery } from 'react-responsive';

import { Alfajor } from '@/components/alfajor';
import { Card } from '@/components/card';
import { useIsFirstTime } from '@/core/hooks';
import { FocusAwareStatusBar, SafeAreaView, Text, View } from '@/ui';
import outputs from '../amplify_outputs.json';
import { PurchaseProps } from '@/api/posts/types';
import { FlashList } from '@shopify/flash-list';

Amplify.configure(outputs);

const products = [
  {
    name: 'Large Alfajores Box',
    price: 2000,
    id: 'prod_12345',
    body: 'Delicious fresh box of our largest alfajor. Contains 4',
  }, // Price is in cents (e.g., $20.00)
  {
    name: 'Alfajores Box',
    price: 1500,
    id: 'prod_12346',
    body: 'Delicious fresh box of our standard alfajor. Contains 6',
  }, // Price is in cents (e.g., $20.00)
  {
    name: 'Small Alfajores Box',
    price: 1300,
    id: 'prod_12347',
    body: 'Delicious fresh box of our largest alfajor. Contains 12',
  }, // Price is in cents (e.g., $20.00)
  // Add more products as needed
];

const extractUrl = (data: string) => {
  console.log('data', data);
  // Remove the curly braces and match the URL
  const cleanData = data.replace(/[{}]/g, ''); // Remove the curly braces
  const match = cleanData.match(/url=(.*)/); // Extract URL after 'url='
  const match2 = cleanData.match(/id=(.*)/); // Extract URL after 'url='
  if (match && match[1] && match2 && match2[1]) {
    return { url: match[1].trim(), id: match2[1].trim() }; // Return the extracted URL without spaces
  }
  return null;
};

export default function Onboarding() {
  const [_, setIsFirstTime] = useIsFirstTime();
  const router = useRouter();
  const clientA = generateClient<Schema>();
  const [loading, setLoading] = React.useState(false);

  // const isSmallScreen = useMediaQuery({ minWidth: 576 });
  // const isMediumScreen = useMediaQuery({ minWidth: 768 });
  const isLargeScreen = useMediaQuery({ minWidth: 992 });

  const handleBuyNow = ({ quantity, productId }: PurchaseProps) => {
    console.log('quantity', quantity, productId);
    setLoading(true);

    // how can i tell if im in safari or chrome
    if (window.navigator.userAgent.includes('Chrome')) {
      handlePurhcaseChrome({ quantity, productId });
    } else {
      handlePurchaseSafari({ quantity, productId });
    }

    setLoading(false);
  };

  const handlePurchaseSafari = async ({
    quantity,
    productId,
  }: PurchaseProps) => {
    const stripe = await loadStripe(
      'pk_test_tDOoOWsP30M63V52kT4Gun1G005AcuotiJ',
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

    const data = extractUrl(response.data);
    console.log('data', data);

    if (!data) {
      console.error('No data found');
      return;
    }

    const stripeProps: RedirectToCheckoutServerOptions = {
      sessionId: data.id,
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
    console.log('result', result);
    if (result.data) {
      const extractedUrl = extractUrl(result.data);
      //TODO: handle missing extractedUrl
      if (!extractedUrl) return;
      Linking.openURL(extractedUrl?.url);
    }
  };

  return (
    <ScrollView>
      <View className="flex h-full items-center  justify-center">
        <FocusAwareStatusBar />

        <View className="w-full flex-1 justify-center">
          {/* <Cover /> */}
          <Alfajor style={{ width: '75%', alignSelf: 'center' }} />
        </View>
        <View className="justify-end ">
          <Text className="my-3 text-center text-5xl font-bold">
            ALFAJORES NY
          </Text>
          <Text className="mb-2 text-center text-lg text-gray-600">
            Delicious Peruvian Alfajores, made with love in New York
          </Text>

          <Text className="my-1 pt-6 text-left text-lg">
            🇵🇪 Peruvian Recipe
          </Text>
          <Text className="my-1 text-left text-lg">
            👴🏼 More than 25 years of selling alfajores in NYC
            {/* 🕰️ */}
          </Text>
          <Text className="my-1 text-left text-lg">
            ⏱️ Delivered Fresh within 72 hours
          </Text>
          {/* <Text className="my-1 text-left text-lg">
            💪 well maintained third-party libraries
          </Text> */}
        </View>

        <View
          className="mt-6 flex flex-row"
          style={{ flexDirection: !isLargeScreen ? 'column' : 'row' }}
        >
          {products.map((product) => (
            <Card
              key={product.id}
              onPress={handleBuyNow}
              userId={0}
              id={product.id}
              image={'../../assets/IMG_0139.JPG'}
              // image="https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=800&q=80"
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
