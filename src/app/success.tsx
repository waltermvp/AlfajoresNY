import { Amplify } from 'aws-amplify';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView } from 'react-native';
import { useMediaQuery } from 'react-responsive';

import { type PurchaseProps } from '@/api/posts/types';
import Success from '@/components/success';
import { useIsFirstTime } from '@/core/hooks';
import { Button, FocusAwareStatusBar, SafeAreaView, Text, View } from '@/ui';

import outputs from '../../amplify_outputs.json';

Amplify.configure(outputs);

export default function Onboarding() {
  const [_, setIsFirstTime] = useIsFirstTime();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const [progress, setProgress] = React.useState(0);
  const isSmallScreen = useMediaQuery({ minWidth: 576 });
  console.log('isSmallScreen', isSmallScreen);

  const handleBuyNow = ({ quantity, productId }: PurchaseProps) => {
    console.log('quantity', quantity, productId);
    setLoading(true);

    setLoading(false);
  };

  return (
    <ScrollView>
      <View className="flex h-full items-center  justify-center">
        <FocusAwareStatusBar />

        <View className="w-full flex-1 justify-center align-middle">
          {/* <Cover /> */}
          <Success
            color={'#28a745'}
            style={{
              width: '50%',
              maxWidth: 420,
              alignSelf: 'center',
            }}
          />
        </View>
        <View className="justify-end ">
          <Text className="my-3 text-center text-5xl font-bold">
            ALFAJORES NY
          </Text>
          <Text className="mb-2 text-center text-lg text-gray-600">
            Your order is complete, please check your email for confirmation.
          </Text>

          {/* <Text className="my-1 pt-6 text-left text-lg">
            🇵🇪 Peruvian Recipe
          </Text>
          <Text className="my-1 text-left text-lg">
            🥷 Developer experience + Productivity
          </Text>
          <Text className="my-1 text-left text-lg">
            🧩 Minimal code and dependencies
          </Text>
          <Text className="my-1 text-left text-lg">
            💪 well maintained third-party libraries
          </Text> */}
        </View>
        <Link href={'/'}>
          <Button label="Continue Shopping" />
        </Link>
        <View
          className="mt-6 flex flex-row"
          style={{ flexDirection: !isSmallScreen ? 'column' : 'row' }}
        ></View>
        <SafeAreaView className="mt-6 flex flex-row"></SafeAreaView>
      </View>
    </ScrollView>
  );
}
