import { Card, List, Badge, Tooltip, Button, Row, Col, Typography, Statistic } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { connect, Dispatch, Link } from 'umi';
import numeral from 'numeral';
import { BasicProfileDataType } from './data.d';
import styles from './style.less';
import { StateType } from './model';
import subtrain from '@/assets/train.svg';
import GroupedColumn from './components/GroupedColumn';
import {
  ForkOutlined,
  ColumnWidthOutlined,
  AlignCenterOutlined,
  SplitCellsOutlined,
  RetweetOutlined,
  ArrowRightOutlined,
  StopOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { routerRedux } from 'dva/router';
import FaultMap from './components/FaultMap';
import Pie from './components/Pie';
import { Divider } from 'rc-menu';

const { Meta } = Card;
const { Title } = Typography;

interface TrainsProps {
  dispatch: Dispatch;
  subsystemAndState: StateType;
  loading: boolean;
}

export const State: FC<TrainsProps> = (props) => {
  const {
    dispatch,
    // loading,
    // subsystemAndState: { list },
  } = props;

  // const [selectId, setSelectId] = useState("501");
  useEffect(() => {
    dispatch({
      type: 'subsystemAndState/fetch',
      payload: {},
    });
  }, []);

  const filterList = [
    { trainCode: '501', operatingState: 0, kt: 2, cm: 2, zxb: 8, gw: 4, qy: 9, fz: 10, zd: 8 },
    { trainCode: '502', operatingState: 0, kt: 0, cm: 0, zxb: 8, gw: 4, qy: 9, fz: 10, zd: 8 },
    { trainCode: '503', operatingState: 0, kt: 2, cm: 0, zxb: 0, gw: 0, qy: 0, fz: 0, zd: 0 },
    { trainCode: '501', operatingState: 0, kt: 2, cm: 2, zxb: 8, gw: 4, qy: 9, fz: 10, zd: 8 },
    { trainCode: '502', operatingState: 0, kt: 0, cm: 0, zxb: 8, gw: 4, qy: 9, fz: 10, zd: 8 },
    { trainCode: '503', operatingState: 1, kt: 2, cm: 0, zxb: 0, gw: 0, qy: 0, fz: 0, zd: 0 },
    { trainCode: '501', operatingState: 0, kt: 2, cm: 2, zxb: 8, gw: 4, qy: 9, fz: 10, zd: 8 },
    { trainCode: '502', operatingState: 0, kt: 0, cm: 0, zxb: 8, gw: 4, qy: 9, fz: 10, zd: 8 },
    { trainCode: '503', operatingState: 0, kt: 2, cm: 0, zxb: 0, gw: 0, qy: 0, fz: 0, zd: 0 },
    { trainCode: '501', operatingState: 0, kt: 2, cm: 2, zxb: 8, gw: 4, qy: 9, fz: 10, zd: 8 },
    { trainCode: '502', operatingState: 0, kt: 0, cm: 0, zxb: 8, gw: 4, qy: 9, fz: 10, zd: 8 },
    { trainCode: '503', operatingState: 1, kt: 2, cm: 0, zxb: 0, gw: 0, qy: 0, fz: 0, zd: 0 },
    { trainCode: '501', operatingState: 0, kt: 2, cm: 2, zxb: 8, gw: 4, qy: 9, fz: 10, zd: 8 },
    { trainCode: '502', operatingState: 0, kt: 0, cm: 0, zxb: 8, gw: 4, qy: 9, fz: 10, zd: 8 },
    { trainCode: '503', operatingState: 0, kt: 2, cm: 0, zxb: 0, gw: 0, qy: 0, fz: 0, zd: 0 },
    { trainCode: '501', operatingState: 0, kt: 2, cm: 2, zxb: 8, gw: 4, qy: 9, fz: 10, zd: 8 },
    { trainCode: '502', operatingState: 0, kt: 0, cm: 0, zxb: 8, gw: 4, qy: 9, fz: 10, zd: 8 },
    { trainCode: '503', operatingState: 1, kt: 2, cm: 0, zxb: 0, gw: 0, qy: 0, fz: 0, zd: 0 },
    { trainCode: '501', operatingState: 0, kt: 2, cm: 2, zxb: 8, gw: 4, qy: 9, fz: 10, zd: 8 },
    { trainCode: '502', operatingState: 0, kt: 0, cm: 0, zxb: 8, gw: 4, qy: 9, fz: 10, zd: 8 },
    { trainCode: '503', operatingState: 0, kt: 2, cm: 0, zxb: 0, gw: 0, qy: 0, fz: 0, zd: 0 },
    { trainCode: '501', operatingState: 0, kt: 2, cm: 2, zxb: 8, gw: 4, qy: 9, fz: 10, zd: 8 },
    { trainCode: '502', operatingState: 0, kt: 0, cm: 0, zxb: 8, gw: 4, qy: 9, fz: 10, zd: 8 },
    { trainCode: '503', operatingState: 1, kt: 2, cm: 0, zxb: 0, gw: 0, qy: 0, fz: 0, zd: 0 },
  ];
  const faultNum = [];
  for (let i = 1; i < 24; i++) {
    faultNum.push(
      { trainCode: `50${i}`, value: 12 },
      // <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
    );
  }

  const PieData = [
    {
      type: '空调系统',
      value: 27,
    },
    {
      type: '弓网系统',
      value: 25,
    },
    {
      type: '牵引系统',
      value: 18,
    },
    {
      type: '制动系统',
      value: 15,
    },
    {
      type: '走行部',
      value: 10,
    },
    {
      type: '车门系统',
      value: 5,
    },
    {
      type: '辅助系统',
      value: 16,
    },
  ];

  const subsystem = [
    '/Subsystem/AirConditioner',
    '/Subsystem/Door',
    '/Subsystem/Pantograph',
    '/Subsystem/Traction',
    '/Subsystem/Assistance',
    '/Subsystem/Brake',
    '/Subsystem/Running',
  ];
  const onTrain = (trainCode: string, subsystemCode: number) => {
    dispatch(routerRedux.push(subsystem[subsystemCode] + `/${trainCode}`));
  };
  const redColor = { backgroundColor: 'rgb(207,19,34,0.8)' };
  const greenColor = { backgroundColor: 'rgb(82,196,26,0.8)' };
  const offset = [20, 5];

  return (
    <div className={styles.filterCardList}>
      <List<BasicProfileDataType>
        rowKey="id"
        grid={{
          gutter: 16,
          column: 6,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 4,
          // xxl: 3,
        }}
        dataSource={filterList}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Card hoverable id={item.trainCode}>
              <Row>
                <Col span={6}>
                  <img alt="logo" src={subtrain} height={30} />
                </Col>
                <Col span={14}>
                  {' '}
                  <Title level={4}> {`NNL-${numeral(item.trainCode).format('0000')}`}</Title>
                </Col>
                <Col span={4}>
                  <Title type="danger" level={3}>
                    {' '}
                    24
                  </Title>
                </Col>
              </Row>
              <Divider />
              <Row gutter={16}>
                <Col className="gutter-row" span={8}>
                  <div
                    onClick={() => {
                      onTrain(item.trainCode, 0);
                    }}
                  >
                    <Badge
                      count={item.kt}
                      showZero
                      size="small"
                      style={item.kt ? redColor : greenColor}
                      offset={offset}
                    >
                      空调
                    </Badge>
                  </div>
                </Col>
                <Col className="gutter-row" span={8}>
                  <div
                    onClick={() => {
                      onTrain(item.trainCode, 1);
                    }}
                  >
                    <Badge
                      count={item.cm}
                      showZero
                      size="small"
                      style={item.cm ? redColor : greenColor}
                      offset={offset}
                    >
                      车门
                    </Badge>
                  </div>
                </Col>

                <Col className="gutter-row" span={8}>
                  <div
                    onClick={() => {
                      onTrain(item.trainCode, 2);
                    }}
                  >
                    <Badge
                      count={item.gw}
                      showZero
                      size="small"
                      style={item.gw ? redColor : greenColor}
                      offset={offset}
                    >
                      弓网
                    </Badge>
                  </div>
                </Col>
                {/* </Row>
              <Row gutter={16}> */}
                <Col className="gutter-row" span={8}>
                  <div
                    onClick={() => {
                      onTrain(item.trainCode, 3);
                    }}
                  >
                    <Badge
                      count={item.qy}
                      showZero
                      size="small"
                      style={item.qy ? redColor : greenColor}
                      offset={offset}
                    >
                      牵引
                    </Badge>
                  </div>
                </Col>
                <Col className="gutter-row" span={8}>
                  <div
                    onClick={() => {
                      onTrain(item.trainCode, 4);
                    }}
                  >
                    <Badge
                      count={item.fz}
                      showZero
                      size="small"
                      style={item.fz ? redColor : greenColor}
                      offset={offset}
                    >
                      辅助
                    </Badge>
                  </div>
                </Col>
                <Col className="gutter-row" span={8}>
                  <div
                    onClick={() => {
                      onTrain(item.trainCode, 5);
                    }}
                  >
                    <Badge
                      count={item.zd}
                      showZero
                      size="small"
                      style={item.zd ? redColor : greenColor}
                      offset={offset}
                    >
                      制动
                    </Badge>
                  </div>
                </Col>
                <Col className="gutter-row" span={8}>
                  <div
                    onClick={() => {
                      onTrain(item.trainCode, 6);
                    }}
                  >
                    <Badge
                      count={item.zxb}
                      showZero
                      size="small"
                      style={item.zxb ? redColor : greenColor}
                      offset={offset}
                    >
                      走行部
                    </Badge>
                  </div>
                </Col>
              </Row>
            </Card>
          </List.Item>
        )}
      />
      <Row gutter={18}>
        <Col xl={6} lg={24} md={24} sm={24} xs={24}>
          <Card title="车辆故障统计" bordered={false} className={styles.title}>
            <Pie borderWidth={2} height={80} data={PieData} />
          </Card>
        </Col>
        <Col xl={18} lg={24} md={24} sm={24} xs={24}>
          <Card title="车辆故障统计" bordered={false} className={styles.title}>
            <GroupedColumn borderWidth={2} height={80} data={faultNum} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default connect(
  ({
    subsystemAndState,
    loading,
  }: {
    subsystemAndState: StateType;
    loading: { models: { [key: string]: boolean } };
  }) => ({
    subsystemAndState,
    loading: loading.models.subsystemAndState,
  }),
)(State);
