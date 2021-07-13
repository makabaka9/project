import { DonutChart, StackedAreaChart } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';
import { Row, Col } from 'antd';

export interface HorizonBarProps {
  title?: string;
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  // data: {
  //   type: number | string;
  //   value: number;
  // }[];
  subsystemHealthData: {
    type: string;
    value: number;
  }[];
  subsystemFaultdata: {
    accidentTime: Date;
    accidentName: string;
    accidentNumber: number;
  }[];
}

const SubsystemHealth: React.FC<HorizonBarProps> = (props) => {
  const {
    height = 1,
    // data
    subsystemHealthData,
    subsystemFaultdata,
  } = props;
  const padding: [number, number, number, number] = [30, 30, 30, 30];
  const chartHeight = height + 54;

  return (
    <div>
      <Row>
        <Col xl={8} lg={12} sm={24} xs={24}>
          {height > 0 && (
            <DonutChart
              data={subsystemHealthData}
              height={chartHeight}
              padding={padding}
              forceFit
              radius={0.8}
              angleField="value"
              colorField="type"
              label={{
                visible: true,
                type: 'outer',
                style: {
                  fill: 'white',
                  opacity: 0.6,
                },
              }}
              pieStyle={{
                stroke: 'white',
                strokeOpacity: 0,
              }}
              legend={{
                position: 'bottom-center',
                offsetY: 10,
              }}
              statistic={{
                visible: true,
              }}
            />
          )}
        </Col>
        <Col xl={16} lg={12} sm={24} xs={24}>
          {height > 0 && (
            <StackedAreaChart
              data={subsystemFaultdata}
              // title={{
              //   visible: true,
              //   text: '堆叠面积图',
              // }}
              padding="auto"
              xField="accidentTime"
              yField="accidentNumber"
              stackField="accidentName"
              color={['green', 'blue']}
              xAxis={{
                type: 'dateTime',
                tickCount: 5,
              }}
              legend={{
                visible: true,
                offsetY: 10,
                position: 'bottom-center',
              }}
              responsive
            />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default autoHeight()(SubsystemHealth);
