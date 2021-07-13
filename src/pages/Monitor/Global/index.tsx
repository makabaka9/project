import { Avatar, Badge, Card, Col, Descriptions, Row, Statistic, Tag, Typography } from 'antd';
// import moment from 'moment';
import { connect, Dispatch } from 'umi';
import React, { FC, useEffect, useState } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { MiniBar, Radar } from './components/Charts';
import MiniLineChart from './components/Charts/MiniLineChart';
import ReliableChart from './components/Charts/ReliableChart';
import TrainTable from './components/TrainTable';
import SubSystemError from './components/SubSystemError';
import moment from 'moment';
import SubwayIcon from '@/assets/地铁.svg';
import MileIcon from '@/assets/里程.svg';
import Globalbg from './globalbg.png';
import { random } from 'lodash';
import { StateType } from './model';
import FaultMap from './components/FaultMap';
import styles from './style.less'
import { ExclamationCircleOutlined, LineOutlined } from '@ant-design/icons';
import { stateInformation } from './service';


// const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK

interface GlobalProps {
  dispatch: Dispatch;
  monitorAndGlobal: StateType;
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
  const { dispatch, monitorAndGlobal } = props;

  const [count, setCount] = useState(7894.14);
  const [stateList, setStateList] = useState<Array<object>>([])
  // useInterval(() => {
  //   setCount(count + random(0, 10))
  // }, 3000);

  const { dataList, sysList, faultList, subFaultList, currentDir, faultRate, reliability } = monitorAndGlobal;
  const columns: any[] = [
    {
      title: '序号',
      dataIndex: 'index',
      width: '5%',
      align: 'left',
      render: (text, record, index) => <Tag color="#3779fd">{`${index + 1}`}</Tag>,
    },
    {
      title: '车号',
      dataIndex: 'trainCode',
      key: 'trainCode',
      width: '5%',
      align: 'left',
    },
    // {
    //   title: '车节',
    //   dataIndex: 'trainFestival',
    //   key: 'trainFestival',
    //   width: '5%',
    //   align: 'left',
    // },
    {
      title: '系统',
      dataIndex: 'faultType',
      key: 'faultType',
      width: '5%',
      align: 'left',
    },
    // {
    //   title: '当前位置',
    //   dataIndex: 'currentLocation',
    //   key: 'currentLocation',
    //   width: '10%',
    //   align: 'center',
    // },
    {
      title: '故障内容',
      dataIndex: 'faultName',
      key: 'faultName',
      width: '20%',
      align: 'center',
    },
    {
      title: '故障等级',
      dataIndex: 'trainFaultLevel',
      width: '10%',
      align: 'center',
      render: (val?: number) => {
        const tempVal =
          val === 1 ? <Badge color="#f50" text="一级" /> :
            val === 2 ? <Badge color="gold" text="二级" /> :
              val === 3 ? <Badge color="#87d068" text="三级" /> :
                val === 4 ? <Badge color="#108ee9" text="四级" /> : null;
        return <span>{tempVal}</span>;
      },
    },
    {
      title: '故障时间',
      dataIndex: 'happenTime',
      key: 'faultTime',
      width: '15%',
      align: 'center',
    },
    {
      title: '持续时间',
      dataIndex: 'happenTime',
      key: 'duration',
      width: '15%',
      align: 'center',
      render: (val?: String) => {
        return moment(val).fromNow();
      }
    },
    // {
    //   title: '故障描述和解决方案',
    //   dataIndex: 'option',
    //   key: 'option',
    //   width: '14%',
    //   align: 'center',
    //   render: (_, row: any) => (
    //     <>
    //       <a onClick={openModal}>查看详情</a>
    //       <Modal
    //         title="故障描述和解决方案"
    //         visible={modalVisible}
    //         onOk={handleOk}
    //         closable={false}
    //         // cancelText=" "
    //         onCancel={handleOk}
    //       >
    //         <p
    //         // style={{ borderWidth: "1px", borderStyle: "silid", borderColor: "#fff"}}
    //         >报警描述：&nbsp;{row.option.faultDescription}</p>
    //         <p style={{ borderWidth: "1px" }}>解决方案：&nbsp;{row.option.faultSolution}</p>
    //       </Modal>
    //       <Divider type="vertical" />
    //     </>
    //   ),
    // },
  ];

  useEffect(() => {
    dispatch({
      type: 'monitorAndGlobal/fetch',
    });
    dispatch({
      type: 'monitorAndGlobal/fetchSysList',
    });
    dispatch({
      type: 'monitorAndGlobal/fetchFaultRate',
    });
    dispatch({
      type: 'monitorAndGlobal/fetchFaultstatistics',
      // payload: {},
    });
    dispatch({
      type: 'monitorAndGlobal/fetchFaultSubsystem',
      // payload: {},
    });
    dispatch({
      type: 'monitorAndGlobal/fetchFaultSubsystem',
      // payload: {},
    });
    dispatch({
      type: 'monitorAndGlobal/fetchReliability',
      // payload: {},
    });
    // dispatch({
    //   type: 'monitorAndGlobal/fetchState',
    //   payload: {
    //     trainWorkingCondition: 2
    //   },
    // });
    // const evtSource = localStorage.getItem('access_token') ?
    //   new EventSource("/api/monitor/fault/event") : null;
    // if (evtSource !== null) {
    //   evtSource.onmessage = (message) => {
    //     dispatch({
    //       type: 'monitorAndGlobal/fetch',
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
    //     //   type: 'monitorAndGlobal/fetchState',
    //     //   payload: {
    //     //     trainWorkingCondition: 2
    //     //   },
    //     // });
    //   }
    // }
  }, []);

  // 按照车号更新或增加数组
  function addNewElement(arr: Array<object>, newElement: Array<object>) {
    var found = false;
    for (var i = 0; i < arr.length; i++) {
      var element = arr[i];
      if (element.trainCode == newElement.trainCode) {
        found = true;
        // if(newElement.population === 0) {
        //     arr[i] = false;
        // } else {
        arr[i] = newElement;
        // }            
      }
    }
    if (found === false) {
      arr.push(newElement);
    }
    // removing elements
    var newArr = [];
    for (var i = 0; element = arr[i]; i++) {
      if (element !== false) newArr.push(element);
    }
    return newArr;
  }

  // useEffect(() => {
  //   dispatch({
  //     type: 'monitorAndGlobal/fetchCurrentDir',
  //     payload: {},
  //   });
  // }, []);

  //全网正线故障率数据
  const faultRateData = [
    { monthNum: 0, rate: 1.0 },
    { monthNum: 1, rate: 1.0 },
    { monthNum: 2, rate: 1.1 },
    { monthNum: 3, rate: 1.0 },
    { monthNum: 4, rate: 1.12 },
    { monthNum: 5, rate: 1.08 },
    { monthNum: 6, rate: 0.99 },
    { monthNum: 7, rate: 0.98 },
    { monthNum: 8, rate: 1.0 },
    { monthNum: 9, rate: 1.1 },
    { monthNum: 10, rate: 1.0 },
    { monthNum: 11, rate: 1.0 },
    { monthNum: 12, rate: 1.11 }
  ];
  const reliableData = [
    { monthNum: 0, rate: 98.2 },
    { monthNum: 1, rate: 98.0 },
    { monthNum: 2, rate: 97.1 },
    { monthNum: 3, rate: 97.0 },
    { monthNum: 4, rate: 96.12 },
    { monthNum: 5, rate: 95.08 },
    { monthNum: 6, rate: 94.99 },
    { monthNum: 7, rate: 94.98 },
    { monthNum: 8, rate: 95.0 },
    { monthNum: 9, rate: 96.1 },
    { monthNum: 10, rate: 96.0 },
    { monthNum: 11, rate: 97.0 },
    { monthNum: 12, rate: 98.11 }
  ];


  const nowDate = moment(new Date()).format('YYYY-MM-DD HH:MM:SS')
  //故障监控数据
  const faultData = [
    {
      trainCode: '0501',
      system: '制动',
      currentLocation: '华山路-惠河路',
      faultContent: 'TC2车BCU架1	制动不缓解故障',
      faultLevel: 2,
      faultTime: nowDate,
      duration: '3分06秒',
      option: {
        faultDescription: 'EP1902阀无制动力请求但机械制动未缓解',
        faultSolution: '司机或者调度中心应评估故障的本质并采取必要纠正措施。',
      }
    },
    {
      trainCode: '0502',
      system: '牵引',
      currentLocation: '明秀路-北湖南路',
      faultContent: 'MP1车DCU	方向指令错误',
      faultLevel: 3,
      faultTime: nowDate,
      duration: '2分34秒',
      option: {
        faultDescription: '检测到方向指令向前和向后同时有效',
        faultSolution: '故障消失后自动复位检查列车线及司控器。',
      }
    },
    {
      trainCode: '0503',
      system: '制动',
      currentLocation: '明秀路-北湖南路',
      faultContent: 'TC2车BCU架1	制动不缓解故障',
      faultLevel: 4,
      faultTime: nowDate,
      duration: '1分03秒',
      option: {
        faultDescription: 'EP1902阀无制动力请求但机械制动未缓解。',
        faultSolution: '司机或者调度中心应评估故障的本质并采取必要纠正措施。',
      }
    }, {
      trainCode: '0504',
      system: '牵引',
      currentLocation: '那洪-壮锦大道',
      faultContent: 'MP1车DCU	高速断路器卡合',
      faultLevel: 3,
      faultTime: nowDate,
      duration: '3分04秒',
      option: {
        faultDescription: '发出主断合命令一定时间后检测主断状态为断开',
        faultSolution: '可手动复位或DCU检测到故障累积不足2次时自动复位；',
      }
    }, {
      trainCode: '0505',
      system: '电机',
      currentLocation: '明秀路-北湖南路',
      faultContent: '电机温度传感器4故障',
      faultLevel: 2,
      faultTime: nowDate,
      duration: '1分34秒',
      option: {
        faultDescription: '检测到电机4温度大于220℃或小于-50℃',
        faultSolution: '故障消失后自动复位检查相应温度传感器及其接线',
      }
    }, {
      trainCode: '0506',
      system: 'PIS',
      currentLocation: '明秀路-北湖南路',
      faultContent: 'MP1车DCU	高速断路器10分钟内闭合超过3次',
      faultLevel: 2,
      faultTime: nowDate,
      duration: '4分12秒',
      option: {
        faultDescription: '检测到高速断路器10分钟内闭合超过3次',
        faultSolution: '可手动复位或延时后DCU自动复位',
      }
    }, {
      trainCode: '0507',
      system: 'PIS',
      currentLocation: '明秀路-北湖南路',
      faultContent: 'MP1车DCU	制动电阻风机接触器卡分',
      faultLevel: 4,
      faultTime: nowDate,
      duration: '2分51秒',
      option: {
        faultDescription: '检测到制动电阻风机接触器卡在分位',
        faultSolution: '故障消失后自动复位检查制动电阻风机接触器及其辅助触点、接触器控制回路及状态反馈线。',
      }
    },
    {
      trainCode: '0504',
      system: '牵引',
      currentLocation: '那洪-壮锦大道',
      faultContent: 'MP1车DCU	高速断路器卡合',
      faultLevel: 3,
      faultTime: nowDate,
      duration: '2分04秒',
      option: {
        faultDescription: '发出主断合命令一定时间后检测主断状态为断开',
        faultSolution: '可手动复位或DCU检测到故障累积不足2次时自动复位；',
      }
    }, {
      trainCode: '0505',
      system: '电机',
      currentLocation: '明秀路-北湖南路',
      faultContent: '电机温度传感器4故障',
      faultLevel: 2,
      faultTime: nowDate,
      duration: '2分34秒',
      option: {
        faultDescription: '检测到电机4温度大于220℃或小于-50℃',
        faultSolution: '故障消失后自动复位检查相应温度传感器及其接线',
      }
    },
  ]
  const faultMonitoring: any[] = [];
  const i = random(0, 7);
  const j = i + 1;
  faultMonitoring.push(
    {
      trainCode: faultData[i].trainCode,
      system: faultData[i].system,
      currentLocation: faultData[i].currentLocation,
      faultContent: faultData[i].faultContent,
      faultLevel: faultData[i].faultLevel,
      faultTime: faultData[i].faultTime,
      duration: faultData[i].duration,
      option: {
        faultDescription: faultData[i].option.faultDescription,
        faultSolution: faultData[i].option.faultSolution,
      }
    },
    {
      trainCode: faultData[j].trainCode,
      system: faultData[j].system,
      currentLocation: faultData[j].currentLocation,
      faultContent: faultData[j].faultContent,
      faultLevel: faultData[j].faultLevel,
      faultTime: faultData[j].faultTime,
      duration: faultData[j].duration,
      option: {
        faultDescription: faultData[j].option.faultDescription,
        faultSolution: faultData[j].option.faultSolution,
      }
    },
    {
      trainCode: faultData[j].trainCode,
      system: faultData[j].system,
      currentLocation: faultData[j].currentLocation,
      faultContent: faultData[j].faultContent,
      faultLevel: faultData[j].faultLevel,
      faultTime: faultData[j].faultTime,
      duration: faultData[j].duration,
      option: {
        faultDescription: faultData[j].option.faultDescription,
        faultSolution: faultData[j].option.faultSolution,
      }
    },
  );

  return (
    <GridContent>
      <React.Fragment>
        <div
          style={{
            margin: -16,
            textAlign: "center",
            // width: '100%',
            // height: '100%',
            // position: 'relative',
            // backgroundPosition: 'center',
            // // backgroundColor: '#8c8c8c',
            backgroundSize: '100%',
            backgroundRepeat: 'no-repeat',
            // opacity: 0.5,
            // backgroundImage: `url(${Globalbg})`,
          }}
        >

          <Row align="middle" justify="center"  >
            <Col xl={6} lg={24} md={24} sm={24} xs={24}>
              {/* <Card bordered={false} style={{ marginBottom: 8,marginTop: 8,padding:-16}}
                className={styles.card}> */}
              <Row>
                <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                  <Card bordered={false} className={styles.card}
                    style={{ backgroundColor: "rgba(55,121,253,0.8)", paddingLeft: 0, paddingRight: 0, paddingTop: 12, paddingBottom: 12 }}>
                    <Card.Meta
                      // avatar={<Avatar size={30} src={SubwayIcon} />}
                      description={<div><Typography.Text strong style={{ fontSize: 32 }}>
                        {currentDir?.onLineTrain === undefined ? 15 : currentDir?.onLineTrain}/
                         {currentDir?.totalTrain === undefined ? 24 : currentDir?.totalTrain}

                      </Typography.Text>
                        <Typography.Text strong style={{ fontSize: 8 }}>列 </Typography.Text></div>}
                      title={<div><Typography.Text strong style={{ fontSize: 8 }}>上线车数/总车数
                      </Typography.Text></div>}
                    />
                  </Card>
                </Col>
                <Col xl={12} lg={24} md={24} sm={24} xs={24} >
                  <Card bordered={false} className={styles.card}
                    style={{ backgroundColor: "rgba(255,165,35,0.8)", paddingLeft: 0, paddingRight: 0, paddingTop: 12, paddingBottom: 12 }}>
                    <Card.Meta
                      // avatar={<Avatar size={30} src={MileIcon} />}
                      description={<div> <Typography.Text strong style={{ fontSize: 32 }}>
                        501
                        <Typography.Text strong style={{ fontSize: 8 }}>天 </Typography.Text>
                      </Typography.Text></div>}
                      title={<div><Typography.Text strong style={{ fontSize: 8 }}>安全运行时长 </Typography.Text></div>}
                    />

                  </Card>
                </Col>
              </Row>
              <Row>
                <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                  <Card bordered={false} className={styles.card} style={{ paddingLeft: 0, paddingRight: 0, paddingTop: 12, paddingBottom: 12 }}>
                    <Card.Meta
                      // avatar={<Avatar size={30} src={MileIcon} />}
                      description={<div> <Typography.Text strong style={{ fontSize: 32, color: "#3779fd" }}>

                        {currentDir?.millionMeter === undefined ? count : currentDir?.millionMeter * 0.0001}
                        <Typography.Text strong style={{ fontSize: 8 }}>万km </Typography.Text>
                      </Typography.Text></div>}
                      title={<div><Typography.Text strong style={{ fontSize: 8 }}>走行公里 </Typography.Text></div>}
                    />
                  </Card>
                </Col>
                <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                  <Card bordered={false} className={styles.card} style={{ paddingLeft: 0, paddingRight: 0, paddingTop: 12, paddingBottom: 12 }}>
                    <Card.Meta
                      description={<div> <Typography.Text strong style={{ fontSize: 32, color: "#ffa523" }}>

                        12.12
                        <Typography.Text strong style={{ fontSize: 8 }}>万人 </Typography.Text>
                      </Typography.Text></div>}
                      title={<div><Typography.Text strong style={{ fontSize: 8 }}>日客流量 </Typography.Text></div>}
                    />
                  </Card>
                </Col>
              </Row>
              {/* </Card> */}

              <Card size="small"
                // className={styles.filterCardList}
                title={<div ><Typography.Text strong style={{ fontSize: 20 }}>全网正线故障率 </Typography.Text>
                </div>}
                extra={<div><Typography.Text strong style={{ fontSize: 12 }}> 统计周期：近12个月 </Typography.Text>
                  <br /> <Typography.Text strong style={{ fontSize: 12 }}> 统计单位：百分比 </Typography.Text>
                </div>}
                bordered={false}
                style={{ marginBottom: 8, marginTop: 8 }}
                className={styles.card}
              >
                <MiniLineChart
                  height={200}
                  // data={targetList?.length === 0 ? fualtRateData : targetList}
                  data={faultRate}
                />
              </Card>
            </Col>





            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <div
                className={styles.card}
                style={{
                  textAlign: "center",
                  marginRight: 8,
                  marginLeft: 8,
                  // marginTop:-8,
                  marginBottom: 16,
                  // padding:-16
                  // width: '100%',
                  // height: '100%',
                  // position: 'relative',
                  // backgroundPosition: 'center',
                  // // backgroundColor: '#8c8c8c',
                  // backgroundSize: '94%',
                  // backgroundRepeat: 'no-repeat',
                  // backgroundImage: `url(${Globalbg})`,
                  // opacity:0.4
                }}
              >
                <div style={{ position: "absolute", left: 80, top: 40 }}>
                  {/* <Typography.Text strong style={{ fontSize: 32 }}>
                    南宁市地铁5号线车辆实时运行示意图
                        </Typography.Text> */}
                  <Typography.Text strong style={{ fontSize: 16 }}>
                    运行状态
                        </Typography.Text>
                        <br />
                  <Badge status="processing" text="正常运行" /><br />
                  <Badge status="success" text="一级故障" /><br />
                  <Badge status="warning" text="二级故障" /><br />
                  <Badge status="error" text="三级故障" />
                </div>
                <div style={{ textAlign: "center", position: "relative" }}>
                  <FaultMap data={stateList} />
                </div>
                <div style={{  position: "absolute", left: 80, top: 420 }}>
                  <Typography.Text strong style={{ fontSize: 16 }}>
                    线路标识
                        </Typography.Text>
                        <br />
                  <span><LineOutlined style={{ color: "rgb(82,196,26,0.3)" }} />&emsp;一号线</span>
                  <br />
                  <span> <LineOutlined style={{ color: "rgb(130,0,20,0.3)" }} />&emsp;二号线</span>
                  <br />
                  <span><LineOutlined style={{ color: "rgb(114,46,209,0.3)" }} />&emsp;三号线</span>
                  <br />
                  <span><LineOutlined style={{ color: "rgb(255,197,61,0.3)" }} />&emsp;四号线</span>
                  <br />
                  <span><LineOutlined style={{ color: "3779fd" }} />&emsp;五号线</span>
                  <br />
                </div>
              </div>
            </Col>


            <Col xl={6} lg={24} md={24} sm={24} xs={24}>
              <Card
                className={styles.card}
                size="small"
                title={<div><Typography.Text strong style={{ fontSize: 20 }}>车辆故障Top10 </Typography.Text>
                </div>}
                extra={<div><Typography.Text strong style={{ fontSize: 12 }}> 统计类型：车辆编号 </Typography.Text>
                  <br /> <Typography.Text strong style={{ fontSize: 12 }}> 统计单位：个 </Typography.Text>
                </div>}
                style={{ marginBottom: 8, marginTop: -8 }} bodyStyle={{ textAlign: 'center', }} bordered={false}>
                <MiniBar
                  height={160}
                  // data={faultList?.length === 0 ? topTen : faultList}
                  data={faultList}
                />
              </Card>
              <Card
                className={styles.card}
                size="small"
                title={<div><Typography.Text strong style={{ fontSize: 20 }}>子系统故障分布 </Typography.Text>
                </div>}
                extra={<div><Typography.Text strong style={{ fontSize: 12 }}> 统计类型：子系统 </Typography.Text>
                  <br /> <Typography.Text strong style={{ fontSize: 12 }}> 统计单位：个 </Typography.Text>
                </div>}
                style={{ marginBottom: 8 }} bordered={false}>
                <Radar
                  height={210}
                  // data={subFaultList?.length === 0 ? faultDistribution : subFaultList}
                  data={subFaultList}

                />
              </Card>

            </Col>
          </Row>
          <div style={{ marginTop: -8 }}>
            <Row gutter={8}>
              <Col xl={6} lg={12} sm={24} xs={24}>

                <Card
                  size="small"
                  title={<div><Typography.Text strong style={{ fontSize: 20 }}>全网服务可靠度 </Typography.Text>
                  </div>}
                  extra={<div><Typography.Text strong style={{ fontSize: 12 }}> 统计周期：近12个月 </Typography.Text>
                    <br /> <Typography.Text strong style={{ fontSize: 12 }}> 统计单位：个 </Typography.Text>
                  </div>}
                  className={styles.card}
                  bordered={false} >
                  <ReliableChart
                    height={288}
                    // data={targetList?.length === 0 ? reliableData : targetList}
                    data={reliability}
                  />
                </Card>

              </Col>
              <Col xl={12} lg={24} sm={24} xs={24} >
                <Card bordered={false}
                  className={styles.card}
                  size="small"
                  title={<div><Typography.Text strong style={{ fontSize: 20 }}>实时故障监控 </Typography.Text>
                  </div>}
                  style={{ "width": "100%", marginBottom: 8, height: 370 }}
                  extra={
                    <div><ExclamationCircleOutlined style={{ fontSize: '20px', color: "#f52e5a" }} />
                    &nbsp; <Typography.Text strong style={{ fontSize: 20, color: "#f52e5a" }}>

                        {dataList?.length} </Typography.Text>
                    </div>
                  }>
                  {/* <TrainTable searchData={dataList?.length === 0 ? faultMonitoring : dataList} columns={columns} /> */}
                  <TrainTable bodyStyle={{ marginTop: -16, }} searchData={dataList} columns={columns} />
                </Card>
              </Col>
              <Col xl={6} lg={12} sm={24} xs={24}>
                <Card bordered={false}
                  className={styles.card}
                  size="small"
                  title={<div><Typography.Text strong style={{ fontSize: 20 }}>子系统故障同比/环比 </Typography.Text>
                  </div>}

                  style={{ "width": "100%", marginBottom: 8, height: 370 }}>
                  {/* <SubSystemError sysData={sysList?.length === 0 ? searchData : sysList} /> */}
                  <SubSystemError sysData={sysList} />
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </React.Fragment>
    </GridContent>
  );
  // }
};

export default connect(
  ({
    monitorAndGlobal,
    loading,
  }: {
    monitorAndGlobal: StateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    monitorAndGlobal,
    loading: loading.models.monitorAndGlobal,
  }),
)(Global);
