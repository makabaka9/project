import { ColumnChart } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';

export interface HorizonBarProps {
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  data: {
    里程: number | string;
    车次: number | string;
  }[];
}

const MiniBar: React.FC<HorizonBarProps> = (props) => {
  const { height = 1, data } = props;
  // const padding: [number, number, number, number] = [30, 30, 30, 30];
  const chartHeight = '26vh';

  return (
    <div>
      {height > 0 && (
        <ColumnChart
          data={data}
          height={chartHeight}
          forceFit
          padding='auto'
          xField='车次'
          yField='里程'
          meta={{
            车次: {
              alias: '车次',
            },
            里程: {
              alias: '里程(公里)',
            },
          }}
          yAxis={{
            visible: true,
            title: {
              text: "里程/万公里",
              style: {
                fill: "rgb(255,255,255,0.65)"
              }
            }
          }}
          xAxis={{
            visible: true,
            title: {
              text: '车次',
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

export default autoHeight()(MiniBar);
