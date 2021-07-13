import { StackedColumnChart } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';

export interface StackedColumnProps {
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  data: {
    year: string;
    type: number | string;
    value: number;
  }[];
}

const StackedColumn: React.FC<StackedColumnProps> = (props) => {
  const { height = 1, data } = props;
  // const padding: [number, number, number, number] = [30, 30, 30, 30];
  const chartHeight = height + 100;

  return (
    <div>
      <StackedColumnChart
        height={chartHeight}
        data={data}
        title={{
          visible: true,
          text: '堆叠柱状图',
        }}
        forceFit
        padding="auto"
        xField="year"
        yField="value"
        yAxis={{
          min: 0,
        }}
        color={['#ae331b', '#1a6179']}
        stackField="type"
      />
    </div>
  );
};

export default autoHeight()(StackedColumn);
