import {
  Card,
  Row,
  Col,
  Radio,
  List,
  Typography,
  DatePicker,
  Space,
  Tag,
} from 'antd';
import React, { useState, useEffect } from 'react';
import { connect, Dispatch,useModel} from 'umi';
// import LineCodeAndTrainCodeQuery from '../components/LineCodeAndTrainCodeQuery';
import LineCodeAndTrainCodeQuery from '@/components/LineCodeAndTrainCodeQuery';
import moment from 'moment';
import { routerRedux } from 'dva/router';
import useInterval from '@/components/useInterval';
import ExportExcel from '@/components/exportExcel';
import stateGreenIcon from '@/assets/stateGreen.svg';
import stateGrayIcon from '@/assets/stateGray.svg';
import stateRedIcon from '@/assets/stateRed.svg';
import stateWarnIcon from '@/assets/stateWarn.svg';
import stateOrangeIcon from '@/assets/stateOrange.svg';
import { BatteryVoltageDataType, AuxiliaryStatusDataDataType } from './data.d';
import { StateType } from './model';
import WarnTable from './components/WarnTable';
import StateParameter from './components/StateParameter';
import Pie from './components/Pie';
import IntervalChart from './components/IntervalChart'
import styles from './style.less';
import WarnTopTable from './components/WarnTop';
import {useTrainModel} from '../../../models/train'

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
  subsystemAndPyrotechnic: StateType;
  batteryVoltage: BatteryVoltageDataType;
  auxiliaryStatusData: AuxiliaryStatusDataDataType;
  faultHistogram: Array<object>;
  faultPie: Array<object>;
  faultInfo: any;
}

const { RangePicker } = DatePicker;


const Assistance: React.FC<AssistanceProps> = (props) => {
  const { match, subsystemAndPyrotechnic, dispatch, } = props;
  const { train, setTrain } = useModel<useTrainModel>('train');
  const { detectorStatus, faultHistogram, faultPie, faultInfo } = subsystemAndPyrotechnic;

  const [trainCode, setTrainCode] = useState(match.params.id === ":id" ? train : match.params.id);
  const [coachCode, setCoachCode] = useState("Tc1")
  const [startTime, setStartTime] = useState((moment().day(moment().day()).startOf('day')).format("YYYY-MM-DD"))
  // const [endTime, setEndTime] = useState((moment().day(moment().day()).startOf('day')).format("YYYY-MM-DD HH:mm:ss"))
  const [time, setTime] = useState(0)

  const clickQuery = (event: { trainCode: string }) => {
    setTrainCode(event);
    setTrain(event);
    // dispatch(routerRedux.push(`/Subsystem/Assistance/${event.trainCode}`));
    // dispatch({
    //   type: "subsystemAndPyrotechnic/fetchBatteryVoltage",
    //   payload: {
    //     trainCode,
    //     coachCode
    //   }
    // });
    // dispatch({
    //   type: "subsystemAndPyrotechnic/fetchAuxiliaryStatusData",
    //   payload: {
    //     trainCode,
    //     coachCode
    //   }
    // });
    // dispatch({
    //   type: "subsystemAndPyrotechnic/fetchFaultHistogram",
    //   payload: {
    //     trainCode,
    //     startTime,
    //     endTime: new moment().format('YYYY-MM-DD'),
    //   }
    // });
    // dispatch({
    //   type: "subsystemAndPyrotechnic/fetchFaultPie",
    //   payload: {
    //     trainCode,
    //     startTime,
    //     endTime: new moment().format('YYYY-MM-DD'),
    //   }
    // });
    // dispatch({
    //   type: "subsystemAndPyrotechnic/fetchFaultInfo",
    //   payload: {
    //     trainCode,
    //     startTime,
    //     endTime: new moment().format('YYYY-MM-DD'),
    //   }
    // });
  };

  useEffect(() => {
    dispatch({
      type: "subsystemAndPyrotechnic/fetchDetectorStatus",
      payload: {
        trainCode,
        coachCode
      }
    });
    dispatch({
      type: "subsystemAndPyrotechnic/fetchFaultInfo",
      payload: {
        trainCode,
        startTime,
        endTime: new moment().format('YYYY-MM-DD'),
      }
    });
  }, [trainCode,coachCode]);

  const onChangecoachCode = (event: any) => {
    setCoachCode(event.target.value);
    // if (dispatch) {
    //   dispatch({
    //     type: 'subsystemAndPyrotechnic/fetchBatteryTemperature',
    //     payload: {
    //       trainCode,
    //       coachCode: event.target.value,
    //     },
    //   });
    // }
  };

  const onChangeTime = (event: any) => {
    setTime(event.target.value);
    const endTime = new Date();
    if (event.target.value === 0) {
      setStartTime((moment().day(moment().day() - 7).startOf('day')).format("YYYY-MM-DD"));
    } else if (event.target.value === 1) {
      setStartTime((moment().day(moment().day() - 30).startOf('day')).format("YYYY-MM-DD"));
    } else if (event.target.value === 2) {
      setStartTime((moment().day(moment().day() - 365).startOf('day')).format("YYYY-MM-DD"));
    } else {
      setStartTime((moment().day(moment().day() - 1095).startOf('day')).format("YYYY-MM-DD"));
    }
    // if (dispatch) {
    //   dispatch({
    //     type: 'subsystemAndPyrotechnic/fetchBatteryTemperature',
    //     payload: {
    //       trainCode,
    //       startTime,
    //       endTime,
    //     },
    //   });
    //   dispatch({
    //     type: 'subsystemAndPyrotechnic/fetchFaultHistogram',
    //     payload: {
    //       trainCode,
    //       startTime,
    //       endTime,
    //     },
    //   });
    //   dispatch({
    //     type: 'subsystemAndPyrotechnic/fetchFaultInfo',
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


  const [requestTime, setRequestTime] = useState(new moment().format('HH'))
  // useInterval(() => {
  //   setRequestTime(new moment().format('HH'))
  //   if (dispatch) {
  //     dispatch({
  //       type: 'subsystemAndPyrotechnic/fetchBatteryVoltage',
  //       payload: {
  //         trainCode,
  //         coachCode,
  //       },
  //     });
  //   }
  // }, 72000000);

  // ??????????????????
  const faultData1: any[] = [];
  for (let i = 1; i < 10; i += 1) {
    faultData1.push({
      id: '1',
      index: `${i}`,
      // site: "??????-?????????",
      faultCode: '8105',
      faultName: 'TC1????????????3????????????',
      faultLevel: '2',
      faultDesc: '??????????????????????????????????????????????????????',
      faultSolution: '????????????????????????????????????????????????',
      time: moment(new Date().getTime()).format('YYYY-MM-DD HH:MM:SS'),
    });
  }
  // ??????top10??????
  const faultData2: any[] = [];
  for (let i = 1; i < 10; i+=1) {
    faultData2.push({
      id: '1',
      faultCode: '7017',
      faultName: 'TC1???ACSU??????',
      faultLevel: '2',
      index: `${i}`,
    });
  }
  // ??????????????????
  const warningPie = [
    {
      type: '????????????',
      value: 27,
    },
    {
      type: '????????????',
      value: 25,
    },
    {
      type: '????????????',
      value: 18,
    },
  ];
  const faultColumns = [
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
      width: '10%',
    },
    {
      title: '????????????',
      dataIndex: 'faultName',
      key: 'faultName',
      align: 'center',
      width: '10%',
    },
    {
      title: '????????????',
      dataIndex: 'faultLevel',
      key: 'faultLevel',
      width: '10%',
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
      width: '20%',
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
  const fualtTopColumns = [
    {
      title: '??????',
      dataIndex: 'id',
      key: 'index',
      align: 'center',
      width: '5%',
    },
    {
      title: '????????????',
      dataIndex: 'faultName',
      key: 'faultName',
      align: 'center',
      width: '10%',
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
      dataIndex: 'faultLevel',
      key: 'faultLevel',
      align: 'center',
      width: '10%',
    },
    {
      title: '????????????',
      dataIndex: 'index',
      key: 'index',
      align: 'center',
      width: '5%',
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
              {/* <Radio.Group value={time} onChange={onChangeTime} defaultValue={0}>
                <Radio value={0}>????????????</Radio>
                <Radio value={1}>????????????</Radio>
                <Radio value={2}>????????????</Radio>
                <Radio value={3}>??????</Radio>
              </Radio.Group> */}
              <RangePicker showTime />
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
          </Row>
        }
        extra={
          <div>
            ?????????<img src={stateGreenIcon} className={styles.iconTop} alt='' />
            ?????????<img src={stateRedIcon} className={styles.iconTop} alt='' />
            ???????????????<img src={stateWarnIcon} className={styles.iconTop} alt='' />
            ?????????<img src={stateOrangeIcon} className={styles.iconTop} alt='' />
            ???????????????<img src={stateGrayIcon} className={styles.iconTop} alt='' /> &emsp;&emsp;
            {/* <Radio.Group onChange={onChangecoachCode} name="FAS" defaultValue="Tc1">
              <Radio value="Tc1">Tc1</Radio>
              <Radio value="Tc2">Tc2</Radio>
            </Radio.Group> */}
          </div>
        }
      >
        <StateParameter
            detectorStatusData={detectorStatus?.Tc1}
        />
      </Card>


      <Card title="????????????"
        bordered={false}
        style={{ height: "34vh" }}
        className={styles.title}
        extra={
          <ExportExcel
            fileName='???????????????'
            sheetData={faultInfo.pageList}
            sheetName='sheet'
            sheetHeader={['?????????', '????????????', '????????????', '????????????', '????????????', '??????????????????', '????????????',]}
            sheetFilter={[]}
          />
        }
      >
        <WarnTable data={faultInfo.pageList} columns={faultColumns} />
      </Card>
      {/*<Row gutter={16}>*/}
      {/*  <Col xl={10} lg={12} sm={24} xs={24}>*/}
      {/*    <Card*/}
      {/*      title="????????????"*/}
      {/*      bordered={false}*/}
      {/*      className={styles.title}*/}
      {/*    >*/}
      {/*      <Pie*/}
      {/*        // animate={false}*/}
      {/*        borderWidth={2}*/}
      {/*        height={120}*/}
      {/*        data={warningPie}*/}
      {/*      />*/}
      {/*    </Card>*/}
      {/*  </Col>*/}
      {/*  <Col xl={14} lg={12} sm={24} xs={24}>*/}
      {/*    <Card*/}
      {/*      title="??????????????????"*/}
      {/*      bordered={false}*/}
      {/*      className={styles.title}*/}
      {/*    >*/}
      {/*      <WarnTopTable data={faultData2} columns={fualtTopColumns} />*/}
      {/*    </Card>*/}
      {/*  </Col>*/}
      {/*</Row>*/}

    </div>

  );
};
// }

export default connect(
  ({
    subsystemAndPyrotechnic,
    loading,
  }: {
    subsystemAndPyrotechnic: BatteryTemperatureDataType;
    loading: {
      effects: { [key: string]: boolean };
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    subsystemAndPyrotechnic,
    loading: loading.effects['subsystemAndPyrotechnic/fetchFault'],
  }),
)(Assistance);
