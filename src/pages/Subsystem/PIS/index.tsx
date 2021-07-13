import {
  Card,
  Row,
  Col,
  Radio,
  List,
  Typography,
  DatePicker,
  Descriptions,
  Space,
  Tag,
} from 'antd';
import React, { useState, useEffect } from 'react';
import { connect, Dispatch,useModel } from 'umi';
// import LineCodeAndTrainCodeQuery from '../components/LineCodeAndTrainCodeQuery';
import LineCodeAndTrainCodeQuery from '@/components/LineCodeAndTrainCodeQuery';
import moment from 'moment';
import { routerRedux } from 'dva/router';
import useInterval from '@/components/useInterval';
import ExportExcel from '@/components/exportExcel';
import { BatteryVoltageDataType, AuxiliaryStatusDataDataType } from './data.d';
import { StateType } from './model';
import WarnTable from './components/WarnTable';
import StateParameter from './components/StateParameter';
import Pie from './components/Pie';
import styles from './style.less';
import IntervalChart from './components/IntervalChart';
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
  subsystemAndPIS: StateType;
  batteryVoltage: BatteryVoltageDataType;
  auxiliaryStatusData: AuxiliaryStatusDataDataType;
  faultHistogram: Array<object>;
  faultPie: Array<object>;
  faultInfo: any;
}

const { RangePicker } = DatePicker;


const Assistance: React.FC<AssistanceProps> = (props) => {
  const { match, subsystemAndPIS, dispatch, } = props;
  const { train, setTrain } = useModel<useTrainModel>('train');
  const { pisStatusData, faultHistogram, faultPie, faultInfo } = subsystemAndPIS;

  const [trainCode, setTrainCode] = useState(match.params.id === ":id" ? train : match.params.id);
  const [coachCode, setCoachCode] = useState("Tc1")
  const [startTime, setStartTime] = useState((moment().day(moment().day()).startOf('day')).format("YYYY-MM-DD"))
  // const [endTime, setEndTime] = useState((moment().day(moment().day()).startOf('day')).format("YYYY-MM-DD HH:mm:ss"))
  const [time, setTime] = useState(0)

  const clickQuery = (event: { trainCode: string }) => {
    setTrainCode(event);
    setTrain(event);
    // dispatch({
    //   type: "subsystemAndPIS/fetchBatteryVoltage",
    //   payload: {
    //     trainCode,
    //     coachCode
    //   }
    // });
    // dispatch({
    //   type: "subsystemAndPIS/fetchAuxiliaryStatusData",
    //   payload: {
    //     trainCode,
    //     coachCode
    //   }
    // });
    // dispatch({
    //   type: "subsystemAndPIS/fetchFaultHistogram",
    //   payload: {
    //     trainCode,
    //     startTime,
    //     endTime: new moment().format('YYYY-MM-DD'),
    //   }
    // });
    // dispatch({
    //   type: "subsystemAndPIS/fetchFaultPie",
    //   payload: {
    //     trainCode,
    //     startTime,
    //     endTime: new moment().format('YYYY-MM-DD'),
    //   }
    // });
    // dispatch({
    //   type: "subsystemAndPIS/fetchFaultInfo",
    //   payload: {
    //     trainCode,
    //     startTime,
    //     endTime: new moment().format('YYYY-MM-DD'),
    //   }
    // });
  };

  useEffect(() => {
    dispatch({
      type: "subsystemAndPIS/fetchPisStatus",
      payload: {
        trainCode,
        coachCode
      }
    });
    // dispatch({
    //   type: "subsystemAndPIS/fetchFaultHistogram",
    //   payload: {
    //     trainCode,
    //     startTime,
    //     endTime: new moment().format('YYYY-MM-DD'),
    //   }
    // });
    // dispatch({
    //   type: "subsystemAndPIS/fetchFaultPie",
    //   payload: {
    //     trainCode,
    //     startTime,
    //     endTime: new moment().format('YYYY-MM-DD'),
    //   }
    // });
    dispatch({
      type: "subsystemAndPIS/fetchFaultInfo",
      payload: {
        trainCode,
        startTime,
        endTime: new moment().format('YYYY-MM-DD'),
      }
    });
  }, [trainCode,coachCode]);
useEffect(()=>{
  console.log(pisStatusData);
},[pisStatusData]);
  const onChangecoachCode = (event: any) => {
    setCoachCode(event.target.value);
    // if (dispatch) {
    //   dispatch({
    //     type: 'subsystemAndPIS/fetchBatteryTemperature',
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
    //     type: 'subsystemAndPIS/fetchBatteryTemperature',
    //     payload: {
    //       trainCode,
    //       startTime,
    //       endTime,
    //     },
    //   });
    //   dispatch({
    //     type: 'subsystemAndPIS/fetchFaultHistogram',
    //     payload: {
    //       trainCode,
    //       startTime,
    //       endTime,
    //     },
    //   });
    //   dispatch({
    //     type: 'subsystemAndPIS/fetchFaultInfo',
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
  useInterval(() => {
    setRequestTime(new moment().format('HH'))
    if (dispatch) {
      dispatch({
        type: 'subsystemAndPIS/fetchBatteryVoltage',
        payload: {
          trainCode,
          coachCode,
        },
      });
    }
  }, 72000000);

  // 故障信息数据
  const faultData1: any[] = [];
  for (let i = 1; i < 10; i += 1) {
    faultData1.push({
      id: '1',
      index: `${i}`,
      // site: "南宁-那洪战",
      faultCode: '7017',
      faultName: 'TC1车ACSU故障',
      faultLevel: '2',
      faultDesc: '司机室广播主机1故障（含主机内模块），系统进入冗余模式',
      faultSolution: '列车结束运营回库后进行更换。',
      time: moment(new Date().getTime()).format('YYYY-MM-DD HH:MM:SS'),
    });
  }
  // 故障top10数据
  const faultData2: any[] = [];
  for (let i = 1; i < 10; i+=1) {
    faultData2.push({
      id: '1',
      faultCode: '7017',
      faultName: 'TC1车ACSU故障',
      faultLevel: '2',
      index: `${i}`,
    });
  }

  // 分级故障数据
  const warningPie = [
    {
      type: '一级故障',
      value: 27,
    },
    {
      type: '二级故障',
      value: 25,
    },
    {
      type: '三级故障',
      value: 18,
    },
  ];


  const faultColumns = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'index',
      align: 'center',
      width: '5%',
    },
    {
      title: '故障代码',
      dataIndex: 'faultCode',
      key: 'faultCode',
      align: 'center',
      width: '5%',
    },
    {
      title: '故障名称',
      dataIndex: 'faultName',
      key: 'faultName',
      align: 'center',
      width: '10%',
    },
    {
      title: '故障等级',
      dataIndex: 'faultLevel',
      key: 'faultLevel',
      width: '5%',
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: '5%',
      align: 'center',
      render: (_, row: any) => (
        <Space>
          {row.status === 1 ? <Tag color="red">未处理</Tag> : "已处理"}
        </Space>
      ),
    },
    {
      title: '故障描述',
      dataIndex: 'faultDesc',
      key: 'faultDesc',
      width: '20%',
      align: 'center',
    },
    {
      title: '故障解决方案',
      dataIndex: 'faultSolution',
      key: 'faultSolution',
      width: '25%',
      align: 'center',
    },
    {
      title: '发生时间',
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
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      align: 'center',
      width: '5%',
    },
    {
      title: '故障代码',
      dataIndex: 'faultCode',
      key: 'faultCode',
      align: 'center',
      width: '5%',
    },
    {
      title: '故障名称',
      dataIndex: 'faultName',
      key: 'faultName',
      align: 'center',
      width: '10%',
    },
    {
      title: '故障等级',
      dataIndex: 'faultLevel',
      key: 'faultLevel',
      align: 'center',
      width: '10%',
    },
    {
      title: '故障次数',
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
                <Radio value={0}>最近一周</Radio>
                <Radio value={1}>最近一月</Radio>
                <Radio value={2}>最近一年</Radio>
                <Radio value={3}>全部</Radio>
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
              <div>运行状态监控&emsp;&emsp;</div>
            </Col>
          </Row>
        }
        extra={
          <div>
            <Radio.Group onChange={onChangecoachCode} name="FAS" defaultValue="Tc1">
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
        {/*<Descriptions*/}
        {/*  // bordered*/}
        {/*  // size="middle"*/}
        {/*  // title="Custom Size"*/}
        {/*  column={8}*/}
        {/*>*/}
        {/*  <Descriptions.Item label="起点站">那洪站</Descriptions.Item>*/}
        {/*  <Descriptions.Item label="终点站">金桥客运站</Descriptions.Item>*/}
        {/*  <Descriptions.Item label="当前站">广西大学站</Descriptions.Item>*/}
        {/*</Descriptions>*/}

        <StateParameter
            pisStatusData={pisStatusData}
        />
      </Card>


      <Card title="故障信息"
        bordered={false}
        style={{ height: "34vh" }}
        className={styles.title}
        extra={
          <ExportExcel
            fileName='故障信息表'
            sheetData={faultInfo.pageList}
            sheetName='sheet'
            sheetHeader={['序号', '故障代码', '故障名称', '故障等级', '故障描述', '故障解决方案', '发生时间',]}
            sheetFilter={[]}
          />
        }
      >
        <WarnTable data={faultInfo.pageList} columns={faultColumns} />
      </Card>

      {/*<Row gutter={16}>*/}
      {/*  <Col xl={10} lg={12} sm={24} xs={24}>*/}
      {/*    <Card*/}
      {/*      title="故障统计"*/}
      {/*      bordered={false}*/}
      {/*      className={styles.title}*/}
      {/*    >*/}
      {/*      <Pie*/}
      {/*        // animate={false}*/}
      {/*        borderWidth={2}*/}
      {/*        height={120}*/}
      {/*        data={warningPie}*/}
      {/*      />*/}

      {/*      /!* <Col xl={12} lg={12} sm={24} xs={24}>*/}
      {/*      /!* <span> <Typography.Text>故障统计</Typography.Text></span> *!/*/}
      {/*      /!* <IntervalChart height={160} />*/}
      {/*    </Col> *!/*/}
      {/*      /!* <Col xl={8} lg={12} sm={24} xs={24}>*/}
      {/*      <List*/}
      {/*        size="small"*/}
      {/*        header={<div>预测诊断</div>}*/}
      {/*        bordered*/}
      {/*        dataSource={data}*/}
      {/*        renderItem={item => (*/}
      {/*          <List.Item>*/}
      {/*            <Typography.Text mark>[2020-10-12 11:14:15]</Typography.Text> {item}*/}
      {/*          </List.Item>*/}
      {/*        )}*/}
      {/*      />*/}
      {/*    </Col> *!/*/}

      {/*    </Card>*/}
      {/*  </Col>*/}
      {/*  <Col xl={14} lg={12} sm={24} xs={24}>*/}
      {/*    <Card*/}
      {/*      title="故障发生排序"*/}
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
    subsystemAndPIS,
    loading,
  }: {
    subsystemAndPIS: BatteryTemperatureDataType;
    loading: {
      effects: { [key: string]: boolean };
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    subsystemAndPIS,
    loading: loading.effects['subsystemAndPIS/fetchFault'],
  }),
)(Assistance);
