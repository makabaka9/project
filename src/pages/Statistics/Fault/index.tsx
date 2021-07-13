import { Col, Card, Row, DatePicker, Button, Empty } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { connect, Dispatch } from 'umi';
import LineCodeAndTrainCodeQuery from '@/components/LineCodeAndTrainCodeQuery';
import ExportExcel from '@/components/exportExcel';
import { FaultDistributionDataType, FaultSystemDataType, SystemNameDataType, TripFaultDataType } from './data.d';
import getFakeChartData from './data';
import GroupedColumn from './components/Charts/GroupedColumn';
import TimeLineChart from './components/Charts/TimelineChart';
import StackedColumn from './components/Charts/StackedColumn';
import PolygonChart from './components/Charts/PolygonChart';
// import GroupChart from './components/GroupChart';
// import GroupTable from './components/GroupTable';
import SubSystemError from "./components/SubSystemError";
import moment from 'moment';
import { StateType } from './model';
// const { RangePicker } = DatePicker;

// import styles from './style.less';

interface FaultProps {
  statisticsAndFault: StateType;
  dispatch: Dispatch;
  loading: boolean;
  faultSystemList?: Array<FaultSystemDataType>;
  // systemNameList?: {
  //   name: string;
  //   children: [{
  //     name: string,
  //     value: number
  //   }]
  // };
  systemNameList: any;
  faultDistributionList?: Array<FaultDistributionDataType>;
  tripFaultList?: Array<TripFaultDataType>;
  faultTrendList?: Array<Object>
}

export const Fault: FC<FaultProps> = (props) => {
  const {
    dispatch,
    statisticsAndFault,
    loading,
  } = props;
  const { faultSystemList, faultTrendList, systemNameList, faultDistributionList, tripFaultList } = statisticsAndFault;
  // console.log('eee',Object.keys(systemNameList).length)
  // console.log('eee',tripFaultList)
  const [date, setDate] = useState((moment().month(moment().month() - 1).startOf('month')).format("YYYY-MM"));

  // const data4 = {
  //   name: 'root',
  //   children: tripFaultList
  // }

  // 某月各子系统故障分布(子系统名称与去年同月、当月、上月故障数)
  const faultDistributionData: { name: string; 系统: string; 系统故障: number; }[] = [];
  faultDistributionList?.map((item) => {
    faultDistributionData.push(
      {
        name: '本月',
        系统: item.systemName,
        系统故障: item.currentMonthNum,
      },
      {
        name: '上月',
        系统: item.systemName,
        系统故障: item.lastMonthNum,
      },
      {
        name: '去年同月',
        系统: item.systemName,
        系统故障: item.lastYearNum,
      },
    )
  })

  const [trainCode, setTrainCode] = useState('503');
  const [lineCode, setLineCode] = useState('5');


  const clickQuery = (event: any) => {
    setTrainCode(event);
  };

  const onChange = (value: any) => {
    const dataTemp = moment(new Date(value)).format('YYYY-MM');
    setDate(dataTemp);
  }
  const initialParams = {
    startTime: date,
    trainCode,
    lineCode,
    // pageNo: 1,
    // pageSize: 20
  };

  useEffect(() => {
    dispatch({
      type: 'statisticsAndFault/fetchFaultSystem',
      payload: initialParams
    });
    dispatch({
      type: 'statisticsAndFault/fetchSystemName',
      payload: initialParams
    });
    dispatch({
      type: 'statisticsAndFault/fetchFaultDistribution',
      payload: initialParams
    });
    dispatch({
      type: 'statisticsAndFault/fetchTripFault',
      payload: initialParams
    });
    dispatch({
      type: 'statisticsAndFault/fetchFaultTrend',
      payload: initialParams
    });
  }, [date, trainCode]);

  return (
    <GridContent>
      <React.Fragment>
        <Row gutter={16}>
          <Col xl={12} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: -8, marginTop: -8 }}>
            <LineCodeAndTrainCodeQuery defaultTrainCode={trainCode} onSubmit={clickQuery} />
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <div style={{ float: 'right' }}>
              <DatePicker onChange={onChange} picker="month" defaultValue={moment(new Date().getTime() - 3600 * 1000 * 24 * 30)} />
            </div>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card bordered={false} style={{ marginBottom: 16 }} title={<div>{date}月各子系统故障分析</div>}>
              {faultDistributionData.length === 0 ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> :
                <GroupedColumn
                  height={1}
                  // data={getFakeChartData.GroupedColumnData}
                  data={faultDistributionData}
                />
              }
            </Card>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card bordered={false} style={{ marginBottom: 16, marginLeft: -8 }} title='各子系统故障趋势分析(近12个月)'>
            {faultTrendList?.length === 0 ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> :
              <TimeLineChart
                // borderWidth={2}
                height={1}
                // data1={getFakeChartData.TimeLineData}
                data1={faultTrendList}
              />}
            </Card>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card bordered={false} style={{ marginBottom: 16 }} title={<div>{date}月子系统故障占比</div>}>
            {systemNameList?.length === 0 ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> :
              <StackedColumn
                height={1}
                // data={tripFaultList}
                data={systemNameList}
              />}
            </Card>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card bordered={false} style={{ marginBottom: 16, marginLeft: -8, }} title={<div>{date}月各车次故障统计</div>}>
            {tripFaultList?.children?.length === 0 ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> :
              <PolygonChart
                height={1}
                data={tripFaultList}
              />}
            </Card>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Card
              bordered={false}
              style={{ marginBottom: 16 }}
              // title='各子系统故障统计'
              title={<div>{date}各子系统故障统计</div>}
              extra={
                <ExportExcel
                  fileName='子系统故障统计表'
                  sheetData={faultSystemList}
                  sheetName='sheet'
                  sheetHeader={['序号', '子系统', '故障数', '故障百分比', '故障率（本月）', '故障率（上月）', '故障率（去年同月）', '同比', '环比', '统计时间']}
                  sheetFilter={[]}
                />
              }
            >
              {/* <GroupTable
              borderWidth={2}
              height={160}
              // loading={loading}
              time={date} 
              data={MinBarData}
              data1={searchData}
            /> */}
              <SubSystemError
                // data1={getFakeChartData.searchData}
                data1={faultSystemList}
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
    statisticsAndFault,
    loading,
  }: {
    statisticsAndFault: any;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    statisticsAndFault,
    loading: loading.effects['statisticsAndFault/fetch'],
  }),
)(Fault);
