import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';

type Props = {
  text: string[];
  botText: string[];
};

export default function MessageList({ text, botText }: Props) {
  const mergeArraysAlternatively = (arr1: string[], arr2: string[]) =>
    (arr1.length > arr2.length ? arr1 : arr2)
      .map((_, i) => [arr1[i], arr2[i]])
      .flat()
      .filter(Boolean);

  return (
    <Grid container spacing={2}>
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
    </Grid>
  );
}
