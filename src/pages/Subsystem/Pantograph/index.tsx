import { Card, Row, Col, Empty, List, Tag, Radio, Space, Divider, Alert, Avatar, Spin, Typography, Descriptions } from 'antd';
import React, { Component } from 'react';
import { connect, Dispatch } from 'umi';
import { BasicProfileDataType } from './data.d';
// import LineCodeAndTrainCodeQuery from '../WarningCodes/LineCodeAndTrainCodeQuery';
import styles from './style.less';
import LineCodeAndTrainCodeQuery from '@/components/LineCodeAndTrainCodeQuery';
import WarnTable from './components/WarnTable';
import moment from 'moment';
import TrainSteps from './components/TrainSteps';
import WarningPie from './components/WarningPie';
import GroupedColumn from './components/GroupedColumn';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ExportExcel from '@/components/exportExcel';

interface TrainProps {
  loading: boolean;
  dispatch: Dispatch<any>;
  SubsystemAndPantograph: BasicProfileDataType;
}

const Pantograph: React.FC<TrainProps> = (props) => {
  const { SubsystemAndPantograph, loading } = props;

  const train = [];
  const columns = [
    {
      title: '检测时间',
      dataIndex: 'WarningTime',
      key: 'WarningTime',
      align: 'center',
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
    {
      title: '检查站点',
      dataIndex: 'site',
      key: 'site',
      align: 'center',
    },
    {
      title: '列车号',
      dataIndex: 'trainCode',
      key: 'trainCode',
      align: 'center',
    },
    {
      title: '车厢号',
      dataIndex: 'coachCode',
      key: 'coachCode',
      align: 'center',
    },
    {
      title: '部件',
      dataIndex: 'WarningCode',
      key: 'WarningCode',
      align: 'center',
    },
    {
      title: '列车状态',
      dataIndex: 'WarningName',
      key: 'WarningName',
      align: 'center',
    },
    {
      title: '状态类型',
      dataIndex: 'WarningLevel',
      key: 'WarningLevel',
      align: 'center',
    },

    {
      title: '建议措施',
      dataIndex: 'advice',
      key: 'advice',
      width: '25%',
      align: 'center',
    },
    {
      title: '处理情况',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
    },
  ];
  const warningColumns = [

    {
      title: '告警位置',
      dataIndex: 'site',
      key: 'site',
      align: 'center',
    },
    {
      title: '告警代码',
      dataIndex: 'WarningCode',
      key: 'WarningCode',
      align: 'center',
    },
    {
      title: '告警名称',
      dataIndex: 'WarningName',
      key: 'WarningName',
      align: 'center',
    },
    {
      title: '告警等级',
      dataIndex: 'WarningLevel',
      key: 'WarningLevel',
      align: 'center',
    },
    {
      title: '发生时间',
      dataIndex: 'WarningTime',
      key: 'WarningTime',
      align: 'center',
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
  const searchData = [
    {
      WarningTime: moment(new Date().getTime()).format('YYYY-MM-DD'),
      site: '动物园上行120米',
      WarningCode: 'A228',
      WarningName: 'MP1车PDS 硬点接触力检测模块故障',
      WarningLevel: '3',
    },
    {
      WarningTime: moment(new Date().getTime()).format('YYYY-MM-DD'),
      site: '动物园上行120米',
      WarningCode: 'A228',
      WarningName: 'MP1车PDS 硬点接触力检测模块故障',
      WarningLevel: '3',
    },
    {
      WarningTime: moment(new Date().getTime()).format('YYYY-MM-DD'),
      site: '动物园上行120米',
      WarningCode: 'A228',
      WarningName: 'MP1车PDS 硬点接触力检测模块故障',
      WarningLevel: '3',
    },
  ];
  const checkRender = (text: Number, record, index) => {
    switch (text) {
      case 0:
        return <Tag color="green">正常</Tag>;
      case 1:
        return <Tag color="red">一级</Tag>;
      case 2:
        return <Tag color="orange">二级</Tag>;
      case 3:
        return <Tag color="yellow">三级</Tag>;
      default:
        return <Tag color="green">正常</Tag>;
    }
  };
  const warnningData = [
    {
      type: '导高',
      value: 7,
    },
    {
      type: '拉出值',
      value: 3,
    },
    {
      type: '燃弧',
      value: 7,
    },
    {
      type: '羊角',
      value: 3,
    },
    {
      type: '温度',
      value: 5,
    },
    {
      type: '硬点接触力',
      value: 5,
    },
  ];
  const warningPie = [
    {
      type: '一级告警',
      value: 27,
    },
    {
      type: '二级告警',
      value: 25,
    },
    {
      type: '三级告警',
      value: 18,
    },
  ];
  const faultData: any[] = [];
  for (let i = 1; i < 10; i += 1) {
    faultData.push({
      id: '1',
      trainCode: `${i}`,
      // site: "南宁-那洪战",
      site: '动物园上行120米',
      faultCode: 'A222',
      faultName: 'MP1车PDS 接触网故障',
      handle: {
        status: '未处理',
        color: 'red',
      },
      faultDec: '受电弓羊角状态检测模块故障',
      solution: "1、检查弓网检测系统是否上电正常 2、检查弓网检测系统主机面板接头是否松动",
      time: moment(new Date().getTime()).format('YYYY-MM-DD HH:MM:SS'),
    });
  }
  const fualtColumns = [
    {
      title: '序号',
      dataIndex: 'trainCode',
      key: 'trainCode',
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
      title: '告警位置',
      dataIndex: 'site',
      key: 'site',
      align: 'center',
      width: '10%',
    },
    {
      title: '故障名字',
      dataIndex: 'faultName',
      key: 'faultName',
      align: 'center',
      width: '10%',
    },
    {
      title: '状态',
      dataIndex: 'handle',
      key: 'handle',
      width: '5%',
      align: 'center',
      render: (_, row: any) => (
        <Space>
          <Tag color={row.handle.color} key={row.handle.status}>
            {row.handle.status}
          </Tag>
        </Space>
      ),
    },
    {
      title: '发生时间',
      dataIndex: 'time',
      key: 'time',
      width: '10%',
      align: 'center',
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
    {
      title: '故障描述及解决方案',
      dataIndex: 'option',
      valueType: 'option',
      width: '10%',
      align: 'center',
      render: (_: any, record: React.SetStateAction<{}>) => (
        <>
          <a
          // onClick={() => {
          //   handleUpdateModalVisible(true);
          //   setStepFormValues(record);
          // }}
          >
            查看详情
          </a>
          <Divider type="vertical" />
        </>
      ),
    },
  ];
  const faultChart = [
    {

      type: '羊角状态',
      value: 7,
    },
    {

      type: '燃弧',
      value: 3,
    },
    {

      type: '温度',
      value: 7,
    },
    {

      type: '硬点压力',
      value: 3,
    },
    {
      type: '接触网',
      value: 5,
    },
    {
      type: '视频监控',
      value: 5,
    },
    {
      type: '光源',
      value: 5,
    },
    {
      type: '车底振动补偿',
      value: 5,
    },
    {
      type: '通讯链路',
      value: 5,
    },
  ];
  const faultTop = [
    { type: "那洪站上行120米", value: 12 },
    { type: "虎丘村站上行520米", value: 12 },
    { type: "明秀路站上行520米", value: 16 },
    { type: "新阳路站上行520米", value: 20 },
    { type: "秀玲路站上行520米", value: 4 },
  ];
  const zhineng = [
    { type: "那洪站上行120米", dec: "你有故障了", time: "2020-09-26" },
    { type: "那洪站上行120米", dec: "你有故障了", time: "2020-09-26" },
  ]
  return (
    <div>
      <div>
        <Row gutter={24}>
          <Col xl={18} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: -8, marginTop: -8 }}>
            <LineCodeAndTrainCodeQuery />
          </Col>
          <Col xl={6} lg={24} md={24} sm={24} xs={24} >
            <span style={{ float: 'right' }}>
              <Radio.Group name="date" defaultValue={0}>
                <Radio value={0}>最近一周</Radio>
                <Radio value={1}>最近一月</Radio>
                <Radio value={2}>最近一年</Radio>
                <Radio value={3}>全部</Radio>
              </Radio.Group>
            </span>
          </Col>
        </Row>
      </div>
      <Row gutter={16}>
        <Col xl={24} lg={24} sm={24} xs={24}>
          <Card title="当月各路段故障统计（5号线）" bordered={false} className={styles.title}>
            <TrainSteps />
          </Card>
        </Col>
      </Row>
      <Col xl={24} lg={24} sm={24} xs={24}>
        <Card
          title="告警信息"
          style={{
            marginBottom: 18,
          }}
          // bodyStyle={{
          //   textAlign: 'center',
          // }}
          bordered={false}
          extra={
            <ExportExcel
              fileName='告警信息表'
              sheetData={searchData}
              sheetName='sheet'
              sheetHeader={['告警位置', '告警代码', '告警名称', '告警等级', '发生时间',]}
              sheetFilter={[]}
            />
          }
        >
          <Row>
            <Col xl={5} lg={24} sm={24} xs={24}>
              <div style={{ padding: 24 }}>
                <Typography.Text type="warning">智能诊断</Typography.Text>
                <List
                  dataSource={zhineng}
                  renderItem={item => (
                    <List.Item key={item.id}>
                      <List.Item.Meta
                        avatar={
                          <ExclamationCircleOutlined style={{ color: "#eb2f96" }} />
                        }
                        title={item.type}
                        description={<div>{item.dec}&emsp;{item.time}</div>}
                      />
                      {/* <div>评估时间：{item.time}</div> */}
                    </List.Item>
                  )}
                >
                </List>
              </div>
            </Col>
            <Col xl={9} lg={24} sm={24} xs={24}>
              <WarnTable loading={loading} searchData={searchData} columns={warningColumns} height={140} />
            </Col>

            <Col xl={6} lg={24} sm={24} xs={24}>
              <div style={{ textAlign: "center" }}>关键部件故障统计</div>
              <WarningPie
                borderWidth={2}
                height={120}
                data={warnningData} />
            </Col>
            <Col xl={4} lg={24} sm={24} xs={24}>
              <div style={{ textAlign: "center" }}>故障分级统计</div>
              <WarningPie
                borderWidth={2}
                height={120}
                data={warningPie} />
            </Col>
          </Row>
        </Card>
      </Col>
      <Card title="故障信息" bordered={false}
        className={styles.title}
        extra={
          <ExportExcel
            fileName='故障信息表'
            sheetData={faultData}
            sheetName='sheet'
            sheetHeader={['序号', '故障代码', '告警位置', '故障名称', '状态', '发生时间', '故障描述及解决方案',]}
            sheetFilter={[]}
          />
        }
      >
        <Row gutter={16}>
          <Col xl={12} lg={12} sm={24} xs={24}>
            <WarnTable loading={loading} searchData={faultData} columns={fualtColumns} height={0} />
          </Col>
          <Col xl={6} lg={12} sm={24} xs={24}>
            <div style={{ textAlign: "center" }}>关键监测模块故障统计</div>
            <WarningPie
              borderWidth={2}
              height={100}
              data={faultChart} />
          </Col>
          <Col xl={6} lg={12} sm={24} xs={24}>
            <div style={{ textAlign: "center" }}>故障统计Top5</div>
            <GroupedColumn
              borderWidth={2}
              height={120}
              data={faultTop} />
          </Col>
        </Row>
      </Card>
    </div>
  );
};
// }

export default connect(
  ({
    SubsystemAndPantograph,
    loading,
  }: {
    SubsystemAndPantograph: BasicProfileDataType;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    SubsystemAndPantograph,
    loading: loading.effects['SubsystemAndPantograph/fetchBasic'],
  }),
)(Pantograph);
