import { Chart, Line, Legend, Axis } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';

export interface HealthMapProps {
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  data: {
    mile: number | string;
    DCU: string;
    score: number;
  }[];
}

const HealthMap: React.FC<HealthMapProps> = (props) => {
  const { height, data } = props;
  // const padding: [number, number, number, number] = [30, 30, 30, 30];
  const chartHeight = "30vh"
  const scale = {
    mile: {
      alias: '时间/日', // 别名
    },
    score: {
      alias: 'MTBF/h', // 别名
    },
  };
  return (
    <div>
      <Chart
        scale={scale}
        padding={[5, 20, 80, 40]}
        autoFit
        height={chartHeight}
        data={data}
      >
        <Axis
          name="mile"
          title={{
            style: {
              // 绘图属性配置
              fontSize: '12',
              textAlign: 'center',
              fill: '#999',
              fontWeight: 'bold',
            },
          }}
        />
        <Axis
          name="score"
          title={{
            style: {
              // 绘图属性配置
              fontSize: '12',
              textAlign: 'center',
              fill: '#999',
              fontWeight: 'bold',
            },
          }}
        />
        <Line shape="smooth" position="mile*score" color="DCU" />
        <Legend position="bottom" />
        {/* <Point position="mile*score" color="DCU" 
        visible={false}
        shape='circle'
        size={3}
        style={ {stroke:'black'}} 
        /> */}
      </Chart>
    </div>
  );
};

export default autoHeight()(HealthMap);
