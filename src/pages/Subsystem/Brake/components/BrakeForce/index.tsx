import { Chart, Line, Legend, Axis } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';
import { BrakingForceDataType } from '../../data';
import moment from 'moment';

export interface HealthMapProps {
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  data: any
}


const BrakeForce: React.FC<HealthMapProps> = (props) => {
  const { height = 1, data } = props;
  // const padding: [number, number, number, number] = [30, 30, 30, 30];
  const chartHeight = height + 100;

  const scale = {
    time: {
      alias: '时间', // 别名
    },
    value: {
      alias: '制动力/kN', // 别名
    },
  };
  // const dataSource = data?.map((item) => ({
  //   time: moment(item.time).format('HH'),
  //   type: item.type,
  //   value: item.value,
  // }));
  // console.log("000", dataSource)
  return (
    <div>
      <Chart
        // scale={{ temperature: { min: 0 } }}
        scale={scale}
        padding={[20, 20, 50, 60]}
        autoFit
        height={chartHeight}
        data={data}
      >
        {/* <Axis name="time" 
          title={{
            style: { // 绘图属性配置
              fontSize: '12',
              textAlign: 'center',
              fill: '#999',
              fontWeight: 'bold',
            },
          }}
        /> */}
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
        {/* <Point position="mile*score" color="DCU" 
        visible={false}
        shape='circle'
        size={3}
        style={ {stroke:'black'}} 
        /> */}
      </Chart>
    </div>
  );
};

export default autoHeight()(BrakeForce);
