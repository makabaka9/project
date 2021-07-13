
import React, { useState } from 'react';
import { Descriptions, Pagination, Tabs, Row, Col, Empty, Table } from 'antd';
import CircleIcon from './circleIcon';
import styles from '../../style.less';


const { TabPane } = Tabs;
export interface IOParamsProps {
  columns: any;
}

const brake = {
  record: {
    coach_names: "Mc1,Tp1,M1,M2,Tp2,Mc2",
    data: [
      {
        name: "CCU主控板硬件版本",
        M1: [{ index: "1_1", value: "----", display: "", type: "value" }],
        M2: [{ index: "1_1", value: "----", display: "", type: "value" }],
        Mp1: [{ index: "1_1", value: "----", display: "", type: "value" }],
        Mp2: [{ index: "1_1", value: "----", display: "", type: "value" }],
        Tc1: [{ index: "1_1", value: "1.2.3", display: "", type: "value" }],
        Tc2: [{ index: "1_1", value: "0.0.0", display: "", type: "value" }]
      },
      {
        name: "CCU主控板逻辑版本",
        M1: [{ index: "1_1", value: "----", display: "", type: "value" }],
        M2: [{ index: "1_1", value: "----", display: "", type: "value" }],
        Mp1: [{ index: "1_1", value: "----", display: "", type: "value" }],
        Mp2: [{ index: "1_1", value: "----", display: "", type: "value" }],
        Tc1: [{ index: "1_1", value: "1.2.3", display: "", type: "value" }],
        Tc2: [{ index: "1_1", value: "0.0.0", display: "", type: "value" }]
      },
      {
        name: "CCU主控板底层版本",
        M1: [{ index: "1_1", value: "----", display: "", type: "value" }],
        M2: [{ index: "1_1", value: "----", display: "", type: "value" }],
        Mp1: [{ index: "1_1", value: "----", display: "", type: "value" }],
        Mp2: [{ index: "1_1", value: "----", display: "", type: "value" }],
        Tc1: [{ index: "1_1", value: "1.2.3", display: "", type: "value" }],
        Tc2: [{ index: "1_1", value: "0.0.0", display: "", type: "value" }]
      },
      {
        name: "CCU主控板应用版本",
        M1: [{ index: "1_1", value: "----", display: "", type: "value" }],
        M2: [{ index: "1_1", value: "----", display: "", type: "value" }],
        Mp1: [{ index: "1_1", value: "----", display: "", type: "value" }],
        Mp2: [{ index: "1_1", value: "----", display: "", type: "value" }],
        Tc1: [{ index: "1_1", value: "1.2.3", display: "", type: "value" }],
        Tc2: [{ index: "1_1", value: "0.0.0", display: "", type: "value" }]
      },
      {
        name: "CCU记录板硬件版本",
        M1: [{ index: "1_1", value: "----", display: "", type: "value" }],
        M2: [{ index: "1_1", value: "----", display: "", type: "value" }],
        Mp1: [{ index: "1_1", value: "----", display: "", type: "value" }],
        Mp2: [{ index: "1_1", value: "----", display: "", type: "value" }],
        Tc1: [{ index: "1_1", value: "1.2.3", display: "", type: "value" }],
        Tc2: [{ index: "1_1", value: "0.0.0", display: "", type: "value" }]
      },
      {
        name: "CCU记录板逻辑版本",
        M1: [{ index: "1_1", value: "----", display: "", type: "value" }],
        M2: [{ index: "1_1", value: "----", display: "", type: "value" }],
        Mp1: [{ index: "1_1", value: "----", display: "", type: "value" }],
        Mp2: [{ index: "1_1", value: "----", display: "", type: "value" }],
        Tc1: [{ index: "1_1", value: "1.2.3", display: "", type: "value" }],
        Tc2: [{ index: "1_1", value: "0.0.0", display: "", type: "value" }]
      },
      {
        name: "CCU记录板底层版本",
        M1: [{ index: "1_1", value: "----", display: "", type: "value" }],
        M2: [{ index: "1_1", value: "----", display: "", type: "value" }],
        Mp1: [{ index: "1_1", value: "----", display: "", type: "value" }],
        Mp2: [{ index: "1_1", value: "----", display: "", type: "value" }],
        Tc1: [{ index: "1_1", value: "1.2.3", display: "", type: "value" }],
        Tc2: [{ index: "1_1", value: "0.0.0", display: "", type: "value" }]
      },
      {
        name: "CCU记录板应用版本",
        M1: [{ index: "1_1", value: "----", display: "", type: "value" }],
        M2: [{ index: "1_1", value: "----", display: "", type: "value" }],
        Mp1: [{ index: "1_1", value: "----", display: "", type: "value" }],
        Mp2: [{ index: "1_1", value: "----", display: "", type: "value" }],
        Tc1: [{ index: "1_1", value: "1.2.3", display: "", type: "value" }],
        Tc2: [{ index: "1_1", value: "0.0.0", display: "", type: "value" }]
      },
      {
        name: "HMI版本",
        M1: [{ index: "1_1", value: "----", display: "", type: "value" }],
        M2: [{ index: "1_1", value: "----", display: "", type: "value" }],
        Mp1: [{ index: "1_1", value: "----", display: "", type: "value" }],
        Mp2: [{ index: "1_1", value: "----", display: "", type: "value" }],
        Tc1: [{ index: "1_1", value: "1.2.3", display: "", type: "value" }],
        Tc2: [{ index: "1_1", value: "0.0.0", display: "", type: "value" }]
      }
    ]
  }
}
function HandleData(name, coachCode) {
  var stateIcon3: any[] = [];
  if (coachCode?.length) {
    coachCode?.map((item) => {
      if (item.type === 'img') {
        const imageurl1 = require('./' + item.value)
        if (item.index === '2_1') {
          stateIcon3.push(<><br /><img src={imageurl1} style={{ width: 20 }} /></>)
        } else {
          stateIcon3.push(<img src={imageurl1} style={{ width: 20 }} />)
        }
      } else {
        stateIcon3.push(item.value)
      }
    })
  }
  return stateIcon3
}
const handleSubSystemData = brake?.record.data.map(item => ({
  name: item.name,
  Tc1: HandleData(item.name, item.Tc1),
  Mp1: HandleData(item.name, item.Mp1),
  M1: HandleData(item.name, item.M1),
  M2: HandleData(item.name, item.M2),
  Mp2: HandleData(item.name, item.Mp2),
  Tc2: HandleData(item.name, item.Tc2)
}))
const Version: React.FC<IOParamsProps> = (props) => {
  const { columns } = props;
  const chartHeight = 380;


  return (
    <div
    >
      <Table
        style={{
          height: 400,
          width: "100%",
          // paddingLeft: 160
        }}
        className={styles.system}
        rowKey={(record) => record.index}
        size="small"
        columns={columns}
        dataSource={handleSubSystemData}
        // pagination={false}
        // scroll={{ y: chartHeight }}
        pagination={{
          simple: true,
          style: {
            marginBottom: -5,
          },
          pageSize: 9,

        }}
        scroll={{ y: 300 }}

      />
    </div >
  );
};



export default Version;
