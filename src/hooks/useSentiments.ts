import { useState, useEffect } from 'react';
import { getSentimentsForText } from '../api';
import { Sentiments, UNPROCESSABLE_ENTITY_STATUS_CODE } from '../components/utils/constants';
import { getProgressBarPercentage, shouldSkipAPICall } from '../components/utils/helpers';

export function useSentiments(text: string[]) {
  const [sentiment, setSentiment] = useState<Sentiments>(Sentiments.None);
  const [progressBarValue, setProgressBarValue] = useState(50);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (shouldSkipAPICall(text)) return;

    getSentimentsForText(text).then((data) => {
      if (data && data.error && data.code !== UNPROCESSABLE_ENTITY_STATUS_CODE) {
        setHasError(true);
      }

      if (data && data.sentiment && data.sentiment.document) {
        setSentiment(data.sentiment.document.label);
        setProgressBarValue(
          getProgressBarPercentage(data.sentiment.document.score)
        );
      }
    })
      .catch((error) => {
        console.log(error);
        setHasError(true);
      });
  }, [text]);

  return {
    sentiment, hasError, progressBarValue, setters: {
      setSentiment,
      setProgressBarValue,
      setHasError
    }
  };
}