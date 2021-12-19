import { useEffect, useRef } from 'react';
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import { mergeArraysAlternatively } from '../utils/helpers';

type Props = {
  text: string[];
  botText: string[];
};

export default function MessageList({ text, botText }: Props) {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [botText]);

  return (
    <Grid container style={{ maxHeight: '500px', overflowY: 'scroll' }} spacing={2}>
      {text &&
        botText &&
        mergeArraysAlternatively(text, botText).map((text, index) => {
          if (index % 2 === 0) {
            return (
              <>
                <Grid item xs={6}>
                  <ListItem disablePadding>
                    <ListItemButton
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                        borderRadius: '4px',
                      }}
                    >
                      <ListItemIcon>
                        <MessageIcon />
                      </ListItemIcon>
                      <ListItemText primary={text} secondary={'Support'} />
                    </ListItemButton>
                  </ListItem>
                </Grid>
                <Grid item xs={6}></Grid>
              </>
            );
          } else {
            return (
              <>
                <Grid item xs={6}></Grid>
                <Grid item xs={6}>
                  <ListItem disablePadding>
                    <ListItemButton
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                        borderRadius: '4px',
                      }}
                    >
                      <ListItemText
                        style={{ textAlign: 'right' }}
                        primary={text}
                        secondary={'Customer'}
                      />
                      <ListItemIcon
                        style={{
                          minWidth: '24px',
                          marginLeft: '32px',
                        }}
                      >
                        <MessageIcon />
                      </ListItemIcon>
                    </ListItemButton>
                  </ListItem>
                </Grid>
              </>
            );
          }
        })}
      <div ref={messagesEndRef} />
    </Grid>
  );
}
