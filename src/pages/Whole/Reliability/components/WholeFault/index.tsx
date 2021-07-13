import { GroupedColumnChart } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';

export interface WholeFaultProps {
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  data: {
    time: Date;
    type: string;
    value: number;
  }[];
}

const WholeFault: React.FC<WholeFaultProps> = (props) => {
  const { height = 1, data } = props;
  const padding: [number, number, number, number] = [30, 30, 30, 30];
  const chartHeight = height + 100;

  return (
    <div>
      <GroupedColumnChart
        padding={padding}
        height={chartHeight}
        data={data}
        forceFit
        xField="time"
        yField="value"
        yAxis={{
          min: 0,
          visible: true,
          title: { visible: false },
        }}
        legend={{
          visible: true,
          position: 'top-center',
          offsetY: 10,
          offsetX: 10,
        }}
        label={{
          visible: false,
          style: {
            stroke: '#ffffff',
            lineWidth: 1,
            fontSize: 10,
          },
        }}
        groupField="type"
        color={['#1ca9e6', '#f88c24', '#d3f261']}
        xAxis={{ visible: true, title: { visible: false } }}
      />
    </div>
  );
};

export default autoHeight()(WholeFault);
