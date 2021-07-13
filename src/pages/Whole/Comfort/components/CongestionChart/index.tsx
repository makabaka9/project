import { LineChart, Chart, Axis, Line } from 'bizcharts';
import { StackedAreaChart } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';
import styles from './index.less';
import { DataPoint } from '../../data';
import moment from 'moment';

export interface TrainChartProps {
  height?: number;
  forceFit?: boolean;
  data: DataPoint[];
}

const CongestionChart: React.FC<TrainChartProps> = (props) => {
  const { forceFit = true, data } = props;
  const padding: [number, number, number, number] = [30, 30, 50, 40];
  const chartHeight = "28vh";

  const scale1 = {
    time: {
      alias: '时间/h', // 别名
    },
    value: {
      alias: '车内拥挤度%', // 别名
      min: 0,
    },
  };
  const dataSource = data?.map((item) => ({
    time: moment(item.time).format('HH'),
    value: item.value,
  }));
  return (
    <Chart scale={scale1} padding={padding} autoFit height={chartHeight} data={dataSource}>
      <Axis
        name="time"
        title={{
          style: {
            // 绘图属性配置
            textAlign: 'center',
            fill: '#999',
            // fontWeight: 'bold',
          },
        }}
      />
      <Axis
        name="value"
        title={{
          style: {
            // 绘图属性配置
            textAlign: 'center',
            fill: '#999',
            // fontWeight: 'bold',
          },
        }}
      />
      <Line
        shape="smooth"
        position="time*value"
        color="l (270) 0:rgba(255, 146, 255, 1) .5:rgba(100, 268, 255, 1) 1:rgba(215, 0, 255, 1)"
      />
    </Chart>
  );
};

export default autoHeight()(CongestionChart);
