import { Axis, Chart, Line } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';
import styles from './index.less';

export interface TrainChartMdbfProps {
  height?: number;
  forceFit?: boolean;
  data: {
    time: number | string;
    number: number;
  }[];
}

const TrainChartMdbf: React.FC<TrainChartMdbfProps> = (props) => {
  const { height, forceFit = true, data } = props;
  const padding: [number, number, number, number] = [30, 30, 70, 50];
  const chartHeight = "20vh";
  const grid = {
    line: {
      type: 'line',
      style: {
        stroke: '#DDDDDD',
        lineWidth: 1,
        strokeOpacity: 0.1,
      },
    },
  };
  const scale = {
    // time: {
    //   alias: '里程', // 别名
    // },
    number: {
      alias: 'MDBF/km', // 别名
    },
  };

  return (
    // <div className={styles.miniChart} style={{ height }}>
    //   <div className={styles.chartContent}>
    // {/* {height > 0 && ( */}
    <div>
      <Chart
        height={chartHeight}
        forceFit={forceFit}
        data={data}
        padding={padding}
        scale={scale}
        xField="time"
        yField="number"
      >
        {/* <Axis
              name="time"
              title={{
                style: {
                  textAlign: 'center',
                  fill: '#999',
                },
              }}
            /> */}
        <Axis
          name="number"
          grid={grid}
          title={{
            style: {
              fontSize: 12,
              textAlign: 'center',
              fill: '#999',
            },
          }}
        />
        <Line shape="smooth" position="time*number" />
      </Chart>
      {/* )} */}
    </div>
    // </div>
  );
};

export default autoHeight()(TrainChartMdbf);
