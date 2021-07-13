import { DonutChart } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';

export interface HorizonBarProps {
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  data: {
    type: number | string;
    value: number;
  }[];
}

const Pie: React.FC<HorizonBarProps> = (props) => {
  const { height = 1, data } = props;
  // const padding: [number, number, number, number] = [30, 30, 30, 30];
  const chartHeight = height + 100;

  return (
    <div>
      {height > 0 && (
        <DonutChart
          height={chartHeight}
          data={data}
          // title={{
          //   visible: true,
          //   text: '环图',
          // }}
          forceFit
          // description={{
          //   visible: true,
          //   text: '环图的外半径决定环图的大小，而内半径决定环图的厚度。',
          // }}
          pieStyle={{ lineWidth: 0 }}
          radius={0.8}
          padding="auto"
          angleField="value"
          colorField="type"
        />
      )}
    </div>
  );
};

export default autoHeight()(Pie);
