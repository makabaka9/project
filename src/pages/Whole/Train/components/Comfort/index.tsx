import { DonutChart, PieChart } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';
import { Col, Row, Statistic } from 'antd';

export interface HorizonBarProps {
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  data: any;
}

const Comfort: React.FC<HorizonBarProps> = (props) => {
  const { height = 1, data } = props;
  const chartHeight = height + 100;

  return (
    <div>
      <Row gutter={16}>
        <Col span={6}>
          <Statistic
            title="温度评分"
            value={data.temperatureScore}
            suffix="分"
            style={{ textAlign: 'center' }}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="拥挤度评分"
            value={data.crowdingScore}
            suffix="分"
            style={{ textAlign: 'center' }}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="旅速/正晚点评分"
            value={data.travelScore}
            suffix="分"
            style={{ textAlign: 'center' }}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="启停冲击评分"
            value={data.jerkScore}
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
          forceFit
          radius={0.8}
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

export default autoHeight()(Comfort);
