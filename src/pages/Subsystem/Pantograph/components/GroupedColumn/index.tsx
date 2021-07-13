import { GroupedColumnChart, Chart, Interval, ColumnChart, BarChart } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';

export interface GroupedColumnProps {
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  data: Array<object>
}

const GroupedColumn: React.FC<GroupedColumnProps> = (props) => {
  const { height = 1, data } = props;
  // const padding: [number, number, number, number] = [30, 30, 30, 30];
  const chartHeight = height + 100;

  return (
    <div>
      <BarChart
        height={chartHeight}
        data={data}
        // title={{
        //   visible: true,
        //   text: '故障频次统计',
        // }}
        forceFit
        padding='auto'
        xField='value'
        yField='type'
      />
    </div>
  );
};

export default autoHeight()(GroupedColumn);
