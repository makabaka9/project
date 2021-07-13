import { Card, Row, Col, Empty, List, DatePicker, Form, Tabs, Tag, Space, Select, Descriptions } from 'antd';
import React, { Component, useEffect, useState } from 'react';
const { Option } = Select;
import { connect, Dispatch, Link } from 'umi';
import styles from './style.less';
// import {
//   BasicProfileDataType,
//   BasicInfoDataType,
//   ReliabilityDataType,
//   ComfortDataType,
//   StabilityDataType,
// } from './data.d';
import BasicInfo from './components/BasicInfo';
// import LineCodeAndTrainCodeQuery from '../components/LineCodeAndTrainCodeQuery';
import LineCodeAndTrainCodeQuery from '@/components/LineCodeAndTrainCodeQuery';
import DoorMap from './components/DoorMap';
import stateGreenIcon from '@/assets/stateGreen.svg';
import stateGrayIcon from '@/assets/stateGray.svg';
import stateRedIcon from '@/assets/stateRed.svg';

import { StateType } from './model';
import { ClockCircleOutlined, DashboardOutlined, DashboardTwoTone } from '@ant-design/icons';
import moment from 'moment';
import CommunicationMap from './components/CommunicationMap';
import Havc from './components/Havc';
import VehicleStatusTable from './components/VehicleStatus';
import MonitorMap from './components/MonitorMap';
import RelationMap from './components/RelationMap';


interface TrainProps {
  loading: boolean;
  dispatch: Dispatch;
  monitorAndHMI: StateType;
}

const Train: React.FC<TrainProps> = (props) => {
  const { monitorAndHMI, loading, dispatch } = props;
  const { } = monitorAndHMI;
  const [trainCode, setTrainCode] = useState('501');

  const clickQuery = (event: { trainCode: string }) => {
    setTrainCode(event.trainCode);
  };

  // const trainCode = '501';
  useEffect(() => {
    dispatch({
      type: 'monitorAndHMI/fetchBasicInfo',
      payload: trainCode,
    });
  }, []);
  useEffect(() => {
    dispatch({
      type: 'monitorAndHMI/fetchReliability',
      payload: trainCode,
    });
  }, []);
  useEffect(() => {
    dispatch({
      type: 'monitorAndHMI/fetchComfort',
      payload: trainCode,
    });
  }, []);
  useEffect(() => {
    dispatch({
      type: 'monitorAndHMI/fetchStability',
      payload: trainCode,
    });
  }, []);
  const trainStateData = [
    { setName: "VVVF状态", TMc1: 0, M1: 1, M2: 1, TMc2: 0 },
    { setName: "HSCB状态", TMc1: 0, M1: 2, M2: 1, TMc2: 0 },
    { setName: "BLB状态", M1: 0, M2: 1 },
    { setName: "BHB状态", M1: 0, M2: 1 },
    { setName: "KMB1状态", M1: 0, M2: 1 },
  ]

  const trainStateData1 = trainStateData.map(item => ({
    setName: item.setName,
    TMc1: <img src={item.TMc1 === 0 ? stateGreenIcon : item.TMc1 === 1 ? stateRedIcon
      : stateGrayIcon} className={styles.iconState} />,
    M1: <img src={item.M1 === 0 ? stateGreenIcon : item.M1 === 1 ? stateRedIcon
      : stateGrayIcon} className={styles.iconState} />,
    M2: <img src={item.M2 === 0 ? stateGreenIcon : item.M2 === 1 ? stateRedIcon
      : stateGrayIcon} className={styles.iconState} />,
    TMc2: <img src={item.TMc2 === 0 ? stateGreenIcon : item.TMc2 === 1 ? stateRedIcon
      : stateGrayIcon} className={styles.iconState} />,

  }))
  const trainStateColumns = [
    {
      title: '设备名称',
      dataIndex: 'setName',
      key: 'setName',
      align: 'center',
      width: '20%'
    },

    {
      title: 'TMc1车',
      dataIndex: 'TMc1',
      key: 'TMc1',
      align: 'center',
      width: '20%',
      // render: (row, record) => (
      //   <Tag color="green">
      //     <a>{row.name}</a>
      //   </Tag>
      // ),
    },
    {
      title: 'M1车',
      dataIndex: 'M1',
      key: 'M1',
      align: 'center',
      width: '20%',
    },
    {
      title: 'M2车',
      dataIndex: 'M2',
      key: 'M2',
      align: 'center',
      width: '20%',
    },
    {
      title: 'TMc2车',
      dataIndex: 'TMc2',
      key: 'TMc2',
      align: 'center',
      width: '20%',
    },
  ]

  const bypassInformationData = [
    { setName: "警惕旁路", TMc1: 0, M1: 2, M2: 1, TMc2: 0 },
    { setName: "司机室门旁路", TMc1: 0, M1: 2, M2: 1, TMc2: 0 },
    { setName: "门关好旁路", TMc1: 0, M1: 2, M2: 1, TMc2: 0 },
    { setName: "门零速旁路", TMc1: 0, M1: 2, M2: 1, TMc2: 0 },
    { setName: "左门允许旁路", TMc1: 0, M1: 2, M2: 1, TMc2: 0 },
    { setName: "停放制动缓解旁路", TMc1: 0, M1: 2, M2: 1, TMc2: 0 },
    { setName: "TMc1车电制动旁路", TMc1: 0, M1: 2, M2: 1, TMc2: 0 },
    { setName: "TMc2车电制动旁路", TMc1: 0, M1: 2, M2: 1, TMc2: 0 },
  ]

  const bypassInformationData1 = bypassInformationData.map(item => ({
    setName: item.setName,
    TMc1: <img src={item.TMc1 === 0 ? stateGreenIcon : item.TMc1 === 1 ? stateRedIcon
      : stateGrayIcon} className={styles.iconState} />,
    M1: <img src={item.M1 === 0 ? stateGreenIcon : item.M1 === 1 ? stateRedIcon
      : stateGrayIcon} className={styles.iconState} />,
    M2: <img src={item.M2 === 0 ? stateGreenIcon : item.M2 === 1 ? stateRedIcon
      : stateGrayIcon} className={styles.iconState} />,
    TMc2: <img src={item.TMc2 === 0 ? stateGreenIcon : item.TMc2 === 1 ? stateRedIcon
      : stateGrayIcon} className={styles.iconState} />,

  }))
  const bypassColumns = [
    {
      title: '旁路名称',
      dataIndex: 'setName',
      key: 'setName',
      align: 'center',
      width: '20%'
    },

    {
      title: 'TMc1车',
      dataIndex: 'TMc1',
      key: 'TMc1',
      align: 'center',
      width: '20%',
      // render: (row, record) => (
      //   <Tag color="green">
      //     <a>{row.name}</a>
      //   </Tag>
      // ),
    },
    {
      title: 'M1车',
      dataIndex: 'M1',
      key: 'M1',
      align: 'center',
      width: '20%',
    },
    {
      title: 'M2车',
      dataIndex: 'M2',
      key: 'M2',
      align: 'center',
      width: '20%',
    },
    {
      title: 'TMc2车',
      dataIndex: 'TMc2',
      key: 'TMc2',
      align: 'center',
      width: '20%',
    },
  ]
  const airconditionData = [
    {
      setName: `目标温度℃`,
      TMc1: '24.0',
      M1: '24.0',
      M2: '24.0',
      TMc2: '24.0',

    },
    {
      setName: `室内温度℃`,
      TMc1: '24.0',
      M1: '24.0',
      M2: '24.0',
      TMc2: '24.0'
    },
    {
      setName: `室外温度℃`,
      TMc1: '24.0',
      M1: '24.0',
      M2: '24.0',
      TMc2: '24.0'
    },
    {
      setName: `压缩机状态`,
      TMc1: [1, 2, 3, 4].map(item => (<Tag color="#52c41a" style={{ width: 10, padding: 0 }}>{item}</Tag>)),
      M1: [1, 2, 3, 4].map(item => (<Tag color="#52c41a" style={{ width: 10, padding: 0 }}>{item}</Tag>)),
      M2: [1, 2, 3, 4].map(item => (<Tag color="#52c41a" style={{ width: 10, padding: 0 }}>{item}</Tag>)),
      TMc2: [1, 2, 3, 4].map(item => (<Tag color="#52c41a" style={{ width: 10, padding: 0 }}>{item}</Tag>)),
    },
  ]

  const airconditionColumns = [
    {
      title: '类型',
      dataIndex: 'setName',
      key: 'setName',
      align: 'center',
      width: '20%'
    },

    {
      title: 'TMc1车',
      dataIndex: 'TMc1',
      key: 'TMc1',
      align: 'center',
      width: '20%',
      // render: (row, record) => (
      //   <Tag color="green">
      //     <a>{row.name}</a>
      //   </Tag>
      // ),
    },
    {
      title: 'M1车',
      dataIndex: 'M1',
      key: 'M1',
      align: 'center',
      width: '20%',
    },
    {
      title: 'M2车',
      dataIndex: 'M2',
      key: 'M2',
      align: 'center',
      width: '20%',
    },
    {
      title: 'TMc2车',
      dataIndex: 'TMc2',
      key: 'TMc2',
      align: 'center',
      width: '20%',
    },
  ]

  const faultData: any[] = [];
  for (let i = 1; i < 10; i += 1) {
    faultData.push({
      Number: '1',
      faultLevel: '2',
      faultCode: '5124',
      statusContent: '1车充电回路故障',
      time: moment(new Date().getTime()).format('YYYY-MM-DD HH:MM:SS'),
    });
  }
  const fualtColumns = [
    {
      title: 'NO',
      dataIndex: 'Number',
      key: 'Number',
      align: 'center',
      width: '5%',
    },
    {
      title: '故障等级',
      dataIndex: 'faultLevel',
      key: 'faultLevel',
      align: 'center',
      width: '5%',
    },
    {
      title: '故障代码',
      dataIndex: 'faultCode',
      key: 'faultCode',
      align: 'center',
      width: '5%',
    },
    {
      title: '事件内容',
      dataIndex: 'statusContent',
      key: 'statusContent',
      align: 'center',
      width: '10%',
    },
    {
      title: '发生时间',
      dataIndex: 'time',
      key: 'time',
      width: '10%',
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


  const tipsInformationData: any[] = [];
  for (let i = 1; i < 10; i += 1) {
    tipsInformationData.push({
      tractionLock: '牵引系统方向故障',
      speedCondition: '洗车模式限速3km/h',
      emergencyBraking: '列车速度超过108km/h',
    });
  }
  const tipsInformationDataColumns = [
    {
      title: '牵引封锁',
      dataIndex: 'tractionLock',
      key: 'tractionlock',
      align: 'center',
      width: '5%',
    },
    {
      title: '限速条件',
      dataIndex: 'speedCondition',
      key: 'speedcondition',
      align: 'center',
      width: '5%',
    },
    {
      title: '紧急制动',
      dataIndex: 'emergencyBraking',
      key: 'faultCode',
      align: 'center',
      width: '5%',
    },
  ];
  const relationdata = [
    {
      year: "08:01",
      value: 3,
    },
    {
      year: "08:02",
      value: 4,
    },
    {
      year: "08:03",
      value: 3.5,
    },
    {
      year: "08:04",
      value: 5,
    },
    {
      year: "08:05",
      value: 4.9,
    },
    {
      year: "08:06",
      value: 6,
    },
    {
      year: "08:07",
      value: 7,
    },
    {
      year: "08:08",
      value: 9,
    },
    {
      year: "08:09",
      value: 13,
    },
    {
      year: "08:10",
      value: 3,
    },
    {
      year: "08:11",
      value: 4,
    },
    {
      year: "08:11",
      value: 3.5,
    },
    {
      year: "08:12",
      value: 5,
    },
    {
      year: "08:13",
      value: 4.9,
    },
    {
      year: "08:14",
      value: 6,
    },
    {
      year: "08:15",
      value: 7,
    },
    {
      year: "08:16",
      value: 9,
    },
    {
      year: "08:17",
      value: 13,
    },
    {
      year: "08:18",
      value: 4,
    },
    {
      year: "08:19",
      value: 3.5,
    },
    {
      year: "08:20",
      value: 5,
    },
    {
      year: "08:21",
      value: 4.9,
    },
    {
      year: "08:22",
      value: 6,
    },
    {
      year: "08:23",
      value: 7,
    },
    {
      year: "08:24",
      value: 9,
    },
    {
      year: "08:25",
      value: 13,
    },
  ];

  return (
    <div>
      {/* <Card bordered={false} > */}
      <Row gutter={16}>
        <Col xl={12} lg={12} sm={24} xs={24}>
          <LineCodeAndTrainCodeQuery defaultTrainCode={trainCode} onSubmit={clickQuery} />
        </Col>
        <Col xl={12} lg={12} sm={24} xs={24}>
          <div style={{ textAlign: "right" }}>
            故障时间： <DatePicker showTime
            // onChange={onChange} onOk={onOk} 
            />

          </div>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col
          xl={8}
          lg={12}
          sm={24}
          xs={24}
        >
          <Card bordered={false} bodyStyle={{ padding: 10 }} className={styles.title} style={{ marginBottom: 16 }}>
            <BasicInfo height={194} />
          </Card>
        </Col>
        <Col
          xl={8}
          lg={12}
          sm={24}
          xs={24}
        >
          <Card bordered={false} bodyStyle={{ padding: 10 }}
            className={styles.title}
            style={{ marginBottom: 16 }}
          >
            <DoorMap />
          </Card>
        </Col>
        <Col
          xl={8}
          lg={12}
          sm={24}
          xs={24}
        >
          <Card bordered={false} className={styles.title} style={{ marginBottom: 16 }} bodyStyle={{ padding: 32 }}>
            <Havc
              airconditionData={airconditionData}
              bypassInformationData1={bypassInformationData1}
              columns={airconditionColumns}
              columns1={bypassColumns}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col
          xl={8}
          lg={12}
          sm={24}
          xs={24}
        >
          <Card bordered={false} className={styles.title} style={{ marginBottom: 16 }}>
            <CommunicationMap data={faultData} columns={fualtColumns}
              height={160}
            />
          </Card>
        </Col>
        <Col
          xl={8}
          lg={12}
          sm={24}
          xs={24}
        >
          <Card bordered={false} className={styles.title} style={{ marginBottom: 16 }}>
            <VehicleStatusTable data={trainStateData1} columns={trainStateColumns} />
          </Card>
        </Col>
        <Col
          xl={8}
          lg={12}
          sm={24}
          xs={24}
        >

          <Card bordered={false} className={styles.title} style={{ marginBottom: 16 }}>
            <MonitorMap
              data={faultData}
              columns={fualtColumns}
              data1={tipsInformationData}
              columns1={tipsInformationDataColumns}
              height={160}
            />
          </Card>
        </Col>
      </Row>

      {/* </Card> */}
      <Card
        bordered={false}
        title="关联分析"
        extra={
          <div>
            <span>关联参数：</span>
            <Select style={{ textAlign: "left", width: 180 }} mode="multiple" placeholder="请选择关联参数！" allowClear>
              <Option value="网压">网压</Option>
              <Option value="电流">电流</Option>
              <Option value="载荷">载荷</Option>
            </Select>
            &emsp;&emsp;
            <span>系统参数：</span>
            <Select style={{ textAlign: "left", width: 180 }} placeholder="请选择系统参数" allowClear>
              <Option value="china">牵引力-牵引系统</Option>
              <Option value="usa">网压-牵引系统</Option>
            </Select>
          </div>
        }>
          <RelationMap
              data={relationdata}
              height={100}
            />         
      </Card>

      {/* <Card bordered={false} bodyStyle={{ padding: 0 }} >
        <Row gutter={24}>
          <Col xl={2} lg={12} sm={24} xs={24}>
            <Descriptions title="关联分析" style={{ marginBottom: 1, marginTop: 10 }} column={2}>
            </Descriptions>
          </Col>
          <Col xl={5} lg={12} sm={24} xs={24}>
            <Form.Item
              style={{ marginBottom: 1, marginTop: 10 }}
              name="select-multiple"
              label="关联参数"
            >
              <Select style={{ textAlign: "left" }} mode="multiple" placeholder="请选择关键参数！">
                <Option value="网压">网压</Option>
                <Option value="电流">电流</Option>
                <Option value="载荷">载荷</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xl={5} lg={12} sm={24} xs={24}>
            <Form.Item
              style={{ marginBottom: 1, marginTop: 10 }}
              name="select"
              label="系统参数"
              hasFeedback
            >
              <Select placeholder="请选择系统参数">
                <Option value="china">牵引力-牵引系统</Option>
                <Option value="usa">网压-牵引系统</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Card>
      <Row gutter={24}>
        <Col xl={24} lg={12} sm={24} xs={24}>
          <Card bordered={false} className={styles.title} bodyStyle={{ padding: 0 }}>
            <RelationMap
              data={relationdata}
              height={100}
            />
          </Card>
        </Col>
      </Row> */}
    </div>
  );
};
// }

export default connect(
  ({
    monitorAndHMI,
    loading,
  }: {
    monitorAndHMI: StateType;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    monitorAndHMI,
    // loading: loading.effects['monitorAndHMI/fetchBasic'],
    loading: loading.effects['monitorAndHMI/fetchBasicInfo'],
  }),
)(Train);
