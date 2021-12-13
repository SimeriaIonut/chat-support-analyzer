import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import './App.css';
import { Alert, AlertColor, Button, Typography } from '@mui/material';
import MessageList from './components/MessageList/MessageList';
import TextInput from './components/TextInput/TextInput';
import Slider from './components/Slider/Slider';

const BASE_URL =
  'https://api.eu-de.natural-language-understanding.watson.cloud.ibm.com/instances/71011b45-3524-427c-a94a-8256b762b13b';
const API_KEY =
  'YXBpa2V5OkRUOWtYQUl4TFNjVFRaWm5wM0pCeGZVMWZDcktSYUhCMFA4QmRRZk43alQ2';

enum Sentiments {
  Negative = 'negative',
  Neutral = 'neutral',
  Positive = 'positive',
  None = 'none',
}

const sentimentsAlertMap: { [key: string]: AlertColor } = {
  negative: 'warning',
  neutral: 'info',
  positive: 'success',
  none: 'info',
};

const getProgressBarPercentage = (value: number) => {
  if (value === 0) return 50;
  const min = -1.0;
  const max = 1.0;
  return Math.ceil(((value - min) / (max - min)) * 100);
};

function App() {
  const [text, setText] = useState<string[]>([]);
  const [botText, setBotText] = useState<string[]>([]);
  const [sentiment, setSentiment] = useState<Sentiments>(Sentiments.None);
  const [progressBarValue, setProgressBarValue] = useState(50);
  const [isChatActive, setIsStartActive] = useState(false);

  useEffect(() => {
    if (text.length > 0) {
      setBotText((b) => [...b, 'Message from customer here...']);
    }
  }, [text]);

  useEffect(() => {
    if (text.length === 0) return;

    fetch(
      `${BASE_URL}/v1/analyze?version=2021-08-01&features=emotion,sentiment&entities.emotion=true&text=${text.join(
        '. '
      )}`,
      {
        headers: {
          Authorization: `Basic ${API_KEY}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.sentiment && data.sentiment.document) {
          setSentiment(data.sentiment.document.label);
          setProgressBarValue(
            getProgressBarPercentage(data.sentiment.document.score)
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [text]);

  const resetChat = () => {
    setIsStartActive(false);
    setText([]);
    setBotText([]);
    setProgressBarValue(50);
    setSentiment(Sentiments.None);
  };

  return (
    <div className="App">
      <Typography className="heading" variant="h4" component="div" gutterBottom>
        Chat Support Analyzer
      </Typography>
      {isChatActive ? (
        <>
          <Container
            style={{
              padding: '0 48px 24px 48px',
              borderRadius: '4px',
              maxWidth: '800px',
            }}
            sx={{ bgcolor: 'background.paper' }}
          >
            <Box>
              <MessageList text={text} botText={botText} />
              <TextInput setText={setText} />
              <Alert severity={sentimentsAlertMap[sentiment]}>
                Overall sentiment: <strong>{sentiment}</strong>
              </Alert>
              <Slider
                progressBarValue={progressBarValue}
                sentiment={sentiment}
              />
            </Box>
          </Container>
          <Container
            style={{
              padding: '0',
              display: 'flex',
              justifyContent: 'flex-end',
              borderRadius: '4px',
              maxWidth: '800px',
            }}
          >
            <Button variant="text" onClick={() => resetChat()}>
              End chat
            </Button>
          </Container>
        </>
      ) : (
        <Button
          style={{ display: 'block', margin: '0 auto' }}
          onClick={() => setIsStartActive(true)}
          variant="contained"
        >
          START CHAT
        </Button>
      )}
    </div>
  );
}

export default App;
