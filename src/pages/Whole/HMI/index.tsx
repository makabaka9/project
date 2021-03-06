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
  shanchu: StateType;
}

const Train: React.FC<TrainProps> = (props) => {
  const { shanchu, loading, dispatch } = props;
  const { } = shanchu;
  const [trainCode, setTrainCode] = useState('501');

  const clickQuery = (event: { trainCode: string }) => {
    setTrainCode(event.trainCode);
  };

  // const trainCode = '501';
  useEffect(() => {
    dispatch({
      type: 'shanchu/fetchBasicInfo',
      payload: trainCode,
    });
  }, []);
  useEffect(() => {
    dispatch({
      type: 'shanchu/fetchReliability',
      payload: trainCode,
    });
  }, []);
  useEffect(() => {
    dispatch({
      type: 'shanchu/fetchComfort',
      payload: trainCode,
    });
  }, []);
  useEffect(() => {
    dispatch({
      type: 'shanchu/fetchStability',
      payload: trainCode,
    });
  }, []);
  const trainStateData = [
    { setName: "VVVF??????", TMc1: 0, M1: 1, M2: 1, TMc2: 0 },
    { setName: "HSCB??????", TMc1: 0, M1: 2, M2: 1, TMc2: 0 },
    { setName: "BLB??????", M1: 0, M2: 1 },
    { setName: "BHB??????", M1: 0, M2: 1 },
    { setName: "KMB1??????", M1: 0, M2: 1 },
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
      title: '????????????',
      dataIndex: 'setName',
      key: 'setName',
      align: 'center',
      width: '20%'
    },

    {
      title: 'TMc1???',
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
      title: 'M1???',
      dataIndex: 'M1',
      key: 'M1',
      align: 'center',
      width: '20%',
    },
    {
      title: 'M2???',
      dataIndex: 'M2',
      key: 'M2',
      align: 'center',
      width: '20%',
    },
    {
      title: 'TMc2???',
      dataIndex: 'TMc2',
      key: 'TMc2',
      align: 'center',
      width: '20%',
    },
  ]

  const bypassInformationData = [
    { setName: "????????????", TMc1: 0, M1: 2, M2: 1, TMc2: 0 },
    { setName: "??????????????????", TMc1: 0, M1: 2, M2: 1, TMc2: 0 },
    { setName: "???????????????", TMc1: 0, M1: 2, M2: 1, TMc2: 0 },
    { setName: "???????????????", TMc1: 0, M1: 2, M2: 1, TMc2: 0 },
    { setName: "??????????????????", TMc1: 0, M1: 2, M2: 1, TMc2: 0 },
    { setName: "????????????????????????", TMc1: 0, M1: 2, M2: 1, TMc2: 0 },
    { setName: "TMc1??????????????????", TMc1: 0, M1: 2, M2: 1, TMc2: 0 },
    { setName: "TMc2??????????????????", TMc1: 0, M1: 2, M2: 1, TMc2: 0 },
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
      title: '????????????',
      dataIndex: 'setName',
      key: 'setName',
      align: 'center',
      width: '20%'
    },

    {
      title: 'TMc1???',
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
      title: 'M1???',
      dataIndex: 'M1',
      key: 'M1',
      align: 'center',
      width: '20%',
    },
    {
      title: 'M2???',
      dataIndex: 'M2',
      key: 'M2',
      align: 'center',
      width: '20%',
    },
    {
      title: 'TMc2???',
      dataIndex: 'TMc2',
      key: 'TMc2',
      align: 'center',
      width: '20%',
    },
  ]
  const airconditionData = [
    {
      setName: `???????????????`,
      TMc1: '24.0',
      M1: '24.0',
      M2: '24.0',
      TMc2: '24.0',

    },
    {
      setName: `???????????????`,
      TMc1: '24.0',
      M1: '24.0',
      M2: '24.0',
      TMc2: '24.0'
    },
    {
      setName: `???????????????`,
      TMc1: '24.0',
      M1: '24.0',
      M2: '24.0',
      TMc2: '24.0'
    },
    {
      setName: `???????????????`,
      TMc1: [1, 2, 3, 4].map(item => (<Tag color="#52c41a" style={{ width: 14, padding: 0 }}>{item}</Tag>)),
      M1: [1, 2, 3, 4].map(item => (<Tag color="#52c41a" style={{ width: 14, padding: 0 }}>{item}</Tag>)),
      M2: [1, 2, 3, 4].map(item => (<Tag color="#52c41a" style={{ width: 14, padding: 0 }}>{item}</Tag>)),
      TMc2: [1, 2, 3, 4].map(item => (<Tag color="#52c41a" style={{ width: 14, padding: 0 }}>{item}</Tag>)),
    },
  ]

  const airconditionColumns = [
    {
      title: '??????',
      dataIndex: 'setName',
      key: 'setName',
      align: 'center',
      width: '20%'
    },

    {
      title: 'TMc1???',
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
      title: 'M1???',
      dataIndex: 'M1',
      key: 'M1',
      align: 'center',
      width: '20%',
    },
    {
      title: 'M2???',
      dataIndex: 'M2',
      key: 'M2',
      align: 'center',
      width: '20%',
    },
    {
      title: 'TMc2???',
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
      statusContent: '1?????????????????????',
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
      title: '????????????',
      dataIndex: 'faultLevel',
      key: 'faultLevel',
      align: 'center',
      width: '5%',
    },
    {
      title: '????????????',
      dataIndex: 'faultCode',
      key: 'faultCode',
      align: 'center',
      width: '5%',
    },
    {
      title: '????????????',
      dataIndex: 'statusContent',
      key: 'statusContent',
      align: 'center',
      width: '10%',
    },
    {
      title: '????????????',
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
      tractionLock: '????????????????????????',
      speedCondition: '??????????????????3km/h',
      emergencyBraking: '??????????????????108km/h',
    });
  }
  const tipsInformationDataColumns = [
    {
      title: '????????????',
      dataIndex: 'tractionLock',
      key: 'tractionlock',
      align: 'center',
      width: '5%',
    },
    {
      title: '????????????',
      dataIndex: 'speedCondition',
      key: 'speedcondition',
      align: 'center',
      width: '5%',
    },
    {
      title: '????????????',
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
            ??????????????? <DatePicker showTime
            // onChange={onChange} onOk={onOk} 
            />
          &emsp;&emsp;<ClockCircleOutlined style={{ backgroundColor: 'rgb(0,0,0,0.1)', color: '#52c41a' }} />  {moment(new Date()).format("YYYY-MM-DD HH:MM:SS")}
          </div>
        </Col>
      </Row>
      <Row gutter={24}>
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

      <Row gutter={24}>
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
      <Card bordered={false} bodyStyle={{ padding: 0 }} >
        <Row gutter={24}>
          <Col xl={2} lg={12} sm={24} xs={24}>
            <Descriptions title="????????????" style={{ marginBottom: 1, marginTop: 10 }} column={2}>
            </Descriptions>
          </Col>
          <Col xl={5} lg={12} sm={24} xs={24}>
            <Form.Item
              style={{ marginBottom: 1, marginTop: 10 }}
              name="select-multiple"
              label="????????????"
            >
              <Select style={{ textAlign: "left" }} mode="multiple" placeholder="????????????????????????">
                <Option value="??????">??????</Option>
                <Option value="??????">??????</Option>
                <Option value="??????">??????</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xl={5} lg={12} sm={24} xs={24}>
            <Form.Item
              style={{ marginBottom: 1, marginTop: 10 }}
              name="select"
              label="????????????"
              hasFeedback
            >
              <Select placeholder="?????????????????????">
                <Option value="china">?????????-????????????</Option>
                <Option value="usa">??????-????????????</Option>
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
      </Row>
    </div>
  );
};
// }

export default connect(
  ({
    shanchu,
    loading,
  }: {
    shanchu: StateType;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    shanchu,
    // loading: loading.effects['shanchu/fetchBasic'],
    loading: loading.effects['shanchu/fetchBasicInfo'],
  }),
)(Train);
