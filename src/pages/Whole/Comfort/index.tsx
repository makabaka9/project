import { Card, Col, Row, Typography, Avatar } from 'antd';
import { connect, Dispatch } from 'umi';
import React, { useEffect, useState } from 'react';
import { StateType } from './model';
import TrainChart from './components/TrainChart';
import GroupedColumn from './components/TravelspeedChart';
import EvaluationColumn from './components/EvaluationChart';
// import LineCodeAndTrainCodeQuery from './components/LineCodeAndTrainCodeQuery';
import LineCodeAndTrainCodeQuery from '@/components/LineCodeAndTrainCodeQuery';
import { DatePicker } from 'antd';
import SubwayIcon from '@/assets/Car.svg'
import CongestionChart from './components/CongestionChart';
import { EnvironmentDataType, SpeedDataType, LashDataType } from './data';
import moment from 'moment';
import { DashboardOutlined, ThunderboltOutlined, UserOutlined } from '@ant-design/icons';

const { Meta } = Card;
const { Title } = Typography;

interface ComfortProps {
  wholeAndComfort: StateType;
  dispatch: Dispatch;
  loading: boolean;
  environment: EnvironmentDataType;
  speed: SpeedDataType;
  lash: LashDataType;
}

const Comfort: React.FC<ComfortProps> = (props) => {
  const { wholeAndComfort, dispatch } = props;
  const { environment, speed, lash } = wholeAndComfort;
  const [trainCode, setTrainCode] = useState('501');
  const clickQuery = (event: { trainCode: string }) => {
    setTrainCode(event.trainCode);
  };
  // const trainCode = "501";
  const initialParams = {
    trainCode,
    time: new Date(),
  };
  function onChange(value: any) {
    const params = {
      trainCode,
      time: new Date(value),
    };
    dispatch({
      type: 'wholeAndComfort/fetchEnvironment',
      payload: params,
    });
  }

  useEffect(() => {
    dispatch({
      type: 'wholeAndComfort/fetchEnvironment',
      payload: initialParams,
    });
  }, []);
  useEffect(() => {
    dispatch({
      type: 'wholeAndComfort/fetchSpeed',
      payload: initialParams,
    });
  }, []);
  useEffect(() => {
    dispatch({
      type: 'wholeAndComfort/fetchLash',
      payload: initialParams,
    });
  }, []);

  return (
    <div>
      <div>
        <Row gutter={16}>
          <Col xl={19} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: -8, marginTop: -8 }}>
            <LineCodeAndTrainCodeQuery defaultTrainCode={trainCode} onSubmit={clickQuery} />
          </Col>

          {/* <Col xl={3} lg={24} md={24} sm={24} xs={24}>
            <Descriptions
              column={1}
            >
              <Descriptions.Item label='?????????????????????'>
                <Typography.Text style={{ fontSize: 24, color: "orange" }}>{environment.mainPrice}&emsp;???</Typography.Text>
              </Descriptions.Item>
            </Descriptions>
          </Col> */}
          <Col xl={4} lg={24} md={24} sm={24} xs={24}>
            <span style={{ float: 'right' }}>
              <DatePicker onChange={onChange} defaultValue={moment(new Date())}></DatePicker>
            </span>
          </Col>
        </Row>

        <Row gutter={18}>
          <Col xl={6} lg={24} md={24} sm={24} xs={24}>
            <Card bordered={false} style={{ marginBottom: 16 }}
            >
              <Meta
                avatar={<Avatar style={{ color: '#f56a00' }} src={SubwayIcon} />}
                title={<Title level={3} style={{ color: "#f56a00" }}>{environment.mainPrice}&nbsp;???</Title>}
                description={<Title style={{ fontSize: 16 }} >???????????????????????????</Title>}
              />
            </Card>
          </Col>
          <Col xl={6} lg={24} md={24} sm={24} xs={24}>
            <Card bordered={false} style={{ marginBottom: 16 }}
            >
              <Meta
                avatar={<Avatar style={{ color: 'gold' }} icon={<UserOutlined />} />}
                title={<Title level={3} style={{ color: "gold" }}>{environment.evaluationScore}&nbsp;???</Title>}
                description={<Title style={{ fontSize: 16 }} >?????????????????????????????????</Title>}
              />
            </Card>
          </Col>
          <Col xl={6} lg={24} md={24} sm={24} xs={24}>
            <Card bordered={false} style={{ marginBottom: 16 }}
            >
              <Meta
                avatar={<Avatar style={{ color: '#1890ff' }} icon={<DashboardOutlined />} />}
                title={<Title level={3} style={{ color: "#1890ff" }}>{speed.score}&nbsp;???&emsp;{speed.onTime ? '??????' : '??????'}</Title>}
                description={<Title style={{ fontSize: 16 }} >??????????????????????????????</Title>}
              />
            </Card>
          </Col>
          <Col xl={6} lg={24} md={24} sm={24} xs={24}>
            <Card bordered={false} style={{ marginBottom: 16 }}
            >
              <Meta
                avatar={<Avatar style={{ color: '#87d068' }} icon={<ThunderboltOutlined />} />}
                title={<Title level={3} style={{ color: "#87d068" }}>{lash.score}&nbsp;???</Title>}
                description={<Title style={{ fontSize: 16 }} >????????????</Title>}
              />
            </Card>
          </Col>
        </Row>
        <Card
          title="?????????????????????"
          style={{
            marginBottom: 16,
          }}
          bordered={false}
        >
          <Row gutter={24}>
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <TrainChart height={150} data={environment.temperatureComfort} />
            </Col>
            <Col
              xl={12}
              lg={24}
              md={24}
              sm={24}
              xs={24}
            >
              <CongestionChart height={150} data={environment.crowding} />
            </Col>
            {/* <Col
              xl={4}
              lg={24}
              md={24}
              sm={24}
              xs={24}
              style={{
                marginBottom: 24,
              }}
            > */}
            {/* <Space direction="vertical" style={{ textAlign: 'left' }}>
                <Statistic
                  title="???????????????"
                  value={environment.evaluationScore}
                  precision={2}
                  valueStyle={{ color: '#faad14' }}
                  suffix="???"
                />
                <span>
                  <p>
                    <Avatar
                      style={{ backgroundColor: '#87d068' }}
                      icon={
                        <div>
                          <NotificationOutlined />
                        </div>
                      }
                    />
                    &emsp;?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                  </p>
                </span>
              </Space> */}
            {/* </Col> */}
          </Row>
        </Card>
        <Row gutter={24}>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              title="??????????????????"
              // style={{
              //   height: "40vh",
              // }}
              bordered={false}
            >
              {/* <Row gutter={24}>
                <Col xl={24} lg={24} md={24} sm={24} xs={24}> */}
              {/* <Row>
                <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                  <Statistic
                    title="????????????"
                    value={speed.score}
                    precision={2}
                    valueStyle={{ color: '#faad14' }}
                    suffix="???"
                  />
                </Col>
                <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                  <Statistic
                    title="???????????????"
                    value={speed.onTime ? '??????' : '??????'}
                    valueStyle={{ color: '#faad14' }}
                  />
                </Col>
              </Row> */}
              <GroupedColumn height={100} data={speed.travelAppraise} />
              {/* </Col>
              </Row> */}
            </Card>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              title="????????????"
              // style={{
              //   marginLeft: -8,
              //   height: "40vh",
              // }}
              bordered={false}
            >
              {/* <Row gutter={24}>
                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                  <Statistic
                    title="????????????"
                    value={lash.score}
                    precision={2}
                    valueStyle={{ color: '#faad14' }}
                    suffix="???"
                  />

                </Col>
              </Row> */}
              <EvaluationColumn height={100} data={lash.speed} />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};
// }

export default connect(
  ({
    wholeAndComfort,
    loading,
  }: {
    wholeAndComfort: StateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    wholeAndComfort,
    loading: loading.models.wholeAndComfort,
  }),
)(Comfort);
