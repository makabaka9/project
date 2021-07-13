import { Card, Col, List, Row, Table, Typography, DatePicker } from 'antd';
import React, { FC, useState, useEffect } from "react";
import { GridContent } from '@ant-design/pro-layout';
import { connect, Dispatch } from 'umi';
// import LineCodeAndTrainCodeQuery from '@/components/LineCodeAndTrainCodeQuery';
import TrainSystemTable from './components/TrainSystemTable';
import TrainBasicInfo from './components/TrainBasicInfo';
import { StateType } from './model';
import { routerRedux } from 'dva/router';
import { TrainBasicInfoType } from './data.d';

import styles from './style.less';
import TrainChart from '@/pages/Whole/Comfort/components/TrainChart';
import RelationMap from './components/RelationMap';
import moment from 'moment';
import LineCodeAndTrainCodeQuery from './components/LineCodeAndTrainCodeQuery';

interface TrainsProps {
  match: {
    url: string;
    path: string;
    params: any;
  };
  monitorAndData: StateType;
  dispatch: Dispatch;
  loading: boolean;
  trainBasicList: TrainBasicInfoType;
}

export const Trains: FC<TrainsProps> = (props) => {
  const {
    match,
    dispatch,
    monitorAndData,
    // loading
  } = props;
  const { trainBasicList } = monitorAndData;
  const { RangePicker } = DatePicker;

  const [trainCode, setTrainCode] = useState(match.params.id === ":id" ? "509" : match.params.id);
  const [date, setDate] = useState((moment().month(moment().month() - 1).startOf('month')).format("YYYY-MM"));
  const [stateList, setStateList] = useState<Array<object>>([])

  const [lineCode, setLineCode] = useState('5');

  const onChange = (value: any) => {
    const dataTemp = moment(new Date(value)).format('YYYY-MM');
    setDate(dataTemp);
    const params = {
      startTime: moment(new Date(value)).format('YYYY-MM'),
      trainCode,
      lineCode,
    };
    // dispatch({
    //   type: 'statisticsAndFault/fetchFaultSystem',
    //   payload: params,
    // });


  }


  const trainData = {
    trainCode: '501',
    runState: 0,
    trainWorkCondition: 2,
    trainSpeed: 62.2,
    currentStation: '那洪站',
    nextStation: '立交桥站',
    totalMiles: 14141,
    track: 1,
    brake: 1,
    fastTrack: 1,
    keepBrakeRelieve: 1,
    direction: 0,
    driverCab: 1,
  }
  // const columns = [
  //   {
  //     title: '发生时间',
  //     dataIndex: 'time',
  //     key: 'time',
  //     align: 'left',
  //   },
  //   {
  //     title: '故障内容',
  //     dataIndex: 'fault',
  //     key: 'fault',
  //     align: 'center',
  //   },
  // ];
  // const data1 = [
  //   {
  //     time: '2020-10-12 11:14:15',
  //     fault: 'MP1车DCU	模块斩波管2保护',
  //   },
  //   {
  //     time: '2020-09-18 14:24:18',
  //     fault: 'MP1车DCU	牵引逆变器保护性封锁',
  //   },
  // ]
  const data = [
    'MP1车DCU	模块斩波管2保护',
    'MP1车DCU	牵引逆变器保护性封锁',
    'MP1车DCU	模块斩波管2保护',
  ]
  // 数据回放假数据
  const relationdata = [
    {
      year: "08:01",
      value: 3,
    },
    {
      year: "08:02",
      value: 4,
    },
    {
      year: "08:03",
      value: 3.5,
    },
    {
      year: "08:04",
      value: 5,
    },
    {
      year: "08:05",
      value: 4.9,
    },
    {
      year: "08:06",
      value: 6,
    },
    {
      year: "08:07",
      value: 7,
    },
    {
      year: "08:08",
      value: 9,
    },
    {
      year: "08:09",
      value: 13,
    },
    {
      year: "08:10",
      value: 3,
    },
    {
      year: "08:11",
      value: 4,
    },
    {
      year: "08:11",
      value: 3.5,
    },
    {
      year: "08:12",
      value: 5,
    },
    {
      year: "08:13",
      value: 4.9,
    },
    {
      year: "08:14",
      value: 6,
    },
    {
      year: "08:15",
      value: 7,
    },
    {
      year: "08:16",
      value: 9,
    },
    {
      year: "08:17",
      value: 13,
    },
    {
      year: "08:18",
      value: 4,
    },
    {
      year: "08:19",
      value: 3.5,
    },
    {
      year: "08:20",
      value: 5,
    },
    {
      year: "08:21",
      value: 4.9,
    },
    {
      year: "08:22",
      value: 6,
    },
    {
      year: "08:23",
      value: 7,
    },
    {
      year: "08:24",
      value: 9,
    },
    {
      year: "08:25",
      value: 13,
    },
  ];
  // console.log('trainBasicList',trainBasicList);
  useEffect(() => {
    dispatch({
      type: 'monitorAndData/fetchTrainBasic',
      payload: {
        trainCode: trainCode,
      },
    });
  }, []);

  const clickQuery = (event: { trainCode: string }) => {
    const varCode: string = event.trainCode === undefined ? trainCode : event.trainCode;
    setTrainCode(varCode)
    dispatch(routerRedux.push(`/Monitor/Trains/${varCode}`));
  }

  // const coachArray=["Tc1","Mp1"]
  // coachArray.forEach((item,index)=>{
  //   useEffect(() => {
  //     dispatch({
  //       type: "subsystemAndBrake/fetchBrakingForce",
  //       payload: {
  //         trainCode,
  //         coachCode:item
  //       }
  //     });
  //     dispatch({
  //       type: "subsystemAndBrake/fetchBrakeOperationStatusMonitoring",
  //       payload: {
  //         trainCode,
  //         coachCode:item
  //       }
  //     });
  //   }, []);
  // })



  // useEffect(() => {
  //   dispatch({
  //     type: "subsystemAndBrake/fetchBrakingForce",
  //     payload: {
  //       trainCode,
  //       coachCode
  //     }
  //   });
  //   dispatch({
  //     type: "subsystemAndBrake/fetchBrakeOperationStatusMonitoring",
  //     payload: {
  //       trainCode,
  //       coachCode
  //     }
  //   });
  // }, []);

  return (
    <GridContent>
      <React.Fragment>
        <Row gutter={16}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: -8, marginTop: -8 }}>
            <LineCodeAndTrainCodeQuery defaultTrainCode={trainCode} onSubmit={clickQuery} />
            {/* <LineCodeAndTrainCodeQuery /> */}
          </Col>
        </Row>
        <Card bordered={false}>
          {/* <TrainBasicInfo train={train == !null ? train : trainData} /> */}
          <Row>
            <Col xl={24} lg={12} sm={24} xs={24}>
              <TrainBasicInfo trainBasicList={trainBasicList} />
            </Col>
          </Row>
        </Card>
        <Card
          bordered={false}
          style={{
            marginBottom: 16,
          }}
        >
          <TrainSystemTable trainCode={trainCode} />
        </Card>
        <Row gutter={24}>
          <Col xl={24} lg={12} sm={24} xs={24}>
            <Card bordered={false} title='数据回放' className={styles.title} bodyStyle={{ padding: 0 }}>
              <RelationMap
                data={relationdata}
                height={100}
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
    monitorAndData,
    loading,
  }: {
    monitorAndData: any;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    monitorAndData,
    loading: loading.effects['monitorAndData/fetchBasic'],
  }),
)(Trains);
