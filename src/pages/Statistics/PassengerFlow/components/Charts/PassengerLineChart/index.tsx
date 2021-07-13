import { Chart, Tooltip, Legend, Point, Line, Axis } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';

export interface EnergyStatisticsProps {
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  data: Array<object>
}

const GroupedColumn: React.FC<EnergyStatisticsProps> = (props) => {
  const { height = 1, data } = props;
  // const padding: [number, number, number, number] = [30, 30, 30, 30];
  const chartHeight = '14vh';
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
    passengerFlow: {
      alias: '客运量' // 别名
    },
    timePoint: {
      alias: '时间/分' // 别名
    },
  };
  // {/* "stationName":"那洪站","timePoint":"6:30","passengerVolume":500.0 */ }
  // passengerFlow: 1360, timePoint: "6:30"
  return (
    <div>
      <Chart
        scale={scale}
        // padding={[10, 20, 50, 60]}
        autoFit
        height={chartHeight}
        data={data}
      >
        <Axis
          name="passengerFlow"
          grid={grid}
          title={{
            style: {
              textAlign: 'center',
              fill: '#999',
            }
          }} />
        <Axis
          name="timePoint"
          title={{
            style: {
              textAlign: 'center',
              fill: '#999',
            }
          }} />
        {/* <Legend /> */}
        <Line shape="smooth" position="timePoint*passengerFlow" />
        <Point
          position="timePoint*passengerFlow"
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
