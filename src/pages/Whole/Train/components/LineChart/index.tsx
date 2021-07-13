import { Axis, AxisProps, Chart, Geom, Tooltip, Legend } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';
import styles from './index.less';

export interface LineChartProps {
  color?: string;
  height?: number;
  borderColor?: string;
  line?: boolean;
  animate?: boolean;
  xAxis?: AxisProps;
  forceFit?: boolean;
  scale?: {
    x?: {
      tickCount: number;
    };
    y?: {
      tickCount: number;
    };
  };
  yAxis?: Partial<AxisProps>;
  borderWidth?: number;
  data: {
    x: number | string;
    y: number;
  }[];
}

const LineChart: React.FC<LineChartProps> = (props) => {
  const {
    height = 1,
    // data = [],
    forceFit = true,
    // color = 'rgba(24, 144, 255, 0.2)',
    // borderColor = '#1089ff',
    // scale = { x: {}, y: {} },
    // borderWidth = 2,
    // line,
    // xAxis,
    // yAxis,
    animate = true,
    data,
  } = props;
  const grid = {
    lineStyle: {
      stroke: '#DDDDDD',
      lineWidth: 1,
      strokeOpacity: 0.1,
    },
  };
  const padding: [number, number, number, number] = [30, 30, 30, 30];
  const cols = {
    x: {
      range: [0, 1],
    },
  };
  const chartHeight = height + 54;

  return (
    <div className={styles.miniChart} style={{ height }}>
      <div className={styles.chartContent}>
        {height > 0 && (
          <Chart
            animate={animate}
            height={chartHeight}
            forceFit={forceFit}
            data={data}
            scale={cols}
            padding={padding}
          >
            <Legend name="z" position="top" />
            <Axis name="x" />
            <Axis
              grid={grid}
              name="y"
              label={{
                formatter: (val) => `${val}`,
              }}
            />
            <Tooltip
              crosshairs={{
                type: 'y',
              }}
              custom={true}
              containerTpl={`
            <div class="g2-tooltip"><div class="g2-tooltip-title" style="margin-bottom: 4px;"></div>
            <table>
              <thead>
                <tr>
                  <th>&nbsp;</th>
                  <th>名称</td>
                  <th>值</td>
                </tr>
              <thead>
              <tbody
                class="g2-tooltip-list"
              >
              </tbody>
            <table>
            `}
              itemTpl={`
              <tr data-index={index}>'
                <td><span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span></td>
                <td>{name}</td>
                <td>{value}</td>
              </tr>
           `}
            />
            <Geom type="line" position="x*y" size={2} color={'z'} shape={'smooth'} />
            <Geom
              type="point"
              position="x*y"
              size={4}
              shape={'circle'}
              color={'z'}
              style={{
                stroke: '#fff',
                lineWidth: 1,
              }}
            />
          </Chart>
        )}
      </div>
    </div>
  );
};

export default autoHeight()(LineChart);
