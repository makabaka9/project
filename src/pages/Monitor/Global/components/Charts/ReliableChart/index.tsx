import { AreaChart} from 'bizcharts';
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

const ReliableChart: React.FC<TrainChartProps> = (props) => {
  const { height = 1, data } = props;
  const padding: [number, number, number, number] = [10, 20, 40, 30];
  const chartHeight = height + 54;
  const dataList = data?.map((data)=>{
    return {
      monthNum:moment(data.month).month(),
      rate:data.rate
    }
  });
  // console.log(data);

  return (
    <div className={styles.miniChart} style={{ height }}>
      <div className={styles.chartContent}>
        {height > 0 && (
          <AreaChart
            height={chartHeight}
            padding={padding}
            data={dataList}
            smooth
            areaStyle={{
              fill: 'l(90) 0:rgb(55,121,253,0.6)  1:#3779fd'
            }}
            // description={{
            //   visible: true,
            //   text: '近12个月故障数/个',
            //   style:{fill:"#f1f1f1",opacity: 0.8}
            // }}
            xField='monthNum'
            yField='rate'
            // xAxis={{
            //   title:{
            //     visible:true,
            //     text:'近12个月',
            //     style:{fill:"#fff",opacity: 0.8}
            //   },
              
            // }}
            
            yAxis={{
              title:{
                visible:true,
                text:'近12个月故障数',
                style:{fill:"#f1f1f1",opacity: 0.8}
              },
              min:0,
              max:50
            }}
          />
        )}
      </div>
    </div>
  );
};

export default autoHeight()(ReliableChart);
