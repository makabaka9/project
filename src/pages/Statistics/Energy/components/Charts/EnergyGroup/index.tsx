import React from 'react';
// import { Chart, Tooltip, Interval, View, Line, Point, Axis, Legend } from 'bizcharts';
import {
  Axis,
  Chart,
  Tooltip,
  Interval,
  View,
  Line,
  Legend,
  getTheme
} from "bizcharts";
import autoHeight from '@/components/autoHeight';

export interface EnergyStatisticsProps {
  forceFit?: boolean;
  borderWidth?: number;
  data: {
    name: string;
    month: string;
    monthAverageRain: number;
  }[];
  data1: {
    name:string;
    month: string;
    AverageRain: number;
  }[];
}

const EnergyStatistics: React.FC<EnergyStatisticsProps> = (props) => {
  const { data, data1 } = props;
  const padding: [number, number, number, number] = [5, 30, 80, 40];
  const chartHeight = '18vh';
  const theme = getTheme();
  const colors = theme.colors10;
  /**
 * 图例开关状态
 */
  const legendMap = {}
  /**
   * 图表实例
   */
  let chartIns: any;
  // const grid = {
  //   line: {
  //     type: 'line',
  //     style: {
  //       stroke: '#DDDDDD',
  //       lineWidth: 1,
  //       strokeOpacity: 0.1,
  //     }
  //   }
  // };
  const scale = {
    month: {
      // type: 'cat',
      sync: true,
      alias: '时间/日'
    },
    AverageRain: {
      min: 0,
      alias: '再生能量',
    },
    monthAverageRain: {
      min: 0,
    },
  };

  return (
    <Chart height={chartHeight} padding={padding} scale={scale}
      data={data} autoFit
      onGetG2Instance={c => chartIns = c}>
      <Tooltip shared />
      <Interval
        adjust={[
          {
            type: 'dodge',
            marginRatio: 0,
          },
        ]}
        color={["name", colors]}
        position="month*monthAverageRain"
      />
      <Axis
          name="month"
          title={{
            style: {
              textAlign: 'center',
              fill: '#999',
            },
          }}
        />
      <Axis name='monthAverageRain' position='left' />
      <View data={data1} padding={0} >
        {/* <Axis name='AverageRain' position='right' /> */}
        <Line
          position="month*AverageRain"
          color={colors[3]}
        />
      </View>
      <Legend custom items={[
        {
          name: "牵引能耗/KWh", value: '牵引能耗', marker: {
            symbol: 'square',
            style: { fill: colors[0] }
          }
        },
        {
          name: "制动电阻能耗/KWh", value: '制动电阻能耗', marker: {
            symbol: 'square',
            style: { fill: colors[1] }
          }
        },
        {
          name: "辅助能耗/KWh", value: '辅助能耗', marker: {
            symbol: 'square',
            style: { fill: colors[2] }
          }
        },
        {
          name: "再生能量/KWh", value: '再生能量', marker: {
            symbol: 'hyphen',
            style: { stroke: colors[3], lineWidth: 2 }
          },
        }]}
        onChange={(ev) => {
          const { item } = ev;
          const { value } = item;
          const checked = !item.unchecked;
          // 设置图例项状态
          legendMap[value] = checked;
          if (value === '再生能量') {
            // 通过filter控制元素显示隐藏
            const view = chartIns.views[0];
            view.filter('name', (val: React.ReactText) => {
              return legendMap[val]
            })
            // 重新渲染，触发filter
            view.render(true)
          } else {
            // 通过filter控制元素显示隐藏
            chartIns.filter('name', (val: string | number) => {
              return legendMap[val] !== false
            })
            // 重新渲染，触发filter
            chartIns.render(true)
          }
        }}
      />

    </Chart>
    // <Chart height={chartHeight} scale={scale} forceFit>
    //   <Tooltip shared />
    //   <View data={data}>
    //     {/* <Axis visible={false} grid={grid} /> */}
    //     <Interval
    //       adjust={[
    //         {
    //           type: 'dodge',
    //           marginRatio: 0,
    //         },
    //       ]}
    //       color="name"
    //       position="month*monthAverageRain"
    //     />
    //   </View>
    //   <View data={data1}>
    //     <Axis visible={false}/>
    //     <Line position="month*AverageRain" color="orange" />
    //     <Point position="month*AverageRain" color="orange" size={2} shape="circle"  style={{ stroke: 'black' }}/>
    //   </View>
    // </Chart>
  );
};

export default EnergyStatistics;
