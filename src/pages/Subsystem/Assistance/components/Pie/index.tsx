import { DonutChart } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';

export interface HorizonBarProps {
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  data: any
}

const Pie: React.FC<HorizonBarProps> = (props) => {
  const { height, data } = props;
  // const padding: [number, number, number, number] = [30, 30, 30, 30];
  const chartHeight = "17vh";
  const fakeData = [
    {
      type: '一级故障',
      value: 27,
    },
    {
      type: '二级故障',
      value: 25,
    },
    {
      type: '三级故障',
      value: 18,
    },
    // {
    //   type: '四级故障',
    //   value: 18,
    // },
  ];
  return (
    <div>
      {height > 0 && (
        <DonutChart
          data={fakeData}
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
          pieStyle={{
            stroke: 'white',
            strokeOpacity: 0,
          }}
          statistic={{
            visible:false
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
            position: 'right-center',
            offsetY: 10,
          }}
        />
      )}
    </div>
  );
};
// {faultLevelName: "二级故障", faultTotal: 0}
export default autoHeight()(Pie);
