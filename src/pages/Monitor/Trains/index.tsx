import { Card, Col, List, Row, Table, Typography } from 'antd';
import React, { FC, useState, useEffect } from "react";
import { GridContent } from '@ant-design/pro-layout';
import { connect, Dispatch,useModel } from 'umi';
import LineCodeAndTrainCodeQuery from '@/components/LineCodeAndTrainCodeQuery';
import TrainSystemTable from './components/TrainSystemTable';
import TrainBasicInfo from './components/TrainBasicInfo';
import { StateType } from './model';
import { routerRedux } from 'dva/router';
import { TrainBasicInfoType } from './data.d';

import styles from './style.less';
import TrainChart from '@/pages/Whole/Comfort/components/TrainChart';
import useInterval from '@/components/useInterval';

interface TrainsProps {
  match: {
    url: string;
    path: string;
    params: any;
  };
  monitorAndTrains: StateType;
  dispatch: Dispatch;
  loading: boolean;
  trainBasicList: TrainBasicInfoType;
}

export const Trains: FC<TrainsProps> = (props) => {
  const {
    match,
    dispatch,
    monitorAndTrains,
    // loading
  } = props;
  const { trainBasicList } = monitorAndTrains;
  const { train, setTrain } = useModel<useTrainModel>('train');
  const [trainCode, setTrainCode] = useState(match.params.id === ":id" ? train : match.params.id);
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
  const data1 = [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ];
  // console.log('trainBasicList',trainBasicList);
  useEffect(() => {
    dispatch({
      type: 'monitorAndTrains/fetchTrainBasic',
      payload: {
        trainCode: trainCode,
      },
    });
  }, []);

  const clickQuery = (event: { trainCode: string }) => {
    const varCode: string = event === undefined ? trainCode : event;
    setTrainCode(varCode);
    setTrain(varCode);
    dispatch({
      type: 'monitorAndTrains/fetchTrainBasic',
      payload: {
        trainCode: varCode,
      },
    });
    dispatch({
      type: 'monitorAndTrains/fetchTrainImportant',
      payload: {
        trainCode: varCode,
      },
    });
  }
  useInterval(() => {
    if (dispatch) {
      dispatch({
        type: 'monitorAndTrains/fetchTrainBasic',
        payload: {
          trainCode,
        },
      });
    }
  }, 1200);
  useInterval(() => {
    if (dispatch) {
      dispatch({
        type: 'monitorAndTrains/fetchTrainImportant',
        payload: {
          trainCode,
        },
      });
    }
  }, 1200);
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
        <div>
          <Row gutter={24}>
            <Col xl={24} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: -8, marginTop: -8 }}>
              <LineCodeAndTrainCodeQuery
                defaultTrainCode={trainCode}
                onSubmit={clickQuery} />
            </Col>
          </Row>
        </div>
        <Card bordered={false}>
          {/* <TrainBasicInfo train={train == !null ? train : trainData} /> */}
          <Row>
            <Col xl={24} lg={12} sm={24} xs={24}>
              <TrainBasicInfo trainBasicList={trainBasicList} />
            </Col>
            {/* <Col xl={8} lg={12} sm={24} xs={24}> */}
            {/* <h1>故障信息</h1> */}
            {/* <Table
                className={styles.system}
                columns={columns}
                dataSource={data1}
                bordered
                size="middle"
                pagination={false}
              // scroll={{ x: 'calc(700px + 50%)', y: 600 }}
              /> */}


            {/* <List
                size="small"
                header={<div>故障信息</div>}
                bordered
                dataSource={data}
                renderItem={item => (
                  <List.Item>
                    <Typography.Text mark>[2020-10-12 11:14:15]</Typography.Text> {item}
                  </List.Item>
                )}
              /> */}
            {/* </Col> */}
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
      </React.Fragment>
    </GridContent>
  );
};

export default connect(
  ({
    monitorAndTrains,
    loading,
  }: {
    monitorAndTrains: any;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    monitorAndTrains,
    loading: loading.effects['monitorAndTrains/fetchBasic'],
  }),
)(Trains);
