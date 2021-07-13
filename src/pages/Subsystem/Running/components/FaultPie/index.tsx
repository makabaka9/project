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

const FaultPie: React.FC<HorizonBarProps> = (props) => {
  const { height, data } = props;
  // const padding: [number, number, number, number] = [30, 30, 30, 30];
  const chartHeight = "20vh";

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
            opacity: 0.6,
          },
        }}
        legend={{
          position: 'right',
          offsetY: 10,
        }}
      />
      {/* )} */}
    </div>
  );
};

export default autoHeight()(FaultPie);
