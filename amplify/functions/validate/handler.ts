import type { Handler } from 'aws-lambda';
const ZIP_CODE_ARRAY = ['11001', '11356', '11368', '11709'];

export const handler: Handler = async (event, _context) => {
  const { zipCode } = event.arguments;

  if (!ZIP_CODE_ARRAY.includes(zipCode)) {
    return { error: `Zipcode ${zipCode} not found` };
  }
  // const returnParams = { success: true };
  return 'returnParams';
};
