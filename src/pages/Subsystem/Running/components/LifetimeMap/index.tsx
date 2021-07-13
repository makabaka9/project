import { Chart, Line, Point } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';

export interface HorizonBarProps {
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  data: {
    date: string;
    type: string;
    value: number;
  }[];
}

const LifetimeFault: React.FC<HorizonBarProps> = (props) => {
  const { height = 1, data } = props;
  const padding: [number, number, number, number] = [30, 30, 30, 30];
  const chartHeight = height + 54;

  return (
    <div>
      {height > 0 && (
        <Chart
          scale={{ value: { min: 0 } }}
          padding={[10, 20, 50, 40]}
          autoFit
          height={chartHeight}
          data={data}
        >
          <Line shape="circle" position="date*value" color="type" />
          <Point
            position="date*value"
            color="type"
            size={2}
            style={{ stroke: 'black' }}
            shape="circle"
          />
        </Chart>
      )}
    </div>
  );
};

export default autoHeight()(LifetimeFault);
