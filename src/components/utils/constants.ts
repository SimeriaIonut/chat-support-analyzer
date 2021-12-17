export const BASE_URL =
  'https://api.eu-de.natural-language-understanding.watson.cloud.ibm.com/instances/71011b45-3524-427c-a94a-8256b762b13b';
export const API_KEY =
  'YXBpa2V5OkRUOWtYQUl4TFNjVFRaWm5wM0pCeGZVMWZDcktSYUhCMFA4QmRRZk43alQ2';

export const ENTER_KEY = 'Enter';

export enum Sentiments {
  Negative = 'negative',
  Neutral = 'neutral',
  Positive = 'positive',
  None = 'none',
}

export const SLIDER_OPTIONS = [
  {
    value: 0,
    label: 'Negative',
  },
  {
    value: 50,
    label: 'Neutral',
  },
  {
    value: 100,
    label: 'Positive',
  },
];

export const DUMMY_CUSTOMER_RESPONSES = [
  "Hi, can I get a shipping status on my order? My tracking number doesn't work",
  'Hi, how can I create a return label?',
  "This doesn't work, can I get a refund?",
  'The zipper on the jacket I bought is broken, can you send me another one?',
];
