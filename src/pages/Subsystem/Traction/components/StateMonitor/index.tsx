import { Chart, Line, Axis, Legend } from 'bizcharts';
import React, { useState } from 'react';
import autoHeight from '@/components/autoHeight';
import { Radio, } from 'antd';
import { OperationStatusDataType } from '../../data';
import moment from 'moment';
import useInterval from '@/components/useInterval';
import { Dispatch } from 'umi';



export interface StateMonitorProps {
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  data: OperationStatusDataType
  dispatch: Dispatch;
  motorTemperature: any;
  inverterCurrent: any;
  intermediateVoltage: any;
  intermediateCurrent: any;
}

const StateMonitor: React.FC<StateMonitorProps> = (props) => {
  const { height = 1, data, dispatch, motorTemperature, inverterCurrent, intermediateVoltage, intermediateCurrent } = props;

  // const motorTemperature = data.motorTemperature.map(item => ({
  //   time: moment(item.time).format("HH"),
  //   type: item.type,
  //   value: item.value
  // }))
  // const inverterCurrent = data.inverterCurrent.map(item => ({
  //   time: moment(item.time).format("HH"),
  //   type: item.type,
  //   value: item.value
  // }))

  // const intermediateVoltage = data.intermediateVoltage.map(item => ({
  //   time: moment(item.time).format("HH"),
  //   type: item.type,
  //   value: item.value
  // }))
  // const intermediateCurrent = data.intermediateVoltage.map(item => ({
  //   time: moment(item.time).format("HH"),
  //   type: item.type,
  //   value: item.value
  // }))
  const monitorChart1 = motorTemperature
  const [monitorChart, setMonitorChart] = useState(motorTemperature)
  const [tempValue, setTempValue] = useState(1)
  const chartHeight = height + 100;
  const scale = {
    time: {
      alias: '时间', // 别名
    },
    temperature: {
      alias: '温度/°C', // 别名
    },
  };

  const handleChange = (event: any) => {
    var value = event?.target.value
    setTempValue(value);
    if (value === 1) {
      setMonitorChart(motorTemperature)
    } else if (value === 2) {
      setMonitorChart(inverterCurrent)
    } else if (value === 3) {
      setMonitorChart(intermediateVoltage)
    }
    else { setMonitorChart(intermediateCurrent) }

  }
  return (
    <div>
      <div style={{ paddingBottom: 16 }}>
        {/* <span><Typography.Text>监控量：</Typography.Text></span> */}
        <Radio.Group name="monitor" size="small" defaultValue={1}
          onChange={handleChange}
        >
          <Radio.Button value={1}>电机温度</Radio.Button>
          {/* <Radio.Button value={2}>电机转速</Radio.Button> */}
          <Radio.Button value={2}>逆变电流</Radio.Button>
          <Radio.Button value={3}>中间电压</Radio.Button>
          <Radio.Button value={4}>中间电流</Radio.Button>
        </Radio.Group>
      </div>
      <div style={{ paddingBottom: 24 }}>
        <Chart
          // scale={{ temperature: { min: 0 } }}
          scale={scale}
          padding={[20, 30, 50, 40]}
          autoFit
          height={chartHeight}
          data={tempValue === 1 ? motorTemperature : monitorChart}
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
            name="temperature"
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
    </div>
  );
};

export default autoHeight()(StateMonitor);
