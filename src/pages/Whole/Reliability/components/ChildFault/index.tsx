import { DonutChart, PieChart, StackedAreaChart } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';
import { Row, Col } from 'antd';

export interface HorizonBarProps {
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  data: {
    type: string;
    number: number;
  }[];
}

const ChildFault: React.FC<HorizonBarProps> = (props) => {
  const { height = 1, data } = props;
  const padding: [number, number, number, number] = [30, 30, 30, 30];
  const chartHeight = height + 54;
  return (
    <div>
      {height > 0 && (
        <DonutChart
          data={data}
          padding={padding}
          height={chartHeight}
          forceFit
          radius={0.8}
          angleField="number"
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
            position: 'top-center',
            offsetY: 0,
            offsetX: -10,
          }}
        />
      )}
    </div>
  );
};

export default autoHeight()(ChildFault);
