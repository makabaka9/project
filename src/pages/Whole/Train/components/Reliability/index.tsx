import { BarChart } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';
import { Row, Col, Statistic } from 'antd';
import { ReliabilityDataType } from '../../data';
// import styles from './index.less';

export interface HorizonBarProps {
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  data: ReliabilityDataType;
}

const Reliability: React.FC<HorizonBarProps> = (props) => {
  const { height = 1, data } = props;
  const padding: [number, number, number, number] = [30, 30, 30, 50];
  const chartHeight = height + 100;
  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Statistic title="MTBF" value={data.mtbf} suffix="h" style={{ textAlign: 'center' }} />
        </Col>
        <Col span={8}>
          <Statistic title="MDBSF" value={data.mdbsf} suffix="km" style={{ textAlign: 'center' }} />
        </Col>
        <Col span={8}>
          <Statistic
            title="可靠性分析"
            value={data.reliabilityScore}
            suffix="分"
            style={{ textAlign: 'center' }}
          />
        </Col>
      </Row>
      {height > 0 && (
        <BarChart
          data={data.systemNumber}
          height={chartHeight}
          padding={padding}
          forceFit={true}
          xField="value"
          yField="type"
          barSize={18}
          label={{
            position: 'right',
            style: {
              stroke: '#ffffff',
              lineWidth: 2,
              fontSize: 10,
            },
          }}
        />
      )}
    </div>
  );
};
export default autoHeight()(Reliability);
