import { Chart, Line, Point, Axis, Legend } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';

export interface GroupedColumnProps {
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  data1: {
    happenTime: string;
    systemName: string;
    faultNum: number;
  }[];
}

const GroupedColumn: React.FC<GroupedColumnProps> = (props) => {
  const { height = 1, data1 } = props;
  // const padding: [number, number, number, number] = [30, 30, 30, 30];
  const chartHeight = '17vh';
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
    faultNum:{
      alias:'故障数', // 别名
    },
    happenTime:{
      alias:'日期/月', // 别名
    },
  };
  return (
    <div>
      <Chart
        scale={scale}
        padding={[10, 20, 80, 40]}
        autoFit
        height={chartHeight}
        data={data1}
      >
        <Axis
          name="faultNum"
          grid={grid}
          title={{
            style: {
              textAlign: 'center',
              fill: '#999',
            }
          }} />
          <Axis
          name="happenTime"
          title={{
            style: {
              textAlign: 'center',
              fill: '#999',
            }
          }} />
        <Legend position="bottom" />
        <Line shape="line" position="happenTime*faultNum" color="systemName" />
        <Point
          position="happenTime*faultNum"
          color="systemName"
          visible={false}
          shape="circle"
          size={3}
          style={{ stroke: 'black' }}
        />
      </Chart>
    </div>
  );
};

export default autoHeight()(GroupedColumn);
