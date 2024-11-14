import React, { useEffect, useState } from 'react';
import SimpleStepper from 'react-native-simple-stepper';

import type { Product } from '@/api';
import { Button, Image, Input, Modal, Text, useModal, View } from '@/ui';
import { Alert } from 'react-native';

type Props = Product;

export const Card = ({ title, body, id, image, price, onPress }: Props) => {
  const [quantity, setQuantity] = React.useState(1);
  const { ref, present, dismiss } = useModal();

  const [loading, setLoading] = React.useState(false);
  const dollars = (Number(price) / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  // Zip Code
  const [error, setError] = useState<undefined | string>();
  const [zipcode, setZipCode] = useState<undefined | string>();
  const [checkingZip, setCheckingZip] = useState(false);
  function validateZipCodeThenUpdateError() {
    console.log(zipcode, 'zip');
    console.log(zipcode?.length, 'zip length');
    if (zipcode?.length === 5) {
      setError(undefined);
      return true;
    } else {
      setError('please enter a valid Zip code');
      return false;
    }
  }

  async function checkZipOnServer() {
    try {
      setCheckingZip(true);
      // setTimeout(() => {}, 2000);
      // setCheckingZip(false);
    } catch (error) {
      console.log(error, 'error');
      setCheckingZip(false);
    }
  }

  useEffect(() => {
    validateZipCodeThenUpdateError();
  }, [zipcode]);

  async function showZipCodePicker() {
    Alert.prompt(
      'Enter Zip Code',
      'Please enter your zip code to ensure we cam deliver to you.',
      (text) => {
        console.log('Alert text is ', text);
        //Add nuttones
        return [];
      },
      'plain-text',
      '1001',
      'number-pad',

      {
        cancelable: true,
        userInterfaceStyle: 'unspecified',
        onDismiss: () => {
          console.log('on dismiss');
        },
      },
    );

    // try {
    //   setLoading(true);
    //   await onPress({ productId: id, quantity, zipCode: '10001' });
    //   setLoading(false);
    // } catch (error) {
    //   setLoading(false);
    // }
  }

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
          {dollars}
        </Text>
        <SimpleStepper
          showText
          stepValue={1}
          valueChanged={setQuantity}
          disableDecrementImageTintColor={false}
          useColor
          color={'black'}
        />
        <Button
          loading={loading}
          label="Buy Now"
          onPress={() => {
            present();
          }}
        />
        <Modal
          snapPoints={['60%']}
          title="Enter Zip Code"
          ref={ref}
          onDismiss={() => {
            console.log('on dismiss');
          }}
        >
          <Text>
            Please enter your zip code to make sure we can deliver to you.
          </Text>
          <Input
            placeholder="11001"
            onChangeText={(text) => {
              setZipCode(text);
            }}
            error={error}
          />
          <Button
            label="Check Zip"
            disabled={error ? true : false}
            loading={checkingZip}
            onPress={checkZipOnServer}
          />
        </Modal>
      </View>
    </View>
    //   </Pressable>
    // </Link>
  );
};

const images = [
  'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1515386474292-47555758ef2e?auto=format&fit=crop&w=800&q=80',
  'https://plus.unsplash.com/premium_photo-1666815503002-5f07a44ac8fb?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?auto=format&fit=crop&w=800&q=80',
];
