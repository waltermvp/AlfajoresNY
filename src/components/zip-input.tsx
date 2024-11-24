import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import React, { useEffect, useState } from 'react';

import { useIsFirstTime } from '@/core';
import { Button, colors, Input, Text, View } from '@/ui';

import { type Schema } from '../../amplify/data/resource';
import outputs from '../../amplify_outputs.json';
import { Title } from './title';

const ZIP_STORAGE_KEY = 'zipCode';
Amplify.configure(outputs);
export type ZipInputProps = {
  callBack: ({ success }: { success: boolean; zip?: string }) => void;
};
interface ZipData {
  zip: string;
  city: string;
  name: string;
}

// eslint-disable-next-line max-lines-per-function
export const ZipInput = ({ callBack }: ZipInputProps) => {
  const [isFirstTime, setIsFirstTime] = useIsFirstTime();

  const amplifyClient = generateClient<Schema>();
  const [zipCode, setZipcode] = React.useState<string | undefined>();
  const [zipCodeResult, setZipCodeResult] = React.useState<ZipData | undefined>(
    JSON.parse(localStorage.getItem('zipCode') || 'null') ?? undefined,
  );
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

      if (!success) {
        setError('Sorry, we do not deliver to your area');
        callBack({ success });
        clearZip();
      } else {
        const zipData = result.data as ZipData;
        setZip(zipData);
        callBack({ success, zip: zipCode });
      }
      setCheckingZip(false);
    } catch (error) {
      setError('Sorry, we do not deliver to your area');

      setCheckingZip(false);
    }
  }

  function clearZip() {
    setZipCodeResult(undefined);
    localStorage.removeItem(ZIP_STORAGE_KEY);
    setZipcode(undefined);
  }

  function setZip(data: ZipData) {
    localStorage.setItem(ZIP_STORAGE_KEY, JSON.stringify(data));
    setZipCodeResult(data);
    setError(undefined);
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
    if (isFirstTime) {
      setIsFirstTime(false);
      return;
    }

    validateZipCodeThenUpdateError();
  }, [zipCode, setError, isFirstTime, setIsFirstTime]);

  useEffect(() => {
    function updatecall() {
      const cachedZip: ZipData = JSON.parse(
        localStorage.getItem(ZIP_STORAGE_KEY) || 'null',
      );
      setZipCodeResult(cachedZip);
      callBack({ success: true, zip: zipCodeResult?.zip });
    }
    updatecall();
  }, [zipCodeResult, callBack]);

  console.log(zipCodeResult, 'zipCodeResult');
  return (
    <>
      {!zipCodeResult ? (
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
              onSubmitEditing={checkZipOnServer}
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
      ) : (
        <View>
          <Text
            onPress={clearZip}
            style={{
              alignSelf: 'flex-end',
              borderRadius: 11,
              width: 22,
              height: 22,
              textAlign: 'center',
              backgroundColor: colors.danger[700],
              color: 'white',
              fontSize: 16,
            }}
            // className=" bg-red-700  "
          >
            x
          </Text>

          <Text className="my-3 px-3 text-center text-5xl font-bold   color-white">
            Great news we deliver to your area!
          </Text>
          <Text className="my-1 px-1 text-center text-3xl  color-slate-400">
            {zipCodeResult?.city}, {zipCodeResult?.name}
          </Text>
        </View>
      )}
    </>
  );
};
