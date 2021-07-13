import { Card, List, Badge, Row, Col, Typography, Table, Divider, Descriptions, Tag } from 'antd';
import React, { FC, useEffect } from 'react';
import { connect, Dispatch } from 'umi';
import numeral from 'numeral';
import { StateType } from './model';
import { routerRedux } from 'dva/router';
// import { Divider } from 'rc-menu';
import CarIcon from '@/assets/Car.svg';
import styles from './style.less';
import CurrentFault from '@/pages/Fault/Current';
import { BasicProfileDataType, FaultDataType } from './data';
import Global from './components/Global';

// const { Title } = Typography;

interface TrainsProps {
  dispatch: Dispatch;
  monitorAndFault: StateType;
  loading: boolean;
  list: BasicProfileDataType[];
}

export const State: FC<TrainsProps> = (props) => {
  const {
    dispatch,
    // loading,
    monitorAndFault: { list },
  } = props;

  // const [selectId, setSelectId] = useState("501");
  useEffect(() => {
    dispatch({
      type: 'monitorAndFault/fetch',
      payload: {},
    });
  }, []);

  let listData = [
    { trainCode: "501" },
    { trainCode: "502" },
    { trainCode: "503" },
    { trainCode: "504" },
    { trainCode: "505" },
    { trainCode: "506" },
    { trainCode: "507" },
    { trainCode: "508" },
    { trainCode: "509" },
    { trainCode: "510" },
    { trainCode: "511" },
    { trainCode: "512" },
    { trainCode: "513" },
    { trainCode: "514" },
    { trainCode: "515" },
    { trainCode: "516" },
    { trainCode: "517" },
    { trainCode: "518" },
    { trainCode: "519" },
    { trainCode: "520" },
    { trainCode: "521" },
    { trainCode: "522" },
    { trainCode: "523" },
    { trainCode: "524" },
  ]

  listData = listData.map((item: any) => {
    list.map((item1: any) => {
      if (item.trainCode === item1.trainCode) {
        item = item1
      }
    })
    return item
  })

  // console.log("list", list)
  // console.log('listData', listData)
  const columns = [
    {
      key: 'type',
      dataIndex: 'type',
      title: '中文系统',
      align: 'center',
    },
    {
      key: 'zxb',
      dataIndex: 'zxb',
      title: '走行部系统',
      align: 'center',
    },
    {
      key: 'qy',
      dataIndex: 'qy',
      title: '牵引系统',
      align: 'center',
    },
    {
      key: 'zd',
      dataIndex: 'zd',
      title: '制动系统',
      align: 'center',
    },
    {
      key: 'kt',
      dataIndex: 'kt',
      title: '空调系统',
      align: 'center',
    },
    {
      key: 'fz',
      dataIndex: 'fz',
      title: '辅助系统',
      align: 'center',
    },
    {
      key: 'gw',
      dataIndex: 'gw',
      title: '弓网系统',
      align: 'center',
    },
    {
      key: 'cm',
      dataIndex: 'cm',
      title: '车门系统',
      align: 'center',
    },

    {
      key: 'yh',
      dataIndex: 'yh',
      title: '烟火系统',
      align: 'center',
    },
    {
      key: 'ckxx',
      dataIndex: 'ckxx',
      title: '乘客信息系统',
      align: 'center',
    },
    {
      key: 'zdza',
      dataIndex: 'zdza',
      title: '主动式障碍物检测系统',
      align: 'center',
    },
    {
      key: 'wl',
      dataIndex: 'wl',
      title: '网络系统',
      align: 'center',
    },
  ];

  const tableData = [
    { type: "英文", zxb: "TDS", qy: "DCU", zd: "BCU", kt: "HVAC", fz: "SIV", gw: "PDS", cm: "EDCU", yh: "FAS", ckxx: "PIS", zdza: "AODS", wl: "TCMS" },
  ]

  const subsystem = [
    '/Subsystem/AirConditioner',
    '/Subsystem/Traction',
    '/Subsystem/Assistance',
    '/Subsystem/Brake',
    '/Subsystem/Door',
    '/Subsystem/Pyrotechnic',
    '/Subsystem/PIS',
    '/Subsystem/Pantograph',
    '/Subsystem/Running',
  ];

  // 点击跳转子系统
  const onTrain = (trainCode: string, subsystemCode: number, e: any) => {
    // console.log('e', e)
    dispatch(routerRedux.push(`${subsystem[subsystemCode]}/${trainCode}`));
    e.stopPropagation();
  };
  // 点击跳转故障管理的当前故障
  const openFault = (event: any) => {
    // console.log('event', event)
    dispatch(routerRedux.push(`/Fault/Current/${event.currentTarget.id}`));
  };

  // const redColor = { backgroundColor: 'rgb(207,19,34,0.8)' };
  // const greenColor = { backgroundColor: 'rgb(82,196,26,0.8)' };
  const redColor = { backgroundColor: 'rgb(168,7,26,0.8)' };
  const greenColor = { backgroundColor: 'rgb(89, 89, 89, 0.5)' };

  return (
    <div className={styles.filterCardList} style={{ height: 1000 }}>
      <div style={{ width: '100%', height: 680, overflowX: 'hidden', overflowY: 'auto' }} className={styles.system}>
        <List<FaultDataType>
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

          dataSource={listData}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <Card hoverable
                bordered={false}
                id={item.trainCode}
                style={{
                  paddingLeft: 2,
                  paddingRight: 2
                  // minHeight: "15vh",
                  // display: "flex"
                }}
                bodyStyle={{ backgroundColor: "rgb(47,84,235,0.2)", padding: 0 }}
                onClick={openFault}
              >
                {/* <Divider /> */}
                <div style={{ padding: 8 }}>
                  <Tag color="red">
                    <Typography.Text style={{ fontSize: 16 }} strong><img alt="logo" src={CarIcon} height={20} />
                  &nbsp;{numeral(item.trainCode).format('0000')}</Typography.Text>
                    {/* <Title level={4}><img alt="logo" src={CarIcon} height={20} />
                  &nbsp;{numeral(item.trainCode).format('0000')}
                </Title> */}
                  </Tag>
                </div>
                <Descriptions
                  bordered={false}
                  style={{ textAlign: "center" }}
                  className={styles.bordered}
                  size="small"
                  column={3}
                >

                  <Descriptions.Item label="HVAC" >
                    <div onClick={(e) => { onTrain(item.trainCode, 0, e) }}>
                      <Badge
                        count={item.HVAC}
                        showZero
                        style={item.HVAC ? redColor : greenColor}
                      />
                    </div>
                  </Descriptions.Item>
                  <Descriptions.Item label="DCU" >
                    <div onClick={(e) => { onTrain(item.trainCode, 1, e); }}>
                      <Badge
                        count={item.DCU}
                        showZero
                        style={item.DCU ? redColor : greenColor}
                      />
                    </div>
                  </Descriptions.Item>
                  <Descriptions.Item label="PDS" >
                    <div onClick={(e) => { onTrain(item.trainCode, 7, e); }}>
                      <Badge
                        count={item.PDS}
                        showZero
                        style={item.PDS ? redColor : greenColor}
                      />
                    </div>
                  </Descriptions.Item>
                  <Descriptions.Item label="EDCU" >
                    <div onClick={(e) => { onTrain(item.trainCode, 4, e); }}>
                      <Badge
                        count={item.EDCU}
                        showZero
                        style={item.EDCU ? redColor : greenColor}
                      />
                    </div>
                  </Descriptions.Item>
                  <Descriptions.Item label="SIV" >
                    <div onClick={(e) => { onTrain(item.trainCode, 2, e); }}>
                      <Badge
                        count={item.SIV}
                        showZero
                        style={item.SIV ? redColor : greenColor}
                      />
                    </div>
                  </Descriptions.Item>

                  <Descriptions.Item label="BCU" >
                    <div onClick={(e) => { onTrain(item.trainCode, 3, e); }}>
                      <Badge
                        count={item.BCU}
                        showZero
                        style={item.BCU ? redColor : greenColor}
                      />
                    </div>
                  </Descriptions.Item>
                  <Descriptions.Item label="AODS" >
                    <div
                    // onClick={(e) => { onTrain(item.trainCode, 5, e); }}
                    >
                      <Badge
                        count={item.AODS}
                        showZero
                        style={item.AODS ? redColor : greenColor}
                      />
                    </div>
                  </Descriptions.Item>
                  <Descriptions.Item label="TDS" >
                    <div onClick={(e) => { onTrain(item.trainCode, 8, e); }}>
                      <Badge
                        count={item.TDS}
                        showZero
                        style={item.TDS ? redColor : greenColor}
                      />
                    </div>
                  </Descriptions.Item>
                  <Descriptions.Item label="PIS" >
                    <div onClick={(e) => { onTrain(item.trainCode, 6, e); }}>
                      <Badge
                        count={item.PIS}
                        showZero
                        style={item.PIS ? redColor : greenColor}
                      />
                    </div>
                  </Descriptions.Item>
                  <Descriptions.Item label="TCMS" >
                    <div
                    // onClick={(e) => { onTrain(item.trainCode, 7, e); }}
                    >
                      <Badge
                        count={item.TCMS}
                        showZero
                        style={item.TCMS ? redColor : greenColor}
                      />
                    </div>
                  </Descriptions.Item>
                  <Descriptions.Item label="FAS" >
                    <div onClick={(e) => { onTrain(item.trainCode, 5, e); }}>
                      <Badge
                        count={item.FAS}
                        showZero
                        style={item.FAS ? redColor : greenColor}
                      />
                    </div>
                  </Descriptions.Item>
                  <Descriptions.Item label="" >
                    <div
                    // onClick={(e) => { onTrain(item.trainCode, 8, e); }}
                    >
                      {/* <Badge
                      count={item.yh}
                      showZero
                      style={item.yh ? redColor : greenColor}
                    />  */}
                    </div>
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </List.Item>
          )}
        />
      </div>
      {/* <CurrentFault/> */}
      <Global />
      {/* <Row gutter={18}>
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <Table columns={columns} dataSource={tableData} size="small" pagination={false} style={{ textAlign: "center" }} />
        </Col>
      </Row> */}

    </div>
  );
};

export default connect(
  ({
    monitorAndFault,
    loading,
  }: {
    monitorAndFault: StateType;
    loading: { models: { [key: string]: boolean } };
  }) => ({
    monitorAndFault,
    loading: loading.models.monitorAndFault,
  }),
)(State);
