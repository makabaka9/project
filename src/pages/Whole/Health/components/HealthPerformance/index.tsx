import { LineChart, RadarChart } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';
import styles from './index.less';

export interface HealthPerformanceProps {
  height?: number;
  forceFit?: boolean;
  data: {
    type: string;
    name: string;
    score: number;
  }[];
}

const HealthPerformance: React.FC<HealthPerformanceProps> = (props) => {
  const { height = 1, forceFit = true, data } = props;
  const padding: [number, number, number, number] = [30, 30, 30, 30];
  const chartHeight = height + 54;

  return (
    <div className={styles.miniChart} style={{ height }}>
      <div className={styles.chartContent}>
        {height > 0 && (
          <RadarChart
            height={chartHeight}
            forceFit={forceFit}
            data={data}
            padding={padding}
            angleField="name"
            radiusField="score"
            seriesField="type"
            radiusAxis={{
              grid: {
                line: {
                  type: 'line',
                },
              },
            }}
            line={{
              visible: true,
            }}
            point={{
              visible: true,
              shape: 'circle',
              style: {
                stroke: 'green',
                strokeOpacity: 0,
              },
            }}
            legend={{
              visible: true,
              position: 'bottom-center',
            }}
          />
        )}
      </div>
    </div>
  );
};

export default autoHeight()(HealthPerformance);
