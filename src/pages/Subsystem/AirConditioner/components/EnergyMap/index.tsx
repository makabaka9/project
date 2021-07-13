import { Chart, Line, Axis, Legend } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';

export interface EnergyMapProps {
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  data: {
    time: string;
    type: string;
    humity: number;
  }[];
}

const EnergyMap: React.FC<EnergyMapProps> = (props) => {
  const { height = 1, data } = props;
  const padding: [number, number, number, number] = [30, 30, 30, 30];
  const chartHeight = height + 100;
  const scale = {
    time: {
      alias: '时间', // 别名
    },
    humity: {
      alias: '机组能耗/kwh', // 别名
    },
  };

  return (
    <div>
      <Chart
        // scale={{ humity: { min: 0 } }}
        scale={scale}
        padding={[10, 30, 50, 40]}
        autoFit
        height={chartHeight}
        data={data}
      >
        <Axis
          name="time"
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
          name="humity"
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
        <Line shape="smooth" position="time*humity" color="type" />
        <Legend position="top" />
        {/* <Point position="time*humity" color="type" 
        visible={false}
        shape='circle'
        size={3}
        style={ {stroke:'black'}} 
        /> */}
      </Chart>
    </div>
  );
};

export default autoHeight()(EnergyMap);
