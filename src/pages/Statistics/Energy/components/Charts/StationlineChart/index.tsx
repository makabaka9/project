import { Chart, Line, Point, Axis, Legend } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';

export interface StationLineProps {
  height?: number
  forceFit?: boolean;
  borderWidth?: number;
  data: {
    month: string;
    city: number | string;
    temperature: number;
  }[];
}

const StationLine: React.FC<StationLineProps> = (props) => {
  const { height, data } = props;
  // const padding: [number, number, number, number] = [30, 30, 30, 30];
  const chartHeight = '12vh';

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
  const scale = {
    month: {
      alias: '时间/日', // 别名
    },
    temperature: {
      alias: 'kWh', // 别名
    },
  };
  return (
    <div >
      <Chart padding="auto" autoFit height={chartHeight} data={data} scale={scale} >
        <Axis
          name="month"
          title={{
            style: {
              textAlign: 'center',
              fill: '#999',
            },
          }}
        />
        <Axis
          name="temperature"
          grid={grid}
          title={{
            style: {
              fontSize: 12,
              textAlign: 'center',
              fill: '#999',
            },
          }}
        />
        {/* <Axis name="temperature" grid={grid} /> */}
        <Legend position="bottom" />
        <Line shape="smooth" position="month*temperature" color="city" />
        <Point position="month*temperature" color="city" size={2} shape="circle" style={{ lineWidth: 0, stroke: 'black' }} />
      </Chart>
    </div>
  );
};

export default autoHeight()(StationLine);
