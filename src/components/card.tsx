import React, { useState } from 'react';
import { useColorScheme } from 'react-native';
import SimpleStepper from 'react-native-simple-stepper';

import type { Product } from '@/api';
import { Button, Image, Text, View } from '@/ui';

type Props = Product;

// eslint-disable-next-line max-lines-per-function
export const Card = ({ id, title, body, image, price, onPress }: Props) => {
  const [quantity, setQuantity] = React.useState(1);
  const colorScheme = useColorScheme();
  const [isLoading, setIsLoading] = useState(false);

  const dollars = (Number(price) / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const handlePress = async () => {
    setIsLoading(true);
    try {
      await onPress({ productId: id, quantity });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // <Link href={`/feed/${id}`} asChild>
    //   <Pressable>
    <View className="m-2 overflow-hidden rounded-xl  border border-neutral-300 bg-white  dark:bg-neutral-900">
      <Image
        className="h-56 w-full overflow-hidden rounded-t-xl"
        // contentFit="cover"
        source={{
          // uri: images[Math.floor(Math.random() * images.length)],
          uri: image,
        }}
      />

      <View className="p-2">
        <Text className="py-3 text-2xl ">{title}</Text>
        <Text numberOfLines={3} className="leading-snug text-gray-600">
          {body}
        </Text>
        <Text numberOfLines={0} className="leading-snug text-blue-900">
          {dollars}
        </Text>
        <SimpleStepper
          showText
          initialValue={1}
          stepValue={1}
          valueChanged={setQuantity}
          disableDecrementImageTintColor={false}
          useColor
          color={colorScheme === 'dark' ? 'white' : 'black'}
        />
        <Button loading={isLoading} label="Buy Now" onPress={handlePress} />
      </View>
    </View>
    //   </Pressable>
    // </Link>
  );
};

// const images = [
//   'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=800&q=80',
//   'https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5?auto=format&fit=crop&w=800&q=80',
//   'https://images.unsplash.com/photo-1515386474292-47555758ef2e?auto=format&fit=crop&w=800&q=80',
//   'https://plus.unsplash.com/premium_photo-1666815503002-5f07a44ac8fb?auto=format&fit=crop&w=800&q=80',
//   'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?auto=format&fit=crop&w=800&q=80',
// ];
