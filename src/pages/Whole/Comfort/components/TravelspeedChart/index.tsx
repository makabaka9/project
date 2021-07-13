import { Line, Axis, Chart } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';
import moment from 'moment';

export interface GroupedColumnProps {
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  data?: any;
}

const GroupedColumn: React.FC<GroupedColumnProps> = (props) => {
  const { height, data } = props;
  const padding: [number, number, number, number] = [30, 30, 50, 40];
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
  const scale1 = {
    time: {
      alias: '时间/h', // 别名
    },
    value: {
      alias: '旅速评价', // 别名
      min: 0,
    },
  };
  const dataSource = data?.map((item: { time: moment.MomentInput; value: any }) => ({
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

export default autoHeight()(GroupedColumn);
