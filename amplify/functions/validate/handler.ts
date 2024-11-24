import type { Handler } from 'aws-lambda';

import ZipObjects from './US.json';

const ZIP_ARRAY: ZipObject[] = ZipObjects as ZipObject[];
const ZIP_CODE_ARRAY = ['11001', '11356', '11368', '11709'];

type ZipObject = {
  Country: string;
  ZipCode: number;
  City: string;
  StateName: string;
  StateAbbreviation: string;
  County: string;
  CountyCode: number;
  Additional1: any;
  Additional2: any;
  Latitude: number;
  Longitude: number;
  Additional3: number;
};

export const handler: Handler = async (event, _context) => {
  const { zipCode } = event.arguments;

  if (!ZIP_CODE_ARRAY.includes(zipCode)) {
    console.log('Zipcode not found 1');

    return {
      success: false,
      error: `Zipcode ${zipCode} not found`,
    };
  }

  const zipObject = ZIP_ARRAY.find(
    (zipObject) => zipObject.ZipCode.toString() === zipCode,
  );
  if (!zipObject) {
    console.log('Zipcode not found 2');
    return {
      success: false,
      error: `Zipcode ${zipCode} not found`,
    };
  }
  console.log(zipObject, 'zipObject');
  const returnParams = {
    success: true,
    name: zipObject.StateName,
    city: zipObject.City,
    zip: zipCode,
  };
  console.log(returnParams, 'returnParams');
  return returnParams;
};
