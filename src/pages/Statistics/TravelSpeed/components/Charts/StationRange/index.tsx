import React from 'react';
import { Chart, Legend, Axis, Line, Point } from 'bizcharts';
import autoHeight from '@/components/autoHeight';

export interface StackedColumnProps {
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  data: any;
}
const RangeColumn: React.FC<StackedColumnProps> = (props) => {
  const { height = 1, data } = props;

  //   const padding: [number, number, number, number] = [40, 20, 105, 40];
  const chartHeight = '22vh';

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
  // stationName: '金桥客运站', averageTime: 131, direction: "下行"
  const StationLineData: any[] = [];
  for (let i = 0; i < data.length; i++) {
    var value = Object.keys(data[i]);
    var value1 = [value[1], value[2]];
    for (let j = 0; j < value1.length; j++) {
      if (value[j] === "upRunTime") {
        StationLineData.push({
          siteName: data[i].siteName,
          direction: '上行(s)',
          averageTime: data[i].upRunTime,
        })
      }
      else {
        StationLineData.push({
          siteName: data[i].siteName,
          direction: '下行(s)',
          averageTime: data[i].downRunTime,
        })
      }
    }

  }
  // console.log("StationLineData", StationLineData)
  return (
    <Chart
      // scale={{ values: { min: 0 } }}
      padding={[5, 20, 105, 40]}
      forceFit
      height={chartHeight}
      data={StationLineData}
    >
      <Axis
        name="siteName"
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
      <Axis name="direction" grid={grid}
        title={{
          style: {
            textAlign: 'center',
            fill: '#999',
          }
        }} />
      <Legend position="bottom" />
      <Line shape="vh" position="siteName*averageTime" color="direction" />
      <Point position="siteName*averageTime" color="direction" size={2} shape="circle" style={{ lineWidth: 0, stroke: 'black' }} />
    </Chart>
  );
};

export default autoHeight()(RangeColumn);
