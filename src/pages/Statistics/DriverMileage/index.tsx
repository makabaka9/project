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
import LineCodeAndTrainCodeQuery from './components/LineCodeAndTrainCodeQuery';

// import styles from './style.less';

interface MileageProps {
  driverAndMileage: StateType;
  dispatch: Dispatch;
  loading: boolean;
  dataList?: {
    lineTotalMiles: number,
    lineMonthMiles: number,
    lineDayMiles: number,
    trainMaxMonthMiles: number
  };
  mileYearData?: [{
    key: Date,
    value: number
  }];
  mileToprData?: Array<Object>;
  mileListrData?: Array<Object>;
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
    driverAndMileage,
    loading,
  } = props;
  const { dataList, mileYearData, mileToprData, mileListrData } = driverAndMileage;

  // console.log('dataList',dataList,mileYearData);

  // 里程趋势数据
  const GroupedColumnData: any[] = [];
  mileYearData?.map(item => {
    GroupedColumnData.push({
      // name: '里程(万公里)',
      月份: item.key,
      里程: item.value,
    })
  })

  // Top10车辆数据
  const topData: any[] = [];
  mileToprData?.map(item => {
    topData.push({
      车次: item.key,
      里程: item.value,
    })
  })


  const initialParams = {
    // startTime: moment().month(moment().month() - 1).startOf('month'),
    startTime: (moment(new Date()).startOf('day')).format("YYYY-MM--DD HH:MM:SS"),
  };

  useEffect(() => {
    dispatch({
      type: 'driverAndMileage/fetchMileData',
      payload: initialParams
    });
  }, []);
  useEffect(() => {
    dispatch({
      type: 'driverAndMileage/fetchMileYearData',
      payload: initialParams
    });
  }, []);
  useEffect(() => {
    dispatch({
      type: 'driverAndMileage/fetchMileToprData',
      payload: initialParams
    });
  }, []);
  useEffect(() => {
    dispatch({
      type: 'driverAndMileage/fetchMileListrData',
      payload: initialParams
    });
  }, []);


  const [date, setDate] = useState((moment().month(moment().month() - 1).startOf('month')).format("YYYY-MM"));
  function onChange(value: any) {
    var dataTemp = moment(new Date(value)).format('YYYY-MM');
    setDate(dataTemp);
    const startTime = (moment(value).startOf('month')).toDate();
    const params = {
      startTime,
    };
    dispatch({
      type: 'driverAndMileage/fetchMileData',
      payload: params,
    });
  }


  return (
    <GridContent>
      <React.Fragment>
        <Row gutter={16}>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <LineCodeAndTrainCodeQuery
            // defaultTrainCode={trainCode}
            // onSubmit={clickQuery} 
            />
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <div style={{ float: 'right' }}>
              <DatePicker
                // onChange={onChange} 
                picker="month" defaultValue={moment(new Date().getTime() - 3600 * 1000 * 24 * 30)}></DatePicker>
            </div>
          </Col>
        </Row>

        <Row gutter={18}>
          <Col xl={12} lg={24} sm={24} xs={24} >
            <Card title="司乘里程趋势(近12个月)" bordered={false} style={{ marginBottom: 16 }}>
              <GroupedColumn borderWidth={2} height={1} data={GroupedColumnData == !null ? GroupedColumnData : oldGroupedColumnData} />
            </Card>
          </Col>
          <Col xl={12} lg={24} sm={24} xs={24} >
            <Card title={<div>
              {/* {date} */}
              当月司乘里程Top10</div>} bordered={false} style={{ marginBottom: 16 }}>
              <MiniBar borderWidth={2} height={1} data={topData == !null ? topData : visitData} />
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
          searchData={mileListrData}
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
    driverAndMileage,
    loading,
  }: {
    driverAndMileage: StateType;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    driverAndMileage,
    loading: loading.effects['driverAndMileage/fetchMileData'],
  }),
)(Mileage);
