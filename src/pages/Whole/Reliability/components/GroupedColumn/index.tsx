import { GroupedColumnChart } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';

export interface GroupedColumnProps {
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  data: {
    time: Date;
    type: string;
    value: number;
  }[];
}

const GroupedColumn: React.FC<GroupedColumnProps> = (props) => {
  const { height = 1, data } = props;
  const padding: [number, number, number, number] = [30, 30, 30, 30];
  const chartHeight = height + 54;
  return (
    <div>
      <GroupedColumnChart
        height={chartHeight}
        data={data}
        forceFit
        padding={padding}
        xField="time"
        yField="value"
        yAxis={{
          min: 0,
        }}
        legend={{
          visible: true,
          position: 'top-center',
          offsetY: 10,
          offsetX: -10,
        }}
        label={{
          visible: false,
        }}
        groupField="type"
        color={['#1ca9e6', '#f88c24', '#d3f261']}
        xAxis={{ visible: true, title: { visible: false } }}
      />
    </div>
  );
};

export default autoHeight()(GroupedColumn);
