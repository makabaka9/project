import { Axis, Chart, Legend, Line, LineAdvance } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';
import styles from './index.less';

export interface TrainChartProps {
  height?: number;
  forceFit?: boolean;
  data: {
    time: number | string;
    number: number;
    type: string;
  }[];
}

const TrainChart: React.FC<TrainChartProps> = (props) => {
  const { height, forceFit = true, data } = props;
  const padding: [number, number, number, number] = [30, 30, 80, 50];
  const chartHeight = height;
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
    time: {
      alias: '时间/日', // 别名
    },
    // number: {
    //   alias: 'MTBF/h MDBF/km', // 别名
    // },
  };

  const fakeData = [
    { time: 1, number: 12, type: "MDBF" },
    { time: 2, number: 12, type: "MDBF" },
    { time: 3, number: 12, type: "MDBF" },
    { time: 4, number: 12, type: "MDBF" },
    { time: 5, number: 8, type: "MDBF" },
    { time: 6, number: 12, type: "MDBF" },
    { time: 7, number: 12, type: "MDBF" },
    { time: 8, number: 11, type: "MDBF" },
    { time: 9, number: 13, type: "MDBF" },
    { time: 10, number: 12, type: "MDBF" },
    { time: 11, number: 12, type: "MDBF" },
    { time: 12, number: 15, type: "MDBF" },
    { time: 13, number: 12, type: "MDBF" },
    { time: 14, number: 12, type: "MDBF" },
    { time: 15, number: 16, type: "MDBF" },
    { time: 16, number: 12, type: "MDBF" },
    { time: 17, number: 12, type: "MDBF" },
    { time: 18, number: 23, type: "MDBF" },
    { time: 19, number: 12, type: "MDBF" },
    { time: 20, number: 12, type: "MDBF" },
    { time: 21, number: 25, type: "MDBF" },
    { time: 22, number: 12, type: "MDBF" },
    { time: 23, number: 12, type: "MDBF" },
    { time: 24, number: 17, type: "MDBF" },
    { time: 25, number: 12, type: "MDBF" },
    { time: 26, number: 12, type: "MDBF" },
    { time: 27, number: 12, type: "MDBF" },
    { time: 28, number: 24, type: "MDBF" },
    { time: 29, number: 12, type: "MDBF" },
    { time: 30, number: 11, type: "MDBF" },
    { time: 1, number: 12, type: "MTBF" },
    { time: 2, number: 12, type: "MTBF" },
    { time: 3, number: 10, type: "MTBF" },
    { time: 4, number: 12, type: "MTBF" },
    { time: 5, number: 8, type: "MTBF" },
    { time: 6, number: 12, type: "MTBF" },
    { time: 7, number: 12, type: "MTBF" },
    { time: 8, number: 12, type: "MTBF" },
    { time: 9, number: 13, type: "MTBF" },
    { time: 10, number: 12, type: "MTBF" },
    { time: 11, number: 12, type: "MTBF" },
    { time: 12, number: 15, type: "MTBF" },
    { time: 13, number: 11, type: "MTBF" },
    { time: 14, number: 12, type: "MTBF" },
    { time: 15, number: 16, type: "MTBF" },
    { time: 16, number: 25, type: "MTBF" },
    { time: 17, number: 15, type: "MTBF" },
    { time: 18, number: 23, type: "MTBF" },
    { time: 19, number: 12, type: "MTBF" },
    { time: 20, number: 25, type: "MTBF" },
    { time: 21, number: 20, type: "MTBF" },
    { time: 22, number: 6, type: "MTBF" },
    { time: 23, number: 12, type: "MTBF" },
    { time: 24, number: 17, type: "MTBF" },
    { time: 25, number: 10, type: "MTBF" },
    { time: 26, number: 12, type: "MTBF" },
    { time: 27, number: 12, type: "MTBF" },
    { time: 28, number: 20, type: "MTBF" },
    { time: 29, number: 12, type: "MTBF" },
    { time: 30, number: 11, type: "MTBF" },
  ]

  return (
    // <div className={styles.miniChart} style={{ height }}>
    // <div className={styles.chartContent}>
    // {/* {height > 0 && ( */}
    <div>
      <Chart
        height={chartHeight}
        forceFit={forceFit}
        // data={data}
        data={fakeData}
        padding={padding}
        scale={scale}
      // xField="time"
      // yField="number"
      >
        <Axis
          name="time"
          title={{
            style: {
              textAlign: 'center',
              fill: '#999',
            },
          }}
        />
        {/* <Axis
          name="number"
          grid={grid}
          title={{
            style: {
              fontSize: 12,
              textAlign: 'center',
              fill: '#999',
            },
          }}
        /> */}
        {/* <Line shape="smooth" position="time*number" /> */}
        <Line
          point={{ size: 3 }}
          shape="smooth"
          position="time*number"
          color="type"
        />
        <Legend
          position="bottom"
          itemName={{
            spacing: 10, // 文本同滑轨的距离
            style: {
              fill: '#999',
            },
            formatter: (text) => {
              return text === "MTBF" ? "MTBF/h" : text === "MDBF" ? "MDBF/km" : text;
            },
          }}
        />
      </Chart>
      {/* )} */}

    </div >
  );
};

export default autoHeight()(TrainChart);
