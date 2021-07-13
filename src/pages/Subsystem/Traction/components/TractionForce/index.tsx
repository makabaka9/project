import { Chart, Line, Point, Axis, Legend } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';
import { Typography } from 'antd';

export interface TractionForceProps {
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  data: {
    time: number | string;
    type: string;
    value: number;
  }[];
}

const TractionForce: React.FC<TractionForceProps> = (props) => {
  const { height = 1, data } = props;
  const padding: [number, number, number, number] = [30, 30, 50, 60];
  const chartHeight = height + 100;
  const scale = {
    time: {
      alias: '时间', // 别名
    },
    value: {
      alias: '牵引力/kN', // 别名
    },
  };

  return (
    <div>
      <Chart scale={scale} padding={padding} autoFit height={chartHeight} data={data}>
        <Axis
          name="time"
          title={{
            style: {
              // 绘图属性配置
              fontSize: 12,
              textAlign: 'center',
              fill: '#999',
              fontWeight: 'bold',
            },
          }}
        />
        <Axis
          name="value"
          title={{
            style: {
              // 绘图属性配置
              fontSize: 12,
              textAlign: 'center',
              fill: '#999',
              fontWeight: 'bold',
            },
          }}
        />
        <Line shape="smooth" position="time*value" color="type" />
        <Legend position="top" />
      </Chart>
    </div>
  );
};

export default autoHeight()(TractionForce);
