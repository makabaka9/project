import { Avatar, Badge, Card, Col, Descriptions, Progress, Row, Statistic, Tag, Typography } from 'antd';
// import moment from 'moment';
import { connect, Dispatch } from 'umi';
import React, { FC, useEffect, useState } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { MiniBar, Radar } from './components/Charts';
import MiniLineChart from './components/Charts/MiniLineChart';
import ReliableChart from './components/Charts/ReliableChart';
import title from './components/title.png';
import Bg from './components/bg.png';
import TrainTable from './components/TrainTable';
import SubSystemError from './components/EachTrain';
import moment from 'moment';
import SubwayIcon from '@/assets/地铁.svg';
import MileIcon from '@/assets/里程.svg';
import { random, reduce } from 'lodash';
import { StateType } from './model';
import FaultMap from './components/FaultMap';
import styles from './style.less'
import { ExclamationCircleFilled, ExclamationCircleOutlined, FontSizeOutlined, LineOutlined, WarningFilled } from '@ant-design/icons';
import { stateInformation } from './service';



// const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK

interface GlobalProps {
  dispatch: Dispatch;
  monitorAndGlobal2: StateType;
  loading: boolean;
  dataList?: Array<Object>;
  sysList?: Array<Object>;
  targetList?: Array<Object>;
  faultList?: Array<Object>;
  subFaultList?: Array<Object>;
  faultRate?: Array<Object>;
  stateList?: Array<Object>;
}

export const Global: FC<GlobalProps> = (props) => {
  const { dispatch, monitorAndGlobal2 } = props;
  const { sysList, faultList, subFaultList, currentDir, faultRate, reliability } = monitorAndGlobal2;

  const [count, setCount] = useState(7894.14);
  const [list, setList] = useState<Array<object>>([]); // 选择全部
  // const [stateList, setStateList] = useState<Array<object>>([])
  // const [event, setEvent] = useState<any>()
  // const [trainWorkingCondition, setTrainWorkingCondition] = useState(-1);
  // useInterval(() => {
  //   setCount(count + random(0, 10))
  // }, 3000);



  useEffect(() => {
    dispatch({
      type: 'monitorAndGlobal2 /fetch',
    });
    dispatch({
      type: 'monitorAndGlobal2 /fetchSysList',
    });
    dispatch({
      type: 'monitorAndGlobal2 /fetchFaultRate',
    });
    dispatch({
      type: 'monitorAndGlobal2 /fetchFaultstatistics',
      // payload: {},
    });
    dispatch({
      type: 'monitorAndGlobal2 /fetchFaultSubsystem',
      // payload: {},
    });
    dispatch({
      type: 'monitorAndGlobal2 /fetchFaultSubsystem',
      // payload: {},
    });
    dispatch({
      type: 'monitorAndGlobal2 /fetchReliability',
      // payload: {},
    });
    // dispatch({
    //   type: 'monitorAndGlobal2 /fetchState',
    //   payload: {
    //     trainWorkingCondition: 2
    //   },
    // });

    // const evtSource = localStorage.getItem('access_token') ?
    //   new EventSource("/api/monitor/fault/event") : null;
    // if (evtSource !== null) {
    //   evtSource.onmessage = (message) => {
    //     dispatch({
    //       type: 'monitorAndGlobal2 /fetch',
    //     });
    //   }
    // }
    //
    // const params = { trainWorkingCondition: 2 }
    // const response = stateInformation(params);
    // response.then((data) => {
    //   setStateList(data)
    // });
    // const StateEvtSource = localStorage.getItem('access_token') ?
    //   new EventSource("/api/monitor/state/event?trainWorkingCondition=2") : null;
    // if (StateEvtSource !== null) {
    //   StateEvtSource.onmessage = (message) => {
    //     const addData = addNewElement(stateList, JSON.parse(message.data));
    //     setStateList(addData)
    //     // dispatch({
    //     //   type: 'monitorAndGlobal2 /fetchState',
    //     //   payload: {
    //     //     trainWorkingCondition: 2
    //     //   },
    //     // });
    //   }
    // }
  }, []);

  // useEffect(() => {
  //   dispatch({
  //     type: 'monitorAndGlobal2 /fetchCurrentDir',
  //     payload: {},
  //   });
  // }, []);





  //全网正线故障率数据
  const faultRateData = [
    { monthNum: 0, rate: 0 },
    { monthNum: 1, rate: 0 },
    { monthNum: 2, rate: 0 },
    { monthNum: 3, rate: 0 },
    { monthNum: 4, rate: 0 },
    { monthNum: 5, rate: 0 },
    { monthNum: 6, rate: 40 },
    { monthNum: 7, rate: 0 },
    { monthNum: 8, rate: 0 },
    { monthNum: 9, rate: 0 },
    { monthNum: 10, rate: 0 },
    { monthNum: 11, rate: 0 },
    { monthNum: 12, rate: 0 }
  ];
  const reliableData = [
    { monthNum: 0, rate: 0 },
    { monthNum: 1, rate: 0 },
    { monthNum: 2, rate: 0 },
    { monthNum: 3, rate: 0 },
    { monthNum: 4, rate: 0 },
    { monthNum: 5, rate: 0 },
    { monthNum: 6, rate: 97.99 },
    { monthNum: 7, rate: 0 },
    { monthNum: 8, rate: 0 },
    { monthNum: 9, rate: 0 },
    { monthNum: 10, rate: 0 },
    { monthNum: 11, rate: 0 },
    { monthNum: 12, rate: 0 }
  ];
  const nowDate = moment(new Date()).format('YYYY-MM-DD HH:MM:SS')
  // 故障监控数据


  return (
    <GridContent>
      <React.Fragment>
        <div style={{ position: "relative", marginTop: -20, marginLeft: -4, }}>
          <div
            style={{

              textAlign: "center",
              position: "absolute",
              width: "100%",
              // height: 68,
              backgroundSize: '100% ',
              backgroundRepeat: 'no-repeat',
              // opacity: 0.5,
              backgroundImage: `url(${title})`,
            }}
          >
            <h1
              className={styles.titleName}
              style={{
                fontWeight: "bold",
              }}>
              南宁地铁5号线智能运维系统</h1>
          </div>
          <div
            style={{
              textAlign: "center",
              backgroundSize: '100% 100%', // 记得这里100%
              backgroundImage: `url(${Bg})`
            }} >
            <Row align="middle" justify="center"
            >
              <Col xl={18} lg={24} md={24} sm={24} xs={24}>
                <div
                  className={styles.card}
                  style={{
                    textAlign: "center",
                    marginTop: 50
                  }}
                >

                  {/* <div style={{ position: "absolute", left: 60, top: 20 }} className={styles.text}>
                  <Typography.Text strong style={{ fontSize: 32,color:"rgb(255,255,255,0.7" }}>
                    地铁5号线车辆实时运行示意图
                        </Typography.Text>
                </div> */}
                  <div style={{ textAlign: "center", position: "relative" }}>
                    <FaultMap />
                  </div>
                  <div style={{ position: "absolute", left: 30, top: 50, width: 500 }} className={styles.text}>
                    <Typography.Text strong style={{ fontSize: 32, color: "rgb(255,255,255,0.7" }}>
                      {/* 地铁5号线车辆实时运行示意图 */}
                    </Typography.Text>
                    <Row>
                      {/* <Col xl={10} lg={24} md={24} sm={24} xs={24}>
                      <Card bordered={false} className={styles.card}
                        style={{
                          backgroundColor: "rgba(55,121,253,0)",
                          // background: "rgba(36, 38, 45, 0.8)",
                          paddingLeft: 0, paddingRight: 0,
                        }}>
                        <Card.Meta
                          // avatar={<Avatar size={30} src={SubwayIcon} />}
                          description={<div><Typography.Text strong style={{ fontSize: 24, color: "#1890ff" }}>

                            {currentDir?.totalTrain === undefined ? "2021.12" : currentDir?.totalTrain}

                          </Typography.Text>
                            <Typography.Text strong style={{ fontSize: 8 }}> </Typography.Text></div>}
                          title={<div><Typography.Text strong style={{ fontSize: 16 }}>开通时间
                      </Typography.Text></div>}
                        />
                      </Card>
                    </Col> */}
                      <Col xl={10} lg={24} md={24} sm={24} xs={24} >
                        <Card bordered={false} className={styles.card}
                          style={{
                            backgroundColor: "rgba(255,165,35,0)",
                            paddingLeft: 0, paddingRight: 0,
                          }}>
                          <Card.Meta
                            // avatar={<Avatar size={30} src={SubwayIcon} />}
                            description={<div><Typography.Text strong style={{ fontSize: 24, color: "#1890ff" }}>
                              {/* {currentDir?.onLineTrain === undefined ? 15 : currentDir?.onLineTrain} */}
                              {/* / */}
                              {currentDir?.totalTrain === undefined ? 17 : currentDir?.totalTrain}

                            </Typography.Text>
                              <Typography.Text strong style={{ fontSize: 8 }}> </Typography.Text></div>}
                            title={<div><Typography.Text strong style={{ fontSize: 16 }}>站点数量
                      </Typography.Text></div>}
                          />
                        </Card>

                      </Col>
                      <Col xl={10} lg={24} md={24} sm={24} xs={24}>
                        {/* <Card bordered={false} className={styles.card}
                        style={{
                          backgroundColor: "rgba(55,121,253,0)",
                          paddingLeft: 0, paddingRight: 0,
                        }}>
                        <Card.Meta
                          // avatar={<Avatar size={30} src={MileIcon} />}
                          description={<div> <Typography.Text strong style={{ fontSize: 24, color: "#1890ff" }}>
                            接触网
                        <Typography.Text strong style={{ fontSize: 8 }}></Typography.Text>
                          </Typography.Text></div>}
                          title={<div><Typography.Text strong style={{ fontSize: 16 }}>供电方式 </Typography.Text></div>}
                        />

                      </Card> */}
                        <Card bordered={false}
                          className={styles.card}
                          style={{
                            backgroundColor: "rgba(255,165,35,0)",
                            paddingLeft: 0, paddingRight: 0,
                          }}>
                          <Card.Meta
                            // avatar={<Avatar size={30} src={MileIcon} />}
                            description={<div> <Typography.Text strong style={{ fontSize: 24, color: "#1890ff" }}>
                              20.2
                        <Typography.Text strong style={{ fontSize: 8 }}>km </Typography.Text>
                            </Typography.Text></div>}
                            title={<div><Typography.Text strong style={{ fontSize: 16 }}>线路总长 </Typography.Text></div>}
                          />

                        </Card>
                      </Col>
                    </Row>
                  </div>
                  <div style={{ position: "absolute", left: 1100, top: 800 }}>
                    <span><ExclamationCircleFilled style={{ color: "#ff4d4f" }} />&emsp;一级故障</span>
                    <br />
                    <span> <ExclamationCircleFilled style={{ color: "#faad14" }} />&emsp;二级故障</span>
                    <br />
                    <span><ExclamationCircleFilled style={{ color: "#fff566" }} />&emsp;三级故障</span>
                    <br />
                    <span><WarningFilled style={{ color: "#ff4d4f" }} />&emsp;一级预警</span>
                    <br />
                    <span> <WarningFilled style={{ color: "#faad14" }} />&emsp;二级预警</span>
                    <br />
                    <span><WarningFilled style={{ color: "#fff566" }} />&emsp;三级预警</span>
                    <br />
                  </div>
                </div>
              </Col>
              <Col xl={6} lg={24} md={24} sm={24} xs={24} style={{ marginTop: 50, }}>
                <Row justify="center">

                  <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                    <Card bordered={false} className={styles.card}
                      style={{
                        // backgroundColor: "rgba(255,165,35,0.8)",
                        paddingLeft: 0, paddingRight: 0, paddingBottom: 12,

                      }}
                      bodyStyle={{ textAlign: "center" }}>
                      <Card.Meta
                        // avatar={<Avatar size={30} src={MileIcon} />}
                        // description={<div> <Typography.Text strong style={{ fontSize: 46, color: "#3779fd" }}>
                        //   11
                        //   <Typography.Text strong style={{ fontSize: 8 }}>列 </Typography.Text>
                        // </Typography.Text></div>}
                        title={<div><Typography.Text strong style={{ fontSize: 16 }}>在线 </Typography.Text></div>}
                      />
                      <div style={{ marginTop: 24 }}>
                        <Progress
                          width={80}
                          type="circle"
                          strokeColor={{
                            '0%': '#108ee9',
                            '100%': '#87d068',
                          }}
                          percent={100}
                          format={() => '3列'}
                        />
                      </div>

                    </Card>
                  </Col>
                  <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                    <Card bordered={false} className={styles.card}
                      style={{
                        //  backgroundColor: "rgba(55,121,253,0.8)",
                        paddingLeft: 0, paddingRight: 0, paddingBottom: 12,

                      }}
                      bodyStyle={{ textAlign: "center" }}>
                      <Card.Meta
                        // avatar={<Avatar size={30} src={SubwayIcon} />}
                        // description={<div><Typography.Text strong style={{ fontSize: 46 }}>
                        //   {currentDir?.totalTrain === undefined ? 13 : currentDir?.totalTrain}

                        // </Typography.Text>
                        //   <Typography.Text strong style={{ fontSize: 8 }}>列 </Typography.Text></div>}
                        title={<div><Typography.Text strong style={{ fontSize: 16 }}>离线
                      </Typography.Text></div>}
                      />
                      <div style={{ marginTop: 24 }}>
                        <Progress
                          width={80}
                          type="circle"
                          strokeColor={{
                            '0%': '#108ee9',
                            '100%': '#87d068',
                          }}
                          percent={100}
                          format={() => '21列'}
                        />
                      </div>

                    </Card>
                  </Col>
                  <Col xl={12} lg={24} md={24} sm={24} xs={24}>


                    <Card bordered={false} className={styles.card}
                      style={{
                        //  backgroundColor: "rgba(55,121,253,0.8)",
                        paddingLeft: 0, paddingRight: 0, paddingBottom: 12
                      }}>
                      <Card.Meta
                        // avatar={<Avatar size={30} src={SubwayIcon} />}
                        description={<div><Typography.Text strong style={{ fontSize: 46, color: "#ffa523" }}>
                          {/* {currentDir?.onLineTrain === undefined ? 15 : currentDir?.onLineTrain} */}
                          {/* / */}
                          {currentDir?.totalTrain === undefined ? 24 : currentDir?.totalTrain}

                        </Typography.Text>
                          <Typography.Text strong style={{ fontSize: 8 }}>列 </Typography.Text></div>}
                        title={<div><Typography.Text strong style={{ fontSize: 16 }}>总车数
                      </Typography.Text></div>}
                      />
                    </Card>
                  </Col>
                  <Col xl={12} lg={24} md={24} sm={24} xs={24} >
                    <Card bordered={false} className={styles.card}
                      style={{
                        //  backgroundColor: "rgba(255,165,35,0.8)",
                        paddingLeft: 0, paddingRight: 0, paddingBottom: 12
                      }}>
                      <Card.Meta
                        // avatar={<Avatar size={30} src={MileIcon} />}
                        description={<div> <Typography.Text strong style={{ fontSize: 46, color: "#f52e5a" }}>
                          7891
                        <Typography.Text strong style={{ fontSize: 8 }}>km </Typography.Text>
                        </Typography.Text></div>}
                        title={<div><Typography.Text strong style={{ fontSize: 16 }}>里程 </Typography.Text></div>}
                      />

                    </Card>
                  </Col>

                </Row>




                <Card size="small"
                  // className={styles.filterCardList}
                  title={<div className={styles.text}><Typography.Text strong style={{ fontSize: 20, marginBottom: -8 }}>全网车辆正线故障率 </Typography.Text>
                  </div>}
                  extra={<div><Typography.Text strong style={{ fontSize: 12 }}> 统计周期：近12个月 </Typography.Text>
                    <br /> <Typography.Text strong style={{ fontSize: 12 }}> 统计单位：次/万车公里 </Typography.Text>
                  </div>}
                  bordered={false}
                  style={{ marginBottom: 0, marginTop: 0 }}
                  className={styles.card}
                >
                  <MiniLineChart
                    height={240}
                    // data={targetList?.length === 0 ? fualtRateData : targetList}
                    data={faultRateData}
                  />
                </Card>
                <Card
                  size="small"
                  title={<div className={styles.text}><Typography.Text strong style={{ fontSize: 20 }}>全网车辆可靠度指标 </Typography.Text>
                  </div>}
                  extra={<div><Typography.Text strong style={{ fontSize: 12 }}> 统计周期：近12个月 </Typography.Text>
                    <br /> <Typography.Text strong style={{ fontSize: 12 }}> 统计单位：小时 </Typography.Text>
                  </div>}
                  className={styles.card}
                  bordered={false} >
                  <ReliableChart
                    height={252}
                    // data={targetList?.length === 0 ? reliableData : targetList}
                    data={reliableData}
                  />
                </Card>

              </Col>

            </Row>
          </div>

        </div>

      </React.Fragment>
    </GridContent >
  );
  // }
};

export default connect(
  ({
    monitorAndGlobal2,
    loading,
  }: {
    monitorAndGlobal2: StateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    monitorAndGlobal2,
    loading: loading.models.monitorAndGlobal2,
  }),
)(Global);
