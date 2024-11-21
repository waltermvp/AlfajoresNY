import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import React, { useEffect, useState } from 'react';

import { Button, Input, View } from '@/ui';

import type { Schema } from '../../amplify/data/resource';
import outputs from '../../amplify_outputs.json';
import { Title } from './title';

Amplify.configure(outputs);
export type ZipInputProps = {
  callBack: ({ success }: { success: boolean; zip?: string }) => void;
};

// eslint-disable-next-line max-lines-per-function
export const ZipInput = ({ callBack }: ZipInputProps) => {
  const amplifyClient = generateClient<Schema>();
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
    try {
      const result = await amplifyClient.queries.validate({
        zipCode,
      });
      const success = result.data?.success ?? false;
      console.log('success', success);
      if (!success) {
        console.log('setting error');
        setError('Sorry, we do not deliver to your area');
        callBack({ success });
      } else {
        setError(undefined);
        callBack({ success, zip: zipCode });
      }
      setCheckingZip(false);
    } catch (error) {
      setError('Sorry, we do not deliver to your area');

      setCheckingZip(false);
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
          error={error}
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
