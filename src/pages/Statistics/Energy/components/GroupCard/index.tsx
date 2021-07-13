import { DonutChart, GaugeChart } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';
import { Card, Table, Col, Row, Typography } from 'antd';
// import Trend from '../Trend';
import styles from '../../style.less';

export interface HorizonBarProps {
  height?: number;
  forceFit?: boolean;
  loading?: boolean;
  borderWidth?: number;
  // data: {
  //   type: number | string;
  //   value: number;
  // }[];
  // gaugeData: {
  //   num: number;
  //   percent: number | string;
  // }[];
  subsystemData: {
    month: string;
    city: number | string;
    temperature: number;
  }[];
}

const columns: any[] = [
  // {
  //   title: '序号',
  //   dataIndex: 'index',
  //   key: 'index',
  //   width: 100,
  //   fixed: 'left',
  // },
  {
    title: '统计时段',
    dataIndex: 'statisticalTime',
    key: 'statisticalTime',
    align: 'center',
    sorter: (
      a: {
        count: number;
      },
      b: {
        count: number;
      },
    ) => a.count - b.count,
  },
  {
    title: '牵引能耗/kWh',
    dataIndex: 'tractionEnergy',
    key: 'tractionEnergy',
    align: 'center',
  },
  {
    title: '制动电阻能耗/kWh',
    dataIndex: 'brakeEnergy',
    key: 'brakeEnergy',
    align: 'center',
  },
  {
    title: '辅助能耗/kWh',
    dataIndex: 'auxiliaryEnergy',
    key: 'auxiliaryEnergy',
    align: 'center',
  },
  {
    title: '再生能量/kWh',
    dataIndex: 'reEnergy',
    key: 'reEnergy',
    align: 'center',
  },
  {
    title: '净能耗/kWh',
    dataIndex: 'netEnergy',
    key: 'netEnergy',
    align: 'center',
  },
];

const GroupTable: React.FC<HorizonBarProps> = (props) => {
  const { height = 1, loading, data, gaugeData, subsystemData } = props;
  //   const padding: [number, number, number, number] = [0, 20, 20, 0];
  const chartHeight = height + 120;

  return (
    <div>
      <Row>
        {/* <Col xl={5} lg={12} sm={24} xs={24}>
          {height > 0 && (
            <Card
              loading={loading}
              bordered={false}
              title="总能耗与再生能量比"
              style={{
                height: '100%',
                padding: 0,
              }}
            >
              <DonutChart
                width={280}
                height={chartHeight}
                data={data}
                label={{ visible: false }}
                forceFit
                tooltip={{
                  visible: true,
                  // fields:['总能耗与再生能量比','colorField ']
                }}
                pieStyle={{ lineWidth: 0 }}
                radius={0.8}
                padding="auto"
                angleField="value"
                colorField="type"
                legend={{
                  visible: true,
                  position: 'bottom-center',
                  offsetY: 10,
                  text: {
                    style: {
                      fontSize: 16,
                    },
                  },
                }}
                statistic={{ visible: false }}
              />
            </Card>
          )}
        </Col> */}
        {/* <Col xl={5} lg={12} sm={24} xs={24}>
          {height > 0 && (
            <Card
              loading={loading}
              bordered={false}
              title="2020年KPI指标完成率"
              style={{
                height: '100%',
                padding: 0,
              }}
            >
              <GaugeChart
                width={200}
                height={280}
                padding="auto"
                value={gaugeData.num}
                min={0}
                max={100}
                range={[0, 25, 50, 75, 100]}
                color={['#39B8FF', '#52619B', '#43E089', '#C0EDF3']}
                statistic={{
                  visible: true,
                  text: `${gaugeData.percent}%`,
                  color: '#30bf78',
                }}
              />
              <span>
                <Typography.Text style={{ fontSize: 14, paddingTop: -20 }}>
                  本年度再生能量：
                </Typography.Text>
                <Typography.Text style={{ fontSize: 20 }}>556342.2 kWh</Typography.Text>
              </span>{' '}
              <br />
              <span>
                <Typography.Text style={{ fontSize: 14 }}>年度再生能量指标：</Typography.Text>
                <Typography.Text style={{ fontSize: 20 }}>738456.2 kWh</Typography.Text>
              </span>
            </Card>
          )}
        </Col> */}
        {/* <Col xl={24} lg={24} sm={24} xs={24}> */}
          {/* {height > 0 && ( */}
            <Card
              loading={loading}
              bordered={false}
              // title="能耗信息"
              style={{
                height: '100%',
                padding: 0,
              }}
            >
              <Table
                className={styles.system}
                columns={columns}
                dataSource={subsystemData}
                size="small"
                pagination={{}}
                scroll={{ y: 100 }}
              />
            </Card>
        {/* </Col> */}
      </Row>
    </div>
  );
};

export default autoHeight()(GroupTable);
