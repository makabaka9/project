import { BarChart, Interval } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';
import { Row, Col, Statistic } from 'antd';
import { ReliabilityDataType } from '@/pages/Whole/Train/data';

export interface HorizonBarProps {
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  data: {
    systemName: string;
    grade: number;
  }[];
}

const Reliability: React.FC<HorizonBarProps> = (props) => {
  const { height = 1, data } = props;
  const padding: [number, number, number, number] = [30, 30, 30, 45];
  const chartHeight = height + 54;

  return (
    <div>
      {height > 0 && (
        <BarChart
          data={data}
          height={chartHeight}
          forceFit
          padding={padding}
          legend={{
            position: 'top-center',
          }}
          xField="grade"
          yField="systemName"
          barSize={10}
          label={{
            position: 'right',
            style: {
              stroke: '#ffffff',
              lineWidth: 2,
              fontSize: 10,
            },
          }}
        ></BarChart>
      )}
    </div>
  );
};

export default autoHeight()(Reliability);
