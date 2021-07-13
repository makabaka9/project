import React, { useState, useEffect } from 'react';
import ExportJsonExcel from 'js-export-excel';
import { Card, Row, Col, Radio, Space, Tag, Descriptions, Divider, Modal, Statistic, DatePicker, List, Typography } from 'antd';
// import { PageHeaderWrapper } from '@ant-design/pro-layout';
import LineCodeAndTrainCodeQuery from '@/components/LineCodeAndTrainCodeQuery';
import styles from './style.less';
import TemperatureMap from './components/TemperatureMap';
import StateParameter from './components/StateParameter';
import WarnTable from './components/WarnTable';
import FaultMap from './components/FaultMap';
import GroupedColumn from './components/GroupedColumn';
import { connect, Dispatch,useModel } from 'umi';
import { StateType } from './model';
import { routerRedux } from 'dva/router';
import moment from 'moment';
import { TemperatureEnergyDataType, MonitorDataType } from './data';
import StateSingnal from './components/StateSingnal';
import useInterval from '@/components/useInterval';
import getProfileBasicData from './fake'
import ExportExcel from '@/components/exportExcel';
import WarningPie from './components/WarningPie';
import InfiniteScroll from 'react-infinite-scroller';

const { RangePicker } = DatePicker;

interface AirConditionerProps {
  match: {
    url: string;
    path: string;
    params: any;
  };
  location: {
    pathname: string;
  };
  dispatch: Dispatch;
  subsystemAndAirConditioner: StateType;
  monitor: MonitorDataType;
  temperatureEnergy: TemperatureEnergyDataType;
  faultNumber: Array<object>;
  faultInfo: any;
  loading: boolean;

}

const AirConditioner: React.FC<AirConditionerProps> = (props) => {
  const { match, subsystemAndAirConditioner, dispatch, loading } = props;
  const { train, setTrain } = useModel<useTrainModel>('train');
  const { monitor, temperatureEnergy, faultNumber, faultInfo } = subsystemAndAirConditioner;

  // const temperatureEnergy1 = {
  //   insideTemperature: 219,
  //   unitEnergyConsumption1: 800,
  //   unitEnergyConsumption2: 1
  // }
  // new moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'))
  // const [requestTime, setRequestTime] = useState((moment().day(moment().day()).startOf('day')).format("yyyy-MM-DD HH:SS"))
  // const [requestTime, setRequestTime] = useState(moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'))
  const [requestTime, setRequestTime] = useState(new moment().format('HH'))
  useInterval(() => {
    setRequestTime(new moment().format('HH'))
    if (dispatch) {
      dispatch({
        type: 'subsystemAndAirConditioner/fetchTemperatureEnergy',
        payload: {
          trainCode,
          coachCode,
        },
      });
    }
  }, 72000000);
  const energyTemperature: any[] = [];
  energyTemperature.push(
    {
      time: requestTime,
      type: '车内温度',
      value: temperatureEnergy.insideTemperature,
    },
    {
      time: requestTime,
      type: '机组1能耗',
      value: temperatureEnergy.unitEnergyConsumption1,
    },
    {
      time: requestTime,
      type: '机组2能耗',
      value: temperatureEnergy.unitEnergyConsumption2,
    },
  )



  const [trainCode, setTrainCode] = useState(match.params.id === ":id" ? train : match.params.id);
  const [coachCode, setCoachCode] = useState("Tc1")
  const [startTime, setStartTime] = useState((moment().day(moment().day() - 30).startOf('day')).format("YYYY-MM-DD"))
  const [endTime, setEndTime] = useState((moment().day(moment().day()).startOf('day')).format("YYYY-MM-DD"))
  // const [time, setTime] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  // 列车号联通后端
  const clickQuery = (event: { trainCode: string }) => {
    // console.log('event',event)
    setTrainCode(event);
    setTrain(event);
    // console.log(event);
    // dispatch(routerRedux.push(`/Subsystem/AirConditioner/${event}`));
    // dispatch({
    //   type: 'subsystemAndAirConditioner/fetchMonitor',
    //   payload: {
    //     trainCode,
    //     coachCode,
    //   },
    // });
    // dispatch({
    //   type: "subsystemAndAirConditioner/fetchFaultNumber",
    //   payload: {
    //     trainCode,
    //     startTime,
    //     endTime: moment(new Date()).format('YYYY-MM-DD'),
    //   },
    // });
    // dispatch({
    //   type: 'subsystemAndAirConditioner/fetchTemperatureEnergy',
    //   payload: {
    //     trainCode,
    //     coachCode,
    //   },
    // });
    // dispatch({
    //   type: "subsystemAndAirConditioner/fetchFaultInfo",
    //   payload: {
    //     trainCode,
    //     startTime,
    //     endTime: moment(new Date()).format('YYYY-MM-DD'),
    //     pageNo: 1,
    //     pageSize: 10
    //   },
    // });
  };


  const openModal = (event: any) => {
    setModalVisible(true);
  };

  const handleOk = (event: any) => {
    setModalVisible(false);
  };

  useEffect(() => {
    console.log("fetch"+ trainCode);
    dispatch({
      type: 'subsystemAndAirConditioner/fetchMonitor',
      payload: {
        trainCode,
        coachCode,
      },
    });
    // dispatch({
    //   type: "subsystemAndAirConditioner/fetchFaultNumber",
    //   payload: {
    //     trainCode,
    //     startTime,
    //     endTime: moment(new Date()).format('YYYY-MM-DD'),
    //   },
    // });
  }, [trainCode,coachCode]);

  useEffect(() => {
    dispatch({
      type: 'subsystemAndAirConditioner/fetchTemperatureEnergy',
      payload: {
        trainCode,
        coachCode,
      },
    });
  }, [trainCode,coachCode]);

  useEffect(() => {
    dispatch({
      type: "subsystemAndAirConditioner/fetchFaultInfo",
      payload: {
        trainCode,
        startTime,
        endTime: moment(new Date()).format('YYYY-MM-DD'),
        pageNo: 1,
        pageSize: 10
      },
    });
  }, [trainCode]);

  const onChangeCoachCode = (event: any) => {
    setCoachCode(event.target.value);
    // if (dispatch) {
    //   dispatch({
    //     type: 'subsystemAndAirConditioner/fetchMonitor',
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
    // setTime();
    // const endTime = new Date();
    // if (event.target.value === 0) {
    //   setStartTime((moment().day(moment().day() - 1).startOf('day')).format("YYYY-MM-DD"))
    // } else if (event.target.value === 1) {
    //   setStartTime((moment().day(moment().day() - 7).startOf('day')).format("YYYY-MM-DD"))
    // } else if (event.target.value === 2) {
    //   setStartTime((moment().day(moment().day() - 30).startOf('day')).format("YYYY-MM-DD"))
    // } else {
    //   setStartTime((moment().day(moment().day() - 365).startOf('day')).format("YYYY-MM-DD"))
    // }
  };
  // useEffect(() => {
  //   dispatch({
  //     type: 'subsystemAndAirConditioner/fetchTemperatureEnergy',
  //     payload: {
  //       trainCode,
  //       startTime,
  //       endTime
  //       // endTime: new moment().format('YYYY-MM-DD'),
  //     },
  //   },
  //   );
  //   dispatch({
  //     type: 'subsystemAndAirConditioner/fetchFaultNumber',
  //     payload: {
  //       trainCode,
  //       startTime,
  //       endTime
  //       // endTime: new moment().format('YYYY-MM-DD'),
  //     },
  //   },
  //   );
  //   dispatch({
  //     type: 'subsystemAndAirConditioner/fetchFaultInfo',
  //     payload: {
  //       trainCode,
  //       startTime,
  //       endTime,
  //       // endTime: new moment().format('YYYY-MM-DD'),
  //       pageNo: 1,
  //       pageSize: 10,
  //     },
  //   },
  //   );
  // }, [startTime])

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
      width: '5%',
      align: 'center',
    },
    {
      title: '故障名称',
      dataIndex: 'faultName',
      key: 'faultName',
      width: '10%',
      align: 'center',
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
      width: "5%",
      align: 'center',
      render: (_, row: any) => (
        <Space>
          {row.status === 1 ? <Tag style={{ color: "red" }}>未处理</Tag> : "已处理"}
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
    // {
    //   title: '故障描述与故障解决方案',
    //   // dataIndex: 'faultSolution',
    //   // key: 'faultSolution',
    //   width: "25%",
    //   align: 'center',
    //   render: (_, row: any) => (
    //     <>
    //       <a onClick={openModal}>查看详情</a>
    //       <Modal
    //         title="故障描述与故障解决方案"
    //         visible={modalVisible}
    //         onOk={handleOk}
    //         closable={false}
    //         // cancelText=" "
    //         onCancel={handleOk}
    //       >
    //         <p
    //         // style={{ borderWidth: "1px", borderStyle: "silid", borderColor: "#fff"}}
    //         >故障描述：&nbsp;{row.faultDesc}</p>
    //         <p style={{ borderWidth: "1px" }}>故障解决方案：&nbsp;{row.faultSolution}</p>
    //       </Modal>
    //       <Divider type="vertical" />
    //     </>
    //   ),
    // },
    {
      title: '发生时间',
      dataIndex: 'startTime',
      key: 'startTime',
      width: "10%",
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
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      width: '5%',
      align: 'center',
    },
    {
      title: '故障名称',
      dataIndex: 'faultName',
      key: 'faultName',
      width: '15%',
      align: 'center',
    },
    {
      title: '故障代码',
      dataIndex: 'faultCode',
      key: 'faultCode',
      width: '5%',
      align: 'center',
    },
    {
      title: '故障等级',
      dataIndex: 'faultLevel',
      key: 'faultLevel',
      width: '5%',
      align: 'center',
    },
    {
      title: '故障次数',
      dataIndex: 'number',
      key: 'number',
      width: '5%',
      align: 'center',
    },
  ];
  const listData = [
    { faultCode: 1021, faultName: '你是一条经常发生的故障', faultLevel: "二级故障", number: 5 },
    { faultCode: 1021, faultName: '你是一条经常发生的故障', faultLevel: "二级故障", number: 5 },
    { faultCode: 1021, faultName: '你是一条经常发生的故障', faultLevel: "二级故障", number: 5 },
    { faultCode: 1021, faultName: '你是一条经常发生的故障', faultLevel: "二级故障", number: 5 },
    { faultCode: 1021, faultName: '你是一条经常发生的故障', faultLevel: "二级故障", number: 5 },
    { faultCode: 1021, faultName: '你是一条经常发生的故障', faultLevel: "二级故障", number: 5 },
    { faultCode: 1021, faultName: '你是一条经常发生的故障', faultLevel: "二级故障", number: 5 },
    { faultCode: 1021, faultName: '你是一条经常发生的故障', faultLevel: "二级故障", number: 5 },
    { faultCode: 1021, faultName: '你是一条经常发生的故障', faultLevel: "二级故障", number: 5 },
    { faultCode: 1021, faultName: '你是一条经常发生的故障', faultLevel: "二级故障", number: 5 },

  ]
  return (
    <div>
      <Row gutter={24}>
        <Col xl={16} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: -8, marginTop: -8 }}>
          <span >
            <LineCodeAndTrainCodeQuery defaultTrainCode={trainCode} onSubmit={clickQuery} />
          </span>
        </Col>
        <Col xl={8} lg={24} md={24} sm={24} xs={24} >
          <span style={{ float: 'right' }}>
            <RangePicker
              // showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD"
              onChange={onChangeTime}
              onOk={onChangeTime}
            />
            {/* <Radio.Group value={time} onChange={onChangeTime}
              defaultValue={0}
            >
              <Radio value={0}>最近一日</Radio>
              <Radio value={1}>最近一周</Radio>
              <Radio value={2}>最近一月</Radio>
              <Radio value={3}>最近一年</Radio>
            </Radio.Group> */}
          </span>
        </Col>
      </Row>
      <Card
        bordered={false}
        className={styles.title}
        // style={{ paddingTop: 0, marginBottom: 16 }}
        title="运行状态监控"
        // extra={<AirConditionerMap />}
        extra={
          <Radio.Group onChange={onChangeCoachCode} defaultValue="Tc1" value={coachCode}>
            <Radio value="Tc1">Tc1</Radio>
            <Radio value="Mp1">Mp1</Radio>
            <Radio value="M1">M1</Radio>
            <Radio value="M2">M2</Radio>
            <Radio value="Mp2">Mp2</Radio>
            <Radio value="Tc2">Tc2</Radio>
          </Radio.Group>
        }
      >
        <Row gutter={16}>
          <Col xl={2} lg={12} sm={24} xs={24}>
            <Statistic title="设定温度(°C)" value={monitor ? monitor.setTemperature : "--" } />
          </Col>
          <Col xl={2} lg={12} sm={24} xs={24}>
            <Statistic title="车内温度(°C)" value={monitor ? (monitor.inTemperature*0.1).toFixed(1) : "--" } />
          </Col>
          <Col xl={2} lg={12} sm={24} xs={24}>
            <Statistic title="车外温度(°C)" value={monitor ? (monitor.outTemperature*0.1).toFixed(1): "--" } />
          </Col>
          <Col xl={2} lg={12} sm={24} xs={24}>
            <Statistic title="机组1能耗(kWh)" value={monitor ? monitor.unit1EnergyConsumption : "--" } />
          </Col>
          <Col xl={2} lg={12} sm={24} xs={24}>
            <Statistic title="机组2能耗(kWh)" value={monitor ? monitor.unit2EnergyConsumption : "--"} />
          </Col>
          <Col xl={14} lg={12} sm={24} xs={24}>
            <div style={{ paddingBottom: 16 }}>
              <StateSingnal data={monitor} />
            </div>
          </Col>
          <Col xl={24} lg={12} sm={24} xs={24}>
            {/* <div style={{ padding: 16 }}> */}
            <StateParameter data={monitor} />
            {/* </div> */}
          </Col>

        </Row>
      </Card>
      {/* <Card
        bordered={false}
        style={{ paddingBottom: 0 }}
        className={styles.title}
        title="故障与预警"
      >
        <Row gutter={16}>
          <Col xl={8} lg={12} sm={24} xs={24}>
            <FaultMap />
          </Col>
          <Col xl={16} lg={12} sm={24} xs={24}>
            {/* <Row>
              <Col xl={24}
                lg={12}
                sm={24}
                xs={24} > */}
      {/* <GroupedColumn
              borderWidth={2}
              height={80}
              data={faultNumber} /> */}
      {/* </Col> */}
      <Card bordered={false} title="故障信息" style={{ "width": "100%", marginBottom: 16 }}
        extra={
          <ExportExcel
            fileName='故障信息表'
            sheetData={faultInfo.pageList}
            sheetName='sheet'
            sheetHeader={['列车号', '故障代码', '故障名称', '故障等级', '状态', '故障描述与故障解决方案', '发生时间']}
            sheetFilter={[]}
          />
        }>
        {/* <Col xl={24} lg={12} sm={24} xs={24}> */}
        <WarnTable data={faultInfo.pageList} columns={faultColumns} />
        {/* </Col>
            </Row> */}
      </Card>

      {/*<Row>*/}
      {/*  <Col xl={8} lg={12} sm={24} xs={24}>*/}
      {/*    <Card bordered={false} title="故障统计" style={{ marginRight: 16 }}*/}
      {/*    >*/}
      {/*      <WarningPie*/}
      {/*        height={90}*/}
      {/*        data={faultNumber}*/}
      {/*      />*/}
      {/*    </Card>*/}
      {/*  </Col>*/}
      {/*  <Col xl={16} lg={12} sm={24} xs={24}>*/}
      {/*    <Card bordered={false} title="故障发生排序" className={styles.title}*/}
      {/*    >*/}

      {/*      <WarnTable*/}
      {/*        columns={faultTime}*/}
      {/*      />*/}
      {/*    </Card>*/}
      {/*  </Col>*/}
      {/*</Row>*/}

      {/* <GroupedColumn
          borderWidth={2}
          height={80}
          data={faultNumber} /> */}


      {/* <Row>
          <Col xl={24} lg={12} sm={24} xs={24}>
            <div style={{ padding: 20 }}>预警信息</div>
            <WarnTable
            />
          </Col>
        </Row> */}
      {/* </Card> */}
    </div>
  );
};
// }

export default connect(
  ({
    subsystemAndAirConditioner,
    loading,
  }: {
    subsystemAndAirConditioner: StateType;
    loading: {
      effects: { [key: string]: boolean };
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    subsystemAndAirConditioner,
    loading: loading.effects['subsystemAndAirConditioner/fetchMonitor'],
    // loading: loading.models.subsystemAndAirConditioner,
  }),
)(AirConditioner);
