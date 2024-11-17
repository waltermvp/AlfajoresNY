import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import React, { useEffect, useState } from 'react';

import { Button, Input, View } from '@/ui';

import type { Schema } from '../../amplify/data/resource';
import outputs from '../amplify_outputs.json';
import { Title } from './title';
Amplify.configure(outputs);

export const ZipInput = () => {
  const amplifyClient = generateClient<Schema>();
  console.log('amplifyClient.queries', amplifyClient.queries);
  const [zipCode, setZipcode] = React.useState<string | undefined>();
  const [error, setError] = useState<undefined | string>();
  const [checkingZip, setCheckingZip] = useState(false);
  const buttonEnabled = error ? true : false;

  async function checkZipOnServer() {
    if (!zipCode) {
      console.log('checking retun');
      return;
    }
    setCheckingZip(true);
    console.log('will validate: ', zipCode);
    try {
      const result = await amplifyClient.queries.validateZipCode({
        zipCode,
      });
      const { success } = JSON.parse(result.data ?? '{}');
      console.log(result, 'result', success);
      // setTimeout(() => {}, 2000);
      // setCheckingZip(false);
    } catch (error) {
      console.log(error, 'error');
      // setCheckingZip(false);
    }
  }

  useEffect(() => {
    function validateZipCodeThenUpdateError() {
      if (zipCode?.length === 5) {
        setError(undefined);
        return true;
      } else {
        setError('please enter a valid Zip code');
        return false;
      }
    }

    validateZipCodeThenUpdateError();
  }, [zipCode, setError]);

  return (
    <>
      <Title
        text="Please enter your zip code to make sure we can deliver to you."
        color="white"
      />
      <View>
        <Input
          label="Zip Code"
          placeholder="enter your Zip Code"
          onChangeText={setZipcode}
        />
        {/* <Input label="Error" error="This is a message error" />
        <Input label="Focused" /> */}
        <Button
          variant="secondary"
          label="Check Zip"
          disabled={buttonEnabled}
          loading={checkingZip}
          onPress={checkZipOnServer}
        />
      </View>
    </>
  );
};
