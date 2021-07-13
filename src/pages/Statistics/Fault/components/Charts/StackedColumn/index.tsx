import { ColumnChart } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';

export interface StackedColumnProps {
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  data?: any
  // data?: {
  //   name?: string,
  //   children?: Array<{
  //     trainCode: string,
  //     faultNum: number
  //   }>
  // };
}

const StackedColumn: React.FC<StackedColumnProps> = (props) => {
  const { height = 1, data } = props;
  // const padding: [number, number, number, number] = [30, 30, 30, 30];
  const chartHeight = '18vh';
  
  return (
    <div>
      {height > 0 && (
        <ColumnChart
          data={data}
          height={chartHeight}
          padding='auto'
          forceFit
          xField="systemName"
          yField="faultNum"
          meta={{
            systemName: {
              alias:'系统'
              // range: [0, 1],
            },
            faultNum: {
              alias: '故障占比',
              // formatter:(v)=>{return `${v}个`}
            }
          }}
          xAxis={{
            label: {
              visible: true,
              autoRotate: true,
              offsetY: 40
            },
            title: {
              text: "系统",
              style: {
                fill: "rgb(255,255,255,0.65)"
              }
            }
          }}
          label={{
            visible: false,
          }}
          yAxis={{
            visible: true,
            title: {
              text: "占比",
              style: {
                fill: "rgb(255,255,255,0.65)"
              }
            }
          }}
        />
      )}
    </div>
  );
};

export default autoHeight()(StackedColumn);
