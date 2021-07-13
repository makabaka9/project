import React from 'react';
import autoHeight from '@/components/autoHeight';
import { Statistic, Col, Typography, Row, Card, Space, Tag } from 'antd';
import WarnTable from './WarnTable';
import styles from '.././style.less';
import HealthMap from './HealthMap';

export interface ModelPredictionProps {
  loading: boolean;
}

const ModelPrediction: React.FC<ModelPredictionProps> = (props) => {
  const { loading } = props;
  // const padding: [number, number, number, number] = [30, 30, 30, 30];

  const healthData = [
    { mile: '10000', score: 94, DCU: 'Tc1' },
    { mile: '10000', score: 91, DCU: 'Tc2' },
    { mile: '20000', score: 87, DCU: 'Tc1' },
    { mile: '20000', score: 85, DCU: 'Tc2' },
    { mile: '40000', score: 78, DCU: 'Tc1' },
    { mile: '40000', score: 79, DCU: 'Tc2' },
    { mile: '60000', score: 68, DCU: 'Tc1' },
    { mile: '60000', score: 69, DCU: 'Tc2' },
    { mile: '80000', score: 65, DCU: 'Tc1' },
    { mile: '80000', score: 64, DCU: 'Tc2' },
  ];
  const componentHealthData = [
    {
      trainCode: '1',
      component: 'Tc1辅助逆变器',
      health: { status: '正常', color: 'rgb(0,0,0,0)' },
      time: '2020-08-11 18:11:20',
    },
    {
      trainCode: '2',
      component: 'Tc1应急电源',
      health: { status: '注意', color: 'rgb(0,0,0,0)' },
      time: '2020-08-11 18:11:20',
    },
    {
      trainCode: '3',
      component: 'Tc2辅助逆变器',
      health: { status: '异常', color: 'rgb(0,0,0,0)' },
      time: '2020-08-11 18:11:20',
    },
    {
      trainCode: '4',
      component: 'Tc1充电机',
      health: { status: '严重', color: 'red' },
      time: '2020-08-11 18:11:20',
    },
    // { trainCode: '0501', component: '风机', health: { status: '故障', color: 'red' }, time: '2020-08-11 18:11:20' },
    {
      trainCode: '5',
      component: 'Tc1蓄电池',
      health: { status: '故障', color: 'red' },
      time: '2020-08-11 18:11:20',
    },
  ];
  const healthColumns = [
    {
      title: '序号',
      dataIndex: 'trainCode',
      key: 'trainCode',
      align: 'center',
    },
    {
      title: '监测部件',
      dataIndex: 'component',
      key: 'component',
      width: '30%',
      align: 'center',
    },
    {
      title: '健康情况',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (_, row: any) => (
        <Space>
          <Tag color={row.health.color} key={row.health.status}>
            {row.health.status}
          </Tag>
        </Space>
      ),
    },
    {
      title: '评估时间',
      dataIndex: 'time',
      key: 'time',
      align: 'center',
      sorter: (
        a: {
          count: number;
        },
        b: {
          count: number;
        },
      ) => a.count - b.count,
      // className: styles.alignRight,
    },
  ];
  return (
    <>
      {/* <Row gutter={16}> */}
      <Card title="预警信息" bordered={false} className={styles.title}>
        <Row gutter={16}>
          <Col xl={12} lg={12} sm={24} xs={24}>
            <WarnTable loading={loading} data={componentHealthData} columns={healthColumns} />
          </Col>
          {/* <div style={{ padding: 32 }}> */}
          {/* <Card bordered={false}> */}
          <Col xl={12} lg={12} sm={24} xs={24}>
            {/* <Row gutter={16}>
                            <Col span={4}>
                                <Typography.Text>健康评分</Typography.Text>
                            </Col>
                            <Col span={5}>
                                <Statistic title="Tc1-SIV" value={86} />
                            </Col>
                            <Col span={5}>
                                <Statistic title="Tc2-SIV" value={78} />
                            </Col>
                        </Row> */}
            {/* <Typography>健康趋势</Typography> */}
            <HealthMap borderWidth={2} height={180} data={healthData} />
          </Col>
        </Row>
      </Card>
      {/* </Row> */}
    </>
  );
};

export default ModelPrediction;
