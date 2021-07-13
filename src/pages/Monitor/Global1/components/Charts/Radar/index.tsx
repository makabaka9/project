import { RadarChart } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';
import styles from './index.less';

export interface RadarProps {
  height?: number;
  // forceFit?: boolean;
  data: {
    systemName: string;
    faultNum: number;
  }[];
}

const Radar: React.FC<RadarProps> = (props) => {
  const { height = 1, data } = props;
  const padding: [number, number, number, number] = [50, 30, 30, 30];
  const chartHeight = height + 54;
  // {
  //   subsystemName: '牵引',
  //   coachType: 'a',
  //   faultNum: 70,
  // },

  return (
    <div className={styles.miniChart} style={{ height }}>
      <div className={styles.chartContent}>
        {height > 0 && (
          <RadarChart
            height={chartHeight}
            padding={padding}
            data={data}
            // title={{
            //   visible: true,
            //   text: '多组雷达图',
            // }}
            angleField='systemName'
            radiusField='faultNum'
            // seriesField='coachType'
            radiusAxis={{
              grid: {
                line: {
                  type: 'line',
                },
              },
            }}
            line={{
              visible: true,
              style:{
                fill: 'l(90) 0:rgb(55,121,253,0.6)  1:#3779fd'
              }
            }}
            point={{
              visible: true,
              shape: 'circle',
            }}
            legend={{
              visible: false,
              position: 'bottom-center',
            }}
          />
        )}
      </div>
    </div>
  );
};

export default autoHeight()(Radar);
