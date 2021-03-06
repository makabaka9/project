import {
  Card,
  Row,
  Col,
  Radio,
  Space,
  Tag,
  Anchor,
  Button,
  DatePicker,
} from 'antd';
import React, { useState, useEffect } from 'react';
import { connect, Dispatch, useModel} from 'umi';
import { BatteryVoltageDataType, AuxiliaryStatusDataDataType } from './data.d';
// import LineCodeAndTrainCodeQuery from '../components/LineCodeAndTrainCodeQuery';
import styles from './style.less';
import LineCodeAndTrainCodeQuery from '@/components/LineCodeAndTrainCodeQuery';
import WarnTable from './components/WarnTable';
import moment from 'moment';
import StateMonitor from './components/StateMonitor';
import ClassStatistics from './components/ClassStatistics';
import StateParameter from './components/StateParameter';
import { DoubleRightOutlined } from '@ant-design/icons';
import ModelPrediction from './components/ModelPrediction';
import Pie from './components/Pie';
import { StateType } from './model';
import { routerRedux } from 'dva/router';
import useTrainModel from '../../../models/train'

import useInterval from '@/components/useInterval';
import ExportExcel from '@/components/exportExcel';

const { RangePicker } = DatePicker;

interface AssistanceProps {
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
  subsystemAndAssistance: StateType;
  batteryVoltage: BatteryVoltageDataType;
  auxiliaryStatusData: AuxiliaryStatusDataDataType;
  faultHistogram: Array<object>;
  faultPie: Array<object>;
  faultInfo: any;
}

const Assistance: React.FC<AssistanceProps> = (props) => {
  const { match, subsystemAndAssistance, dispatch, loading } = props;
  const { train, setTrain } = useModel<useTrainModel>('train');
  const { batteryVoltage, auxiliaryStatusData, faultHistogram, faultPie, faultInfo } = subsystemAndAssistance;

  const [trainCode, setTrainCode] = useState(match.params.id === ":id" ? train : match.params.id);
  const [coachCode, setCoachCode] = useState("Tc1")
  const [startTime, setStartTime] = useState((moment().day(moment().day() - 30).startOf('day')).format("YYYY-MM-DD"))
  const [endTime, setEndTime] = useState((moment().day(moment().day()).startOf('day')).format("YYYY-MM-DD"))
  // const [time, setTime] = useState(0)

  const clickQuery = (event: { trainCode: string }) => {
    setTrainCode(event);
    setTrain(event);
    // dispatch(routerRedux.push(`/Subsystem/Assistance/${event.trainCode}`));


    // dispatch({
    //   type: "subsystemAndAssistance/fetchBatteryVoltage",
    //   payload: {
    //     trainCode:event.trainCode,
    //     coachCode
    //   }
    // });


    // dispatch({
    //   type: "subsystemAndAssistance/fetchAuxiliaryStatusData",
    //   payload: {
    //     trainCode,
    //     coachCode
    //   }
    // });
    // dispatch({
    //   type: "subsystemAndAssistance/fetchFaultHistogram",
    //   payload: {
    //     trainCode,
    //     startTime,
    //     endTime: moment(new Date()).format('YYYY-MM-DD'),
    //   }
    // });
    // dispatch({
    //   type: "subsystemAndAssistance/fetchFaultPie",
    //   payload: {
    //     trainCode,
    //     startTime,
    //     endTime: moment(new Date()).format('YYYY-MM-DD'),
    //   }
    // });
    // dispatch({
    //   type: "subsystemAndAssistance/fetchFaultInfo",
    //   payload: {
    //     trainCode,
    //     startTime,
    //     endTime: moment(new Date()).format('YYYY-MM-DD'),
    //   }
    // });
  };

  useEffect(() => {
    // dispatch({
    //   type: "subsystemAndAssistance/fetchBatteryVoltage",
    //   payload: {
    //     trainCode,
    //     coachCode
    //   }
    // });
    console.log(trainCode);
    dispatch({
      type: "subsystemAndAssistance/fetchAuxiliaryStatusData",
      payload: {
        trainCode,
        coachCode
      }
    });
    // dispatch({
    //   type: "subsystemAndAssistance/fetchFaultHistogram",
    //   payload: {
    //     trainCode,
    //     startTime,
    //     endTime: moment(new Date()).format('YYYY-MM-DD'),
    //   }
    // });
    // dispatch({
    //   type: "subsystemAndAssistance/fetchFaultPie",
    //   payload: {
    //     trainCode,
    //     startTime,
    //     endTime: moment(new Date()).format('YYYY-MM-DD'),
    //   }
    // });
    dispatch({
      type: "subsystemAndAssistance/fetchFaultInfo",
      payload: {
        trainCode,
        startTime,
        endTime: moment(new Date()).format('YYYY-MM-DD'),
      }
    });
  }, [trainCode,coachCode]);

  const onChangecoachCode = (event: any) => {
    setCoachCode(event.target.value);
    // if (dispatch) {
    //   dispatch({
    //     type: 'subsystemAndAssistance/fetchBatteryTemperature',
    //     payload: {
    //       trainCode,
    //       coachCode: event.target.value,
    //     },
    //   });
    // }
  };

  const onChangeTime = (event: any) => {
    let startTime = moment(event[0]).format('YY-MM-DD')
    setStartTime(startTime)
    // let endTime=moment(event[1]).format('YY-MM-DD')
    setEndTime(moment(event[1]).format('YY-MM-DD'))
    // setTime(event.target.value);
    // const endTime = new Date();
    // if (event.target.value === 0) {
    //   setStartTime((moment().day(moment().day() - 7).startOf('day')).format("YYYY-MM-DD"));
    // } else if (event.target.value === 1) {
    //   setStartTime((moment().day(moment().day() - 30).startOf('day')).format("YYYY-MM-DD"));
    // } else if (event.target.value === 2) {
    //   setStartTime((moment().day(moment().day() - 365).startOf('day')).format("YYYY-MM-DD"));
    // } else {
    //   setStartTime((moment().day(moment().day() - 1095).startOf('day')).format("YYYY-MM-DD"));
    // }
    // if (dispatch) {
    //   dispatch({
    //     type: 'subsystemAndAssistance/fetchBatteryTemperature',
    //     payload: {
    //       trainCode,
    //       startTime,
    //       endTime,
    //     },
    //   });
    //   dispatch({
    //     type: 'subsystemAndAssistance/fetchFaultHistogram',
    //     payload: {
    //       trainCode,
    //       startTime,
    //       endTime,
    //     },
    //   });
    //   dispatch({
    //     type: 'subsystemAndAssistance/fetchFaultInfo',
    //     payload: {
    //       trainCode,
    //       startTime,
    //       endTime,
    //       pageNo: 1,
    //       pageSize: 10,
    //     },
    //   },
    //   );
    // }
  };


  const [requestTime, setRequestTime] = useState(moment(new Date()).format('HH'))
  useInterval(() => {
    setRequestTime(moment(new Date()).format('HH'))
    if (dispatch) {
      dispatch({
        type: 'subsystemAndAssistance/fetchBatteryVoltage',
        payload: {
          trainCode,
          coachCode,
        },
      });
    }
  }, 72000000);
  // ???????????????????????????
  const batteryTemperature: any[] = [];
  batteryTemperature.push(
    {
      time: requestTime,
      type: "???????????????",
      value: batteryVoltage.batteryTemperature,
    },
  )
  // ???????????????????????????
  const newbatteryVoltage: any[] = [];
  newbatteryVoltage.push(
    {
      time: requestTime,
      type: "???????????????",
      value: batteryVoltage.batteryVoltage,
    },
  )
  // ????????????????????????????????????
  const faultStatistics: any[] = [];
  faultStatistics.push(
    {
      name: Object.keys(faultHistogram.?????????),
      type: "?????????",
      value: Object.values(faultHistogram.?????????),
    },
    {
      name: Object.keys(faultHistogram.????????????),
      type: "????????????",
      value: Object.values(faultHistogram.????????????),
    },
    {
      name: Object.keys(faultHistogram.?????????),
      type: "?????????",
      value: Object.values(faultHistogram.?????????),
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
            <Radio.Group onChange={onChangecoachCode} name="DCU" defaultValue="Tc1">
              <Radio value="Tc1">Tc1</Radio>
              <Radio value="Tc2">Tc2</Radio>
            </Radio.Group>
          </div>
        }
      >
        <Row gutter={16}>
          {/* <Col xl={24} lg={12} sm={24} xs={24}>
            <StateMonitor borderWidth={2} height={20} data={[batteryTemperature, newbatteryVoltage]} />
          </Col> */}
          <Col xl={24} lg={12} sm={24} xs={24}>
            <StateParameter
              auxiliaryStatusData={auxiliaryStatusData}
            />
          </Col>
        </Row>
      </Card>


      <Card title="????????????"
        bordered={false}
        // style={{ height: "20vh" }}
        className={styles.title}
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
        <Row>
          <Col xl={24} lg={12} sm={24} xs={24}>
            <div style={{ paddingTop: 8, }}>
              <WarnTable data={faultInfo.pageList} columns={fualtColumns} />
            </div>
          </Col>
        </Row>
      </Card>

      {/*<Row gutter={16}>*/}

      {/*  <Col xl={8} lg={12} sm={24} xs={24}>*/}
      {/*    <Card*/}
      {/*      title="????????????"*/}
      {/*      bordered={false}*/}
      {/*      className={styles.title}*/}
      {/*    >*/}
      {/*      /!* <span> <Typography.Text>????????????</Typography.Text></span> *!/*/}
      {/*      <Pie*/}
      {/*        // animate={false}*/}
      {/*        borderWidth={2}*/}
      {/*        height={70}*/}
      {/*        data={faultPie}*/}
      {/*      />*/}
      {/*    </Card>*/}
      {/*  </Col>*/}
      {/*  <Col xl={16} lg={12} sm={24} xs={24}>*/}
      {/*    <Card bordered={false} title="??????????????????" className={styles.title}*/}
      {/*    >*/}

      {/*      <WarnTable*/}
      {/*        columns={faultTime}*/}
      {/*      />*/}
      {/*    </Card>*/}
      {/*  </Col>*/}
      {/*  /!* <Col xl={12} lg={12} sm={24} xs={24}>*/}
      {/*      <Card*/}
      {/*  title="????????????Top10"*/}
      {/*  bordered={false}*/}
      {/*  className={styles.title}*/}
      {/*>*/}
      {/*      <WarnTable*/}
      {/*      columns={faultTime}*/}
      {/*      /></Card>*/}
      {/*    </Col> *!/*/}
      {/*</Row>*/}
    </div>

  );
};
// }

export default connect(
  ({
    subsystemAndAssistance,
    loading,
  }: {
    subsystemAndAssistance: BatteryTemperatureDataType;
    loading: {
      effects: { [key: string]: boolean };
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    subsystemAndAssistance,
    loading: loading.effects['subsystemAndAssistance/fetchFault'],
  }),
)(Assistance);
