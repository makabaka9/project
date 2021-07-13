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

  const componentHealthData = [
    {
      trainCode: '1',
      component: 'Mp1VVVF牵引逆变器',
      health: { status: '正常', color: 'rgb(0,0,0,0)' },
      time: '2020-08-11 18:11:20',
    },
    {
      trainCode: '2',
      component: 'M1VVVF牵引逆变器',
      health: { status: '注意', color: 'rgb(0,0,0,0)' },
      time: '2020-08-11 18:11:20',
    },
    {
      trainCode: '3',
      component: 'M2VVVF牵引逆变器',
      health: { status: '异常', color: 'rgb(0,0,0,0)' },
      time: '2020-08-11 18:11:20',
    },
    {
      trainCode: '4',
      component: 'Mp2VVVF牵引逆变器',
      health: { status: '异常', color: 'rgb(0,0,0,0)' },
      time: '2020-08-11 18:11:20',
    },
    {
      trainCode: '5',
      component: 'Mp1电机温度传感器',
      health: { status: '严重', color: 'red' },
      time: '2020-08-11 18:11:20',
    },
    {
      trainCode: '6',
      component: 'Mp1电压传感器',
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

  const healthData = [
    { mile: '10000', score: 94, DCU: 'Mp1' },
    { mile: '10000', score: 91, DCU: 'M1' },
    { mile: '10000', score: 92, DCU: 'M2' },
    { mile: '10000', score: 93, DCU: 'Mp2' },
    { mile: '20000', score: 87, DCU: 'Mp1' },
    { mile: '20000', score: 85, DCU: 'M1' },
    { mile: '20000', score: 82, DCU: 'M2' },
    { mile: '20000', score: 81, DCU: 'Mp2' },
    { mile: '40000', score: 78, DCU: 'Mp1' },
    { mile: '40000', score: 79, DCU: 'M1' },
    { mile: '40000', score: 75, DCU: 'M2' },
    { mile: '40000', score: 76, DCU: 'Mp2' },
    { mile: '60000', score: 68, DCU: 'Mp1' },
    { mile: '60000', score: 69, DCU: 'M1' },
    { mile: '60000', score: 68, DCU: 'M2' },
    { mile: '60000', score: 69, DCU: 'Mp2' },
    { mile: '80000', score: 65, DCU: 'Mp1' },
    { mile: '80000', score: 64, DCU: 'M1' },
    { mile: '80000', score: 65, DCU: 'M2' },
    { mile: '80000', score: 65, DCU: 'Mp2' },
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
            <Typography.Text>健康评分</Typography.Text>
            {/* <Row gutter={16}>
              <Col span={4}>
                <Statistic title="Tc1-BCU" value={86} />
              </Col>
              <Col span={4}>
                <Statistic title="Mp1-BCU" value={86} />
              </Col>
              <Col span={4}>
                <Statistic title="M1-BCU" value={86} />
              </Col>
              <Col span={4}>
                <Statistic title="M2-BCU" value={86} />
              </Col>
              <Col span={4}>
                <Statistic title="Mp2-BCU" value={86} />
              </Col>
              <Col span={4}>
                <Statistic title="Tc2-BCU" value={78} />
              </Col>
            </Row> */}
            <HealthMap borderWidth={2} height={180} data={healthData} />
          </Col>
          {/* <Col xl={12}
              lg={12}
              sm={24}
              xs={24} >
              <WarnTable loading={loading} data={componentHealthData} columns={healthColumns} />
            </Col > */}
        </Row>
      </Card>
      {/* </Row> */}
    </>
  );
};

export default ModelPrediction;
