import { Col, Card, Row, DatePicker, Statistic, Avatar, Typography } from 'antd';
import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { StateType } from './model';
import { connect, Dispatch } from 'umi';
// import LineCodeAndTrainCodeQuery from '@/components/LineCodeAndTrainCodeQuery';
import MiniBar from './components/Charts/MiniBar';
import GroupedColumn from './components/Charts/GroupedColumn';
import TrainTable from './components/TrainTable';
import { DashboardOutlined, EnvironmentOutlined } from '@ant-design/icons';

// import styles from './style.less';
const { Meta } = Card;
const { Title } = Typography;
interface MileageProps {
  statisticsAndMileage: StateType;
  dispatch: Dispatch;
  loading: boolean;
  dataList?: {
    lineTotalMile: number,
    lineMonthMile: number,
    lineAverageDayMile: number,
    trainMaxMonthMile: number
  };
  mileYearData?: [{
    statisticsTime: string,
    monthTotalMile: number
  }];
  mileToprData?: Array<Object>;
  mileListrData?: {
    pageList: Array<Object>,
    countTotal: number
  };
}

const oldGroupedColumnData = [
  {
    name: '里程(万公里)',
    月份: '2019-01',
    里程: 300000,
  },
  {
    name: '里程(万公里)',
    月份: '2019-02',
    里程: 300100,
  },
  {
    name: '里程(万公里)',
    月份: '2019-03',
    里程: 200000,
  },
  {
    name: '里程(万公里)',
    月份: '2019-04',
    里程: 300700,
  },
  {
    name: '里程(万公里)',
    月份: '2019-05',
    里程: 400400,
  },
  {
    name: '里程(万公里)',
    月份: '2019-06',
    里程: 200000,
  },
  {
    name: '里程(万公里)',
    月份: '2019-07',
    里程: 300450,
  },
  {
    name: '里程(万公里)',
    月份: '2019-08',
    里程: 450000,
  },
  {
    name: '里程(万公里)',
    月份: '2019-09',
    里程: 484000,
  },
  {
    name: '里程(万公里)',
    月份: '2019-10',
    里程: 234000,
  },
  {
    name: '里程(万公里)',
    月份: '2019-11',
    里程: 144400,
  },
  {
    name: '里程(万公里)',
    月份: '2019-12',
    里程: 100000,
  },
];
const visitData: any[] = [];
const fakeY = ['0501', '0502', '0503', '0504', '0505', '0506', '0507', '0508', '0509', '0510'];
const fakeX = [27000, 24100, 24000, 24000, 24000, 24000, 23000, 23000, 21000, 21000];
for (let i = 0; i < fakeX.length; i += 1) {
  visitData.push({
    里程: fakeX[i],
    车次: fakeY[i],
  });
}

const searchData: any[] = [];
for (let i = 1; i < 10; i += 1) {
  searchData.push({
    index: 260 + i,
    trainCode: `050${i}`,
    // site: "南宁-那洪战",
    totalMileage: '132',
    MonthMileage: '21',
    range: Math.floor(Math.random() * 100),
    statisticalTime: moment(new Date().getTime()).format('YYYY-MM-DD'),
  });
}

export const Mileage: FC<MileageProps> = (props) => {
  const {
    dispatch,
    statisticsAndMileage,
    loading,
  } = props;
  const { dataList, mileYearData, mileToprData, mileListrData } = statisticsAndMileage;

  // 里程趋势数据
  const GroupedColumnData: any[] = [];
  mileYearData?.map(item => {
    GroupedColumnData.push({
      // name: '里程(万公里)',
      月份: item.statisticsTime,
      里程: item.monthTotalMile,
    })
  })

  // Top10车辆数据
  const topData: any[] = [];
  mileToprData?.map(item => {
    topData.push({
      车次: item.trainCode,
      里程: item.trainMonthMile,
    })
  })


  const initialParams = {
    startTime: moment().month(moment().month()).startOf('month').format("YYYY-MM"),
    // startTime: (moment(new Date()).startOf('day')).format("YYYY-MM--DD HH:MM:SS"),
  };

  // useEffect(() => {
  //   dispatch({
  //     type: 'statisticsAndMileage/fetchMileData',
  //     payload: initialParams
  //   });
  // }, []);
  useEffect(() => {
    dispatch({
      type: 'statisticsAndMileage/fetchMileYearData',
      payload: initialParams
    });
  }, []);
  useEffect(() => {
    dispatch({
      type: 'statisticsAndMileage/fetchMileToprData',
      payload: initialParams
    });
  }, []);
  useEffect(() => {
    dispatch({
      type: 'statisticsAndMileage/fetchMileListrData',
      payload: {
        startTime: moment().month(moment().month()).startOf('month').format("YYYY-MM"),
        pageSize: 10,
        pageNo: 1
      },
    });
  }, []);


  // const [date, setDate] = useState((moment().month(moment().month() - 1).startOf('month')).format("YYYY-MM"));
  const [date, setDate] = useState((moment().month(moment().month()).startOf('month')).format("YYYY-MM"));
  function onChange(value: any) {
    var dataTemp = moment(new Date(value)).format('YYYY-MM');
    setDate(dataTemp);
    const startTime = moment((moment(value).startOf('month')).toDate()).format("YYYY-MM");
    // console.log('startTime', startTime)
    const params = {
      startTime,
    };
    dispatch({
      type: 'statisticsAndMileage/fetchMileData',
      payload: params,
    });
    dispatch({
      type: 'statisticsAndMileage/fetchMileYearData',
      payload: params,
    });
    dispatch({
      type: 'statisticsAndMileage/fetchMileToprData',
      payload: params,
    });
    dispatch({
      type: 'statisticsAndMileage/fetchMileListrData',
      payload: {
        startTime,
        pageSize: 10,
        pageNo: 1
      },
    });

  }


  return (
    <GridContent>
      <React.Fragment>
        <Row gutter={16}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: -8, marginTop: -8 }}>
            <span style={{ float: 'right', marginBottom: 16 }}>
              <DatePicker onChange={onChange} picker="month" defaultValue={moment(new Date().getTime() - 3600 * 1000 * 24 * 30)}></DatePicker>
              {/* &emsp;
                <Button type="primary" htmlType="submit">
                    查询
                </Button> */}
            </span>
          </Col>
        </Row>
        <Row gutter={18}>
          <Col xl={6} lg={24} md={24} sm={24} xs={24}>
            <Card bordered={false} style={{ marginBottom: 16 }}
            >
              <Meta
                avatar={<Avatar style={{ color: '#87d068' }} icon={<EnvironmentOutlined />} />}
                title={<Title level={3} style={{ color: "#87d068" }}>{dataList?.lineTotalMile}&nbsp;km</Title>}
                description={<Title style={{ fontSize: 16 }} >线路总里程</Title>}
              />
            </Card>
          </Col>
          <Col xl={6} lg={24} md={24} sm={24} xs={24}>
            <Card bordered={false} style={{ marginBottom: 16 }}
            >
              <Meta
                avatar={<Avatar style={{ color: 'gold' }} > 月</Avatar>}
                title={<Title level={3} style={{ color: "gold" }}>{dataList?.lineMonthMile}&nbsp;km</Title>}
                description={<Title style={{ fontSize: 16 }} >{date}月线路运营总里程</Title>}
              />
            </Card>
          </Col>
          <Col xl={6} lg={24} md={24} sm={24} xs={24}>
            <Card bordered={false} style={{ marginBottom: 16 }}
            >
              <Meta
                avatar={<Avatar style={{ color: '#1890ff' }} > 月</Avatar>}
                title={<Title level={3} style={{ color: "#1890ff" }}>{dataList?.lineAverageDayMile}&nbsp;km</Title>}
                description={<Title style={{ fontSize: 16 }} >{date}月线路日均运营里程</Title>}
              />
            </Card>
          </Col>
          <Col xl={6} lg={24} md={24} sm={24} xs={24}>
            <Card bordered={false} style={{ marginBottom: 16 }}
            >
              <Meta
                avatar={<Avatar style={{ color: '#f56a00' }} >TOP</Avatar>}
                title={<Title level={3} style={{ color: "#f56a00" }}>{dataList?.trainMaxMonthMile}&nbsp;km</Title>}
                description={<Title style={{ fontSize: 16 }} >{date}月最高车辆里程</Title>}
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={18}>
          <Col xl={12} lg={24} sm={24} xs={24} >
            <Card title="里程趋势(近12个月)" bordered={false} style={{ marginBottom: 16 }}>
              <GroupedColumn borderWidth={2} height={1} data={GroupedColumnData.length === 0 ? oldGroupedColumnData : GroupedColumnData} />
            </Card>
          </Col>
          <Col xl={12} lg={24} sm={24} xs={24} >
            <Card title={<div>{date}月车辆总里程Top10</div>} bordered={false} style={{ marginBottom: 16 }}>
              <MiniBar borderWidth={2} height={1} data={topData.length === 0 ? visitData : topData} />
            </Card>
          </Col>
          {/* <Col xl={12} lg={24} sm={24} xs={24} style={{ marginBottom: 16 }}>
            <TrainTable 
                // loading={loading} 
                searchData={searchData} 
                time={date}
            />
          </Col> */}
          {/* <Col xl={12} lg={24} sm={24} xs={24} style={{ marginBottom: 16 }}>
            <Card title="当月车辆总里程Top10" bordered={false}>
              <MiniBar borderWidth={2} height={200} data={visitData} />
            </Card>
          </Col> */}
        </Row>
        {/* <Row gutter={24}>
          <Col xl={24} lg={24} sm={24} xs={24}> */}
        <TrainTable
          loading={loading}
          searchData={mileListrData?.pageList}
          time={date}
        />
        {/* </Col>
        </Row> */}
      </React.Fragment>
    </GridContent>
  );
};
// }

export default connect(
  ({
    statisticsAndMileage,
    loading,
  }: {
    statisticsAndMileage: StateType;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    statisticsAndMileage,
    loading: loading.effects['statisticsAndMileage/fetchMileData'],
  }),
)(Mileage);
