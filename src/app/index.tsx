import { type Schema } from 'amplify/data/resource';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import { useRouter } from 'expo-router';
import React from 'react';
import { Linking, StyleSheet } from 'react-native';

import { Cover } from '@/components/cover';
import { useIsFirstTime } from '@/core/hooks';
import { Button, FocusAwareStatusBar, SafeAreaView, Text, View } from '@/ui';

import outputs from '../../amplify_outputs.json';

Amplify.configure(outputs);

const extractUrl = (data) => {
  // Remove the curly braces and match the URL
  const cleanData = data.replace(/[{}]/g, ''); // Remove the curly braces
  const match = cleanData.match(/url=(.*)/); // Extract URL after 'url='

  if (match && match[1]) {
    return match[1].trim(); // Return the extracted URL without spaces
  }
  return null;
};

export default function Onboarding() {
  const [_, setIsFirstTime] = useIsFirstTime();
  const router = useRouter();
  const clientA = generateClient<Schema>();
  const [loading, setLoading] = React.useState(false);

  const handleBuyNow = async (cookieType: any) => {
    setLoading(true);
    const result = await clientA.queries.purchase({ name: cookieType });
    if (result.data) {
      console.log('---', result.data, '333');
      const extractedUrl = extractUrl(result.data);

      console.log(extractedUrl, 'ddd');
      Linking.openURL(extractedUrl);
    }
    setLoading(false);
  };

  return (
    <View className="flex h-full items-center  justify-center">
      <FocusAwareStatusBar />
      <View style={styles.container}>
        <Text style={styles.header}>Welcome to the Cookie Store</Text>
        <View style={styles.cookie}>
          <Text>Alfajores</Text>
          <Button
            label="Buy Now"
            onPress={() => handleBuyNow('alfajores')}
            loading={loading}
          />
        </View>
        {/* Add more cookies here */}
      </View>

      <View className="w-full flex-1">
        <Cover />
      </View>
      <View className="justify-end ">
        <Text className="my-3 text-center text-5xl font-bold">
          Obytes Starter
        </Text>
        <Text className="mb-2 text-center text-lg text-gray-600">
          The right way to build your mobile app
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
      <SafeAreaView className="mt-6">
        <Button
          label="Let's Get Started "
          onPress={() => {
            setIsFirstTime(false);
            router.replace('/login');
          }}
        />
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  cookie: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});
