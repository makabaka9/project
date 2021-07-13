import { Card, Row, Col, Empty, List, Typography, Divider, Tag, Modal } from 'antd';
import React, { Component, useState } from 'react';
import { connect, Dispatch } from 'umi';
import { BasicProfileDataType } from './data.d';
// import LineCodeAndTrainCodeQuery from '../components/LineCodeAndTrainCodeQuery';
import styles from './style.less';
import LineCodeAndTrainCodeQuery from '@/components/LineCodeAndTrainCodeQuery';
import ComponentFault from './components/ComponentFault';
import RunningTable from './components/RunningTable';
import moment from 'moment';
import RunningMap from './components/RunningMap';
// import { Divider } from 'rc-menu';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import FaultPie from './components/FaultPie';
import ExportExcel from '@/components/exportExcel';

interface TrainProps {
  loading: boolean;
  dispatch: Dispatch<any>;
  SubsystemAndRunning: BasicProfileDataType;
}

const Running: React.FC<TrainProps> = (props) => {
  const { SubsystemAndRunning, loading } = props;
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (event: any) => {
    setModalVisible(true);
  };

  const handleOk = (event: any) => {
    setModalVisible(false);
  };

  const alertChart = [
    {
      date: '2020-04-25',
      type: '轴承一级报警',
      value: 1,
    },
    {
      date: '2020-04-25',
      type: '轴承二级报警',
      value: 3,
    },
    {
      date: '2020-04-25',
      type: '踏面一级报警',
      value: 2,
    },
    {
      date: '2020-04-25',
      type: '踏面二级报警',
      value: 2.5,
    },
    {
      date: '2020-04-25',
      type: '轴端温度报警',
      value: 1,
    },
    {
      date: '2020-04-25',
      type: '轴端脱轨报警',
      value: 1,
    },
    {
      date: '2020-05-01',
      type: '轴承一级报警',
      value: 2,
    },
    {
      date: '2020-05-01',
      type: '踏面一级报警',
      value: 4,
    },
    {
      date: '2020-05-01',
      type: '轴承二级报警',
      value: 2,
    },
    {
      date: '2020-05-01',
      type: '踏面二级报警',
      value: 1,
    },
    {
      date: '2020-05-01',
      type: '轴端温度报警',
      value: 1,
    },
    {
      date: '2020-05-01',
      type: '轴端脱轨报警',
      value: 1,
    },
    {
      date: '2020-05-07',
      type: '轴承一级报警',
      value: 3,
    },
    {
      date: '2020-05-07',
      type: '踏面一级报警',
      value: 1.5,
    },
    {
      date: '2020-05-07',
      type: '轴承二级报警',
      value: 5,
    },
    {
      date: '2020-05-07',
      type: '踏面二级报警',
      value: 2,
    },
    {
      date: '2020-05-07',
      type: '轴端温度报警',
      value: 2,
    },
    {

      type: '轴承一级报警',
      value: 3,
    },
    {

      type: '踏面一级报警',
      value: 4,
    },
    {

      type: '轴承二级报警',
      value: 5,
    },
    {

      type: '踏面二级报警',
      value: 6,
    },
    {

      type: '轴承一级报警',
      value: 1,
    },
    {

      type: '踏面一级报警',
      value: 2,
    },
    {

      type: '轴承二级报警',
      value: 4,
    },
    {

      type: '踏面二级报警',
      value: 3,
    },
    {

      type: '轴承一级报警',
      value: 3,
    },
    {

      type: '踏面一级报警',
      value: 1,
    },
    {

      type: '轴承二级报警',
      value: 5,
    },
    {

      type: '踏面二级报警',
      value: 2,
    },
  ];
  const faultChart = [
    {
      type: '综合诊断仪',
      value: 3,
    },
    {
      type: '轴端传感器',
      value: 4,
    },
    {
      type: '前置处理器',
      value: 5,
    },
    {
      type: '脱轨诊断仪',
      value: 6,
    },
  ];
  const lifetimeData = [
    {
      date: '499561',
      type: '轴承',
      value: 1,
    },
    {
      date: '499561',
      type: '齿轮',
      value: 2,
    },
    {
      date: '499561',
      type: '踏面',
      value: 3,
    },
    {
      date: '549412',
      type: '轴承',
      value: 2.5,
    },
    {
      date: '549412',
      type: '齿轮',
      value: 3,
    },
    {
      date: '549412',
      type: '踏面',
      value: 4,
    },
    {
      date: '599263',
      type: '轴承',
      value: 3,
    },
    {
      date: '599263',
      type: '齿轮',
      value: 5,
    },
    {
      date: '599263',
      type: '踏面',
      value: 2,
    },
    {
      date: '649114',
      type: '轴承',
      value: 4,
    },
    {
      date: '649114',
      type: '齿轮',
      value: 6,
    },
    {
      date: '649114',
      type: '踏面',
      value: 4,
    },
    {
      date: '698965',
      type: '轴承',
      value: 3,
    },
    {
      date: '698965',
      type: '齿轮',
      value: 4,
    },
    {
      date: '698965',
      type: '踏面',
      value: 5,
    },
    {
      date: '748816',
      type: '轴承',
      value: 5,
    },
    {
      date: '748816',
      type: '齿轮',
      value: 3,
    },
    {
      date: '748816',
      type: '踏面',
      value: 6,
    },
    {
      date: '798667',
      type: '轴承',
      value: 5,
    },
    {
      date: '798667',
      type: '齿轮',
      value: 3,
    },
    {
      date: '798667',
      type: '踏面',
      value: 6,
    },
  ];
  const relationData = [
    {
      date: '2020-04-25',
      type: '振动最大值',
      value: 1,
    },
    {
      date: '2020-04-25',
      type: '震动有效值',
      value: 2,
    },
    {
      date: '2020-04-25',
      type: '平均深度',
      value: 3,
    },
    {
      date: '2020-05-01',
      type: '振动最大值',
      value: 2,
    },
    {
      date: '2020-05-01',
      type: '震动有效值',
      value: 4,
    },
    {
      date: '2020-05-01',
      type: '平均深度',
      value: 2,
    },
    {
      date: '2020-05-07',
      type: '振动最大值',
      value: 3,
    },
    {
      date: '2020-05-07',
      type: '震动有效值',
      value: 1.5,
    },
    {
      date: '2020-05-07',
      type: '平均深度',
      value: 5,
    },
    {

      type: '振动最大值',
      value: 3,
    },
    {

      type: '震动有效值',
      value: 4,
    },
    {

      type: '平均深度',
      value: 5,
    },
    {

      type: '振动最大值',
      value: 1,
    },
    {

      type: '震动有效值',
      value: 2,
    },
    {

      type: '平均深度',
      value: 4,
    },
    {

      type: '振动最大值',
      value: 3,
    },
    {

      type: '震动有效值',
      value: 1,
    },
    {

      type: '平均深度',
      value: 5,
    },
  ];
  const statusData = [
    {
      date: '2020-04-25',
      type: '踏面',
      value: 1,
    },
    {
      date: '2020-04-25',
      type: '滚双',
      value: 2,
    },
    {
      date: '2020-04-25',
      type: '滚单',
      value: 3,
    },
    {
      date: '2020-04-25',
      type: '外环',
      value: 2,
    },
    {
      date: '2020-04-25',
      type: '内环',
      value: 4,
    },
    {
      date: '2020-04-25',
      type: '保外',
      value: 2,
    },
    {
      date: '2020-04-25',
      type: '保内',
      value: 3,
    },
    {
      date: '2020-05-01',
      type: '踏面',
      value: 3,
    },
    {
      date: '2020-05-01',
      type: '滚双',
      value: 1,
    },
    {
      date: '2020-05-01',
      type: '滚单',
      value: 4,
    },
    {
      date: '2020-05-01',
      type: '外环',
      value: 3,
    },
    {
      date: '2020-05-01',
      type: '内环',
      value: 1,
    },
    {
      date: '2020-05-01',
      type: '保外',
      value: 5,
    },
    {
      date: '2020-05-01',
      type: '保内',
      value: 4,
    },
  ];
  const relate = [
    {
      title: '轮径',
      dataIndex: 'diameter',
      key: 'diameter',
      align: 'center',
    },
    {
      title: '轮缘厚度',
      dataIndex: 'thickness',
      key: 'thickness',
      width: '25%',
      align: 'center',
    },
    {
      title: '轮缘高度',
      dataIndex: 'height',
      key: 'height',
      align: 'center',
    },
    {
      title: '内测距',
      dataIndex: 'inter',
      key: 'inter',
      align: 'center',
    },
    {
      title: 'QR值',
      dataIndex: 'value',
      key: 'value',
      align: 'center',
    },
  ];
  const relateData = [
    {
      diameter: '无',
      thickness: '无',
      height: '无',
      inter: '无',
      value: '无',
    },
    {
      diameter: '轮径状态',
      thickness: '轮缘厚度状态',
      height: '轮缘高度状态',
      inter: '内测距状态',
      value: 'QR值状态',
    },
  ];

  const faultColumns = [
    {
      title: '故障车号',
      dataIndex: 'trainCode',
      key: 'trainCode',
      width: '10%',
      align: 'center',
    },
    {
      title: '位置',
      dataIndex: 'site',
      key: 'site',
      width: '20%',
      align: 'center',
    },
    {
      title: '故障代码',
      dataIndex: 'faultCode',
      key: 'faultCode',
      width: '10%',
      align: 'center',
    },
    {
      title: '故障名称',
      dataIndex: 'faultName',
      key: 'faultName',
      width: '30%',
      align: 'center',
    },
    {
      title: '故障时间',
      dataIndex: 'faultTime',
      key: 'faultTime',
      align: 'center',
      width: '20%',
      sorter: (
        a: {
          count: number;
        },
        b: {
          count: number;
        },
      ) => a.count - b.count,
    },
    {
      title: '解决方案',
      dataIndex: 'solution',
      key: 'solution',
      width: '20%',
      align: 'center',
    },
    // {
    //   title: '故障描述和解决方案',
    //   dataIndex: 'option',
    //   valueType: 'option',
    //   align: 'center',
    //   width: '25%',
    //   render: (_: any, record: React.SetStateAction<{}>) => (
    //     <>
    //       <a
    //       // onClick={() => {
    //       //   handleUpdateModalVisible(true);
    //       //   setStepFormValues(record);
    //       // }}
    //       >
    //         查看详情
    //       </a>
    //       <Divider type="vertical" />
    //     </>
    //   ),
    // },

    // {
    //   title: '处理情况',
    //   dataIndex: 'status',
    //   key: 'status',
    //   align: 'center',
    // },
  ];
  const faultData = [
    {
      trainCode: '501',
      faultCode: "9105",
      site: "那洪站上行200米",
      faultName: 'TC1车4号前置处理器故障',
      faultTime: moment(new Date().getTime()).format('YYYY-MM-DD'),
      solution: '回库检修'
    },
    {
      trainCode: '501',
      faultCode: "9105",
      site: "那洪站上行200米",
      faultName: 'TC1车4号前置处理器故障',
      faultTime: moment(new Date().getTime()).format('YYYY-MM-DD'),
      solution: '回库检修'
    },
    {
      trainCode: '501',
      faultCode: "9105",
      site: "那洪站上行200米",
      faultName: 'TC1车4号前置处理器故障',
      faultTime: moment(new Date().getTime()).format('YYYY-MM-DD'),
      solution: '回库检修'
    },
    {
      trainCode: '501',
      faultCode: "9105",
      site: "那洪站上行200米",
      faultName: 'TC1车4号前置处理器故障',
      faultTime: moment(new Date().getTime()).format('YYYY-MM-DD'),
      solution: '回库检修'
    },
  ];
  const alertData: any[] = [];
  for (let i = 1; i < 10; i += 1) {
    alertData.push({
      id: '1',
      trainCode: `${i}`,
      // site: "南宁-那洪战",
      site: "那洪站上行200米",
      alertCode: "9148",
      alertName: 'TC1车4位轴端温度报警',
      alertTime: moment(new Date().getTime()).format('YYYY-MM-DD'),
      // status: '未处理',
      option: {
        faultDec: '门驱动电机启动(开门或关门方向），但没有检测到相符的电流值，则故障发生。',
        solution: "检查电机电路、接线、EDCU输出电路和电机。"
      }
    });
  }
  const alertColumns = [
    {
      title: '报警车号',
      dataIndex: 'trainCode',
      key: 'trainCode',
      width: '10%',
      align: 'center',
    },
    {
      title: '位置',
      dataIndex: 'site',
      key: 'site',
      width: '20%',
      align: 'center',
    },
    {
      title: '报警代码',
      dataIndex: 'alertCode',
      key: 'alertCode',
      width: '10%',
      align: 'center',
    },
    {
      title: '报警名称',
      dataIndex: 'alertName',
      key: 'alertName',
      width: '30%',
      align: 'center',
    },
    {
      title: '报警描述和解决方案',
      dataIndex: 'option',
      valueType: 'option',
      align: 'center',
      width: '20%',
      render: (_, row: any) => (
        <>
          <a onClick={openModal}>查看详情</a>
          <Modal
            title="报警描述和解决方案"
            visible={modalVisible}
            onOk={handleOk}
            closable={false}
            // cancelText=" "
            onCancel={handleOk}
          >
            <p
            // style={{ borderWidth: "1px", borderStyle: "silid", borderColor: "#fff"}}
            >报警描述：&nbsp;{row.option.faultDes}</p>
            <p style={{ borderWidth: "1px" }}>解决方案：&nbsp;{row.option.solution}</p>
          </Modal>
          <Divider type="vertical" />
        </>
      ),
    },
    {
      title: '报警时间',
      dataIndex: 'alertTime',
      key: 'alertTime',
      align: 'center',
      width: '20%',
      sorter: (
        a: {
          count: number;
        },
        b: {
          count: number;
        },
      ) => a.count - b.count,
    },
    // {
    //   title: '处理情况',
    //   dataIndex: 'status',
    //   key: 'status',
    //   align: 'center',
    // },
  ];



  const lifeestimate = [
    {
      title: '评估车号',
      dataIndex: 'trainCode',
      key: 'trainCode',
      align: 'center',
    },
    {
      title: '评估部件',
      dataIndex: 'fault',
      key: 'fault',
      width: '25%',
      align: 'center',
    },
    {
      title: '评估时间',
      dataIndex: 'faultTime',
      key: 'faultTime',
      align: 'center',
      sorter: (
        a: {
          count: number;
        },
        b: {
          count: number;
        },
      ) => a.count - b.count,
    },
    {
      title: '寿命预测',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
    },
  ];
  const lifeestimateData = [
    {
      trainCode: '0516',
      fault: '1车1轴轴箱传动端',
      faultTime: moment(new Date().getTime()).format('YYYY-MM-DD'),
      status: '9.798万公里',
    },
    {
      trainCode: '0516',
      fault: '1车1轴轴箱传动端',
      faultTime: moment(new Date().getTime()).format('YYYY-MM-DD'),
      status: '0公里',
    },
    {
      trainCode: '0516',
      fault: '1车1轴轴箱传动端',
      faultTime: moment(new Date().getTime()).format('YYYY-MM-DD'),
      status: '0公里',
    },
    {
      trainCode: '0516',
      fault: '1车1轴轴箱传动端',
      faultTime: moment(new Date().getTime()).format('YYYY-MM-DD'),
      status: '0公里',
    },
    {
      trainCode: '0516',
      fault: '1车1轴轴箱传动端',
      faultTime: moment(new Date().getTime()).format('YYYY-MM-DD'),
      status: '0公里',
    },
  ];
  const zhineng = [
    { type: "那洪站上行120米", dec: "你有故障了", time: "2020-09-26" },
    { type: "那洪站上行120米", dec: "你有故障了", time: "2020-09-26" },
  ]

  const faultState = [
    {
      name: "Tc1", value: [
        { state: 0, temperature: 54 },
        { state: 1, temperature: 54 },
        { state: 0, temperature: 54 },
        { state: 2, temperature: 54 },
        { state: 0, temperature: 54 },
        { state: 3, temperature: 78 },
        { state: 0, temperature: 54 },
        { state: 0, temperature: 54 }]
    },
    {
      name: "Mp1", value: [
        { state: 0, temperature: 54 },
        { state: 1, temperature: 54 },
        { state: 0, temperature: 54 },
        { state: 2, temperature: 54 },
        { state: 0, temperature: 54 },
        { state: 3, temperature: 78 },
        { state: 0, temperature: 54 },
        { state: 0, temperature: 54 }]
    },
    {
      name: "M1", value: [
        { state: 0, temperature: 54 },
        { state: 1, temperature: 54 },
        { state: 0, temperature: 54 },
        { state: 2, temperature: 54 },
        { state: 0, temperature: 54 },
        { state: 3, temperature: 78 },
        { state: 0, temperature: 54 },
        { state: 0, temperature: 54 }]
    },
    {
      name: "M2", value: [
        { state: 0, temperature: 54 },
        { state: 1, temperature: 54 },
        { state: 0, temperature: 54 },
        { state: 2, temperature: 54 },
        { state: 0, temperature: 54 },
        { state: 3, temperature: 78 },
        { state: 0, temperature: 54 },
        { state: 0, temperature: 54 }]
    },
    {
      name: "Mp2", value: [
        { state: 0, temperature: 54 },
        { state: 1, temperature: 54 },
        { state: 0, temperature: 54 },
        { state: 2, temperature: 54 },
        { state: 0, temperature: 78 },
        { state: 3, temperature: 78 },
        { state: 0, temperature: 54 },
        { state: 0, temperature: 54 }]
    },
    {
      name: "Tc2", value: [
        { state: 0, temperature: 54 },
        { state: 1, temperature: 54 },
        { state: 0, temperature: 89 },
        { state: 2, temperature: 54 },
        { state: 0, temperature: 54 },
        { state: 3, temperature: 78 },
        { state: 0, temperature: 54 },
        { state: 0, temperature: 54 }]
    },
  ]
  return (
    <div>
      <Row gutter={24}>
        <Col xl={24} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: -8, marginTop: -8 }}>
          <LineCodeAndTrainCodeQuery />
        </Col>
      </Row>

      <Card
        title="状态信息"
        extra={
          <div>
            <Tag color="#a0d911">正常</Tag>
            <Tag color="#ffec3d">轻微故障</Tag>
            <Tag color="#fa8c16">中等故障</Tag>
            <Tag color="#f5222d">严重故障</Tag>
            <Tag color="#1890ff">轴端传感器温度（°C）</Tag>
          </div>
        }
        bordered={false} bodyStyle={{ paddingTop: 16, paddingBottom: 0, }} className={styles.title} title="车轴分布图">
        <RunningMap data={faultState} />
      </Card>


      <Row gutter={16}>
        <Col xl={12} lg={12} sm={24} xs={24}>
          <Card title="故障与预警信息"
            bordered={false}
            className={styles.title}
            style={{ height: "38vh" }}
            extra={
              <ExportExcel
                fileName='能耗信息表'
                sheetData={faultData}
                sheetName='sheet'
                sheetHeader={['故障车号', '位置', '故障代码', '故障名称', '故障时间', '解决方案']}
                sheetFilter={[]}
              />
            }>
            <RunningTable loading={loading} searchData={faultData} columns={faultColumns} height={160} />
          </Card>
        </Col>
        <Col xl={8} lg={12} sm={24} xs={24}>
          <Card title="故障统计次数" bordered={false} className={styles.title} style={{ height: "38vh" }} >
            <FaultPie borderWidth={2} height={160} data={faultChart} />
          </Card>
        </Col>
        <Col xl={4} lg={12} sm={24} xs={24}>
          <Card title="预警" bordered={false} className={styles.title} style={{ height: "38vh" }} >
            <div style={{ padding: 24 }}>
              <Typography.Text type="warning">预警</Typography.Text>
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
                  </List.Item>
                )}
              >
              </List>
            </div>
          </Card>
        </Col>
      </Row>


      {/* <Col xl={8} lg={12} sm={24} xs={24}>
            <div style={{ paddingLeft: 24 }}>故障次数统计</div>
            <FaultPie borderWidth={2} height={160} data={faultChart} />
          </Col>
          <Col xl={4} lg={12} sm={24} xs={24}>
            <div style={{ padding: 24 }}>
              <Typography.Text type="warning">预警</Typography.Text>
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
                  </List.Item>
                )}
              >
              </List>
            </div>
          </Col>
        </Row>
      </Card> */}



      <Card title="报警信息"
        bordered={false}
        className={styles.title}
        extra={
          <ExportExcel
            fileName='能耗信息表'
            sheetData={faultData}
            sheetName='sheet'
            sheetHeader={['报警车号', '位置', '报警代码', '报警名称', '报警描述和解决方案', '故障时间',]}
            sheetFilter={[]}
          />
        }
      >
        <Row gutter={16}>
          <Col xl={12} lg={12} sm={24} xs={24}>
            <RunningTable
              loading={loading}
              searchData={alertData}
              columns={alertColumns}
              height={160} />
          </Col>
          <Col xl={12} lg={12} sm={24} xs={24}>
            <div style={{ paddingLeft: 24 }}>报警次数统计</div>
            <ComponentFault borderWidth={2} height={160} data={alertChart} />
          </Col>
          {/* <span>
            {' '}
            <Typography.Text>关联数据</Typography.Text>
          </span>
          <RelationFault borderWidth={2} height={130} data={relationData} /> */}
        </Row>
      </Card>

    </div>
  );
};
// }

export default connect(
  ({
    SubsystemAndRunning,
    loading,
  }: {
    SubsystemAndRunning: BasicProfileDataType;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    SubsystemAndRunning,
    loading: loading.effects['SubsystemAndRunning/fetchBasic'],
  }),
)(Running);
