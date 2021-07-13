import { Tabs, Table, Card } from 'antd';
import React, { useState, useEffect } from 'react';
import styles from '../../style.less'
import { subsystemDataType } from '../../data'
import { subSystemMonitor } from '../../service';
import ComponentStructure from './ComponentStructure.png';

const { TabPane } = Tabs;
interface TrainSystemTableProps {
  subsystemData?: subsystemDataType;
  columns?: Array<any>;
  trainCode: string;
}

const TrainSystemTable: React.FC<TrainSystemTableProps> = (props) => {
  const { trainCode } = props;
  const [subsystemData, setSubsystemData] = useState([]);

  const columns = [
    {
      title: '车号',
      dataIndex: 'dataName',
      key: 'dataName',
      // width: 100,
      align: 'left',
    },
    {
      title: '部件1',
      dataIndex: 'desc1',
      key: 'desc1',
      // width: 100,
      align: 'center',
    },
    {
      title: '部件2',
      dataIndex: 'desc2',
      key: 'desc2',
      // width: 100,
      align: 'center',
    },
    {
      title: '部件3',
      dataIndex: 'desc3',
      key: 'desc3',
      // width: 100,
      align: 'center',
    },
    {
      title: '实际运营时间/年',
      dataIndex: 'desc4',
      key: 'desc4',
      // width: 100,
      align: 'center',
    },
    {
      title: '实际运营里程/公里',
      dataIndex: 'desc5',
      key: 'desc5',
      // width: 100,
      align: 'center',
    },
    {
      title: '部件设计寿命/年',
      dataIndex: 'desc6',
      key: 'desc6',
      // width: 100,
      align: 'center',
    },
  ];

  useEffect(() => {
    const response = subSystemMonitor({ trainCode, sysName: 'keyParams' });
    response.then((data) => {
      setSubsystemData(data);
    });
  }, [])

  const handleChange = async (activeKey: string) => {
    const response = subSystemMonitor({ trainCode, sysName: activeKey });
    response.then((data) => {
      setSubsystemData(data);
    });
  }

  const tabsData = [
    {
      tab: 'TCMS',
      key: 'tcms',
      subsystemData,
      columns,
    },
    {
      tab: 'LCU',
      key: 'lcu',
      subsystemData,
      columns,
    },
    {
      tab: '牵引辅助系统',
      key: 'qy',
      subsystemData,
      columns,
    },
    {
      tab: '制动系统',
      key: 'zd',
      subsystemData,
      columns,
    },
    {
      tab: '转向架',
      key: 'zxj',
      subsystemData,
      columns,
    },
    {
      tab: '车门',
      key: 'cm',
      subsystemData,
      columns,
    },
    {
      tab: '空调系统',
      key: 'pis',
      subsystemData,
      columns,
    },
    {
      tab: 'PIS',
      key: 'pis',
      subsystemData,
      columns,
    },
  ];
  const data = [
    { dataName: 'TMc1', desc1: 'EGWM', desc2: 'HMI', desc3: 'SIM', desc4: '1', desc5: '10000', desc6: '10' },
    { dataName: 'TMc1', desc1: 'AXMe', desc2: 'HMI', desc3: 'SIM', desc4: '11', desc5: '12000', desc6: '10' },
    { dataName: 'TMc1', desc1: 'DIME', desc2: 'HMI', desc3: 'SIM', desc4: '0', desc5: '1000', desc6: '10' }
  ]

  return (
    <div>
      <Tabs type="card"
        onChange={handleChange}
      >
        {tabsData ? tabsData.map(item => (
          <TabPane tab={item.tab} key={item.key}>
            <Table
              className={styles.system}
              columns={item.columns}
              dataSource={item.subsystemData == !null ? item.subsystemData : data}
              bordered
              size="middle"
              pagination={{ pageSize: 50 }}
              scroll={{ x: 'calc(700px + 50%)', y: 600 }}
            />
          </TabPane>
        )) : null}
      </Tabs>
      {/* <Card title="部件结构层次" bordered={false}> */}
      {/* <div>部件结构层次</div> */}
      <img
        style={{ width: "100%", height: "50%" }}
        src={ComponentStructure}
      />
      {/* </Card> */}
    </div>
  );
};
export default TrainSystemTable;
