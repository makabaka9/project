import { Chart, Line, Point, Axis } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';

export interface GroupedColumnProps {
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  data: Array<object>
}

const GroupedColumn: React.FC<GroupedColumnProps> = (props) => {
  const { height = 1, data } = props;
  // const padding: [number, number, number, number] = [30, 30, 30, 30];
  const chartHeight = '17vh';
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
  // "month": "2020-09", "flow": 119.0
  const scale = {
    flow: {
      alias: '客运量' // 别名
    },
    month: {
      alias: '日期/月' // 别名
    },
  };
  return (
    <div>
      <Chart
        scale={scale}
        padding={[10, 20, 50, 70]}
        autoFit
        height={chartHeight}
        data={data}
      >
        <Axis name="flow" grid={grid} title={{
          style: {
            textAlign: 'center',
            fill: '#999',
          }
        }} />
        <Axis
          name="month"
          title={{
            style: {
              textAlign: 'center',
              fill: '#999',
            }
          }} />
        <Line shape="smooth" position="month*flow" />
        <Point
          position="month*flow"
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
