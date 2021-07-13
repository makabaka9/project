import { Chart, Line, Axis } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';

export interface GroupedColumnProps {
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  data: {
    time: string;
    car: string;
    passengernum: number | string;
  }[];
}

const GroupedColumn: React.FC<GroupedColumnProps> = (props) => {
  const { height = 1, data } = props;
  // const padding: [number, number, number, number] = [30, 30, 30, 30];
  const chartHeight = height + 100;
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
      <Chart
        scale={{ temperature: { min: 0 } }}
        padding={[10, 20, 50, 60]}
        autoFit
        height={chartHeight}
        data={data}
        fillt
      >
        <Axis name="passengernum" grid={grid} />
        <Line shape="smooth" position="time*passengernum" color="car" />
      </Chart>
    </div>
  );
};

export default autoHeight()(GroupedColumn);
