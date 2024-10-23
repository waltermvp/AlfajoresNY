import { Ionicons } from '@expo/vector-icons';
import { Amplify } from 'aws-amplify';
import { router } from 'expo-router';
import React from 'react';

import { Cover } from '@/components/cover';
import { Button, FocusAwareStatusBar, SafeAreaView, Text, View } from '@/ui';

import outputs from '../../amplify_outputs.json';

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
  return (
    <View className="flex h-full items-center  justify-center">
      <FocusAwareStatusBar />

      <View className="w-full flex-1">
        <Cover />
      </View>
      <View className="justify-end ">
        <Text className="my-3 text-center text-5xl font-bold">SUCCESS</Text>
        <View className="flex items-center justify-center">
          <Ionicons name="checkmark-circle" size={64} color="green" />
        </View>
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
