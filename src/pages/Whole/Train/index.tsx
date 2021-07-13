import { Card, Row, Col, Empty, List } from 'antd';
import React, { Component, useEffect, useState } from 'react';
import { connect, Dispatch, Link } from 'umi';
// import {
//   BasicProfileDataType,
//   BasicInfoDataType,
//   ReliabilityDataType,
//   ComfortDataType,
//   StabilityDataType,
// } from './data.d';
import BasicInfo from './components/BasicInfo';
// import LineCodeAndTrainCodeQuery from '../components/LineCodeAndTrainCodeQuery';
import Button from 'antd/es/button';
import styles from './style.less';
import LineCodeAndTrainCodeQuery from '@/components/LineCodeAndTrainCodeQuery';
import Reliability from './components/Reliability';
import Comfort from './components/Comfort';
import Stability from './components/Stability';
import { StateType } from './model';

interface TrainProps {
  loading: boolean;
  dispatch: Dispatch;
  wholeAndTrain: StateType;
}

const Train: React.FC<TrainProps> = (props) => {
  const { wholeAndTrain, loading, dispatch } = props;
  const { basicInfo, reliability, comfort, stability } = wholeAndTrain;
  const [trainCode, setTrainCode] = useState('501');

  const clickQuery = (event: { trainCode: string }) => {
    setTrainCode(event.trainCode);
  };

  // const trainCode = '501';
  useEffect(() => {
    dispatch({
      type: 'wholeAndTrain/fetchBasicInfo',
      payload: trainCode,
    });
  }, []);
  useEffect(() => {
    dispatch({
      type: 'wholeAndTrain/fetchReliability',
      payload: trainCode,
    });
  }, []);
  useEffect(() => {
    dispatch({
      type: 'wholeAndTrain/fetchComfort',
      payload: trainCode,
    });
  }, []);
  useEffect(() => {
    dispatch({
      type: 'wholeAndTrain/fetchStability',
      payload: trainCode,
    });
  }, []);

  const subsystemData = [
    { title: '走行部', route: '/Subsystem/Running' },
    { title: '牵引', route: '/Subsystem/Traction' },
    { title: '制动', route: '/Subsystem/Brake' },
    { title: '空调', route: '/Subsystem/AirConditioner' },
    { title: '辅助', route: '/Subsystem/Assistance' },
    { title: '弓网', route: '/Subsystem/Pantograph' },
    { title: '车门', route: '/Subsystem/Door' },
  ];

  const reliabilityData: any[] = [];
  const fakeY = ['牵引', '走行部', '车门', '弓网', '制动', '空调', '辅助'];
  const fakeX = [27000, 26100, 26000, 25000, 24000, 23500, 23000];
  for (let i = 0; i < fakeX.length; i += 1) {
    reliabilityData.push({
      x: fakeX[i],
      y: fakeY[i],
    });
  }

  return (
    <div>
      <Card bordered={false} >
        <LineCodeAndTrainCodeQuery defaultTrainCode={trainCode} onSubmit={clickQuery} />
      </Card>
      <Card title="基础部件" bordered={false} style={{ marginBottom: 16, marginTop: 16 }}>
        <Row gutter={16}>
          <Col xl={4} lg={12} sm={24} xs={24}>
            <div className={styles.div}>
              <img src="/static/logo.6568021c.png" alt="logo" className={styles.img} />
            </div>
          </Col>
          <Col xl={16} lg={12} sm={24} xs={24}>
            <div className={styles.div1}>
              <BasicInfo data={basicInfo} />
            </div>
          </Col>
        </Row>
      </Card>
      <Card title="核心部件" bordered={false} style={{ marginBottom: 16 }}>
        <List
          className={styles.list}
          grid={{ gutter: 17, column: 7 }}
          dataSource={subsystemData}
          style={{ textAlign: ' center' }}
          // loading={loading}
          renderItem={(item) => (
            <List.Item>
              <Link to={item.route}>
                <Button
                  className={styles.button}
                  type="primary"
                  ghost
                  size="large"
                  style={{ height: 50, width: 120, marginTop: 12 }}
                >
                  {item.title}
                </Button>
              </Link>
            </List.Item>
          )}
        />
      </Card>
      <Row gutter={24}>
        <Col
          xl={8}
          lg={12}
          sm={24}
          xs={24}
          style={{
            marginBottom: 24,
            marginRight: -10,
          }}
        >
          <Card title="可靠性分析" bordered={false} className={styles.title}>
            <Reliability borderWidth={2} height={200} data={reliability} />
          </Card>
        </Col>
        <Col
          xl={9}
          lg={12}
          sm={24}
          xs={24}
          style={{
            marginBottom: 24,
          }}
        >
          <Card title="乘坐舒适性" bordered={false} className={styles.title}>
            <Comfort borderWidth={2} height={200} data={comfort} />
          </Card>
        </Col>
        <Col
          xl={7}
          lg={12}
          sm={24}
          xs={24}
          style={{
            marginBottom: 24,
          }}
        >
          <Card
            title="运行稳定性"
            bordered={false}
            className={styles.title}
            style={{ marginBottom: 24, marginLeft: -10 }}
          >
            <Stability borderWidth={2} height={200} data={stability} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
// }

export default connect(
  ({
    wholeAndTrain,
    loading,
  }: {
    wholeAndTrain: StateType;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    wholeAndTrain,
    // loading: loading.effects['wholeAndTrain/fetchBasic'],
    loading: loading.effects['wholeAndTrain/fetchBasicInfo'],
  }),
)(Train);
