import { BarChart } from 'bizcharts';
import { DonutChart } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';
import { Row, Col, Statistic } from 'antd';
import { StabilityDataType } from '../../data';

export interface HorizonBarProps {
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  data: StabilityDataType;
}

const Stability: React.FC<HorizonBarProps> = (props) => {
  const { height = 1, data } = props;
  // const padding: [number, number, number, number] = [30, 30, 30, 30];
  const chartHeight = height + 100;

  return (
    <div>
      <Row gutter={24}>
        <Col span={6}>
          <Statistic
            title="行车安全"
            value={data.drivingSafetyScore}
            suffix="分"
            style={{ textAlign: 'center' }}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="效率和性能"
            value={data.efficiencyScore}
            suffix="分"
            style={{ textAlign: 'center' }}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="故障关联性"
            value={data.faultCorrelationScore}
            suffix="分"
            style={{ textAlign: 'center' }}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="维修复杂度"
            value={data.maintenanceComplexityScore}
            suffix="分"
            style={{ textAlign: 'center' }}
          />
        </Col>
      </Row>
      {height > 0 && (
        <DonutChart
          data={data.systemScore}
          padding="auto"
          height={chartHeight}
          // title={{
          //   visible: true,
          //   text: '环图',
          // }}
          forceFit
          // description={{
          //   visible: true,
          //   text: ,
          // }}
          radius={0.8}
          // padding='auto'
          angleField="value"
          colorField="type"
          pieStyle={{
            stroke: 'white',
            strokeOpacity: 0,
          }}
          label={{
            visible: true,
            type: 'outer',
            offset: 20,
            style: {
              color: 'white',
              opacity: 0.6,
            },
          }}
          legend={{
            position: 'bottom-center',
            offsetY: 10,
          }}
        />
      )}
    </div>
  );
};

export default autoHeight()(Stability);
