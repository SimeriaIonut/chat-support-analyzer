import {
  BASE_URL,
  API_KEY,
} from '../components/utils/constants';

export const getSentimentsForText = (text: string[]) => {
  return fetch(
    `${BASE_URL}/v1/analyze?version=2021-08-01&features=emotion,sentiment&entities.emotion=true&text=${text.join(
      '. '
    )}`,
    {
      headers: {
        Authorization: `Basic ${API_KEY}`,
      },
    }
  ).then((response) => response.json())
}