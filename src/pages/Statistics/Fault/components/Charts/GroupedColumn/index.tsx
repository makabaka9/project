import { GroupedColumnChart } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';

export interface GroupedColumnProps {
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  data: {
    name: string;
    系统: number | string;
    系统故障: number;
  }[];
}

const GroupedColumn: React.FC<GroupedColumnProps> = (props) => {
  const { height = 1, data } = props;
  const padding: [number, number, number, number] = [30, 60, 50, 60];
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

  return (
    <div>
      <GroupedColumnChart
        height={chartHeight}
        data={data}
        forceFit
        padding={padding}
        xField='系统'
        yField='系统故障'
        yAxis={{
          min: 0,
          title: {
            visible: true,
            text: "故障数",
            style: {
              fill: "rgb(255,255,255,0.65)"
            }
          },
        }}
        xAxis={{
          label: {
            visible: true,
            autoRotate: true,
            offsetY: 40
          },
          title: {
            visible: true,
            text: "系统",
            style: {
              fill: "rgb(255,255,255,0.65)"
            }
          },
          grid: {
            line: {
              type: 'line',
              style: {
                stroke: '#DDDDDD',
                lineWidth: 1,
                strokeOpacity: 0.1,
              },
            },
          },
        }}
        label={{
          visible: false,
        }}
        groupField='name'
        color={['#6dc8ec', '#5b8ff9', '#5ad8a6']}
      />
    </div>
  );
};

export default autoHeight()(GroupedColumn);
