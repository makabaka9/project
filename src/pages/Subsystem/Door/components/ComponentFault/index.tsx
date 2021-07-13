import { ColumnChart } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';

export interface HorizonBarProps {
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  data: {
    type: string;
    value: number | string;
  }[];
}

const ComponentFault: React.FC<HorizonBarProps> = (props) => {
  const { height = 1, data } = props;
  const padding: [number, number, number, number] = [30, 30, 30, 30];
  const chartHeight = height + 54;

  return (
    <div>
      {height > 0 && (
        <ColumnChart
          height={chartHeight}
          data={data}
          // title={{
          //   visible: true,
          //   text: '基础柱状图',
          // }}
          forceFit
          // padding='auto'
          padding={padding}
          xField="type"
          yField="value"
          meta={{
            type: {
              alias: '类别',
            },
            value: {
              alias: '销售额(万)',
            },
          }}
        />
      )}
    </div>
  );
};

export default autoHeight()(ComponentFault);
