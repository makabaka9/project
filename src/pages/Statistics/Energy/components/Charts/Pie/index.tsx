import { DonutChart } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';

export interface HorizonBarProps {
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  // visible: boolean;
  data: {
    type: number | string;
    value: number;
  }[];
}

const Pie: React.FC<HorizonBarProps> = (props) => {
  const {
    data,
    // visible
  } = props;
  const padding: [number, number, number, number] = [0, 30, 40, -36];
  const chartHeight = '16vh';

  return (
    <div>
      <DonutChart
        width={460}
        height={chartHeight}
        data={data}
        label={{ visible: false }}
        forceFit
        tooltip={{
          visible: true,
          // fields:['总能耗与再生能量比','colorField ']
        }}
        pieStyle={{ lineWidth: 0 }}
        radius={1.0}
        padding={padding}
        angleField="value"
        colorField="type"
        legend={{
          visible: true,
          position: 'bottom-center',
          offsetX: -30,
          offsetY: 10
        }}
        statistic={{ visible: false }}
      />
    </div>
  );
};

export default autoHeight()(Pie);
