import { Chart, Line, Point } from 'bizcharts';
import React from 'react';
// import autoHeight from '@/components/autoHeight';

export interface HistoryMapProps {
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  data: {
    month: string;
    city: number | string;
    temperature: number;
  }[];
}

const HistoryMap: React.FC<HistoryMapProps> = (props) => {
  const { height = 1, data } = props;
  // const padding: [number, number, number, number] = [30, 30, 30, 30];
  const chartHeight = height + 100;

  return (
    <div>
      <Chart
        scale={{ temperature: { min: 0 } }}
        padding={[10, 20, 50, 60]}
        autoFit
        height={chartHeight}
        data={data}
      >
        <Line shape="smooth" position="month*temperature" color="city" />
        <Point
          position="month*temperature"
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
export default HistoryMap;
// export default autoHeight()(HistoryMap);
