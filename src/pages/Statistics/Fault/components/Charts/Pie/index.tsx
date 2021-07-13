import { DonutChart } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';

export interface HorizonBarProps {
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  data2: {
    type: number | string;
    value: number;
  }[];
}

const Pie: React.FC<HorizonBarProps> = (props) => {
  const { height = 1, data2 } = props;
  // const padding: [number, number, number, number] = [30, 30, 30, 30];
  const chartHeight = '20vh';

  return (
    <div>
      {height > 0 && (
        <DonutChart
          height={chartHeight}
          data={data2}
          forceFit
          pieStyle={{ lineWidth: 0 }}
          radius={0.8}
          padding="auto"
          angleField="value"
          colorField="type"
          legend={{
            visible:true,
            position:'left-top'
          }}
        />
      )}
    </div>
  );
};

export default autoHeight()(Pie);
