import { DonutChart } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';

export interface HorizonBarProps {
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  data: {
    type: number | string;
    value: number;
  }[];
}

const SortPie: React.FC<HorizonBarProps> = (props) => {
  const { height = 1, data } = props;
  const padding: [number, number, number, number] = [0, 0, 0, 0];
  const chartHeight = height+100 ;
  const sortData = [
    { type: "事故件", value: 1455 },
    { type: "计划维修件", value: 1875 },
    { type: "消耗件", value: 3095 },
    { type: "其他", value: 5005 },
  ]
  return (
    <div>
      {height > 0 && (
        <DonutChart
          data={sortData}
          padding={padding}
          height={chartHeight}
          // title={{
          //   visible: true,
          //   text: '备品备件分类统计',
          //   style: {
          //     color: 'white',
          //     opacity: 0.8,
          //   },
          // }}
          forceFit
          // description={{
          //   visible: true,
          //   text: ,
          // }}
          radius={0.8}
          // padding='auto'
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
              opacity: 0.8,
            },
          }}
          legend={{
            position: 'right-center',
            offsetY: 10,
          }}
        />
      )}
    </div>
  );
};

export default autoHeight()(SortPie);
