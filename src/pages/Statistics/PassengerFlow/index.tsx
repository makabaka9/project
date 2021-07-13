import { Typography, Row, Col, Space, Card, Tag, Avatar, DatePicker, Button, Select } from 'antd';
import React, { FC, useEffect } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { connect, Dispatch } from 'umi';
// import LineCodeAndTrainCodeQuery from '@/components/LineCodeAndTrainCodeQuery';
import SwitchablePicker from '@/components/DateType';
import TrainSteps from './components/TrainSteps';
import TimelineChart from './components/Charts/TimelineChart';
import PassengerLineChart from './components/Charts/PassengerLineChart';
import PassengerLineChartTop from './components/Charts/PassengerLineChartTop';
import PassengerInterval from './components/Charts/PassengerInterval';

import { UpCircleOutlined, DownCircleOutlined } from '@ant-design/icons';
import styles from './style.less';
import moment from 'moment';
import { useState } from 'react';
import { StateType } from './model';
import { PassengerFlowDayDataType } from './data';

const { Option } = Select;

interface PassengerFlowProps {
  statisticsAndPassengerFlow: StateType;
  dispatch: Dispatch;
  loading: boolean;
  passengerStatistic: Array<object>;
  passengerFlowDay: Array<object>;
  // passengerFlowMonth: Array<object>;
  passengerFlowYear: Array<object>;
  passengerFlowDayTop5: Array<object>;
  // passengerFlowDayTop5: [
  //   {
  //     time: "",
  //     keyAndValueList: [
  //       {
  //         key: "",
  //         value: 0,
  //       }
  //     ]
  //   }
  // ],


}


const TimeLineData = [
  {
    month: '2018-09',
    city: '客运量',
    flow: 300000,
  },
  {
    month: '2018-10',
    city: '客运量',
    flow: 200000,
  },
  {
    month: '2018-11',
    city: '客运量',
    flow: 490000,
  },
  {
    month: '2018-12',
    city: '客运量',
    flow: 800000,
  },
  {
    month: '2019-01',
    city: '客运量',
    flow: 600000,
  },
  {
    month: '2019-02',
    city: '客运量',
    flow: 200000,
  },
  {
    month: '2019-03',
    city: '客运量',
    flow: 250000,
  },
  {
    month: '2019-04',
    city: '客运量',
    flow: 260000,
  },
  {
    month: '2019-05',
    city: '客运量',
    flow: 450000,
  },
  {
    month: '2019-06',
    city: '客运量',
    flow: 300000,
  },
  {
    month: '2019-07',
    city: '客运量',
    flow: 600000,
  },
  {
    month: '2019-08',
    city: '客运量',
    flow: 100000,
  },
];
// passengerFlow":1420.0,"timePoint":"7:00
const PassengerData = [
  {
    timePoint: '6:30',
    passengerFlow: 100,
  },
  {
    timePoint: '6:40',
    passengerFlow: 600,
  },
  {
    timePoint: '6:50',
    passengerFlow: 300,
  },
  {
    timePoint: '7:00',
    passengerFlow: 200,
  },
  {
    timePoint: '7:10',
    passengerFlow: 700,
  },
  {
    timePoint: '7:20',
    passengerFlow: 300,
  },
  {
    timePoint: '7:30',
    passengerFlow: 200,
  },
  {
    timePoint: '7:40',
    passengerFlow: 400,
  },
  {
    timePoint: '7:50',
    passengerFlow: 100,
  },
  {
    timePoint: '8:00',
    passengerFlow: 100,
  },
  {
    timePoint: '8:10',
    passengerFlow: 100,
  },
  {
    timePoint: '8:20',
    passengerFlow: 100,
  },
  {
    timePoint: '8:30',
    passengerFlow: 100,
  },
  {
    timePoint: '8:40',
    passengerFlow: 100,
  },
];

const TopPassengerData = [
  {
    timePoint: '6:30',
    stationName: "那洪站",
    passengerVolume: 1000,
  },
  {
    timePoint: '6:30',
    stationName: "阜塘站",
    passengerVolume: 2000,
  },
  {
    timePoint: '6:30',
    stationName: "银都路站",
    passengerVolume: 2300,
  },
  {
    timePoint: '6:30',
    stationName: "广西大学站",
    passengerVolume: 3423,
  },
  {
    timePoint: '6:30',
    stationName: "金桥客运站",
    passengerVolume: 3232,
  },
  {
    timePoint: '6:40',
    stationName: "那洪站",
    passengerVolume: 3435,
  },
  {
    timePoint: '6:40',
    stationName: "阜塘站",
    passengerVolume: 6566,
  },
  {
    timePoint: '6:40',
    stationName: "银都路站",
    passengerVolume: 5633,
  },
  {
    timePoint: '6:40',
    stationName: "广西大学站",
    passengerVolume: 555,
  },
  {
    timePoint: '6:40',
    stationName: "金桥客运站",
    passengerVolume: 5554,
  }, {
    timePoint: '6:50',
    stationName: "那洪站",
    passengerVolume: 3455,
  },
  {
    timePoint: '6:50',
    stationName: "阜塘站",
    passengerVolume: 654,
  },
  {
    timePoint: '6:50',
    stationName: "银都路站",
    passengerVolume: 4535,
  },
  {
    timePoint: '6:50',
    stationName: "广西大学站",
    passengerVolume: 453,
  },
  {
    timePoint: '6:50',
    stationName: "金桥客运站",
    passengerVolume: 432,
  }, {
    timePoint: '7:00',
    stationName: "那洪站",
    passengerVolume: 4321,
  },
  {
    timePoint: '7:00',
    stationName: "阜塘站",
    passengerVolume: 662,
  },
  {
    timePoint: '7:00',
    stationName: "银都路站",
    passengerVolume: 445,
  },
  {
    timePoint: '7:00',
    stationName: "广西大学站",
    passengerVolume: 542,
  },
  {
    timePoint: '7:00',
    stationName: "金桥客运站",
    passengerVolume: 635,
  }, {
    timePoint: '7:10',
    stationName: "那洪站",
    passengerVolume: 975,
  },
  {
    timePoint: '7:10',
    stationName: "阜塘站",
    passengerVolume: 2434,
  },
  {
    timePoint: '7:10',
    stationName: "银都路站",
    passengerVolume: 2455,
  },
  {
    timePoint: '7:10',
    stationName: "广西大学站",
    passengerVolume: 675,
  },
  {
    timePoint: '7:10',
    stationName: "金桥客运站",
    passengerVolume: 864,
  }, {
    timePoint: '7:20',
    stationName: "那洪站",
    passengerVolume: 657,
  },
  {
    timePoint: '7:20',
    stationName: "阜塘站",
    passengerVolume: 1333,
  },
  {
    timePoint: '7:20',
    stationName: "银都路站",
    passengerVolume: 3421,
  },
  {
    timePoint: '7:20',
    stationName: "广西大学站",
    passengerVolume: 3435,
  },
  {
    timePoint: '7:20',
    stationName: "金桥客运站",
    passengerVolume: 556,
  },
];
const PassengerStation = [
  { stationName: '那洪站', passengerVolume: 38 },
  { stationName: '那洪立交站', passengerVolume: 52 },
  { stationName: '金凯路站', passengerVolume: 61 },
  { stationName: '白沙壮锦立交站', passengerVolume: 45 },
  { stationName: '亭洪西路站', passengerVolume: 48 },
  { stationName: '旱塘站', passengerVolume: 38 },
  { stationName: '新阳路站', passengerVolume: 38 },
  { stationName: '广西大学站', passengerVolume: 38 },
  { stationName: '秀灵路站', passengerVolume: 38 },
  { stationName: '明秀路站', passengerVolume: 38 },
  { stationName: '北湖南路站', passengerVolume: 38 },
  { stationName: '虎丘村站', passengerVolume: 38 },
  { stationName: '狮山公园站', passengerVolume: 38 },
  { stationName: '小鸡村站', passengerVolume: 38 },
  { stationName: '邕宾立交站', passengerVolume: 38 },
  { stationName: '药用植物园站', passengerVolume: 38 },
  { stationName: '金桥客运站', passengerVolume: 38 },
]
export const PassengerFlow: FC<PassengerFlowProps> = (props) => {
  const {
    dispatch,
    statisticsAndPassengerFlow,
    loading
  } = props;
  const { passengerStatistic, passengerFlowDay, passengerFlowYear, passengerFlowDayTop5, passengerFlowDayBottom } = statisticsAndPassengerFlow;
  var dataSource: any[] = [];
  var dataSourceFirst: any[] = [];
  for (let i = 0; i < passengerFlowDayBottom.length; i++) {
    dataSource.push(passengerFlowDayBottom[i].stationName);
    dataSourceFirst.push(passengerFlowDayBottom[i].passengerVolume)
  }

  const [type, setType] = useState('date');
  const [time, setTime] = useState((moment().day(moment().day() - 1).startOf('day')).format("YYYY-MM-DD"))
  const [chartTime, setChartTime] = useState(moment(new Date(time)).format('YYYY-MM-DD'))
  var monthDate = moment(new Date(chartTime)).format('YYYY-MM')

  // 选择统计类型
  function setTypeChange(value: string) {
    setType(value)
    const startTime = moment(new Date(time)).format('YYYY-MM-DD')
    if (value == "date") {
      const beginTime = moment(new Date(time)).format('YYYY-MM')
      monthDate = beginTime
    }
    if (value == "month") {
      monthDate = startTime
    }
    setChartTime(startTime);
    const params = {
      startTime,
    };
    // console.log("统计类型切换", params)
    dispatch({
      type: 'statisticsAndPassengerFlow/fetchPassengerStatistic',
      payload: params,
    });
  }

  // 选择统计时间
  function onChange(value: any) {
    const startTime = type === "date" ? moment(new Date(value)).format('YYYY-MM-DD') : moment(new Date(value)).format('YYYY-MM');
    setTime(value);
    setChartTime(startTime);
    const params = {
      startTime,
    };
    // console.log("统计时间切换", params)
    dispatch({
      type: 'statisticsAndPassengerFlow/fetchPassengerStatistic',
      payload: params,
    });
    dispatch({
      type: 'statisticsAndPassengerFlow/fetchPassengerFlowDay',
      payload: params,
    });
    dispatch({
      type: 'statisticsAndPassengerFlow/fetchPassengerFlowYear',
      payload: params,
    });
    dispatch({
      type: 'statisticsAndPassengerFlow/fetchPassengerFlowDayTop5',
      payload: params,
    });
    dispatch({
      type: 'statisticsAndPassengerFlow/fetchPassengerFlowDayBottom',
      payload: params,
    });
  }

  const initialParams = {
    startTime: type === "date" ? (moment(new Date()).startOf('day')).format("YYYY-MM-DD") :
      (moment(new Date()).startOf('day')).format("YYYY-MM")
  };
  useEffect(() => {
    dispatch({
      type: 'statisticsAndPassengerFlow/fetchPassengerStatistic',
      payload: initialParams
    });
  }, []);
  useEffect(() => {
    dispatch({
      type: 'statisticsAndPassengerFlow/fetchPassengerFlowDay',
      payload: initialParams,
    });
  }, []);
  useEffect(() => {
    dispatch({
      type: 'statisticsAndPassengerFlow/fetchPassengerFlowYear',
      payload: initialParams,
    });
  }, []);
  useEffect(() => {
    dispatch({
      type: 'statisticsAndPassengerFlow/fetchPassengerFlowDayTop5',
      payload: initialParams,
    });
  }, []);
  useEffect(() => {
    dispatch({
      type: 'statisticsAndPassengerFlow/fetchPassengerFlowDayBottom',
      payload: initialParams,
    });
  }, []);


  return (
    <GridContent>
      <React.Fragment>
        <Row gutter={16}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <span style={{ float: 'right', marginBottom: 10, marginTop: -10 }}>
              {/* <DatePicker onChange={onChange} defaultValue={moment(new Date().getTime() - 3600 * 1000 * 24)}></DatePicker> */}
              <span>统计周期：</span>
              <Space>
                <Select value={type} onChange={setTypeChange}>
                  <Option value="date">日</Option>
                  <Option value="month">月</Option>
                </Select>
                {type === 'date'
                  ? <DatePicker onChange={onChange} defaultValue={moment(new Date().getTime() - 3600 * 1000 * 24)} />
                  : <DatePicker picker='month' onChange={onChange} defaultValue={moment(new Date().getTime() - 3600 * 1000 * 24 * 30)} />}
              </Space>
            </span>
          </Col>
        </Row>
        <Card bordered={false} style={{ height: '22vh', marginBottom: 16, }}>
          <Row gutter={16}>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <div style={{ marginBottom: 16 }}>
                <TrainSteps data={passengerStatistic} />
              </div>
            </Col>
          </Row>
        </Card>
        <Row gutter={24}>
          <Col
            xl={12}
            lg={24}
            sm={24}
            xs={24}
            style={{
              marginBottom: 16
            }}
          >
            <Card
              // title='客运量变化趋势'
              title={<div>{chartTime}客运量变化趋势</div>}
              bodyStyle={{
                textAlign: 'center',
              }}
              bordered={false}
              style={{ marginRight: -8, }}
            >
              <div>
                <PassengerLineChart
                  height={1}
                  // data={passengerFlowDay.timePointList == undefined ? PassengerData : passengerFlowDay.timePointList}
                  data={PassengerData}
                />
              </div>
              <div className={styles.Outline}>
                <UpCircleOutlined style={{ fontSize: '28px', float: 'left', color: '#63c7fa' }} />
                <Typography.Text>客运量最高：{passengerFlowDay.maxTime} {passengerFlowDay.maxPassengerVolume}</Typography.Text>
                <br />
                {/* <Typography.Text>17:30-18:30 0%</Typography.Text> */}
              </div>
              <div className={styles.Outline}>
                <DownCircleOutlined style={{ fontSize: '28px', float: 'left', color: '#63c7fa' }} />
                <Typography.Text>客运量最低：{passengerFlowDay.minTime} {passengerFlowDay.minPassengerVolume}</Typography.Text>
                <br />
                {/* <Typography.Text>17:30-18:30 0%</Typography.Text> */}
              </div>
            </Card>
          </Col>
          <Col
            xl={12}
            lg={24}
            sm={24}
            xs={24}
            style={{
              marginBottom: 16,
            }}
          >
            <Card
              title={<div>{chartTime}&nbsp;Top5车站具体的客运量显示</div>}
              // title={<div>{date}日Top5车站具体的客运量显示</div>}
              bodyStyle={{
                textAlign: 'center',
              }}
              bordered={false}
            // style={{height:'28vh'}}
            >
              <div>
                <PassengerLineChartTop
                  height={1}
                  data={passengerFlowDayTop5.length === 0 ? TopPassengerData : passengerFlowDayTop5}
                />
              </div>
              <div style={{ marginTop: 12 }}>
                <Typography.Text>
                  ({dataSource[0]})高峰期客运量：{dataSourceFirst[0]} &nbsp;&nbsp;({dataSource[1]}：高峰期客运量：{dataSourceFirst[1]}
                  &nbsp;&nbsp;({dataSource[2]})：高峰期客运量：{dataSourceFirst[2]}
                </Typography.Text>
                <br />
                <Typography.Text>
                  ({dataSource[3]}):高峰期客运量：{dataSourceFirst[3]} &nbsp;&nbsp;({dataSource[4]})：高峰期客运量：{dataSourceFirst[4]}
                </Typography.Text>
              </div>
            </Card>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xl={12} lg={24} md={24} sm={24} xs={24} >
            <Card
              title="线路客运量变化(近12个月)"
              style={{
                marginBottom: 16,
                marginRight: -8,
                // height:'28vh'
              }}
              bodyStyle={{
                textAlign: 'center',
              }}
              bordered={false}
            >
              <TimelineChart borderWidth={2} height={1} data={passengerFlowYear.length === 0 ? TimeLineData : passengerFlowYear} />
            </Card>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24} >
            <Card
              title={<div>各车站{monthDate}客运量统计</div>}
              style={{
                marginBottom: 16,
                // height:'28vh'
              }}
              bodyStyle={{
                textAlign: 'center',
              }}
              bordered={false}
            >
              <PassengerInterval borderWidth={2} height={1} data={passengerStatistic.length === 0 ? PassengerStation : passengerStatistic} />
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    </GridContent>
  );
};
// }

export default connect(
  ({
    statisticsAndPassengerFlow,
    loading,
  }: {
    statisticsAndPassengerFlow: any;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    statisticsAndPassengerFlow,
    loading: loading.effects['statisticsAndPassengerFlow/fetchPassengerStatistic'],
  }),
)(PassengerFlow);
