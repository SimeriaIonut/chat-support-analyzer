import './ProgressChart.css';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries
} from "@devexpress/dx-react-chart-material-ui";
import { Typography } from '@mui/material';
import { ProgressBarHistoryType } from '../utils/constants';

type Props = {
  data: ProgressBarHistoryType[];
}

export default function ProgressChart({ data }: Props) {
  return (
    <div className="progress-chart-container">
      <Typography className="progress-chart-title" component="div">
        Chat progress
      </Typography>
      <Chart
        height={250}
        data={data}
      >
        <ArgumentAxis showLine={false} showLabels={false} showTicks={false} position="bottom" />
        <ValueAxis indentFromAxis={0} showGrid={false} />
        <LineSeries
          name="Sentiment score"
          valueField="score"
          argumentField="time"
        />
      </Chart>
    </div>
  );
}
