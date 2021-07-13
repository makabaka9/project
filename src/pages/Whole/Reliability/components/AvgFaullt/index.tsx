import { Chart, Line, Point, Legend, Axis } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';

export interface GroupedColumnProps {
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  data: {
    time: Date;
    type: string;
    value: number;
  }[];
}
const GroupedColumn: React.FC<GroupedColumnProps> = (props) => {
  const { height = 1, data } = props;
  const padding: [number, number, number, number] = [30, 30, 30, 30];
  const chartHeight = height + 54;
  const grid = {
    line: {
      type: 'line',
      style: {
        stroke: '#DDDDDD',
        lineWidth: 1,
        strokeOpacity: 0.1,
      },
    },
  };

  return (
    <div>
      <Chart height={chartHeight} data={data} forceFit padding={padding}>
        <Legend position="top" dx={20} />
        <Axis name="temperature" grid={grid} />
        <Line shape="line" position="time*value" color="type" />
        <Point
          position="time*value"
          color="type"
          visible={false}
          shape="circle"
          size={3}
          style={{ stroke: 'black' }}
        />
      </Chart>
    </div>
  );
};

export default autoHeight()(GroupedColumn);
