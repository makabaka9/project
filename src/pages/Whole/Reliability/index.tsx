import { Card, Row, Col, DatePicker, Statistic, Table, Progress, Typography, Space } from 'antd';
import React, { useEffect, useState } from 'react';

import { connect, Dispatch } from 'umi';
import { StateType } from './model';
import styles from './style.less';
import TrainChart from './components/TrainChart';
import LineCodeAndTrainCodeQuery from '@/components/LineCodeAndTrainCodeQuery';
import moment from 'moment';
import HealthMap from './components/HealthMap';
import TrainChartMdbf from './components/TrainChartMdbf';
import HealthMapOne from './components/HealthMapOne';
import Meta from 'antd/lib/card/Meta';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';

const { Text } = Typography;
interface ReliabilityProps {
  wholeAndReliability: StateType;
  dispatch: Dispatch;
  loading: boolean;
  wholeMTBF: Array<object>;
  subsystemFaultLevel: Array<object>;
  subsystemFaultLevelRate: Array<object>;
  avgMTBF: Array<object>;
  avgMDBF: Array<object>;
  wholeFaultLevelMTBF: Array<object>;
  reliability: Array<object>;
}
const Reliability: React.FC<ReliabilityProps> = (props) => {
  const { wholeAndReliability, loading, dispatch } = props;
  const {
    wholeMTBF,
  } = wholeAndReliability;
  const [trainCode, setTrainCode] = useState('501');
  // const [subSystemCode, setSubSystemCode] = useState("501");
  // const [dates, setDates] = useState([]);
  // const [subDates, setSubDates] = useState([]);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const clickQuery = (event: { trainCode: string }) => {
    setTrainCode(event.trainCode);
  };

  const initialParams = {
    trainCode,
    startTime: moment().month(moment().month() - 1).startOf('month'),
    endTime: moment().month(moment().month() - 1).endOf('month'),
  };
  useEffect(() => {
    dispatch({
      type: 'wholeAndReliability/fetchWholeMTBF',
      payload: initialParams,
    });
  }, []);

  function onChange(value: any) {
    const startTime = (moment(value).startOf('month')).toDate();
    const endTime = (moment(value).endOf('month')).toDate();
    setStartTime(startTime);
    setEndTime(endTime);
    const params = {
      trainCode,
      startTime,
      endTime,
    };
    dispatch({
      type: 'wholeAndReliability/fetchWholeMTBF',
      payload: params,
    });
    dispatch({
      type: 'wholeAndReliability/fetchWholeMDBF',
      payload: params,
    });
  }

  function onChangeSubsystem(value: string) {
    const params = {
      trainCode,
      startTime,
      endTime,
      subSystemCode: value,
    };
    dispatch({
      type: 'wholeAndReliability/fetchSubsystemMTBF',
      payload: params,
    });
    dispatch({
      type: 'wholeAndReliability/fetchSubsystemMDBF',
      payload: params,
    });
  }

  const columns = [
    {
      key: 'type',
      dataIndex: 'type',
      title: '??????',
    },
    {
      key: 'zxb',
      dataIndex: 'zxb',
      title: '?????????',
      render: (value: number) => (
        <Space >
          <Text style={{ color: value > 0 ? 'gold' : '#52c41a' }}>
            {/* {value > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />} */}
            {value}</Text>
        </Space>
      ),
    },
    {
      key: 'qy',
      dataIndex: 'qy',
      title: '??????',
      render: (value: number) => (
        <Space >
          <Text style={{ color: value > 0 ? 'gold' : '#52c41a' }}>
            {value}</Text>
        </Space>
      ),
    },
    {
      key: 'zd',
      dataIndex: 'zd',
      title: '??????',
      render: (value: number) => (
        <Space >
          <Text style={{ color: value > 0 ? 'gold' : '#52c41a' }}>
            {value}</Text>
        </Space>
      ),
    },
    {
      key: 'kt',
      dataIndex: 'kt',
      title: '??????',
      render: (value: number) => (
        <Space >
          <Text style={{ color: value > 0 ? 'gold' : '#52c41a' }}>
            {value}</Text>
        </Space>
      ),
    },
    {
      key: 'fz',
      dataIndex: 'fz',
      title: '??????',
      render: (value: number) => (
        <Space >
          <Text style={{ color: value > 0 ? 'gold' : '#52c41a' }}>
            {value}</Text>
        </Space>
      ),
    },
    {
      key: 'gw',
      dataIndex: 'gw',
      title: '??????',
      render: (value: number) => (
        <Space >
          <Text style={{ color: value > 0 ? 'gold' : '#52c41a' }}>
            {value}</Text>
        </Space>
      ),
    },
    {
      key: 'cm',
      dataIndex: 'cm',
      title: '??????',
      render: (value: number) => (
        <Space >
          <Text style={{ color: value > 0 ? 'gold' : '#52c41a' }}>
            {value}</Text>
        </Space>
      ),
    },
  ];
  const wholeData = { mtbfYtoy: -1.2, mtbfMtom: 2.31, mdbfYtoy: 3.12, mdbfMtom: -0.53 };
  const tableData = [
    { type: "MTBF??????", zxb: 5.2, qy: 5.2, zd: 1.2, kt: 6.1, fz: 5.4, gw: 4.5, cm: 5.45 },
    { type: "MTBF??????", zxb: -5.2, qy: 5.24, zd: 1.2, kt: -6.1, fz: 5.4, gw: -4.5, cm: 5.45 },
    { type: "MDBF??????", zxb: 5.2, qy: -5.2, zd: -1.2, kt: 6.1, fz: 5.4, gw: 4.5, cm: 5.45 },
    { type: "MDBF??????", zxb: 5.2, qy: -5.2, zd: 1.2, kt: 6.1, fz: -5.4, gw: 4.5, cm: 5.45 },
  ]
  const healthData = [
    { mile: '1', score: 94, DCU: '??????' },
    { mile: '1', score: 91, DCU: '??????' },
    { mile: '1', score: 91, DCU: '?????????' },
    { mile: '1', score: 95, DCU: '??????' },
    { mile: '1', score: 94, DCU: '??????' },
    { mile: '1', score: 98, DCU: '??????' },
    { mile: '1', score: 98, DCU: '??????' },

    { mile: '5', score: 87, DCU: '??????' },
    { mile: '5', score: 84, DCU: '??????' },
    { mile: '5', score: 86, DCU: '?????????' },
    { mile: '5', score: 85, DCU: '??????' },
    { mile: '5', score: 88, DCU: '??????' },
    { mile: '5', score: 85, DCU: '??????' },
    { mile: '5', score: 85, DCU: '??????' },

    { mile: '10', score: 78, DCU: '??????' },
    { mile: '10', score: 74, DCU: '??????' },
    { mile: '10', score: 78, DCU: '?????????' },
    { mile: '10', score: 75, DCU: '??????' },
    { mile: '10', score: 78, DCU: '??????' },
    { mile: '10', score: 73, DCU: '??????' },
    { mile: '10', score: 73, DCU: '??????' },

    { mile: '15', score: 64, DCU: '??????' },
    { mile: '15', score: 69, DCU: '??????' },
    { mile: '15', score: 68, DCU: '?????????' },
    { mile: '15', score: 65, DCU: '??????' },
    { mile: '15', score: 68, DCU: '??????' },
    { mile: '15', score: 62, DCU: '??????' },
    { mile: '15', score: 62, DCU: '??????' },

    { mile: '20', score: 61, DCU: '??????' },
    { mile: '20', score: 60, DCU: '??????' },
    { mile: '20', score: 65, DCU: '?????????' },
    { mile: '20', score: 63, DCU: '??????' },
    { mile: '20', score: 68, DCU: '??????' },
    { mile: '20', score: 64, DCU: '??????' },
    { mile: '20', score: 64, DCU: '??????' },

    { mile: '25', score: 78, DCU: '??????' },
    { mile: '25', score: 74, DCU: '??????' },
    { mile: '25', score: 78, DCU: '?????????' },
    { mile: '25', score: 75, DCU: '??????' },
    { mile: '25', score: 78, DCU: '??????' },
    { mile: '25', score: 73, DCU: '??????' },
    { mile: '25', score: 73, DCU: '??????' },

    { mile: '31', score: 64, DCU: '??????' },
    { mile: '31', score: 69, DCU: '??????' },
    { mile: '31', score: 68, DCU: '?????????' },
    { mile: '31', score: 65, DCU: '??????' },
    { mile: '31', score: 68, DCU: '??????' },
    { mile: '31', score: 62, DCU: '??????' },
    { mile: '31', score: 62, DCU: '??????' },
  ];

  return (
    <div>
      <div>
        <Row gutter={16}>
          <Col xl={18} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: -8, marginTop: -8 }}>
            <LineCodeAndTrainCodeQuery defaultTrainCode={trainCode} onSubmit={clickQuery} />
          </Col>
          <Col xl={6} lg={24} md={24} sm={24} xs={24}>
            <span style={{ float: 'right' }}>
              <DatePicker onChange={onChange} picker="month"
                defaultValue={moment(new Date().setDate(new Date().getDate() - 30))} />
            </span>
          </Col>
        </Row>
        <Row gutter={24} justify="center">
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              title="??????MTBF/MDBF"
              style={{ marginBottom: 16 }}
              bordered={false}
            >
              <Row justify="center">
                <Col xl={6} lg={24} sm={24} xs={24}>
                  <Statistic
                    title="MTBF??????"
                    value={wholeData.mtbfYtoy}
                    valueStyle={{ color: wholeData.mtbfYtoy > 0 ? 'gold' : '#52c41a' }}
                    prefix={wholeData.mtbfYtoy > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                    precision={2}
                    suffix="%"
                    style={{ textAlign: 'center' }}
                  />
                </Col>
                <Col xl={6} lg={24} sm={24} xs={24}>
                  <Statistic
                    title="MTBF??????"
                    value={wholeData.mtbfMtom}
                    valueStyle={{ color: wholeData.mtbfMtom > 0 ? 'gold' : '#52c41a' }}
                    prefix={wholeData.mtbfMtom > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                    precision={2}
                    suffix="%"
                    style={{ textAlign: 'center' }}
                  />
                </Col>
                <Col xl={6} lg={24} sm={24} xs={24}>
                  <Statistic
                    title="MDBF??????"
                    value={wholeData.mdbfYtoy}
                    valueStyle={{ color: wholeData.mdbfYtoy > 0 ? 'gold' : '#52c41a' }}
                    prefix={wholeData.mdbfYtoy > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                    precision={2}
                    suffix="%"
                    style={{ textAlign: 'center' }}
                  />
                </Col>
                <Col xl={6} lg={24} sm={24} xs={24}>
                  <Statistic
                    title="MDBF??????"
                    value={wholeData.mdbfMtom}
                    valueStyle={{ color: wholeData.mdbfMtom > 0 ? 'gold' : '#52c41a' }}
                    prefix={wholeData.mdbfMtom > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                    precision={2}
                    suffix="%"
                    style={{ textAlign: 'center' }}
                  />
                </Col>
              </Row>
              <TrainChart height={220} data={wholeMTBF} />
            </Card>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              title="?????????MDBF/MTBF????????????" // (???????????????????????????)
              style={{ marginBottom: 16, marginLeft: -8, height: 388 }}
              bordered={false}
            >
              <Table columns={columns} dataSource={tableData} pagination={false}
              />
              {/* <TrainChart height={160} data={wholeMTBF} /> */}
            </Card>
          </Col>
        </Row>


        <Row gutter={24}>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              title="?????????MTBF"
              style={{ marginBottom: 16 }}
              bordered={false}
            >
              <Row >
                <Col xl={24} lg={24} sm={24} xs={24}>
                  <HealthMap borderWidth={2} height={180} data={healthData} />
                </Col>
              </Row>
              {/* <Table columns={columns} dataSource={tableData} pagination={false}
              /> */}
            </Card>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              title="?????????MDBF"
              style={{ marginBottom: 16, marginLeft: -8 }}
              bordered={false}
            >
              <Row >
                <Col xl={24} lg={24} sm={24} xs={24}>
                  <HealthMapOne borderWidth={2} height={180} data={healthData} />
                </Col>
              </Row>
              {/* <Table columns={columns} dataSource={tableData} pagination={false}
              /> */}
            </Card>
          </Col>
        </Row>
      </div >
    </div >
  );
};

export default connect(
  ({
    wholeAndReliability,
    loading,
  }: {
    wholeAndReliability: StateType;
    loading: {
      effects: { [key: string]: boolean };
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    wholeAndReliability,
    loading: loading.effects['wholeAndReliability/fetchWholeMTBF'],
    // loading: loading.models.wholeAndReliability,
  }),
)(Reliability);
