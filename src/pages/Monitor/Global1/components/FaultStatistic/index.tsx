import { AreaChart, Chart, Coordinate, Interval } from 'bizcharts';
import React from 'react';
import moment from 'moment';
import autoHeight from '@/components/autoHeight';
import styles from './index.less';

export interface TrainChartProps {
  height?: number;
  forceFit?: boolean;
  data: {
    month?: number;
    rate?: number;
  }[];
}

const MiniLineChart: React.FC<TrainChartProps> = (props) => {
  const { height = 1, data } = props;
  const padding: [number, number, number, number] = [10, 20, 40, 30];
  const chartHeight = height + 54;
  // const dataList = data?.map((data)=>{
  //   return {
  //     month:moment(data.month).month(),
  //     rate:data.rate*100
  //   }
  // });
  return (
    <div className={styles.miniChart} style={{ height }}>
      <div className={styles.chartContent}>
        {height > 0 && (
          // <AreaChart
          //   height={chartHeight}
          //   padding={padding}
          //   data={data}
          //   smooth
          //   areaStyle={{
          //     fill: 'l(90) 0:rgb(55,121,253,0.6)  1:#3779fd'
          //   }}
          //   xField='month'
          //   yField='rate'     
          // />
          <Chart height={50} data={data} autoFit>
            <Coordinate transpose />
            <Interval position="month*rate" />
          </Chart>
        )}
      </div>
    </div>
  );
};

export default autoHeight()(MiniLineChart);
