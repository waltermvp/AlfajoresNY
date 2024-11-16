import type { Handler } from 'aws-lambda';
const ZIP_CODE_ARRAY = ['1001', '11356', '11368', '11709'];

export const handler: Handler = async (event, context) => {
  const { zipcode } = event.arguments;

  console.log('zipcode', zipcode, context);
  if (!ZIP_CODE_ARRAY.includes(zipcode)) {
    return { error: `Zipcode ${zipcode} not found` };
  }
  const returnParams = { success: true };
  return JSON.stringify(returnParams);
};
