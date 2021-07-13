import React from 'react';
import { GaugeChart } from 'bizcharts';
import autoHeight from '@/components/autoHeight';
import { Typography } from 'antd';

export interface TrainChartProps {
  height?:number
  data: {
    num: number;
    percent: number | string;
  };
}

const Gauge: React.FC<TrainChartProps> = (props) => {
  const { height = 1 , data, } = props;
  const padding: [number, number, number, number] = [0, 30, 0, 0];
  const chartHeight = '11vh';
  // const gaugeData = { num: 68, percent: '68' };

  return (
    <>
      <span>
        <Typography.Text style={{ fontSize: 12 }}>本年度再生能量：</Typography.Text>
        <Typography.Text style={{ fontSize: 14 }}>556342.2 kWh</Typography.Text>
      </span>{' '}
      <br />
      <span>
        <Typography.Text style={{ fontSize: 12 }}>年度再生能量指标：</Typography.Text>
        <Typography.Text style={{ fontSize: 14 }}>738456.2 kWh</Typography.Text>
      </span>
      <GaugeChart
        width={250}
        height={100}
        padding={padding}
        value={data.num}
        min={0}
        max={100}
        range={[0, 25, 50, 75, 100]}
        color={['#39B8FF', '#52619B', '#43E089', '#C0EDF3']}
        statistic={{
          visible: true,
          text: `${data.percent}%`,
          color: '#30bf78',
        }}
      />
    </>
  );
};

export default autoHeight()(Gauge);
