// import { Image } from 'expo-image';
import React from 'react';
import SimpleStepper from 'react-native-simple-stepper';

import type { Post } from '@/api';
import { Button, Image, Text, View } from '@/ui';

type Props = Post;

const images = [
  'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1515386474292-47555758ef2e?auto=format&fit=crop&w=800&q=80',
  'https://plus.unsplash.com/premium_photo-1666815503002-5f07a44ac8fb?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?auto=format&fit=crop&w=800&q=80',
];

export const Card = ({ title, body, id, image, price, onPress }: Props) => {
  const [quantity, setQuantity] = React.useState(1);
  return (
    // <Link href={`/feed/${id}`} asChild>
    //   <Pressable>
    <View className="m-2 overflow-hidden rounded-xl  border border-neutral-300 bg-white  dark:bg-neutral-900">
      <Image
        className="h-56 w-full overflow-hidden rounded-t-xl"
        contentFit="cover"
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
          {price}
        </Text>
        <SimpleStepper
          showText
          stepValue={1}
          valueChanged={setQuantity}
          useColor
          color={'white'}
        />
        <Button
          label="Buy Now"
          onPress={() => {
            onPress({ productId: id, quantity });
          }}
        />
      </View>
    </View>
    //   </Pressable>
    // </Link>
  );
};
