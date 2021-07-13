import { Chart, DonutChart, Line, PieChart, Point, Slider } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';
import { Col, Row, Statistic, Table, Tabs } from 'antd';
import monitor from './monitor.png';
import styles from '../../style.less';

const { TabPane } = Tabs;
export interface RelationMapProps {
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  data: any;
}

const RelationMap: React.FC<RelationMapProps> = (props) => {
  const { height = 1, data, } = props;
  const chartHeight = height + 54;
  let flag = false;
  return (
    <div
    >
      <Chart
        padding={[10, 20, 50, 40]}
        autoFit
        height={chartHeight}
        data={data}
        scale={{ value: { min: 0 } }}
      >
        <Line position="year*value" />
        <Point position="year*value" />
        <Slider
          start={0.5}
          formatter={(v, d, i) => {
            flag = !flag;
            return `${v}年${flag ? "开始" : "结束"}`;
          }}
        />
      </Chart>

    </div>
  );
};

export default RelationMap;
