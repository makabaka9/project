import { Chart, Line, Axis, Point, Legend } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';
import moment from 'moment';

export interface GroupedColumnProps {
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  data?: any;
}

const EvaluationColumn: React.FC<GroupedColumnProps> = (props) => {
  const { height, data, forceFit = true } = props;
  // const padding: [number, number, number, number] = [10, 20, 50, 40];
  const chartHeight = "25vh";
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
    time: {
      alias: '时间/h', // 别名
    },
    value: {
      alias: '加/减速度评价', // 别名
    },
  };
  const dataSource = data?.map((item: { time: moment.MomentInput; value: any; type: string }) => ({
    time: moment(item.time).format('HH'),
    type: item.type,
    value: item.value,
  }));

  return (
    <div>
      <Chart
        padding={[10, 30, 80, 40]}
        forceFit={forceFit}
        height={chartHeight}
        data={dataSource}
        scale={scale}
      >
        <Legend position="bottom" />
        <Axis
          name="time"
          title={{
            style: {
              textAlign: 'center',
              fill: '#999',
            },
          }}
        />
        <Axis
          name="value"
          title={{
            style: {
              fontSize: 12,
              textAlign: 'center',
              fill: '#999',
            },
          }}
        />
        <Line shape="smooth" position="time*value" color="type" />
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

export default autoHeight()(EvaluationColumn);
