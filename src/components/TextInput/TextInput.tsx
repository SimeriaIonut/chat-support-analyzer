import { FormControl, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { ENTER_KEY } from '../utils/constants';

type Props = {
  setText: Function;
};

export default function TextInput({ setText }: Props) {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const handleKeyUp = (e: any) => {
      if (e.code === ENTER_KEY) {
        // add the text to the array of texts
        setText((t: string[]) => [...t, inputValue]);
        setInputValue('');
      }
    };

    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [inputValue, setText]);

  return (
    <FormControl style={{ margin: '24px 0 16px 0' }} fullWidth sx={{ m: 1 }}>
      <TextField
        id="filled-basic"
        label="Message"
        variant="filled"
        autoComplete="off"
        autoFocus
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />
    </FormControl>
  );
}
