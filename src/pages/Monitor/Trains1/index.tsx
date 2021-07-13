import { Card, Col, Descriptions, List, Progress, Row, Table, Typography } from 'antd';
import React, { FC, useState, useEffect } from "react";
import { GridContent } from '@ant-design/pro-layout';
import { connect, Dispatch, useModel } from 'umi';
import LineCodeAndTrainCodeQuery from '@/components/LineCodeAndTrainCodeQuery';
import { StateType } from './model';
import { routerRedux } from 'dva/router';
import TrainparaMap from './components/Trainpara';
import useTrainModel from '../../../models/train'
import moment from 'moment';
import escapeDoorImage1 from './images/deblocking1.png'
import escapeDoorImage2 from './images/deblocking2.png'
import stopImage1 from './images/stop1.png'
import stopImage2 from './images/stop2.png'
import styles from './style.less';

import CommunicationMap from './components/CommunicationMap';
import MonitorMap from './components/MonitorMap';

interface TrainsProps {
  match: {
    url: string;
    path: string;
    params: any;
  };
  monitorAndTrains1: StateType;
  dispatch: Dispatch;
  loading: boolean;
  important?: any;
  cheshi: any;
}
const stationList = [
  '库内',
  '国凯大道站',
  '那洪立交站',
  '金凯路站',
  '江南公园站',
  '周家坡站',
  '五一立交站',
  '新秀公园站',
  '广西大学站',
  '秀灵路站',
  '明秀路站',
  '北湖南路站',
  '虎邱站',
  '狮山公园站',
  '小鸡村站',
  '邕宾立交站',
  '降桥站',
  '金桥客运站', ''
]
export const Trains: FC<TrainsProps> = (props) => {
  const {
    match,
    dispatch,
    monitorAndTrains1,
    // loading
  } = props;
  const { train, setTrain } = useModel<useTrainModel>('train');
  const { cheshi } = monitorAndTrains1;
  const [important, setImportant] = useState<any>();
  const [basicInfo, setBasicInfo] = useState<any>();
  const [driverButton, setDriverButton] = useState<any>([]);
  const [bypassInformationData, setBypassInformationData] = useState<any>([]);
  const [tractionInformation, setTractionInformation] = useState<any>([]);
  const [airconditionInformation, setAirconditionInformation] = useState<any>([]);
  const [brakingInformation, setBrakingInformation] = useState<any>([]);
  const [auxInformation, setAuxInformation] = useState<any>([]);
  const [event, setEvent] = useState<any>();

  const [trainCode, setTrainCode] = useState(match.params.id === ":id" ? train : match.params.id);
  // useEffect(() => {
  //   dispatch({
  //     type: 'monitorAndTrains1/fetchImportant',
  //     payload: {
  //       trainCode
  //     },
  //   });
  // }, []);
  // useEffect(() => {
  //   dispatch({
  //     type: 'monitorAndTrains1/fetchCheshi',
  //     // payload: {
  //     //   trainCode
  //     // },
  //   });
  // }, []);

  useEffect(() => {
    // const response = stateInformation(trainWorkingCondition);
    // response.then((data) => {
    //   setList(data)
    // });

    const url = `/api/monitor/state/hmi?trainCode=${trainCode}`;
    const evtSource = new EventSource(url);
    if (evtSource !== null) {
      evtSource.onmessage = (message) => {
        // const addData = addNewElement(important, JSON.parse(message.data));
        const data = JSON.parse(message.data);
        setBasicInfo(data.basicInfo.record);
        setImportant(data.importParam);
        setDriverButton(data.driverButton);
        setBypassInformationData(data.bypassInformation.record);
        setTractionInformation(data.tractionInformation);
        setAirconditionInformation(data.airconditionInformation);
        setBrakingInformation(data.brakingInformation);
        setAuxInformation(data.auxInformation);
      }
    }
    setEvent(evtSource);
    return function cleanup() {
      if (evtSource !== undefined) {
        evtSource.close();
      }
    }
  }, [trainCode]);


  const clickQuery = (event: { trainCode: string }) => {
    setImportant({});
    const varCode: string = event === undefined ? trainCode : event;
    setTrainCode(varCode)
    setTrain(varCode);
    // dispatch({
    //   type: 'monitorAndTrains1/fetchTrainBasic',
    //   payload: {
    //     trainCode: varCode,
    //   },
    // });
    // dispatch({
    //   type: 'monitorAndTrains1/fetchTrainImportant',
    //   payload: {
    //     trainCode: varCode,
    //   },
    // });
  }


  return (
    <GridContent>
      <React.Fragment>
        <div>
          <Row gutter={24}>
            <Col xl={24} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: -8, marginTop: -8 }}>
              <LineCodeAndTrainCodeQuery
                defaultTrainCode={trainCode}
                onSubmit={clickQuery} />
            </Col>
          </Row>
        </div>
        <Row gutter={20}>
          <Col
            xl={12}
            lg={12}
            sm={24}
            xs={24}
            style={{ padding: 0 }}
          >
            <div style={{
              height: 120,
              textAlign: "center", backgroundColor: 'rgba(25,31,46,0.7)',
              padding: 24,
              paddingBottom: 128,
              fontSize: 16,
            }}>
              <Row gutter={20} style={{ textAlign: "center" }}>
                <Col span={4}
                >
                  {/*<p style={{ marginBottom: 0, color: "#73d13d" }}>当前站</p>*/}
                  {/*<p style={{ marginBottom: 0, fontSize: 22, color: "#73d13d", }}>*/}
                  {/*  {stationList[basicInfo?.currentStation]}*/}
                  {/*  /!* {redisData1?.currentStation === null ? '--' : redisData1?.currentStation} *!/*/}
                  {/*</p>*/}
                </Col>
                <Col span={4} >
                  <p style={{ marginBottom: 0 }}>下一站</p>
                  <p style={{ marginBottom: 0, fontSize: 16, }}>
                    {stationList[basicInfo?.nextStation]}
                    {/* {redisData1?.nextStation === null ? '--' : redisData1?.nextStation} */}
                  </p>
                </Col>
                <Col span={4}   >
                  <p style={{ marginBottom: 0 }}>终点站</p>
                  <p style={{ marginBottom: 0, fontSize: 16, }}>
                    {stationList[basicInfo?.terminalStation]}
                    {/* {redisData1?.terminalStation === null ? '--' : redisData1?.terminalStation} */}
                  </p>
                </Col>
                <Col span={3}   >
                  <p style={{ marginBottom: 0 }}>速度</p>
                  {/* <p style={{ marginBottom: 0, fontSize: 22, color: "#73d13d", }}>{redisData1?.speed === null ? '--' : (redisData1?.speed / 1000).toFixed(1)}km/h</p> */}
                  <p style={{ marginBottom: 0, fontSize: 16, color: "#73d13d", }}> {basicInfo?.speed} {/* {redisData1?.speed === null ? '--' : redisData1?.speed}km/h */} </p> </Col> <Col span={3} > <p style={{ marginBottom: 0 }}>网压</p>
                  <p style={{ marginBottom: 0, fontSize: 16, color: "#73d13d", }}>
                    {basicInfo?.gridVoltage}
                    {/* {redisData1?.networkVoltage === null ? '--' : redisData1?.networkVoltage}kV */}
                  </p>
                </Col>
                <Col span={2} >
                  <p style={{ marginBottom: 0 }}>网流</p>
                  <p style={{ marginBottom: 0, fontSize: 16, color: "#73d13d", }}>
                    {basicInfo?.gridCurrent}
                    {/* {redisData1?.networkFlow === null ? '--' : redisData1?.networkFlow}A */}
                  </p>
                </Col>
                <Col span={4} >
                  <p style={{ marginBottom: 0 }}>数据时间</p>
                  <p style={{ marginBottom: 0, fontSize: 16, color: "#73d13d", }}>
      {basicInfo?.stateTime? new Date(basicInfo?.stateTime).toLocaleString():null}
                    {/* {redisData1?.networkFlow === null ? '--' : redisData1?.networkFlow}A */}
                  </p>
                </Col>
                {/*<Col span={4} >*/}
                {/*  <p style={{ marginBottom: 0 }}>总风压力</p>*/}
                {/*  <p style={{ marginBottom: 0, fontSize: 22, color: "#73d13d", }}>*/}
                {/*    {basicInfo?.totalAirPressure}*/}
                {/*    /!* {redisData1?.totalAirPressure === null ? '--' : redisData1?.totalAirPressure}kPa *!/*/}
                {/*  </p>*/}
                {/*</Col>*/}
              </Row>
              <Row gutter={20} style={{ textAlign: "center" }}>
                <Col span={4} >
                  <p style={{ marginBottom: 0 }}>级位</p>
                  <p style={{ marginBottom: 0, fontSize: 16, color: "#73d13d", }}>
                    {basicInfo?.percentage}
                  </p>


                </Col>
                <Col span={4} >
                  <p style={{ marginBottom: 0 }}>模式</p>
                  <p style={{ marginBottom: 0, fontSize: 16, color: "#73d13d", }}>
                    {basicInfo?.mode}
                  </p>
                </Col>
                <Col span={4}  >
                  <p style={{ marginBottom: 0 }}>逃生门状态</p>
                  <p style={{ marginBottom: 0, fontSize: 16, color: "#73d13d", }}>
                   Tc1:{basicInfo?.escapeDoor1?<img style={{width:18}} src={escapeDoorImage2}/>:<img style={{width:18}} src={escapeDoorImage1} />}
                   Tc2:{basicInfo?.escapeDoor2?<img style={{width:18}} src={escapeDoorImage2}/>:<img style={{width:18}} src={escapeDoorImage1} />}
                  </p>
                </Col>
                <Col span={3}  >
                  <p style={{ marginBottom: 0 }}>限速</p>
                  <p style={{ marginBottom: 0, fontSize: 16, color: "#73d13d", }}>
                    {basicInfo?.speedLimit}
                  </p>
                </Col>
                <Col span={3} >
                  <p style={{ marginBottom: 0 }}>牵引制动</p>
                  <p style={{ marginBottom: 0, fontSize: 16, color: "#73d13d", }}>
                    {basicInfo?.tractionBrakingStatus}
                  </p>
                </Col>
                <Col span={4} >
                  <p style={{ marginBottom: 0 }}>停车按钮</p>
                  <p style={{ marginBottom: 0, fontSize: 16, color: "#73d13d", }}>
                   Tc1:{basicInfo?.stopButton1?<img  style={{width:18}} src={stopImage2}/>:<img  style={{width:18}} src={stopImage1} />}
                   Tc2:{basicInfo?.stopButton2?<img  style={{width:18}} src={stopImage2}/>:<img  style={{width:18}} src={stopImage1} />}
                  </p>
                </Col>
              </Row>
            </div>

            <Card bordered={false} className={styles.title} style={{ background: 'rgba(25,31,46,0.7)' }}>
              <CommunicationMap
                important={important}
                height={580}
              />

            </Card>

          </Col>
          <Col
            xl={12}
            lg={12}
            sm={24}
            xs={24}
            style={{ padding: 0 }}
          >
            {/* 子系统类参数 */}
            <Card bordered={false} className={styles.title}
              style={{ background: 'rgba(25,31,46,0.7)', }}
            >
              <TrainparaMap
                data={driverButton}
              />
              <hr className={styles.hr} />
              <br />
              <MonitorMap
                bypassInformationData={bypassInformationData}
                tractionInformation={tractionInformation}
                airconditionInformation={airconditionInformation}
                brakingInformation={brakingInformation}
                auxInformation={auxInformation}
              />
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    </GridContent>
  );
};

export default connect(
  ({
    monitorAndTrains1,
    loading,
  }: {
    monitorAndTrains1: any;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    monitorAndTrains1,
    loading: loading.effects['monitorAndTrains1/fetchBasic'],
  }),
)(Trains);
