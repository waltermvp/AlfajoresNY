import type { Handler } from 'aws-lambda';
import ZipObjects from "./US.json"
const ZIP_CODE_ARRAY = ['11001', '11356', '11368', '11709'];

export const handler: Handler = async (event, _context) => {
  const { zipCode } = event.arguments;

  if (!ZIP_CODE_ARRAY.includes(zipCode)) {
    return {
      success: false,
      error: `Zipcode ${zipCode} not found`,
    };
  }

 const zipObject:[] = ZipObjects.find((zipObject) => zipObject.ZipCode === zipCode);
  if (!zipObject) {
    return {
      success: false,
      error: `Zipcode ${zipCode} not found`,
    };
  }

  const returnParams = {
    success: true,
    name:zipObject.StateName
    city: zipObject.City
  };
  return returnParams;
};
