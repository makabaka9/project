import { Card, Col, Row, Statistic, Empty, Typography, Table } from 'antd';
import { connect, Dispatch } from 'umi';
import React, { Component, useEffect } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { StateType } from './model';
import TrainChart from './components/TrainChart';
// import RangePicker from 'rc-picker/lib/RangePicker';
import { DatePicker } from 'antd';
import FaultTable from './components/FaultTable';
import styles from './style.less';
import HealthPerformance from './components/HealthPerformance';
import SubsystemHealth from './components/SubsystemHealth';
import { EffectDataType, DimensionDataType } from './data';
import LineCodeAndTrainCodeQuery from './components/LineCodeAndTrainCodeQuery';

const { RangePicker } = DatePicker;
interface HealthProps {
  wholeAndHealth: StateType;
  dispatch: Dispatch;
  loading: boolean;
  fault: Array<object>;
  fourdimension: Array<object>;
  effect: EffectDataType;
  dimension: DimensionDataType;
  machine: Array<object>;
  door: Array<object>;
  electric: Array<object>;
  stop: Array<object>;
}

// class Health extends Component<HealthProps> {
const Health: React.FC<HealthProps> = (props) => {
  const { dispatch, wholeAndHealth, loading } = props;
  const { fault, stop, electric, door, machine, dimension, effect, fourdimension } = wholeAndHealth;
  const trainCode = '501';
  useEffect(() => {
    dispatch({
      type: 'wholeAndHealth/fetchFault',
      payload: trainCode,
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: 'wholeAndHealth/fetchFourdimension',
      payload: trainCode,
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: 'wholeAndHealth/fetchEffect',
      payload: trainCode,
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: 'wholeAndHealth/fetchDimension',
      payload: trainCode,
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: 'wholeAndHealth/fetchMachine',
      payload: trainCode,
    });
  }, []);


  useEffect(() => {
    dispatch({
      type: 'wholeAndHealth/fetchDoor',
      payload: trainCode,
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: 'wholeAndHealth/fetchElectric',
      payload: trainCode,
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: 'wholeAndHealth/fetchStop',
      payload: trainCode,
    });
  }, []);

  const columns = [
    {
      title: '??????????????????',
      dataIndex: 'effectNumber',
      key: 'effectNumber',
    },
    {
      title: '????????????/?????? ???????????????',
      dataIndex: 'faultLevel',
      key: 'faultLevel',
    },
    {
      title: '?????? ?????????????????????',
      dataIndex: 'subSystemType',
      key: 'subSystemType',
    },

    {
      title: '????????????',
      dataIndex: 'faultValue',
      key: 'faultValue',
    },
    {
      title: '??????????????????',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '????????????',
      dataIndex: 'effect',
      key: 'effect',
    },
    {
      title: '?????????',
      dataIndex: 'faultRate',
      key: 'faultRate',
    },
  ];

  const column1s = [
    {
      title: '????????????????????????',
      dataIndex: 'drivingSafetyScore',
      key: 'drivingSafetyScore',
      responsive: ['lg'],
    },
    {
      title: '???????????????????????????',
      dataIndex: 'efficiencyScore',
      key: 'efficiencyScore',
    },
    {
      title: '???????????????????????????',
      dataIndex: 'correlationScore',
      key: 'correlationScore',
      responsive: ['lg'],
    },
    {
      title: '?????????????????????',
      dataIndex: 'complexityScore',
      key: 'complexityScore',
      responsive: ['lg'],
    },
  ];

  return (
    <GridContent>
      <React.Fragment>
        <Card style={{ marginBottom: 16 }} bordered={false}>
          <Row gutter={16}>
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <LineCodeAndTrainCodeQuery />
            </Col>
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <span style={{ float: 'right' }}>
                <DatePicker.RangePicker />
              </span>
            </Col>
          </Row>
        </Card>
        <Card
          title="??????????????????"
          style={{
            marginBottom: 16,
          }}
          bordered={false}
        >
          <Row gutter={16}>
            <Col xl={4} lg={12} sm={24} xs={24}>
              <FaultTable data={fault} />
            </Col>
            <Col xl={8} lg={12} sm={24} xs={24}>
              <HealthPerformance height={300} data={fourdimension} />
              {/* <TrainChart /> */}
            </Col>
            <Col xl={12} lg={12} sm={24} xs={24}>
              <Statistic
                title="???????????????"
                value={effect.mainScore}
                precision={2}
                valueStyle={{ color: '#faad14' }}
                suffix="???"
              />
              {/* <span>
                <Typography.Title level={2}> ??????????????????????????????{effect.mainScore + "???"}</Typography.Title>
              </span> */}
              <Table columns={columns} dataSource={[effect]} pagination={false} />
              <Table columns={column1s} dataSource={[dimension]} pagination={false} />
            </Col>
          </Row>
        </Card>
        <Row gutter={16}>
          <Col xl={12} lg={12} sm={24} xs={24}>
            <Card title="??????" bordered={false}>
              <SubsystemHealth
                title="??????"
                borderWidth={2}
                height={100}
                subsystemHealthData={machine.fault}
                subsystemFaultdata={machine.accident}
              />
            </Card>
          </Col>
          <Col xl={12} lg={12} sm={24} xs={24}>
            <Card title="??????" bordered={false}>
              <SubsystemHealth
                borderWidth={2}
                height={100}
                subsystemHealthData={door.fault}
                subsystemFaultdata={door.accident}
              />
              {/* <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> */}
            </Card>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xl={12} lg={12} sm={24} xs={24}>
            <Card title="??????" bordered={false}>
              <SubsystemHealth
                borderWidth={2}
                height={100}
                subsystemHealthData={electric.fault}
                subsystemFaultdata={electric.accident}
              />
            </Card>
          </Col>
          <Col xl={12} lg={12} sm={24} xs={24}>
            <Card title="??????" bordered={false}>
              <SubsystemHealth
                borderWidth={2}
                height={100}
                subsystemHealthData={stop.fault}
                subsystemFaultdata={stop.accident}
              />
              {/* <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> */}
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    </GridContent>
  );
};
// }

export default connect(
  ({
    wholeAndHealth,
    loading,
  }: {
    wholeAndHealth: StateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    wholeAndHealth,
    loading: loading.models.wholeAndHealth,
  }),
)(Health);
