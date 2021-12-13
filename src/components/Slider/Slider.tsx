import React from 'react';
import { Slider as OriginalSlider, styled } from '@mui/material';

enum Sentiments {
  Negative = 'negative',
  Neutral = 'neutral',
  Positive = 'positive',
  None = 'none',
}

const marks = [
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

const sentimentsColorMap = {
  negative: '#B42A05',
  neutral: '#0BA1CF',
  positive: '#05B43F',
  none: '#e2e2e2',
};

type Props = {
  progressBarValue: number;
  sentiment: Sentiments;
};

export default function Slider({ progressBarValue, sentiment }: Props) {
  const PrettoSlider = styled(OriginalSlider)({
    color: sentimentsColorMap[sentiment],
    height: 8,
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-thumb': {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit',
      },
      '&:before': {
        display: 'none',
      },
    },
    '& .MuiSlider-valueLabel': {
      lineHeight: 1.2,
      fontSize: 12,
      background: 'unset',
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: '50% 50% 50% 0',
      backgroundColor: sentimentsColorMap[sentiment],
      transformOrigin: 'bottom left',
      transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
      '&:before': { display: 'none' },
      '&.MuiSlider-valueLabelOpen': {
        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
      },
      '& > *': {
        transform: 'rotate(45deg)',
      },
    },
  });

  return (
    <div className="slider-container">
      <PrettoSlider
        aria-label="Always visible"
        defaultValue={progressBarValue}
        value={progressBarValue}
        step={10}
        marks={marks}
        valueLabelDisplay="on"
        style={{
          cursor: 'default',
        }}
      />
    </div>
  );
}
