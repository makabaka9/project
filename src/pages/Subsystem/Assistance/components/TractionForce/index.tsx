import { Chart, Line, Point, Axis, Legend } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';
import { Typography } from 'antd';
import { OperationStatusMonitoringDataType } from '@/pages/Subsystem/Traction/data';

export interface TractionForceProps {
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  // data: {
  //   time: Date;
  //   type: string;
  //   value: number;
  // }[];
  data: any;
}

const TractionForce: React.FC<TractionForceProps> = (props) => {
  const { height = 1, data } = props;
  // const padding: [number, number, number, number] = [30, 30, 30, 30];
  const chartHeight = height + 100;
  const scale = {
    time: {
      alias: '时间', // 别名
    },
    value: {
      alias: '温度/°C', // 别名
    },
  };
  // const dataSource = data?.map(item => ({
  //   time: moment(item.time).format('HH'),
  //   type: item.type,
  //   value: item.value,
  // }));

  return (
    <div>
      <Typography>牵引力对比</Typography>
      <Chart
        // scale={{ temperature: { min: 0 } }}
        scale={scale}
        padding={[10, 90, 50, 40]}
        autoFit
        height={chartHeight}
        data={data}
      >
        <Axis
          name="time"
          title={{
            style: {
              // 绘图属性配置
              fontSize: '12',
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
              fontSize: '12',
              textAlign: 'center',
              fill: '#999',
              fontWeight: 'bold',
            },
          }}
        />
        <Line shape="smooth" position="time*value" color="type" />
        <Legend position="top" />
        {/* <Point position="time*temperature" color="motor" 
        visible={false}
        shape='circle'
        size={3}
        style={ {stroke:'black'}} 
        /> */}
      </Chart>
    </div>
  );
};

export default autoHeight()(TractionForce);
