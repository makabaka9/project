import { GroupedColumnChart, Chart, Interval, ColumnChart } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';

export interface GroupedColumnProps {
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  data: any;
}

const GroupedColumn: React.FC<GroupedColumnProps> = (props) => {
  const { height = 1, data } = props;
  // const padding: [number, number, number, number] = [30, 30, 30, 30];
  const chartHeight = height + 100;
  // console.log("333", data)
  return (
    <div>
      <ColumnChart
        height={chartHeight}
        data={data}
        // title={{
        //   visible: true,
        //   text: '故障频次统计',
        // }}
        forceFit
        padding='auto'
        xField='type'
        yField='value'
        yAxis={{
          visible: true,
          grid: {
            visible: false,
          },
          line: {
            visible: true,
          },
          tickLine: {
            visible: true,
          },
          label: {
            visible: true,
            autoRotate: true,
            autoHide: true,
          },
          title: {
            visible: false,
            offset: 12,
          },
        }}
        meta={{
          type: {
            alias: '关键部件',
          },
          time: {
            alias: '故障次数',
          },
        }}
      />
    </div>
  );
};

export default autoHeight()(GroupedColumn);
