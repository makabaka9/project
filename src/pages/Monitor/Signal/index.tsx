import { Card, List, Badge, Row, Col, Typography, Table, Descriptions, Tag } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { connect, Dispatch, Link } from 'umi';
import numeral from 'numeral';
import { StateType } from './model';
import { routerRedux } from 'dva/router';
import { Divider } from 'rc-menu';
import CarIcon from '@/assets/Car.svg';
import { BasicProfileDataType } from './data';
import styles from './style.less';
import { WifiOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface TrainsProps {
  dispatch: Dispatch;
  MonitorAndSignal: StateType;
  loading: boolean;
}

export const State: FC<TrainsProps> = (props) => {
  const {
    dispatch,
    // loading,
    // MonitorAndSignal: { list },
  } = props;

  // const [selectId, setSelectId] = useState("501");
  useEffect(() => {
    dispatch({
      type: 'MonitorAndSignal/fetch',
      payload: {},
    });
  }, []);

  const filterList = [
    { trainCode: '501', operatingState: 0, td1: 1, td2: 1, db1: 8, db2: 1.2 },
    { trainCode: '502', operatingState: 0, td1: 0, td2: 0, db1: 1.0, db2: 1.2 },
    { trainCode: '503', operatingState: 0, td1: 0, td2: 0, db1: 1.0, db2: 1.2 },
    { trainCode: '504', operatingState: 0, td1: 0, td2: 1, db1: 1.0, db2: 1.1 },
    { trainCode: '505', operatingState: 0, td1: 0, td2: 0, db1: 1.0, db2: 1.2 },
    { trainCode: '506', operatingState: 1, td1: 1, td2: 0, db1: 1.0, db2: 1.1 },
    { trainCode: '507', operatingState: 0, td1: 0, td2: 0, db1: 1.0, db2: 1.0 },
    { trainCode: '508', operatingState: 0, td1: 0, td2: 0, db1: 1.1, db2: 1.0 },
    { trainCode: '509', operatingState: 0, td1: 0, td2: 0, db1: 1.2, db2: 1.2, },
    { trainCode: '510', operatingState: 0, td1: 0, td2: 0, db1: 1.2, db2: 1.2, },
    { trainCode: '511', operatingState: 0, td1: 0, td2: 0, db1: 1.3, db2: 1.2, },
    { trainCode: '512', operatingState: 1, td1: 0, td2: 0, db1: 1.1, db2: 0.95, },
    { trainCode: '513', operatingState: 0, td1: 0, td2: 0, db1: 1.1, db2: 0.95, },
    { trainCode: '514', operatingState: 0, td1: 0, td2: 0, db1: 1.1, db2: 0.95, },
    { trainCode: '515', operatingState: 0, td1: 0, td2: 0, db1: 1.2, db2: 0.95, },
    { trainCode: '516', operatingState: 0, td1: 1, td2: 0, db1: 1.2, db2: 1.85, },
    { trainCode: '517', operatingState: 0, td1: 0, td2: 0, db1: 1.2, db2: 1.85, },
    { trainCode: '518', operatingState: 1, td1: 0, td2: 0, db1: 1.2, db2: 1.85, },
    { trainCode: '519', operatingState: 0, td1: 0, td2: 0, db1: 1.2, db2: 1.1 },
    { trainCode: '520', operatingState: 0, td1: 0, td2: 0, db1: 1.2, db2: 1.85, },
    { trainCode: '521', operatingState: 0, td1: 1, td2: 0, db1: 1.2, db2: 1.2 },
    { trainCode: '522', operatingState: 0, td1: 0, td2: 0, db1: 1.2, db2: 1.85, },
    { trainCode: '523', operatingState: 0, td1: 0, td2: 0, db1: 1.2, db2: 1.1, },
    { trainCode: '524', operatingState: 1, td1: 0, td2: 0, db1: 1.2, db2: 1.1, },
  ];
  const faultNum = [];
  for (let i = 1; i < 24; i++) {
    faultNum.push(
      { trainCode: `50${i}`, value: 12 },
      // <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
    );
  }

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
    <div className={styles.filterCardList} >
      <List<BasicProfileDataType>
        rowKey="id"
        grid={{
          gutter: 16,
          column: 5,
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
            <Card hoverable
              bordered={false}
              id={item.trainCode}
              style={{
                padding: 0
                // minHeight: "15vh",
                // display: "flex"
              }}
              bodyStyle={{ backgroundColor: "rgb(47,84,235,0.2)", padding: 0 }}>
              <Divider />
              <div style={{ padding: 8 }}>
                <Tag color="red">  
                  <Typography.Text style={{ fontSize: 16 }} strong><img alt="logo" src={CarIcon} height={20} />
                    &nbsp;{numeral(item.trainCode).format('0000')}</Typography.Text>
                </Tag>
              </div>
              {/* <span >车载网络质量&emsp;100%</span> */}
              <Descriptions
                bordered={false}
                size="small"
                column={2}
                style={{paddingLeft: 10}}
              >
                <Descriptions.Item label="通道1通信" >
                  <WifiOutlined style={{ color: item.td1 === 1 ? "red" : "#52c41a" }} />
                </Descriptions.Item>
                <Descriptions.Item label="丢包率" >
                  {item.db1}%
                </Descriptions.Item>
                <Descriptions.Item label="通道2通信" >
                  <WifiOutlined style={{ color: item.td2 === 1 ? "red" : "#52c41a" }} />
                </Descriptions.Item>
                <Descriptions.Item label="丢包率" >
                  {item.db2}%
                </Descriptions.Item>
                <Descriptions.Item label="车载网络质量" >
                  100%
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default connect(
  ({
    MonitorAndSignal,
    loading,
  }: {
    MonitorAndSignal: StateType;
    loading: { models: { [key: string]: boolean } };
  }) => ({
    MonitorAndSignal,
    loading: loading.models.MonitorAndSignal,
  }),
)(State);
