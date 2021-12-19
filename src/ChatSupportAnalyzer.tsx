import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import './ChatSupportAnalyzer.css';
import { Alert, Button, FormControlLabel, FormGroup, Snackbar, Switch, Typography } from '@mui/material';
import MessageList from './components/MessageList/MessageList';
import TextInput from './components/TextInput/TextInput';
import Slider from './components/Slider/Slider';
import {
  Sentiments,
  DUMMY_CUSTOMER_RESPONSES,
  sentimentsAlertMap,
  ProgressBarHistoryType
} from './components/utils/constants';
import { getRandomArrayValue } from './components/utils/helpers';
import { useSentiments } from './hooks/useSentiments';
import ProgressChart from './components/ProgressChart/ProgressChart';

function ChatSupportAnalyzer() {
  const [text, setText] = useState<string[]>([]);
  const [botText, setBotText] = useState<string[]>([]);
  const [isChatActive, setIsStartActive] = useState(false);
  const [isStatsEnabled, setIsStatsEnabled] = useState(false);
  const [progressBarHistory, setProgressBarHistory] = useState<ProgressBarHistoryType[]>([]);
  const { sentiment, progressBarValue, hasError, setters } = useSentiments(text);

  useEffect(() => {
    if (text.length > 0) {
      setBotText((b) => [...b, getRandomArrayValue(DUMMY_CUSTOMER_RESPONSES)]);
    }
  }, [text]);

  useEffect(() => {
    const now = new Date();
    setProgressBarHistory((h) => [...h, { score: progressBarValue, time: `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}` }]);
  }, [progressBarValue]);

  const resetChat = () => {
    setIsStartActive(false);
    setText([]);
    setBotText([]);
    setters.setProgressBarValue(50);
    setProgressBarHistory([]);
    setIsStatsEnabled(false);
    setters.setSentiment(Sentiments.None);
  };

  return (
    <div className="App">
      <Typography className="heading" variant="h4" component="div" gutterBottom>
        Chat Support Analyzer
      </Typography>
      <Snackbar open={hasError} autoHideDuration={6000} onClose={() => setters.setHasError(false)} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={() => setters.setHasError(false)} severity="error" sx={{ width: '100%' }}>
          Something went wrong, try again
        </Alert>
      </Snackbar>

      {isChatActive ? (
        <>
          <Container
            style={{
              padding: '0 48px 24px 48px',
              borderRadius: '4px',
              maxWidth: '900px',
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
              {isStatsEnabled && <ProgressChart data={progressBarHistory} />}
            </Box>
          </Container>
          <Container
            style={{
              padding: '0',
              display: 'flex',
              justifyContent: 'space-between',
              borderRadius: '4px',
              maxWidth: '900px',
            }}
          >
            <FormGroup>
              <FormControlLabel control={<Switch defaultChecked={false} checked={isStatsEnabled} onChange={() => setIsStatsEnabled(!isStatsEnabled)} />} label="Chat progress" />
            </FormGroup>
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

export default ChatSupportAnalyzer;
