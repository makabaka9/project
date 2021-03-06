import {
  Card,
  Row,
  Col,
  Radio,
  Space,
  Tag,
  Descriptions,
  Anchor,
  Button,
  DatePicker,
} from 'antd';
import React, { useState, useEffect } from 'react';
import { connect, Dispatch,useModel } from 'umi';
import { StateType } from './model';
import { OperationStatusMonitoringDataType, OperationStatusDataType, TractionStateParametersDataType, FaultHistogramDataType } from './data.d';
import styles from './style.less';
import LineCodeAndTrainCodeQuery from '@/components/LineCodeAndTrainCodeQuery';
import WarnTable from './components/WarnTable';
import moment from 'moment';
import StateMonitor from './components/StateMonitor';
import ClassStatistics from './components/ClassStatistics';
import StateParameter from './components/StateParameter';
import Pie from './components/Pie';
import { routerRedux } from 'dva/router';
import TractionForce from '../Assistance/components/TractionForce';
import { DoubleRightOutlined } from '@ant-design/icons';
import { keys } from 'lodash';
import { values } from 'lodash';
import {useTrainModel} from '../../../models/train'
import useInterval from '@/components/useInterval';
import ExportExcel from '@/components/exportExcel';

const { RangePicker } = DatePicker;

interface TractionProps {
  match: {
    url: string;
    path: string;
    params: any;
  };
  location: {
    pathname: string;
  };
  loading: boolean;
  dispatch: Dispatch;
  subsystemAndTraction: StateType;
  operationStatusMonitoring: OperationStatusMonitoringDataType;
  operationStatus: OperationStatusDataType;
  tractionStateParameters: TractionStateParametersDataType;
  faultHistogram: FaultHistogramDataType;
  faultPie: Array<object>;
  faultInfo: any;
}

const Traction: React.FC<TractionProps> = (props) => {
  const { match, subsystemAndTraction, dispatch, loading } = props;
  const { train, setTrain } = useModel<useTrainModel>('train');
  const { operationStatusMonitoring, operationStatus, tractionStateParameters, faultHistogram, faultPie, faultInfo } = subsystemAndTraction;
 

  const [trainCode, setTrainCode] = useState(match.params.id === ":id" ? train : match.params.id);
  const [coachCode, setCoachCode] = useState("Mp2")
  const [startTime, setStartTime] = useState((moment().day(moment().day() - 30).startOf('day')).format("YYYY-MM-DD"))
  const [endTime, setEndTime] = useState((moment().day(moment().day()).startOf('day')).format("YYYY-MM-DD"))
  // const [time, setTime] = useState(0)

  // ?????????????????????
  const clickQuery = (event: { trainCode: string }) => {
    setTrainCode(event);
    setTrain(event);
    // dispatch(routerRedux.push(`/Subsystem/Traction/${event}`));
    // dispatch({
    //   type: "subsystemAndTraction/fetchOperationStatusMonitoring",
    //   payload: {
    //     trainCode:event,
    //     coachCode
    //   }
    // });
    // dispatch({
    //   type: "subsystemAndTraction/fetchOperationStatus",
    //   payload: {
    //     trainCode,
    //     coachCode
    //   }
    // });
    // dispatch({
    //   type: "subsystemAndTraction/fetchTractionStateParameters",
    //   payload: {
    //     trainCode,
    //     coachCode
    //   }
    // });
    // dispatch({
    //   type: "subsystemAndTraction/fetchFaultHistogram",
    //   payload: {
    //     trainCode,
    //     startTime,
    //     endTime,
    //   }
    // });
    // dispatch({
    //   type: "subsystemAndTraction/fetchFaultPie",
    //   payload: {
    //     trainCode,
    //     startTime,
    //     endTime,
    //   }
    // });
    // dispatch({
    //   type: "subsystemAndTraction/fetchFaultInfo",
    //   payload: {
    //     trainCode,
    //     startTime,
    //     endTime,
    //     pageNo: 1,
    //     pageSize: 20,
    //   }
    // });

  };


  useEffect(() => {
    dispatch({
      type: "subsystemAndTraction/fetchOperationStatusMonitoring",
      payload: {
        trainCode,
        coachCode
      }
    });
    dispatch({
      type: "subsystemAndTraction/fetchOperationStatus",
      payload: {
        trainCode,
        coachCode
      }
    });
    dispatch({
      type: "subsystemAndTraction/fetchTractionStateParameters",
      payload: {
        trainCode,
        coachCode
      }
    });
    // dispatch({
    //   type: "subsystemAndTraction/fetchFaultHistogram",
    //   payload: {
    //     trainCode,
    //     startTime,
    //     endTime,
    //   }
    // });
    // dispatch({
    //   type: "subsystemAndTraction/fetchFaultPie",
    //   payload: {
    //     trainCode,
    //     startTime,
    //     endTime,
    //   }
    // });
    dispatch({
      type: "subsystemAndTraction/fetchFaultInfo",
      payload: {
        trainCode,
        startTime,
        endTime,
        pageNo: 1,
        pageSize: 20,
      }
    });
  }, [trainCode,coachCode]);

  const onChangecoachCode = (event: any) => {
    setCoachCode(event.target.value);
    // if (dispatch) {
    //   dispatch({
    //     type: 'subsystemAndTraction/fetchOperationStatusMonitoring',
    //     payload: {
    //       trainCode,
    //       coachCode: event.target.value,
    //     },
    //   });
    // }
  };

  const onChangeTime = (event: any) => {
    let startTime=moment(event[0]).format('YY-MM-DD')
    setStartTime(startTime)
    let endTime=moment(event[1]).format('YY-MM-DD')
    setEndTime(endTime)
    // setTime(event.target.value);
    // // const endTime = new Date();
    // if (event.target.value === 0) {
    //   setStartTime((moment().day(moment().day() - 7).startOf('day')).format("YYYY-MM-DD"));
    // } else if (event.target.value === 1) {
    //   setStartTime((moment().day(moment().day() - 30).startOf('day')).format("YYYY-MM-DD"));
    // } else if (event.target.value === 2) {
    //   setStartTime((moment().day(moment().day() - 365).startOf('day')).format("YYYY-MM-DD"));
    // } else {
    //   setStartTime((moment().day(moment().day() - 1095).startOf('day')).format("YYYY-MM-DD"));
    // }
  };
  // useEffect(() => {
  //   dispatch({
  //     type: 'subsystemAndTraction/fetchOperationStatusMonitoring',
  //     payload: {
  //       trainCode,
  //       startTime,
  //       endTime,
  //     },
  //   });
  //   dispatch({
  //     type: 'subsystemAndTraction/fetchFaultHistogram',
  //     payload: {
  //       trainCode,
  //       startTime,
  //       endTime,
  //     },
  //   });
  //   dispatch({
  //     type: 'subsystemAndTraction/fetchFaultInfo',
  //     payload: {
  //       trainCode,
  //       startTime,
  //       endTime,
  //       pageNo: 1,
  //       pageSize: 20,
  //     },
  //   },
  //   );
  // }, [startTime])

  const [requestTime, setRequestTime] = useState(new moment().format('HH'))
  useInterval(() => {
    setRequestTime(new moment().format('HH'))
    if (dispatch) {
      dispatch({
        type: 'subsystemAndTraction/fetchOperationStatusMonitoring',
        payload: {
          trainCode,
          coachCode,
        },
      });
    }
  }, 72000000);
  // ???????????????????????????
  const tractionData: any[] = [];
  tractionData.push(
    {
      time: requestTime,
      type: '???????????????',
      value: operationStatusMonitoring.givenTraction,
    },
    {
      time: requestTime,
      type: '???????????????',
      value: operationStatusMonitoring.actualTraction,
    },
  )
  // ????????????????????????
  const motorTemperature: any[] = [];
  motorTemperature.push(
    {
      time: requestTime,
      type: '??????1??????T1',
      value: operationStatusMonitoring.motorTemperature1,
    },
    {
      time: requestTime,
      type: '??????2??????T2',
      value: operationStatusMonitoring.motorTemperature2,
    },
    {
      time: requestTime,
      type: '??????3??????T3',
      value: operationStatusMonitoring.motorTemperature3,
    },
    {
      time: requestTime,
      type: '??????4??????T4',
      value: operationStatusMonitoring.motorTemperature4,
    },
  )

  // ????????????????????????
  const inverterCurrent: any[] = [];
  inverterCurrent.push(
    {
      time: requestTime,
      type: '????????????',
      value: operationStatusMonitoring.inverterCurrent,
    },
  )
  // ????????????????????????
  const intermediateVoltage: any[] = [];
  intermediateVoltage.push(
    {
      time: requestTime,
      type: '????????????',
      value: operationStatusMonitoring.intermediateVoltage,
    },
  )
  // ????????????????????????
  const intermediateCurrent: any[] = [];
  intermediateCurrent.push(
    {
      time: requestTime,
      type: '????????????',
      value: operationStatusMonitoring.intermediateCurrent,
    },
  )

  // ????????????????????????????????????
  const faultStatistics: any[] = [];
  faultStatistics.push(
    {
      name: Object.keys(faultHistogram.VVVF???????????????),
      type: "VVVF???????????????",
      value: Object.values(faultHistogram.VVVF???????????????),
    },
    {
      name: Object.keys(faultHistogram.?????????????????????),
      type: "?????????????????????",
      value: Object.values(faultHistogram.?????????????????????),
    },
    {
      name: Object.keys(faultHistogram.???????????????),
      type: "???????????????",
      value: Object.values(faultHistogram.???????????????),
    },
    {
      name: Object.keys(faultHistogram.???????????????),
      type: "???????????????",
      value: Object.values(faultHistogram.???????????????),
    },
    {
      name: Object.keys(faultHistogram.???????????????),
      type: "???????????????",
      value: Object.values(faultHistogram.???????????????),
    },
    {
      name: Object.keys(faultHistogram.????????????),
      type: "????????????",
      value: Object.values(faultHistogram.????????????),
    },
    {
      name: Object.keys(faultHistogram.???????????????),
      type: "???????????????",
      value: Object.values(faultHistogram.???????????????),
    }
  )
  const faultStatistics1: any[] = [];
  for (let i = 0; i < faultStatistics.length; i++) {
    const dataTemp = faultStatistics.map(item => ({
      type: item.type,
      name: item.name[i],
      value: item.value[i],
    })
    )
    for (let j = 0; j < dataTemp.length; j++) {
      faultStatistics1.push(dataTemp[j])
    }
  }


  const fualtColumns = [
    {
      title: '??????',
      dataIndex: 'index',
      key: 'index',
      align: 'center',
      width: '5%',
    },
    {
      title: '????????????',
      dataIndex: 'faultCode',
      key: 'faultCode',
      align: 'center',
      width: '5%',
    },
    {
      title: '????????????',
      dataIndex: 'faultName',
      key: 'faultName',
      align: 'center',
      width: '20%',
    },
    {
      title: '????????????',
      dataIndex: 'faultLevel',
      key: 'faultLevel',
      width: '5%',
      align: 'center',
    },
    {
      title: '??????',
      dataIndex: 'status',
      key: 'status',
      width: '5%',
      align: 'center',
      render: (_, row: any) => (
        <Space>
          {row.status === 1 ? <Tag color="red">?????????</Tag> : "?????????"}
        </Space>
      ),
    },
    {
      title: '????????????',
      dataIndex: 'faultDesc',
      key: 'faultDesc',
      width: '15%',
      align: 'center',
    },
    {
      title: '??????????????????',
      dataIndex: 'faultSolution',
      key: 'faultSolution',
      width: '25%',
      align: 'center',
    },
    {
      title: '????????????',
      dataIndex: 'startTime',
      key: 'startTime',
      width: '10%',
      align: 'center',
      render: (_, row: any) => (
        moment(row.startTime).format('YYYY-MM-DD HH:MM:SS')
      ),
      sorter: (
        a: {
          count: number;
        },
        b: {
          count: number;
        },
      ) => a.count - b.count,
      // className: styles.alignRight,
    },
  ];
  const faultTime = [
    {
     title: '??????',
     dataIndex: 'id',
     key: 'id',
     width: '5%',
     align: 'center',
   },
   {
     title: '????????????',
     dataIndex: 'faultName',
     key: 'faultName',
     width: '15%',
     align: 'center',
   },
   {
     title: '????????????',
     dataIndex: 'faultCode',
     key: 'faultCode',
     width: '5%',
     align: 'center',
   },
   {
     title: '????????????',
     dataIndex: 'faultLevel',
     key: 'faultLevel',
     width: '5%',
     align: 'center',
   },
   {
     title: '????????????',
     dataIndex: 'number',
     key: 'number',
     width: '5%',
     align: 'center',
   },
 ];
  return (
    <div>
      <div>
        <Row gutter={24}>
          <Col xl={18} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: -8, marginTop: -8 }}>
            <LineCodeAndTrainCodeQuery defaultTrainCode={trainCode} onSubmit={clickQuery} />
          </Col>
          <Col xl={6} lg={24} md={24} sm={24} xs={24} >
            <span style={{ float: 'right' }}>
            <RangePicker
              // showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD"
              onChange={onChangeTime}
              onOk={onChangeTime}
            />
              {/* <Radio.Group value={time} onChange={onChangeTime} defaultValue={0}>
                <Radio value={0}>????????????</Radio>
                <Radio value={1}>????????????</Radio>
                <Radio value={2}>????????????</Radio>
                <Radio value={3}>??????</Radio>
              </Radio.Group> */}
            </span>
          </Col>
        </Row>
      </div>
      <Card
        bordered={false}
        className={styles.title}
        style={{ marginBottom: 16 }}
        title={
          <Row>
            <Col>
              <div>??????????????????&emsp;&emsp;</div>
            </Col>
            {/* <Col>
              <Anchor targetOffset={window.innerHeight / 2}>
                <Anchor.Link
                  href="#modelPrediction"
                  title={
                    <Button type="primary" shape="round">
                      ??????????????????
                      <DoubleRightOutlined />
                    </Button>
                  }
                />
              </Anchor>
            </Col> */}
          </Row>
        }
        extra={
          <div>
            <Radio.Group onChange={onChangecoachCode} name="DCU" defaultValue="Mp1">
              <Radio value="Mp1">Mp1</Radio>
              <Radio value="M1">M1</Radio>
              <Radio value="M2">M2</Radio>
              <Radio value="Mp2">Mp2</Radio>
            </Radio.Group>
          </div>
        }
      >
        {/* <Row gutter={16} justify="center">
          <Col xl={24} lg={12} sm={24} xs={24}>
            <Row gutter={16}> */}
        <Descriptions column={4}>
          <Descriptions.Item label="????????????/????????????">{tractionStateParameters.tractionPower + "N"}</Descriptions.Item>
          <Descriptions.Item label="????????????????????????">{tractionStateParameters.trainActualElectricBrakingForce + "N"}</Descriptions.Item>
          <Descriptions.Item label="???????????????">{tractionStateParameters.trainElectricBrakingCapacity + "N"}</Descriptions.Item>
          <Descriptions.Item label="?????????????????????">{tractionStateParameters.trainTraction + "N"}</Descriptions.Item>
        </Descriptions>
        {/* </Row> */}

        {/* ??????????????? */}
        {/* <TractionForce
              borderWidth={2}
              height={20}
              data={tractionData} /> */}
        {/* </Col> */}
        {/* <Col xl={12} lg={12} sm={24} xs={24}>
            <StateMonitor borderWidth={2} height={60}
              motorTemperature={motorTemperature}
              inverterCurrent={inverterCurrent}
              intermediateVoltage={intermediateVoltage}
              intermediateCurrent={intermediateCurrent}
            // data={motorTemperature,inverterCurrent}
            />
          </Col> */}
        {/* <Col xl={24} lg={12} sm={24} xs={24}> */}
        <StateParameter tractionStateParameters={tractionStateParameters}
        />
        {/* </Col>
        </Row> */}
      </Card>

      <Card title="????????????"
        bordered={false}
        className={styles.title}
        // style={{
        //   height: "25vh"
        // }}
        extra={
          <ExportExcel
            fileName='???????????????'
            sheetData={faultInfo.pageList}
            sheetName='sheet'
            sheetHeader={['?????????', '????????????', '????????????', '????????????', '??????', '????????????', '??????????????????', '????????????',]}
            sheetFilter={[]}
          />
        }
      >
        {/* <Row gutter={16}>
          <Col xl={24} lg={12} sm={24} xs={24}>
            <div style={{ paddingTop: 16 }}> */}
        <WarnTable loading={loading} data={faultInfo.pageList} columns={fualtColumns} />
        {/* </div>
          </Col>
        </Row> */}
      </Card >
        {/*<Row gutter={16}>*/}
        {/*  <Col xl={8} lg={12} sm={24} xs={24}>*/}
        {/*    /!* <span> <Typography.Text>????????????</Typography.Text></span> *!/*/}
        {/*    <Card bordered={false} title="????????????" */}
        {/*    >*/}
        {/*      <Pie*/}
        {/*        // animate={false}*/}
        {/*        borderWidth={2}*/}
        {/*        height={70}*/}
        {/*        data={faultPie}*/}
        {/*      />*/}
        {/*    </Card>*/}
        {/*  </Col>*/}
        {/*  <Col xl={16} lg={12} sm={24} xs={24}>*/}
        {/*  <Card bordered={false} title="??????????????????" className={styles.title}*/}
        {/*  >*/}

        {/*    <WarnTable*/}
        {/*    columns={faultTime}*/}
        {/*    />*/}
        {/*  </Card>*/}
        {/*</Col>*/}
        {/*  /!* <Col xl={16} lg={12} sm={24} xs={24}> *!/*/}
        {/*    /!* <span> <Typography.Text>????????????</Typography.Text></span> *!/*/}
        {/*    /!* <ClassStatistics*/}
        {/*      // animate={false}*/}
        {/*      borderWidth={2}*/}
        {/*      height={150}*/}
        {/*      data={faultStatistics1}*/}
        {/*    /> *!/*/}
        {/*    /!* <Card bordered={false} title="????????????top10" className={styles.title}*/}
        {/*    >*/}
        {/*      <WarnTable*/}
        {/*        columns={faultTime}*/}
        {/*      />*/}
        {/*    </Card>*/}
        {/*  </Col> *!/*/}

        {/*</Row>*/}

    </div >
  );
};
// }

export default connect(
  ({
    subsystemAndTraction,
    // loading,
  }: {
    subsystemAndTraction: StateType;
    // loading: {
    //   effects: { [key: string]: boolean };
    //   models: {
    //     [key: string]: boolean;
    //   };
    // };
  }) => ({
    subsystemAndTraction,
    // loading: loading.effects['subsystemAndTraction/fetchFaultInfo'],
  }),
)(Traction);
