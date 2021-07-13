import { Card, Row, Col, Statistic, Typography, DatePicker, Descriptions, Badge, Progress, Button } from 'antd';
import React, { useEffect, useState, FC } from 'react';
import { connect, Dispatch } from 'umi';
// import LineCodeAndTrainCodeQuery from './components/LineCodeAndTrainCodeQuery';
import ExportExcel from '@/components/exportExcel';
import LineCodeAndTrainCodeQuery from '@/components/LineCodeAndTrainCodeQuery';
import StationlineChart from './components/Charts/StationlineChart';
import DonutChart from './components/Charts/Pie';
import Gauge from './components/Charts/Gauge';
import EnergyGroup from './components/Charts/EnergyGroup';
import EnergyTable from './components/EnergyTable';
import { EnergyStatisticsDay } from './data';
import { StateType } from './model';
// import styles from './style.less';
import moment from 'moment';
import { BulletChart, ProgressChart } from 'bizcharts';

// const { RangePicker } = DatePicker;
interface EnergyProps {
  energyTrain: StateType;
  loading: boolean;
  dispatch: Dispatch;
  energyList: EnergyStatisticsDay;
}

export const Energy: FC<EnergyProps> = (props) => {
  const {
    loading,
    dispatch,
    energyTrain
  } = props;


  const { energyList } = energyTrain;

  const [lineCode, setLineCode] = useState('1001');
  const [trainCode, setTrainCode] = useState('505');

  // 单位牵引能耗数据
  const StationLineData: any[] = [];
  energyList?.dayData.map(item => (
    StationLineData.push({
      month:moment(item.dt).format('DD'),
      city: '昨天单位牵引能耗',
      temperature: item.unitAbsorb,
    },
      {
        month: moment(item.dt).format('DD'),
        city: '平均单位牵引能耗',
        temperature: item.avgAbsorb,
      })
  ));


  // 能耗统计数据
  const energyData: any[] = [];
  energyList?.dayData.map(item => (
    energyData.unshift(
      {
        name: '牵引能耗',
        month: moment(item.dt).format('DD'),
        monthAverageRain: item.absorb,
      },
      {
        name: '制动电阻能耗',
        month: moment(item.dt).format('DD'),
        monthAverageRain: item.braking,
      },
      {
        name: '辅助能耗',
        month: moment(item.dt).format('DD'),
        monthAverageRain: item.auxiliary,
      })
  ));
  const energyLineData: any[] = [];
  energyList?.dayData.map(item => (
    energyLineData.unshift(
      {
        name: '再生能量',
        month: moment(item.dt).format('DD'),
        AverageRain: item.regeneration,
      })
  ));
  // 能耗信息数据
  const subsystemData: any[] = [];
  energyList?.monthData.map(item => (
    subsystemData.push({
      statisticalTime: item.dt,
      netEnergy: item.energy,
      tractionEnergy: item.absorb,
      brakeEnergy: item.braking,
      auxiliaryEnergy: item.auxiliary,
      reEnergy: item.regeneration,
    })
  ));

  // 再生能量比数据
  const regenerationRatioData: any[] = [];
  regenerationRatioData.push(
    {
      type: '昨天总能耗',
      value: energyList?.energyInfo.energyTotal,
    },
    {
      type: '昨天再生能量',
      value: energyList?.energyInfo.regeneration,
    });


  const clickQuery = (event: { lineCode: string, trainCode: string }) => {
    setTrainCode(event.trainCode);
    setLineCode(event.lineCode);
  };

  useEffect(() => {
    dispatch({
      type: "energyTrain/fetchBasic",
      payload: {
        lineCode: lineCode,
        trainCode: trainCode,
      },
    });
  }, []);

  // const StationLineData = [
  //   {
  //     month: '3-1',
  //     city: '昨天单位牵引能耗',
  //     temperature: 124,
  //   },
  //   {
  //     month: '3-1',
  //     city: '平均单位牵引能耗',
  //     temperature: 122,
  //   },
  // ];

  const PieData = [
    {
      type: '昨天总能耗',
      value: 160,
    },
    {
      type: '昨天再生能量',
      value: 80,
    },
  ];
  const PieData1 = [
    {
      type: '当月列车能耗',
      value: 40,
    },
    {
      type: '当月再生能耗',
      value: 60,
    },
  ];

  const data = [
    { name: '牵引能耗', month: '3-1', monthAverageRain: 180.9 },
    { name: '牵引能耗', month: '3-2', monthAverageRain: 280.8 },
    { name: '牵引能耗', month: '3-3', monthAverageRain: 390.3 },
    { name: '牵引能耗', month: '3-4', monthAverageRain: 210.4 },
    { name: '牵引能耗', month: '3-5', monthAverageRain: 130 },
    { name: '牵引能耗', month: '3-6', monthAverageRain: 200.3 },
    { name: '牵引能耗', month: '3-7', monthAverageRain: 240 },
    { name: '牵引能耗', month: '3-8', monthAverageRain: 140.6 },
    { name: '牵引能耗', month: '3-9', monthAverageRain: 140.6 },
    { name: '牵引能耗', month: '3-10', monthAverageRain: 140.6 },
    { name: '牵引能耗', month: '3-11', monthAverageRain: 140.6 },
    { name: '牵引能耗', month: '3-12', monthAverageRain: 140.6 },
    { name: '牵引能耗', month: '3-13', monthAverageRain: 140.6 },
    { name: '牵引能耗', month: '3-14', monthAverageRain: 140.6 },
    { name: '制动电阻能耗', month: '3-1', monthAverageRain: 180.9 },
    { name: '制动电阻能耗', month: '3-2', monthAverageRain: 210.8 },
    { name: '制动电阻能耗', month: '3-3', monthAverageRain: 110.3 },
    { name: '制动电阻能耗', month: '3-4', monthAverageRain: 121.4 },
    { name: '制动电阻能耗', month: '3-5', monthAverageRain: 147 },
    { name: '制动电阻能耗', month: '3-6', monthAverageRain: 120.3 },
    { name: '制动电阻能耗', month: '3-7', monthAverageRain: 124 },
    { name: '制动电阻能耗', month: '3-8', monthAverageRain: 135.6 },
    { name: '制动电阻能耗', month: '3-9', monthAverageRain: 135.6 },
    { name: '制动电阻能耗', month: '3-10', monthAverageRain: 135.6 },
    { name: '制动电阻能耗', month: '3-11', monthAverageRain: 135.6 },
    { name: '制动电阻能耗', month: '3-12', monthAverageRain: 135.6 },
    { name: '制动电阻能耗', month: '3-13', monthAverageRain: 135.6 },
    { name: '制动电阻能耗', month: '3-14', monthAverageRain: 135.6 },
    { name: '辅助能耗', month: '3-1', monthAverageRain: 125.4 },
    { name: '辅助能耗', month: '3-2', monthAverageRain: 213.2 },
    { name: '辅助能耗', month: '3-3', monthAverageRain: 134.5 },
    { name: '辅助能耗', month: '3-4', monthAverageRain: 180.7 },
    { name: '辅助能耗', month: '3-5', monthAverageRain: 152.6 },
    { name: '辅助能耗', month: '3-6', monthAverageRain: 135.5 },
    { name: '辅助能耗', month: '3-7', monthAverageRain: 137.4 },
    { name: '辅助能耗', month: '3-8', monthAverageRain: 142.4 },
    { name: '辅助能耗', month: '3-9', monthAverageRain: 142.4 },
    { name: '辅助能耗', month: '3-10', monthAverageRain: 142.4 },
    { name: '辅助能耗', month: '3-11', monthAverageRain: 142.4 },
    { name: '辅助能耗', month: '3-12', monthAverageRain: 142.4 },
    { name: '辅助能耗', month: '3-13', monthAverageRain: 142.4 },
    { name: '辅助能耗', month: '3-14', monthAverageRain: 142.4 },
  ];
  const data1 = [
    { month: '3-1', AverageRain: 180.9 },
    { month: '3-2', AverageRain: 128.8 },
    { month: '3-3', AverageRain: 139.3 },
    { month: '3-4', AverageRain: 121.4 },
    { month: '3-5', AverageRain: 147 },
    { month: '3-6', AverageRain: 120.3 },
    { month: '3-7', AverageRain: 124 },
    { month: '3-8', AverageRain: 135.6 },
    { month: '3-9', AverageRain: 135.6 },
    { month: '3-10', AverageRain: 135.6 },
    { month: '3-11', AverageRain: 135.6 },
    { month: '3-12', AverageRain: 135.6 },
    { month: '3-13', AverageRain: 135.6 },
    { month: '3-14', AverageRain: 135.6 },
  ];

  const gaugeData = { num: 68, percent: '68' };
  const completionRateData = [
    {
      title: '完成率',
      measures: [83],
      targets: [100],
    },
  ];
  return (
    <div>
      <Row gutter={16}>
        <Col xl={12} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: -8, marginTop: -8 }}>
          <LineCodeAndTrainCodeQuery
          // defaultTrainCode={trainCode}
          // onSubmit={clickQuery} 
          />
        </Col>
        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
          <div style={{ float: 'right' }}>
            <DatePicker
              // onChange={onChange} 
              defaultValue={moment(new Date().getTime() - 3600 * 1000 * 24)} />
          </div>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col xl={14}>
          <Card title="近三十天单位牵引能耗" bordered={false} loading={loading} style={{ marginBottom: 16, }}>
            <Descriptions
              // title="User Info" 
              column={3}
            >
              <Descriptions.Item label='昨天单位牵引能耗'>
                <Typography.Text style={{ fontSize: 18, color: "#52c41a" }}>
                  {energyList?.energyInfo.unitAbsorb ? energyList?.energyInfo.unitAbsorb : "--"} kWh
                </Typography.Text>
              </Descriptions.Item>
              <Descriptions.Item label='昨日偏离平均值'>
                <Typography.Text style={{ fontSize: 18, color: "#52c41a" }}>
                  {energyList?.energyInfo.deviation ? energyList?.energyInfo.deviation : "--"} kWh
                </Typography.Text></Descriptions.Item>
              <Descriptions.Item label='近30天最大偏离'>
                <Typography.Text style={{ fontSize: 18, color: "#52c41a" }}>
                  {energyList?.energyInfo.deviationMax ? energyList?.energyInfo.deviationMax : "--"} kWh
                </Typography.Text></Descriptions.Item>
            </Descriptions>
            <div>
              <StationlineChart
                borderWidth={2}
                height={100}
                data={StationLineData}
              />
            </div>
          </Card>
        </Col>
        <Col xl={5}>
          <Card title="总能耗与再生能量比" bordered={false} loading={loading} style={{ marginBottom: 16, marginLeft: -8, marginRight: -8 }}>
            <div style={{ textAlign: "center" }}>
              <DonutChart
                height={120}
                data={regenerationRatioData}
              />
            </div>
          </Card>
        </Col>

        <Col xl={5}>
          <Card title="2020年KPI指标完成率" bordered={false} loading={loading}
            style={{ marginBottom: 16 }}
          >
            <Descriptions
              // title="User Info" 
              column={1}
            >
              <Descriptions.Item label='本年度再生能量'>
                <Typography.Text style={{ fontSize: 18, color: "#52c41a" }}>556342.2 kWh</Typography.Text>
              </Descriptions.Item>
              <Descriptions.Item label='昨日偏离平均值'>
                <Typography.Text style={{ fontSize: 18, color: "#52c41a" }}>738456.2 kWh</Typography.Text></Descriptions.Item>
            </Descriptions>
            {/* <div style={{ textAlign: "center" }}> */}
            <BulletChart
              padding={[20, 20, 50, 55]}
              height={80}
              width={250}
              data={completionRateData}
              rangeMax={100}
            />
          </Card>
        </Col>
      </Row>

      <Card title="近三十天能耗统计" bordered={false} loading={loading} style={{ marginBottom: 16 }}>
        <Descriptions
          // title="User Info" 
          column={4}
        >
          <Descriptions.Item label='累计总能耗'>
            <Typography.Text style={{ fontSize: 18, color: "#52c41a" }}>
              {energyList?.energyInfo.energyTotal ? energyList?.energyInfo.energyTotal : "--"} kWh
            </Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item label='昨日总能耗'>
            <Typography.Text style={{ fontSize: 18, color: "#52c41a" }}>
              {energyList?.energyInfo.energyTotal ? energyList?.energyInfo.energyTotal : "--"} kWh
            </Typography.Text></Descriptions.Item>
          <Descriptions.Item label='昨日再生能耗'>
            <Typography.Text style={{ fontSize: 18, color: "#52c41a" }}>
              {energyList?.energyInfo.regeneration ? energyList?.energyInfo.regeneration : "--"} kWh
            </Typography.Text></Descriptions.Item>
          <Descriptions.Item label='昨日净能耗'>
            <Typography.Text style={{ fontSize: 18, color: "#52c41a" }}>
              {energyList?.energyInfo.energy ? energyList?.energyInfo.energy : "--"} kWh
            </Typography.Text></Descriptions.Item>
        </Descriptions>

        <EnergyGroup
          // borderWidth={2}
          // height={220}
          data={energyData}
          data1={energyLineData}
        />
      </Card>

      <Card bordered={false} title="能耗信息" style={{ "width": "100%" }}
        extra={
          <ExportExcel
            fileName='能耗信息表'
            sheetData={subsystemData}
            sheetName='sheet'
            sheetHeader={['统计时段', '牵引能耗/kWh', '制动电阻能耗/kWh', '辅助能耗/kWh', '再生能量/kWh', '净能耗/kWh']}
            sheetFilter={[]}
          />
        }>
        <EnergyTable
          subsystemData={subsystemData}
        />
      </Card>
    </div>
  );
};

export default connect(
  ({
    energyTrain,
    loading,
  }: {
    energyTrain: StateType;
    loading: {
      models: { [key: string]: boolean };
    };
  }) => ({
    energyTrain,
    loading: loading.models.energyTrain,
  }),
)(Energy);
