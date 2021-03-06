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
import { connect, Dispatch,useModel } from 'umi';
import { BrakingForceDataType, BrakeOperationStatusMonitoringDataType } from './data.d';
import styles from './style.less';
import LineCodeAndTrainCodeQuery from '@/components/LineCodeAndTrainCodeQuery';
import WarnTable from './components/WarnTable';
import moment from 'moment';
import BrakeForce from './components/BrakeForce';
import ClassStatistics from './components/ClassStatistics';
import StateSingnal from './components/StateSingnal';
import StateParameter from './components/StateParameter';
import ModelPrediction from './components/ModelPrediction';
import Pie from './components/Pie';
import { DoubleRightOutlined } from '@ant-design/icons';
import { StateType } from './model';
import { routerRedux } from 'dva/router';
import useInterval from '@/components/useInterval';
import ExportExcel from '@/components/exportExcel';
import {useTrainModel} from '../../../models/train'

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
  // loading: boolean;
  dispatch: Dispatch;
  subsystemAndBrake: StateType;
  brakingForce: Array<object>;
  brakeOperationStatusMonitoring: BrakeOperationStatusMonitoringDataType;
  faultHistogram: Array<object>;
  faultPie: Array<object>;
  faultInfo: any;
}

const Brake: React.FC<AssistanceProps> = (props) => {
  const { match, subsystemAndBrake, dispatch } = props;
  const { train, setTrain } = useModel<useTrainModel>('train');
  const { brakingForce, brakeOperationStatusMonitoring, faultHistogram, faultPie, faultInfo } = subsystemAndBrake;
  const [trainCode, setTrainCode] = useState(match.params.id === ":id" ? train : match.params.id);
  const [coachCode, setCoachCode] = useState("Tc1")
  const [startTime, setStartTime] = useState((moment().day(moment().day() - 30).startOf('day')).format("YYYY-MM-DD"))
  const [endTime, setEndTime] = useState(moment(new Date()).format('YYYY-MM-DD'))
  // const [time, setTime] = useState(0)

  const clickQuery = (event: { trainCode: string }) => {
    setTrainCode(event);
    setTrain(event);
  };

  useEffect(() => {
    dispatch({
      type: "subsystemAndBrake/fetchBrakingForce",
      payload: {
        trainCode,
        coachCode
      }
    });
    dispatch({
      type: "subsystemAndBrake/fetchBrakeOperationStatusMonitoring",
      payload: {
        trainCode,
        coachCode
      }
    });
    // dispatch({
    //   type: "subsystemAndBrake/fetchFaultHistogram",
    //   payload: {
    //     trainCode,
    //     startTime,
    //     endTime,
    //   }
    // });
    // dispatch({
    //   type: "subsystemAndBrake/fetchFaultPie",
    //   payload: {
    //     trainCode,
    //     startTime,
    //     endTime,
    //   }
    // });
    dispatch({
      type: "subsystemAndBrake/fetchFaultInfo",
      payload: {
        trainCode,
        startTime,
        endTime,
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
    let startTime = moment(event[0]).format('YY-MM-DD')
    setStartTime(startTime)
    // let endTime=moment(event[1]).format('YY-MM-DD')
    setEndTime(moment(event[1]).format('YY-MM-DD'))
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
  // }, [startTime])

  const [requestTime, setRequestTime] = useState(moment(new Date()).format('HH'))
  // useInterval(() => {
  //   setRequestTime(moment(new Date()).format('HH'))
  //   if (dispatch) {
  //     dispatch({
  //       type: 'subsystemAndTraction/fetchOperationStatusMonitoring',
  //       payload: {
  //         trainCode,
  //         coachCode,
  //       },
  //     });
  //   }
  // }, 72000000);

  // ???????????????????????????
  const brakeData: any[] = [];
  brakeData.push(
    {
      time: requestTime,
      type: '?????????????????????',
      value: brakingForce.electricBrakingCapacity,
    },
    {
      time: requestTime,
      type: '???????????????????????????',
      value: brakingForce.actualElectricBrakingCapacity,
    }
  )


  const fualtColumns = [
    {
      title: '??????',
      dataIndex: 'id',
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
            <Radio.Group onChange={onChangecoachCode} name="DCU" defaultValue="Tc1">
              <Radio value="Tc1">Tc1</Radio>
              <Radio value="Mp1">Mp1</Radio>
              <Radio value="M1">M1</Radio>
              <Radio value="M2">M2</Radio>
              <Radio value="Mp2">Mp2</Radio>
              <Radio value="Tc2">Tc2</Radio>
            </Radio.Group>
          </div>
        }
      >
        <Row gutter={16}>
          <Col xl={24} lg={12} sm={24} xs={24}>
            <StateSingnal data={brakeOperationStatusMonitoring} />
          </Col>
          {/* <Col xl={12} lg={12} sm={24} xs={24}>
            <Row gutter={16}></Row>
            <BrakeForce borderWidth={2} height={40} data={brakeData} />
          </Col> */}
          <Col xl={24} lg={12} sm={24} xs={24}>
            <StateParameter data={brakeOperationStatusMonitoring} />
          </Col>
        </Row>
      </Card>

      <Card title="????????????"
        bordered={false}
        className={styles.title}
        style={{
          // height: "25vh"
        }}
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
        <Row gutter={16}>
          <Col xl={24} lg={12} sm={24} xs={24}>
            {/* <div style={{ paddingTop: 16 }}> */}
              <WarnTable data={faultInfo.pageList} columns={fualtColumns} />
            {/* </div> */}
          </Col>
        </Row>
      </Card >

      {/*<Row gutter={16}>*/}
      {/*  <Col xl={8} lg={12} sm={24} xs={24}>*/}
      {/*    <Card*/}
      {/*      title="????????????"*/}
      {/*      bordered={false}*/}
      {/*      className={styles.title}*/}
      {/*      // style={{ marginTop: 16, }}*/}
      {/*    >*/}

      {/*      /!* <span> <Typography.Text>????????????</Typography.Text></span> *!/*/}
      {/*      <Pie*/}
      {/*        // animate={false}*/}
      {/*        borderWidth={2}*/}
      {/*        height={90}*/}
      {/*        data={faultPie}*/}
      {/*      />*/}

      {/*    </Card>*/}
      {/*  </Col>*/}
      {/*  <Col xl={16} lg={12} sm={24} xs={24}>*/}
      {/*    <Card bordered={false} title="??????????????????" className={styles.title}*/}
      {/*    >*/}

      {/*      <WarnTable*/}
      {/*      columns={faultTime}*/}
      {/*      />*/}
      {/*    </Card>*/}
      {/*  </Col>*/}
      {/*  /!* <Col xl={12} lg={12} sm={24} xs={24}>*/}
      {/*    <Card*/}
      {/*      title="????????????Top10"*/}
      {/*      bordered={false}*/}
      {/*      className={styles.title}*/}
      {/*      // style={{ marginTop: 16 }}*/}
      {/*    >*/}
      {/*      <WarnTable*/}
      {/*        columns={faultTime}*/}
      {/*      />*/}
      {/*    </Card>*/}
      {/*  </Col> *!/*/}
      {/*</Row>*/}

      {/* <div id="modelPrediction">
        <ModelPrediction />
      </div> */}
    </div>
  );
};

export default connect(
  ({
    subsystemAndBrake,
    // loading,
  }: {
    subsystemAndBrake: StateType;
    // loading: {
    //   effects: { [key: string]: boolean };
    //   models: {
    //     [key: string]: boolean;
    //   };
    // };
  }) => ({
    subsystemAndBrake,
    // loading: loading.effects['subsystemAndBrake/fetchFault'],
  }),
)(Brake);
