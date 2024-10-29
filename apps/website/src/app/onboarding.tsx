import { loadStripe } from '@stripe/stripe-js';
import { type Schema } from 'amplify/data/resource';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import { useRouter } from 'expo-router';
import React from 'react';
import { Linking } from 'react-native';
import { useMediaQuery } from 'react-responsive';

import { Alfajor } from '@/components/alfajor';
import { Card } from '@/components/card';
import { useIsFirstTime } from '@/core/hooks';
import { FocusAwareStatusBar, SafeAreaView, Text, View } from '@/ui';

import outputs from '../amplify_outputs.json';

Amplify.configure(outputs);

const extractUrl = (data) => {
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

  // const breakpoints = {
  //   small: 576,
  //   medium: 768,
  //   large: 992,
  //   extraLarge: 1200,
  // };
  const isSmallScreen = useMediaQuery({ minWidth: 576 });
  console.log('isSmallScreen', isSmallScreen);
  const handleBuyNow = async (cookieType: { any }) => {
    setLoading(true);

    // how can i tell if im in safari or chrome
    if (window.navigator.userAgent.includes('Chrome')) {
      handleLoginChrome(cookieType);
    } else {
      handleLoginSafari();
    }

    setLoading(false);
  };

  const handleLoginSafari = async () => {
    const stripe = await loadStripe(
      'pk_test_tDOoOWsP30M63V52kT4Gun1G005AcuotiJ',
    );

    const response = await clientA.queries.purchase({
      name: 'alfajores',
    });
    const data = extractUrl(response.data);
    stripe
      ?.redirectToCheckout({
        sessionId: data?.id,
      })
      .then((result: { error?: { message: string } }) => {
        if (result.error) {
          // Display error to your customer (e.g., insufficient funds)
          console.error(result.error.message);
        }
      });
  };

  const handleLoginChrome = async (cookieType: any) => {
    const result = await clientA.queries.purchase({ name: cookieType });
    if (result.data) {
      const extractedUrl = extractUrl(result.data);
      Linking.openURL(extractedUrl);
    }
  };

  return (
    <View className="flex h-full items-center  justify-center">
      <FocusAwareStatusBar />

      <View className="w-full flex-1">
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
          🚀 Production-ready{' '}
        </Text>
        <Text className="my-1 text-left text-lg">
          🥷 Developer experience + Productivity
        </Text>
        <Text className="my-1 text-left text-lg">
          🧩 Minimal code and dependencies
        </Text>
        <Text className="my-1 text-left text-lg">
          💪 well maintained third-party libraries
        </Text>
      </View>
      <View
        className="mt-6 flex flex-row"
        style={{ flexDirection: !isSmallScreen ? 'column' : 'row' }}
      >
        <Card
          userId={0}
          id={0}
          image={'../../assets/IMG_0139.JPG'}
          // image="https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=800&q=80"
          title={'Large Alfajores Box'}
          body={'Delicious fresh box of our largest alfajor. Contains 4'}
          price={'$20'}
        />
        <Card
          userId={0}
          id={0}
          image={'../../assets/IMG_0139.JPG'}
          // image="https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=800&q=80"
          title={'Alfajores Box'}
          body={'Delicious fresh box of our standard alfajor. Contains 6'}
          price={'$20'}
        />
        <Card
          userId={0}
          id={0}
          image={'../../assets/IMG_0139.JPG'}
          // image="https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=800&q=80"
          title={'Small Alfajores Box'}
          body={'Delicious fresh box of our largest alfajor. Contains 12'}
          price={'$20'}
        />
      </View>
      <SafeAreaView className="mt-6 flex flex-row"></SafeAreaView>
    </View>
  );
}
