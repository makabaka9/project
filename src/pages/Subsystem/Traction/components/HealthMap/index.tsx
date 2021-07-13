import { Chart, Line, Legend, Axis } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';

export interface HealthMapProps {
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  data: {
    mile: number | string;
    DCU: string;
    score: number;
  }[];
}

const HealthMap: React.FC<HealthMapProps> = (props) => {
  const { height = 1, data } = props;
  // const padding: [number, number, number, number] = [30, 30, 30, 30];
  const chartHeight = height + 100;
  const scale = {
    mile: {
      alias: '累计里程/km',
    },
    score: {
      alias: '健康分数/分',
    },
  };
  return (
    <div>
      <Chart scale={scale} padding={[10, 20, 50, 40]} autoFit height={chartHeight} data={data}>
        <Axis
          name="mile"
          title={{
            style: {
              fontSize: '12',
              textAlign: 'center',
              fill: '#999',
              fontWeight: 'bold',
            },
          }}
        />
        <Axis
          name="score"
          title={{
            style: {
              fontSize: '12',
              textAlign: 'center',
              fill: '#999',
              fontWeight: 'bold',
            },
          }}
        />
        <Line shape="smooth" position="mile*score" color="DCU" />
        <Legend position="top" />
      </Chart>
    </div>
  );
};

export default autoHeight()(HealthMap);
