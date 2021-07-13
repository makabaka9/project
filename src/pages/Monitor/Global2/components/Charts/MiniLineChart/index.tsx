import { AreaChart } from 'bizcharts';
import React from 'react';
import moment from 'moment';
import autoHeight from '@/components/autoHeight';
import styles from './index.less';

export interface TrainChartProps {
  height?: number;
  forceFit?: boolean;
  data: {
    monthNum?: number;
    rate?: number;
  }[];
}
// { monthNum: 10, rate: 1.0 },
const MiniLineChart: React.FC<TrainChartProps> = (props) => {
  const { height = 1, data } = props;
  const padding: [number, number, number, number] = [10, 20, 40, 30];
  const chartHeight = height + 54;
  // const dataList = data?.map((data) => {
  //   return {
  //     month: moment(data.month).month(),
  //     rate: data.rate * 100
  //   }
  // });
  return (
    <div className={styles.miniChart} style={{ height }}>
      <div className={styles.chartContent}>
        {height > 0 && (
          <AreaChart
            // description={{
            //   visible: true,
            //   text: '近12个月故障率/%',
            //   style:{fill:"#f1f1f1",opacity: 0.8}
            // }}
            height={chartHeight}
            padding={padding}
            data={data}
            smooth
            areaStyle={{
              fill: 'l(90) 0:rgb(55,121,253,0.6)  1:#3779fd'
            }}
            xField='monthNum'
            yField='rate'
            yAxis={{

              grid: {
                visible: true,
                // style:{color:"#f1f1f1",opacity: 0.2}
              },
              min: 0,
              max: 2
            }}
          />
        )}
      </div>
    </div>
  );
};

export default autoHeight()(MiniLineChart);
