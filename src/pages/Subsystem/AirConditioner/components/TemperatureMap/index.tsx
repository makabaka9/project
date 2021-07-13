import { Chart, Line, Axis, Legend } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';
import moment from 'moment';
import { Descriptions } from 'antd';

export interface TemperatureMapProps {
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  data: any;
}
const TemperatureMap: React.FC<TemperatureMapProps> = (props) => {
  const { height = 1, data } = props;
  // const padding: [number, number, number, number] = [30, 30, 30, 30];
  const chartHeight = height + 70;
  // console.log("555", data);

  const scale = {
    // time: {
    //   alias: '时间', // 别名
    // },
    value: {
      alias: '实际值', // 别名
    },
  };

  return (
    <div>
      {/* <Descriptions
        column={5}
      >
        <Descriptions.Item label="设定温度">{data.inTemperature + "°C"}</Descriptions.Item>
        <Descriptions.Item label="车内温度">{data.outTemperature + "°C"}</Descriptions.Item>
        <Descriptions.Item label="车外温度">{data.setTemperature + "°C"} </Descriptions.Item>
        <Descriptions.Item label="机组1能耗">{data.unit1EnergyConsumption + "kwh"} </Descriptions.Item>
        <Descriptions.Item label="机组2能耗">{data.unit2EnergyConsumption + "kwh"}  </Descriptions.Item>
      </Descriptions> */}

      <Chart scale={scale} padding={[40, 30, 50, 40]} autoFit height={chartHeight} data={data}>
        {/* <Axis
          name="time"
          title={{
            style: {
              // 绘图属性配置
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
              textAlign: 'center',
              fill: '#999',
              fontWeight: 'bold',
            },
          }}
        />
        <Line shape="smooth" position="time*value" color="type" />
        <Legend position="top" offsetY={0} />
      </Chart>
    </div>
  );
};

export default autoHeight()(TemperatureMap);
