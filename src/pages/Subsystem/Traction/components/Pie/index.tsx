import { DonutChart } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';

export interface HorizonBarProps {
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  data: any;
}

const Pie: React.FC<HorizonBarProps> = (props) => {
  const { height, data } = props;
  // const padding: [number, number, number, number] = [30, 30, 30, 30];
  const chartHeight = "19vh";
  // faultLevelName: "一级故障", faultTotal: 0
  // const fakeData = [
  //   {
  //     faultLevelName: '一级故障',
  //     faultTotal: 27,
  //   },
  //   {
  //     faultLevelName: '二级故障',
  //     faultTotal: 25,
  //   },
  //   {
  //     faultLevelName: '三级故障',
  //     faultTotal: 18,
  //   },
  //   // {
  //   //   faultLevelName: '四级故障',
  //   //   faultTotal: 18,
  //   // },
  // ];
  return (
    <div>
      {/* {height > 0 && ( */}
      <DonutChart
        data={data}
        padding="auto"
        height={chartHeight}
        // title={{
        //   visible: true,
        //   text: '环图',
        // }}
        forceFit
        // description={{
        //   visible: true,
        //   text: ,
        // }}
        radius={0.8}
        // padding='auto'
        angleField="faultTotal"
        colorField="faultLevelName"
        statistic={{
          visible: false,
        }}
        pieStyle={{
          stroke: 'white',
          strokeOpacity: 0,
        }}
        // label={{
        //   visible: true,
        //   faultLevelName: 'outer',
        //   offset: 20,
        //   style: {
        //     color: 'white',
        //     opacity: 0.6,
        //   },
        // }}
        legend={{
          position: 'right-center',
          // offsetY: 10,
        }}
      />
      {/* )} */}
    </div>
  );
};

export default autoHeight()(Pie);
