import { Chart, Line, Axis, Annotation } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';
import { Typography, Row, Col } from 'antd';

export interface StateMonitorProps {
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  // data: [
  //   {
  //     time: string;
  //     value: number;
  //   },
  //   {
  //     time: string;
  //     value: number;
  //   },
  // ];
  data: Array<object>
}

const StateMonitor: React.FC<StateMonitorProps> = (props) => {
  const { height = 1, data } = props;
  const padding: [number, number, number, number] = [10, 20, 50, 40];
  const chartHeight = height + 100;
  const scale1 = {
    time: {
      alias: '时间', // 别名
    },
    temperature: {
      alias: '温度/°C', // 别名
      min: 0,
    },
  };
  const scale2 = {
    time: {
      alias: '时间', // 别名
    },
    voltage: {
      alias: '电压/V', // 别名
      min: 50,
    },
  };
  return (
    <div>
      <Row gutter={16}>
        <Col xl={12} lg={12} sm={24} xs={24}>
          <div>
            <Typography.Text> 蓄电池温度变化趋势</Typography.Text>
          </div>
          <Chart
            // scale={{ temperature: { min: 0 } }}
            scale={scale1}
            padding={padding}
            autoFit
            height={chartHeight}
            data={data[0]}
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
            <Line
              shape="smooth"
              position="time*value"
              color="l (270) 0:rgba(255, 146, 255, 1) .5:rgba(100, 268, 255, 1) 1:rgba(215, 0, 255, 1)"
            />
            <Annotation.Line
              start={[0, 10]}
              end={[22, 10]}
              style={{
                stroke: 'green',
              }}
            />
            <Annotation.Line
              start={[0, 60]}
              end={[22, 60]}
              style={{
                stroke: 'red',
              }}
            />
            <Annotation.Text
              position={['80%', 0]}
              content="警戒温度最大值"
              style={{ fill: 'red' }}
            />
            <Annotation.Text
              position={['80%', 70]}
              content="警戒温度最小值"
              style={{ fill: 'green' }}
            />
          </Chart>
        </Col>
        <Col xl={12} lg={12} sm={24} xs={24}>
          <div style={{ paddingTop: 16 }}>
            <Typography.Text> 蓄电池电压变化趋势</Typography.Text>
          </div>
          <Chart
            // scale={{ temperature: { min: 0 } }}
            scale={scale2}
            padding={padding}
            autoFit
            height={chartHeight}
            data={data[1]}
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
              name="voltage"
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
            <Line
              shape="smooth"
              position="time*value"
              color="l (270) 0:rgba(255, 146, 255, 1) .5:rgba(100, 268, 255, 1) 1:rgba(215, 0, 255, 1)"
            />
            <Annotation.Line
              start={[0, 120]}
              end={[22, 120]}
              style={{
                stroke: 'red',
              }}
            />
            <Annotation.Line
              start={[0, 80]}
              end={[22, 80]}
              style={{
                stroke: 'green',
              }}
            />
            <Annotation.Text
              position={['80%', 0]}
              content="警戒温度最大值"
              style={{ fill: 'red' }}
            />
            <Annotation.Text
              position={['80%', 70]}
              content="警戒温度最小值"
              style={{ fill: 'green' }}
            />
          </Chart>
        </Col>
      </Row>
    </div>
  );
};

export default autoHeight()(StateMonitor);
