import { ColumnChart, DonutChart, PieChart, StackedAreaChart } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';
import { Row, Col } from 'antd';

export interface HorizonBarProps {
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  monthrunData: {
    type: string;
    value: number;
  }[];
  classStatisticData: {
    type: string;
    value: number;
  }[];
  subhealthyData: {
    type: string;
    value: number;
  }[];
}

const ClassStatistics: React.FC<HorizonBarProps> = (props) => {
  const { height, monthrunData, classStatisticData, subhealthyData } = props;
  const padding: [number, number, number, number] = [30, 30, 30, 30];
  const chartHeight = "15vh";

  return (
    <div>
      <Row>
        {/* <Col xl={8} lg={12} sm={24} xs={24}>
          {height > 0 && (
            <PieChart
              data={monthrunData}
              height={chartHeight}
              padding={padding}
              // title={{
              //   visible: true,
              //   text: '饼图-外部图形标签(outer label)',
              // }}
              // description={{
              //   visible: true,
              //   text: '当把饼图label的类型设置为outer时，标签在切片外部拉线显示。设置offset控制标签的偏移值。',
              // }}
              radius={0.8}
              angleField="value"
              colorField="type"
              label={{
                visible: true,
                type: 'outer',
                style: {
                  fill: 'white',
                  opacity: 0.6,
                },
              }}
              pieStyle={{
                stroke: 'white',
                strokeOpacity: 0,
              }}
              legend={{
                position: 'bottom-center',
                offsetY: 10,
              }}
            />
          )}
        </Col> */}
        <Col xl={12} lg={12} sm={24} xs={24}>
          {/* {height > 0 && ( */}
          <ColumnChart
            height={chartHeight}
            data={classStatisticData}
            // title={{
            //   visible: true,
            //   text: '基础柱状图',
            // }}
            forceFit
            // padding='auto'
            padding={padding}
            xField="type"
            yField="value"
            meta={{
              type: {
                alias: '类别',
              },
              value: {
                alias: '销售额(万)',
              },
            }}
          />
          {/* )} */}
        </Col>
        <Col xl={12} lg={12} sm={24} xs={24}>
          {/* {height > 0 && ( */}
          <DonutChart
            data={subhealthyData}
            height={chartHeight}
            padding={padding}
            forceFit={true}
            radius={0.8}
            // padding='auto'
            angleField="value"
            colorField="type"
            label={{
              visible: true,
              type: 'outer',
              style: {
                fill: 'white',
                opacity: 0.6,
              },
            }}
            pieStyle={{
              stroke: 'white',
              strokeOpacity: 0,
            }}
            legend={{
              position: 'bottom-center',
              offsetY: 10,
            }}
          />
          {/* )} */}
        </Col>
      </Row>
    </div>
  );
};

export default autoHeight()(ClassStatistics);
