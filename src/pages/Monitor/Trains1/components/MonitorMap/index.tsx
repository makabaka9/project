
import React, { useEffect, useState } from 'react';
import { Col, List, Row, Table, Tabs } from 'antd';
import styles from '../../style.less';
import type { StateType } from '../../model';
import FlowChart from './FlowChart'
import IOParams from './IOParams';
import Prompt from './prompt';
import Verision from './version';
import Other from './other'
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import Bypass from '../images/bypass/bypass';
import useInterval from '@/components/useInterval';
import TractionParams from './TractionParams';
import Brake from './Brake';
import Auxiliary from './Auxiliary';
import Version from './version';

const { TabPane } = Tabs;

export type MonitorMapProps = {
  monitorAndHMI2: StateType;
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  bypassColumns: any;
  coachColumns: any;
  lineCode: string;
  trainCode: string;
  dispatch: Dispatch;
  eventRecord?: any;
  bottomList?: any;
  paramsList?: any;
}



const MonitorMap: React.FC<MonitorMapProps> = (props) => {
  const { bypassInformationData,tractionInformation,airconditionInformation,brakingInformation,auxInformation, height = 300, dispatch } = props;
  // const { } = monitorAndHMI2;

  const chartHeight = height + 100;
  const coachColumns = [
    {
      title: < div
        style={{
          height: 41,
          width: 20,
          backgroundColor: '#c0c0c0',
          borderTopLeftRadius: 6,
          borderBottomLeftRadius: 6,
          float: 'right'
        }}>
      </div >,
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      align: 'center',
      className: styles.header,
    },
    {
      title: 'Tc1',
      dataIndex: 'Tc1',
      key: 'Tc1',
      // width: 100,
      align: 'center',
      className: styles.header,
    },
    {
      title: 'Mp1',
      dataIndex: 'Mp1',
      key: 'Mp1',
      // width: 100,
      align: 'center',
      className: styles.header,
    },
    {
      title: 'M1',
      dataIndex: 'M1',
      key: 'M1',
      // width: 100,
      align: 'center',
      className: styles.header,
    },
    {
      title: 'M2',
      dataIndex: 'M2',
      key: 'M2',
      // width: 100,
      align: 'center',
      className: styles.header,
    },
    {
      title: 'Mp2',
      dataIndex: 'Mp2',
      key: 'Mp2',
      // width: 100,
      align: 'center',
      className: styles.header,
    },
    {
      title: 'Tc2',
      dataIndex: 'Tc2',
      key: 'Tc2',
      // width: 100,
      align: 'center',
      className: styles.header,
    },
    {
      title: <div
        style={{
          height: 41,
          width: 20,
          backgroundColor: '#c0c0c0',
          borderTopRightRadius: 6,
          borderBottomRightRadius: 6
        }}>
      </div>,
      dataIndex: 'address',
      key: 'address',
      align: 'left',
      className: styles.tableText
    },

  ];


  const air = {
    record: {
      coach_names: "Mc1,Tp1,M1,M2,Tp2,Mc2",
      data: [
        {
          name: "目标温度(℃)",
          M1: [{ index: "1_1", value: "23.9", display: "", type: "value" }],
          M2: [{ index: "1_1", value: "23.9", display: "", type: "value" }],
          Tc1: [{ index: "1_1", value: "24.5", display: "", type: "value" }],
          Tc2: [{ index: "1_1", value: "24.4", display: "", type: "value" }],
          Mp1: [{ index: "1_1", value: "24.5", display: "", type: "value" }],
          Mp2: [{ index: "1_1", value: "24", display: "", type: "value" }]
        },
        {
          name: "车外温度(℃)",
          M1: [{ index: "1_1", value: "31.2", display: "", type: "value" }],
          M2: [{ index: "1_1", value: "31.1", display: "", type: "value" }],
          Tc1: [{ index: "1_1", value: "31.5", display: "", type: "value" }],
          Tc2: [{ index: "1_1", value: "231.4", display: "", type: "value" }],
          Mp1: [{ index: "1_1", value: "24.5", display: "", type: "value" }],
          Mp2: [{ index: "1_1", value: "22.8", display: "", type: "value" }]
        },
        {
          name: "车内温度(℃)",
          M1: [{ index: "1_1", value: "23.6", display: "", type: "value" }],
          M2: [{ index: "1_1", value: "23.6", display: "", type: "value" }],
          Tc1: [{ index: "1_1", value: "24.5", display: "", type: "value" }],
          Tc2: [{ index: "1_1", value: "24.4", display: "", type: "value" }],
          Mp1: [{ index: "1_1", value: "23.5", display: "", type: "value" }],
          Mp2: [{ index: "1_1", value: "23", display: "", type: "value" }]
        },
        // {
        //   name: "机组1压缩机",
        //   M1: [],
        //   M2: [],
        //   Tc1: [],
        //   Tc2: [],
        //   Mp1: [],
        //   Mp2: []
        // },
        // {
        //   name: "机组2压缩机",
        //   M1: [],
        //   M2: [],
        //   Tc1: [],
        //   Tc2: [],
        //   Mp1: [],
        //   Mp2: []
        // },
        // {
        //   name: "机组1新风档位",
        //   M1: [],
        //   M2: [],
        //   Tc1: [],
        //   Tc2: [],
        //   Mp1: [],
        //   Mp2: []
        // },
        // {
        //   name: "机组2新风档位",
        //   M1: [],
        //   M2: [],
        //   Tc1: [],
        //   Tc2: [],
        //   Mp1: [],
        //   Mp2: []
        // },
      ]
    }
  }
  function HandleData(name, coachCode) {
    var stateIcon3: any[] = [];
    // if (coachCode?.length) {
      //coachCode?.map((item) => {
        const item = coachCode;
        if (item.type === 'img') {
          const imageurl1 = require('./' + item.value)
          if (item.index === '2_1') {
            stateIcon3.push(<><br /><img src={imageurl1} style={{ width: 20 }} /></>)
          } else {
            stateIcon3.push(<img src={imageurl1} style={{ width: 20 }} />)
          }
        } else {
          if (name === '集控/本控' || name === '空调1模式' || name === '空调2模式') {
            stateIcon3.push(item.display)
          } else {
            stateIcon3.push(item.value)
          }
        }
      //})
    //}
    return stateIcon3
  }
  const handleSubSystemData = airconditionInformation?.record?.map(item => ({
    name: item.name,
    Tc1: HandleData(item.name, item.Tc1),
    Mp1: HandleData(item.name, item.Mp1),
    M1: HandleData(item.name, item.M1),
    M2: HandleData(item.name, item.M2),
    Mp2: HandleData(item.name, item.Mp2),
    Tc2: HandleData(item.name, item.Tc2)
  }))
  //旁路假数据
  // const bypassInformationData = [
  //   { index: "1_1", value: "0", display: "门关好旁路", type: "sign" },
  //   { index: "1_2", value: "1", display: "所有制动缓解旁路", type: "sign" },
  //   { index: "1_3", value: "1", display: "总风压力可用旁路", type: "sign" },
  //   { index: "1_1", value: "0", display: "门关好旁路", type: "sign" },
  //   { index: "1_2", value: "1", display: "所有制动缓解旁路", type: "sign" },
  //   { index: "1_3", value: "1", display: "总风压力可用旁路", type: "sign" },
  //   { index: "1_1", value: "0", display: "门关好旁路", type: "sign" },
  //   { index: "1_2", value: "1", display: "所有制动缓解旁路", type: "sign" },
  //   { index: "1_3", value: "1", display: "总风压力可用旁路", type: "sign" },
  //   { index: "1_1", value: "0", display: "门关好旁路", type: "sign" },
  // ]

  return (
    <div
    >
      <Tabs defaultActiveKey="1" type="card"
      // onChange={onChange}
      >
        <TabPane tab={<div style={{ width: 55, textAlign: "center" }}>{"旁路监控"}</div>} key="旁路监控">
          <Row>
            <Col>
              <div style={{ height: 400, paddingTop: 10, }}
                className={styles.system}
              >
                <List
                  rowKey="id"
                  grid={{
                    gutter: 2, // 栅格的间距
                    column: 1,
                    xs: 1,
                    sm: 2,
                    md: 1,
                    lg: 1,
                    xl: 1,
                  }}
                  className={styles.warnTable}
                  style={{ paddingLeft: 260, }}
                  size='small'
                  dataSource={bypassInformationData}
                  renderItem={(item: any) => (
                    <List.Item>
                      <div style={{
                        padding: 2,
                        textAlign: "center",
                        borderRadius: 10,
                        width: 200,
                        margin: -5,
                        backgroundColor: item.value == 1 ? "#FE0000" : "",
                        height: 30,
                        borderWidth: 1,
                        borderStyle: "solid",
                        borderColor: '#fff',
                      }}
                      >
                        {item.display}
                      </div>
                    </List.Item>
                  )}
                >
                </List>
              </div>
            </Col>
          </Row>
        </TabPane>
        <TabPane tab={<div style={{ width: 55, textAlign: "center" }}>{"空调"}</div>} key="空调">
          <Row>
            <Col>
              <Table
                style={{
                  height: 400,
                  width: "100%",
                  // paddingLeft: 160
                }}
                className={styles.system}
                rowKey={(record) => record.index}
                size="small"
                columns={coachColumns}
                dataSource={handleSubSystemData}
                // pagination={false}
                // scroll={{ y: chartHeight }}
                pagination={{
                  simple: true,
                  style: {
                    marginBottom: -5,
                  },
                  pageSize: 13,

                }}
                scroll={{ y: 320 }}

              />
            </Col>
          </Row>
        </TabPane>


        <TabPane style={{ height: 400 }} tab={<div style={{ width: 55, textAlign: "center" }}>{"牵引系统"}</div>} key="牵引系统" >
          <TractionParams tractionInformation={tractionInformation}/>
        </TabPane>
        <TabPane style={{ height: 400 }} tab={<div style={{ width: 55, textAlign: "center" }}>{"制动系统"}</div>} key="制动系统">
          <Brake columns={coachColumns} brakingInformation={brakingInformation}/>
        </TabPane>
        <TabPane style={{ height: 400 }} tab={<div style={{ width: 55, textAlign: "center" }}>{"辅助系统"}</div>} key="辅助系统">
          <Auxiliary auxInformation={auxInformation} />
        </TabPane>
        {/* <TabPane style={{ height: 400 }} tab={<div style={{ width: 55, textAlign: "center" }}>{"IO参数"}</div>} key="IO参数">
          <IOParams />
        </TabPane>
        <TabPane style={{ height: 400 }} tab={<div style={{ width: 55, textAlign: "center" }}>{"网络拓扑"}</div>} key="网络拓扑">
          <FlowChart />
        </TabPane>
        <TabPane style={{ height: 400 }} tab={<div style={{ width: 55, textAlign: "center" }}>{"软件版本"}</div>} key="软件版本">
          <Version columns={coachColumns} />
        </TabPane> */}
      </Tabs>
    </div >
  );
};

// export default MonitorMap;
export default connect(
  ({
    monitorAndHMI2,
    loading,
  }: {
    monitorAndHMI2: StateType;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    monitorAndHMI2,
    loading: loading.effects['monitorAndHMI2/fetchEventRecord'],
  }),
)(MonitorMap);
