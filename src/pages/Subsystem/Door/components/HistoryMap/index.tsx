import { Chart, Line, Point } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';

export interface HistoryMapProps {
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  data: {
    time: string;
    door: string;
    value: number;
  }[];
}

const HistoryMap: React.FC<HistoryMapProps> = (props) => {
  const { height = 1, data } = props;
  // const padding: [number, number, number, number] = [30, 30, 30, 30];
  const chartHeight = height + 54;

  return (
    <div>
      <Chart
        scale={{ value: { min: 0 } }}
        padding={[10, 20, 50, 40]}
        autoFit
        height={chartHeight}
        data={data}
      >
        <Line shape="smooth" position="time*value" color="door" />
        <Point
          position="time*tvalue"
          color="city"
          visible={false}
          shape="circle"
          size={3}
          style={{ stroke: 'black' }}
        />
      </Chart>
    </div>
  );
};

export default autoHeight()(HistoryMap);
