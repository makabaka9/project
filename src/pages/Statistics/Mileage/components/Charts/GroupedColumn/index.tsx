import { ColumnChart } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';

export interface GroupedColumnProps {
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  data: {
    // name: string;
    月份: string;
    里程: number;
  }[];
}
// name: '里程(万公里)',
//     月份: '2019-12',
//     里程: 100000,
const GroupedColumn: React.FC<GroupedColumnProps> = (props) => {
  const { height = 1, data } = props;
  // const padding: [number, number, number, number] = [30, 30, 30, 30];
  const chartHeight = '26vh';

  return (
    <div>
      <ColumnChart
        height={chartHeight}
        data={data}
        forceFit
        xField="月份"
        yField="里程"
        meta={{
          月份: {
            alias: '月份',
          },
          里程: {
            alias: '里程(公里)',
          },
        }}
        yAxis={{
          min: 0,
          title: {
            text: "里程/万公里",
            style: {
              fill: "rgb(255,255,255,0.65)"
            }
          }
        }}
        xAxis={{
          min: 0,
          title: {
            text: '月份',
            style: {
              fill: "rgb(255,255,255,0.65)"
            }
          }
        }}
      // color={['#1ca9e6', '#f88c24']}
      />
    </div>
  );
};

export default autoHeight()(GroupedColumn);
