import { Chart, Line, Legend, Axis, Point } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';
import Item from 'antd/lib/list/Item';

export interface GroupedColumnProps {
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  data: any;
}

// "upSpeed": 36.45769230769231,
//   "upRunTime": 0.2433289098894509,
//     "downRunTime": 0.03764958969683155,
//       "downSpeed": 38.14782608695652,
//         "siteName": "那洪站"
const GroupedColumn: React.FC<GroupedColumnProps> = (props) => {
  const { height = 1, data } = props;

  // const padding: [number, number, number, number] = [30, 30, 30, 30];
  const StationLineData: any[] = [];
  for (let i = 0; i < data.length; i++) {
    var value = Object.keys(data[i]);
    var value1 = [value[0], value[3]]
    // console.log("value", value1)
    // console.log("data[i]", data[i])
    for (let j = 0; j < value1.length; j++) {
      if (value1[j] === "upSpeed") {
        StationLineData.push({
          siteName: data[i].siteName,
          direction: '平均上行行驶速度(km/h)',
          averageSpeed: data[i].upSpeed,
        })
      } else {
        StationLineData.push({
          siteName: data[i].siteName,
          direction: '平均下行行驶速度(km/h)',
          averageSpeed: data[i].downSpeed,
        }
        )
      }
    }

  }

  // console.log("StationLineData", StationLineData)
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

  // station: '邕宾立交站',
  //     speed: '平均下行行驶速度(km/h)',
  //     rate: 60,
  return (
    <div>
      <Chart
        scale={{ averageSpeed: { min: 0 } }}
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
        <Legend position="bottom" />
        <Axis name="direction" grid={grid} />
        {/* <Line shape="hv" position="siteName*averageSpeed" color="direction" /> */}
        <Line shape="hv" position="siteName*averageSpeed" color="direction" />
        <Point position="siteName*averageSpeed" color="direction" size={2} shape="circle" style={{ lineWidth: 0, stroke: 'black' }} />
        {/* <Point
          position="siteName*averageSpeed"
          color="direction"
          visible={false}
          shape="circle"
          size={3}
          style={{ stroke: 'black' }}
        /> */}
      </Chart>
    </div>
  );
};

export default autoHeight()(GroupedColumn);
