
import { Card, Row, Col, Tag, DatePicker, Button, Space, Select } from 'antd';
import { useEffect, useState } from 'react';
import React from 'react';
import { connect, Dispatch } from 'umi';
// import LineCodeAndTrainCodeQuery from '@/components/LineCodeAndTrainCodeQuery';
import SwitchablePicker from '@/components/DateType';
import TrainSteps from './components/TrainSteps';
import Map from './components/Map';
import StationlineChart from './components/Charts/StationlineChart';
import StationRange from './components/Charts/StationRange';
import StationTrain from './components/StationTrain';
import styles from './style.less';
import moment from 'moment';
import { StateType } from './model';
import { TotalSpeedTimeDataType } from './data';
import ExportExcel from '@/components/exportExcel';

const { Option } = Select;

interface TravelSpeedProps {
  loading: boolean;
  dispatch: Dispatch;
  statisticsAndTravelSpeed: StateType;
  siteSpeedTime: Array<object>;
  totalSpeedTime: Array<object>;
  siteStatus: [{
    upSpeed: number,
    upRunTime: number,
    upStopTime: number,
    downSpeed: number,
    stationName: string,
    downRunTime: number,
    downStopTime: number,
    statistcsTime: string,
    useRate: number
  }];
  // siteStatus: Array<object>;
}

const TravelSpeed: React.FC<TravelSpeedProps> = (props) => {
  const { statisticsAndTravelSpeed, loading, dispatch } = props;
  const { totalSpeedTime, siteSpeedTime, siteStatus } = statisticsAndTravelSpeed;

  const [type, setType] = useState('date');
  const [time, setTime] = useState((moment().day(moment().day() - 1).startOf('day')).format("YYYY-MM-DD"))
  const [chartTime, setChartTime] = useState(moment(new Date(time)).format('YYYY-MM-DD'))
  var monthDate = moment(new Date(chartTime)).format('YYYY-MM')
  var dayDate = moment(new Date(chartTime)).format('YYYY-MM-DD')

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
    dispatch({
      type: 'statisticsAndTravelSpeed/fetchSiteStatus',
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
    dispatch({
      type: 'statisticsAndTravelSpeed/fetchTotalSpeedTime',
      payload: params,
    });
    dispatch({
      type: 'statisticsAndTravelSpeed/fetchSiteSpeedTime',
      payload: params,
    });
  }
  const initialParams = {
    startTime: (moment().day(moment().day() - 1).startOf('day')).format("YYYY-MM-DD"),
  };
  useEffect(() => {
    dispatch({
      type: 'statisticsAndTravelSpeed/fetchTotalSpeedTime',
      payload: initialParams,
    });
    dispatch({
      type: 'statisticsAndTravelSpeed/fetchSiteSpeedTime',
      payload: initialParams,
    });
    dispatch({
      type: 'statisticsAndTravelSpeed/fetchSiteStatus',
      payload: initialParams,
    });
  }, []);




  const StationLineData = [
    {
      stationName: '那洪站',
      direction: '平均上行行驶速度(km/h)',
      averageSpeed: 64,
    },
    {
      stationName: '那洪站',
      direction: '平均下行行驶速度(km/h)',
      averageSpeed: 60,
    },
    {
      stationName: '那洪立交站',
      direction: '平均上行行驶速度(km/h)',
      averageSpeed: 6.9,
    },
    {
      stationName: '那洪立交站',
      direction: '平均下行行驶速度(km/h)',
      averageSpeed: 4.2,
    },
    {
      stationName: '金凯路站',
      direction: '平均上行行驶速度(km/h)',
      averageSpeed: 200,
    },
    {
      stationName: '金凯路站',
      direction: '平均下行行驶速度(km/h)',
      averageSpeed: 60,
    },
    {
      stationName: '白沙壮锦立交站',
      direction: '平均上行行驶速度(km/h)',
      averageSpeed: 14.5,
    },
    {
      stationName: '白沙壮锦立交站',
      direction: '平均下行行驶速度(km/h)',
      averageSpeed: 180,
    },
    {
      stationName: '亭洪西路站',
      direction: '平均上行行驶速度(km/h)',
      averageSpeed: 25,
    },
    {
      stationName: '亭洪西路站',
      direction: '平均下行行驶速度(km/h)',
      averageSpeed: 160,
    },
    {
      stationName: '旱塘站',
      direction: '平均上行行驶速度(km/h)',
      averageSpeed: 150,
    },
    {
      stationName: '旱塘站',
      direction: '平均下行行驶速度(km/h)',
      averageSpeed: 15.2,
    },
    {
      stationName: '新阳路站',
      direction: '平均上行行驶速度(km/h)',
      averageSpeed: 25.2,
    },
    {
      stationName: '新阳路站',
      direction: '平均下行行驶速度(km/h)',
      averageSpeed: 17,
    },
    {
      stationName: '广西大学站',
      direction: '平均上行行驶速度(km/h)',
      averageSpeed: 26.5,
    },
    {
      stationName: '广西大学站',
      direction: '平均下行行驶速度(km/h)',
      averageSpeed: 16.6,
    },
    {
      stationName: '秀灵路站',
      direction: '平均上行行驶速度(km/h)',
      averageSpeed: 23.3,
    },
    {
      stationName: '秀灵路站',
      direction: '平均下行行驶速度(km/h)',
      averageSpeed: 14.2,
    },
    {
      stationName: '明秀路站',
      direction: '平均上行行驶速度(km/h)',
      averageSpeed: 18.3,
    },
    {
      stationName: '明秀路站',
      direction: '平均下行行驶速度(km/h)',
      averageSpeed: 10.3,
    },
    {
      stationName: '北湖南路站',
      direction: '平均上行行驶速度(km/h)',
      averageSpeed: 13.9,
    },
    {
      stationName: '北湖南路站',
      direction: '平均下行行驶速度(km/h)',
      averageSpeed: 6.6,
    },
    {
      stationName: '虎丘村站',
      direction: '平均上行行驶速度(km/h)',
      averageSpeed: 9.6,
    },
    {
      stationName: '虎丘村站',
      direction: '平均下行行驶速度(km/h)',
      averageSpeed: 64,
    },
    {
      stationName: '狮山公园站',
      direction: '平均上行行驶速度(km/h)',
      averageSpeed: 64,
    },
    {
      stationName: '狮山公园站',
      direction: '平均下行行驶速度(km/h)',
      averageSpeed: 60,
    },
    {
      stationName: '小鸡村站',
      direction: '平均上行行驶速度(km/h)',
      averageSpeed: 63,
    },
    {
      stationName: '小鸡村站',
      direction: '平均下行行驶速度(km/h)',
      averageSpeed: 64,
    },
    {
      stationName: '邕宾立交站',
      direction: '平均上行行驶速度(km/h)',
      averageSpeed: 65,
    },
    {
      stationName: '邕宾立交站',
      direction: '平均下行行驶速度(km/h)',
      averageSpeed: 60,
    },
    {
      stationName: '药用植物园站',
      direction: '平均上行行驶速度(km/h)',
      averageSpeed: 60,
    },
    {
      stationName: '药用植物园站',
      direction: '平均下行行驶速度(km/h)',
      averageSpeed: 64,
    },
    {
      stationName: '金桥客运站站',
      direction: '平均上行行驶速度(km/h)',
      averageSpeed: 60,
    },
    {
      stationName: '金桥客运站',
      direction: '平均下行行驶速度(km/h)',
      averageSpeed: 0,
    },
  ];

  // 数据源
  const StationRangeData = [
    { stationName: '那洪站', averageTime: 100, direction: "上行" },
    { stationName: '那洪立交站', averageTime: 108, direction: "上行" },
    { stationName: '金凯路站', averageTime: 129, direction: "上行" },
    { stationName: '白沙壮锦立交站', averageTime: 155, direction: "上行" },
    { stationName: '亭洪西路站', averageTime: 120, direction: "上行" },
    { stationName: '旱塘站', averageTime: 99, direction: "上行" },
    { stationName: '新阳路站', averageTime: 56, direction: "上行" },
    { stationName: '广西大学站', averageTime: 34, direction: "上行" },
    { stationName: '秀灵路站', averageTime: 56, direction: "上行" },
    { stationName: '明秀路站', averageTime: 56, direction: "上行" },
    { stationName: '北湖南路站', averageTime: 56, direction: "上行" },
    { stationName: '虎丘村站', averageTime: 56, direction: "上行" },
    { stationName: '狮山公园站', averageTime: 56, direction: "上行" },
    { stationName: '小鸡村站', averageTime: 56, direction: "上行" },
    { stationName: '邕宾立交站', averageTime: 56, direction: "上行" },
    { stationName: '药用植物园站', averageTime: 56, direction: "上行" },
    { stationName: '金桥客运站', averageTime: 34, direction: "上行" },
    { stationName: '那洪站', averageTime: 54, direction: "下行" },
    { stationName: '那洪立交站', averageTime: 200, direction: "下行" },
    { stationName: '金凯路站', averageTime: 34, direction: "下行" },
    { stationName: '白沙壮锦立交站', averageTime: 44, direction: "下行" },
    { stationName: '亭洪西路站', averageTime: 322, direction: "下行" },
    { stationName: '旱塘站', averageTime: 134, direction: "下行" },
    { stationName: '新阳路站', averageTime: 156, direction: "下行" },
    { stationName: '广西大学站', averageTime: 134, direction: "下行" },
    { stationName: '秀灵路站', averageTime: 156, direction: "下行" },
    { stationName: '明秀路站', averageTime: 156, direction: "下行" },
    { stationName: '北湖南路站', averageTime: 156, direction: "下行" },
    { stationName: '虎丘村站', averageTime: 156, direction: "下行" },
    { stationName: '狮山公园站', averageTime: 134, direction: "下行" },
    { stationName: '小鸡村站', averageTime: 156, direction: "下行" },
    { stationName: '邕宾立交站', averageTime: 321, direction: "下行" },
    { stationName: '药用植物园站', averageTime: 242, direction: "下行" },
    { stationName: '金桥客运站', averageTime: 131, direction: "下行" },
  ];
  const StationStatus: any[] = [];
  const data1 = siteStatus
  for (let i = 0; i < data1.length; i++) {
    var value = siteStatus[i].stationName;
    // console.log("22", value)

    if (value === '那洪站') {
      StationStatus.push({
        stationName: data1[i].stationName,
        Speed: data1[i].upSpeed.toFixed(3),
        direction: '上行',
        StopTime: ((data1[i].upStopTime) * 3600).toFixed(3),
        RunTime: ((data1[i].upRunTime) * 3600).toFixed(3),
        useRate: ((data1[i].useRate) * 100).toFixed(3),
        statistcsTime: data1[i].statistcsTime,
      })
    } else if (value === "金桥客运站站") {
      StationStatus.push({
        stationName: data1[i].stationName,
        Speed: data1[i].downSpeed.toFixed(3),
        direction: '下行',
        RunTime: ((data1[i].downRunTime) * 3600).toFixed(3),
        StopTime: ((data1[i].downStopTime) * 3600).toFixed(3),
        useRate: ((data1[i].useRate) * 100).toFixed(3),
        statistcsTime: data1[i].statistcsTime,
      })
    } else {
      StationStatus.push(
        {
          stationName: data1[i].stationName,
          Speed: data1[i].upSpeed.toFixed(3),
          direction: '上行',
          StopTime: ((data1[i].upStopTime) * 3600).toFixed(3),
          RunTime: ((data1[i].upRunTime) * 3600).toFixed(3),
          useRate: ((data1[i].useRate) * 100).toFixed(3),
          statistcsTime: data1[i].statistcsTime,
        },
        {
          stationName: data1[i].stationName,
          Speed: data1[i].downSpeed.toFixed(3),
          direction: '下行',
          RunTime: ((data1[i].downRunTime) * 3600).toFixed(3),
          StopTime: ((data1[i].downStopTime) * 3600).toFixed(3),
          useRate: ((data1[i].useRate) * 100).toFixed(3),
          statistcsTime: data1[i].statistcsTime,
        }
      )
    }
  }
  // console.log("StationStatus", StationStatus)
  const statusColumns = [
    {
      title: '站点名称',
      dataIndex: 'stationName',
      key: 'stationName',
      align: 'center',
    },
    {
      title: '行驶方向',
      dataIndex: 'direction',
      key: 'direction',
      align: 'center',
    },
    {
      title: '车平均行驶时间(s)',
      dataIndex: 'RunTime',
      key: 'RunTime',
      align: 'center',
    },
    {
      title: '车平均停靠时间(s)',
      dataIndex: 'StopTime',
      key: 'StopTime',
      align: 'center',
    },
    {
      title: '平均旅速(km/h)',
      dataIndex: 'Speed',
      key: 'Speed',
      align: 'center',
    },
    // {
    //   title: '平均速度利用率(%)',
    //   dataIndex: 'useRate',
    //   key: 'useRate',
    //   align: 'center',
    // },
    {
      title: '统计时间',
      dataIndex: 'statistcsTime',
      key: 'statistcsTime',
      align: 'center',
    },
  ];


  return (
    <div>
      {/* <LineCodeAndTrainCodeQuery /> */}
      <Row gutter={16}>
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <span style={{ float: 'right', marginBottom: 10, marginTop: -12 }}>
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


      <Card bordered={false} loading={loading} style={{ marginBottom: 16 }}>
        <div style={{ marginTop: 10, height: '16vh' }}>
          <TrainSteps totalSpeedTime={totalSpeedTime} siteStatus={siteStatus} />
          {/* <Map/> */}
        </div>
      </Card>

      <Row gutter={16}>
        <Col xl={13} lg={12} sm={24} xs={24}>
          <Card
            title={<div>{chartTime}站点之间的速度趋势</div>}
            bordered={false}
            style={{ marginBottom: 16, height: '33vh' }} >
            <StationlineChart borderWidth={2} height={1} data={(siteSpeedTime.length) === 0 ? StationLineData : siteSpeedTime} />
          </Card>
        </Col>
        <Col xl={11} lg={12} sm={24} xs={24}>
          <Card
            title={<div>{chartTime}站点之间的耗时趋势</div>}
            bordered={false}
            style={{ marginBottom: 16, height: '33vh' }}>
            <StationRange borderWidth={2} height={1} data={(siteSpeedTime.length) === 0 ? StationRangeData : siteSpeedTime} />
          </Card>
        </Col>
      </Row>
      <Card
        loading={loading}
        bordered={false}
        title={<div>{chartTime}站点具体的行驶情况</div>}
        style={{
          height: '100%',
        }}
        extra={
          <ExportExcel
            fileName='站点具体的行驶情况'
            sheetData={StationStatus}
            sheetName='sheet'
            sheetHeader={['站点名称', '行驶方向', '车平均行驶时间(s)', '平均旅速（km/h)', '平均速度利用率（%）']}
            sheetFilter={[]}
          />
        }
      >
        <StationTrain loading={loading}
          data={StationStatus}
          columns={statusColumns} />
      </Card>
    </div>
  );
};
// }

export default connect(
  ({
    statisticsAndTravelSpeed,
    loading,
  }: {
    statisticsAndTravelSpeed: StateType;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    statisticsAndTravelSpeed,
    loading: loading.effects['statisticsAndTravelSpeed/fetchTotalSpeedTime'],
  }),
)(TravelSpeed);
