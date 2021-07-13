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

const WarningPie: React.FC<HorizonBarProps> = (props) => {
  const { height = 1, data } = props;
  // const padding: [number, number, number, number] = [30, 30, 30, 30];
  const chartHeight = height + 100;

  // const fakeData = [
  //   {
  //     type: '一级故障',
  //     value: 27,
  //   },
  //   {
  //     type: '二级故障',
  //     value: 25,
  //   },
  //   {
  //     type: '三级故障',
  //     value: 18,
  //   },
  //   // {
  //   //   type: '四级故障',
  //   //   value: 18,
  //   // },
  // ];

  return (
    <div>
      {height > 0 && (
        <DonutChart
          data={data}
          padding="auto"
          height={chartHeight}
          // title={{
          //   visible: true,
          //   text: '故障分级统计',
          //   style: {
          //     fill: 'white',
          //     opacity: 0.6,
          //   },
          // }}
          forceFit
          // description={{
          //   visible: true,
          //   text: ,
          // }}
          statistic={{
            visible: false,
          }}
          radius={0.8}
          // padding='auto'
          angleField="value"
          colorField="type"
          pieStyle={{
            stroke: 'white',
            strokeOpacity: 0,
          }}
          legend={{
            position: 'right-center',
            // offsetY: 10,
          }}
        />
      )}
    </div>
  );
};

export default autoHeight()(WarningPie);
