import { Chart, Tooltip, Axis, Interval } from 'bizcharts';
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
    passengerVolume: {
      alias: '客运量' // 别名
    }
    // stationName: {
    //   alias: '站点' // 别名
    // },
  };
  // station: '那洪站', passenger: 38
  // { passengerVolume: 50, stationName: "那洪站" }
  return (
    // <div>
    <Chart
      scale={scale}
      padding={[5, 10, 100, 60]}
      height={chartHeight}
      autoFit
      data={data}
      interactions={['active-region']}
    >
      <Axis
        name="stationName"
        label={{
          style: {
            textBaseline: 'top',
          },
          formatter: function (val) {
            const str = val.split('');
            return str.join('\n');
          },
        }}

      />
      <Axis name="passengerVolume" grid={grid} title={{
        style: {
          textAlign: 'center',
          fill: '#999',
        }
      }} />
      {/* <Axis
          name="stationName"
          title={{
            style: {
              textAlign: 'center',
              fill: '#999',
            }
          }} /> */}
      <Interval position="stationName*passengerVolume" />
      <Tooltip shared />
    </Chart>
    // </div>
  );
};

export default autoHeight()(GroupedColumn);
