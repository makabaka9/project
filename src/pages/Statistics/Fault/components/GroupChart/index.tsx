import { GroupedColumnChart, Chart, Line, Point, Axis, DonutChart } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';
import { Row, Col, Card } from 'antd';
import styles from '../../style.less';

export interface HorizonBarProps {
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  data: {
    name: string;
    系统: number | string;
    系统故障: number;
  }[];
  data1: {
    month: string;
    city: number | string;
    temperature: number;
  }[];
  data2: {
    type: number | string;
    value: number;
  }[];
  time: string;
}

const GroupChart: React.FC<HorizonBarProps> = (props) => {
  const { height = 1, data, data1, data2, time } = props;
  //   const padding: [number, number, number, number] = [30, 30, 30, 30];
  const chartHeight = "30vh";
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
    temperature:{
      alias:'故障数/个' // 别名
    }
  };
  return (
    <div>
      <Row>
        <Col xl={14} lg={12} sm={24} xs={24}>
          <Card
            title={<div>{time}月各子系统故障分布</div>}
            bordered={false}
            className={styles.title}
          >
            {height > 0 && (
              <GroupedColumnChart
                height={chartHeight}
                data={data}
                scale={scale}
                forceFit
                xField="系统"
                yField="系统故障"
                yAxis={{
                  min: 0,
                  title: {
                    visible: true,
                    text: "故障数/个",
                    style:{
                      fill: 'rgba(255, 255, 255, 0.65)',
                    }
                  },
                }}
                legend={{
                  visible: true,
                  position: 'bottom-center',
                  offsetY: 8,
                }}
                label={{
                  visible: false,
                }}
                groupField="name"
                color={['#6dc8ec', '#5b8ff9', '#5ad8a6']}
                xAxis={{ 
                  visible: true, 
                  title: {
                     visible: false 
                  }, 
                }}
              />
            )}
          </Card>
        </Col>
        <Col xl={10} lg={12} sm={24} xs={24}>
          <Card
            title="各子系统故障趋势分析(近12个月)"
            bordered={false}
            className={styles.title}
            style={{
              marginRight: 16,
            }}
          >
            {height > 0 && (
              <Chart
                scale={scale}
                padding={[10, 20, 50, 40]}
                autoFit
                height={chartHeight}
                data={data1}
              >
                <Axis
                  name="temperature"
                  grid={grid}
                />
                <Line shape="line" position="month*temperature" color="city" />
                <Point
                  position="month*temperature"
                  color="city"
                  visible={false}
                  shape="circle"
                  size={3}
                  style={{ stroke: 'black' }}
                />
              </Chart>
            )}
          </Card>
        </Col>
        {/* <Col xl={6} lg={12} sm={24} xs={24}>
          <Card
            title={<div>{time}月各子系统故障分布</div>}
            bordered={false}
          >
            {height > 0 && (
              <DonutChart
                height={chartHeight}
                data={data2}
                forceFit
                pieStyle={{ lineWidth: 0 }}
                radius={0.8}
                padding="auto"
                angleField="value"
                colorField="type"
              />
            )}
          </Card>
        </Col> */}
      </Row>
    </div>
  );
};

export default autoHeight()(GroupChart);
