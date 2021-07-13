import { Tabs, Table, Card } from 'antd';
import React, { useEffect } from 'react';
import styles from '../../style.less';
// import Trend from '../Trend';
import moment from 'moment';
// const { TabPane } = Tabs;
interface EnergyTableProps {
  subsystemData: {
    month: string;
    city: number | string;
    temperature: number;
  }[];
  // columns?: Array<any>;
  // trainCode?: string;
}

const EnergyTable: React.FC<EnergyTableProps> = (props) => {
  const { subsystemData } = props;
  // const [subsystemData, setSubsystemData] = useState([]);
  // const chartHeight = '20vh';
  const columns: any[] = [
    {
      title: '序号',
      dataIndex: 'index',
      width: '10%',
      align: 'left',
      render:(text,record,index)=>`${index+1}`,
    },
    {
      title: '统计时段',
      dataIndex: 'statisticalTime',
      key: 'statisticalTime',
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
      title: '牵引能耗/kWh',
      dataIndex: 'tractionEnergy',
      key: 'tractionEnergy',
      align: 'center',
    },
    {
      title: '制动电阻能耗/kWh',
      dataIndex: 'brakeEnergy',
      key: 'brakeEnergy',
      align: 'center',
    },
    {
      title: '辅助能耗/kWh',
      dataIndex: 'auxiliaryEnergy',
      key: 'auxiliaryEnergy',
      align: 'center',
    },
    {
      title: '再生能量/kWh',
      dataIndex: 'reEnergy',
      key: 'reEnergy',
      align: 'center',
    },
    {
      title: '净能耗/kWh',
      dataIndex: 'netEnergy',
      key: 'netEnergy',
      align: 'center',
    },
  ];

  return (
    <div>
      <Table
        style={{ height: "18vh" }}
        className={styles.system}
        columns={columns}
        dataSource={subsystemData}
        size="small"
        pagination={false}
        scroll={{ y: 126 }}
      />

    </div>
  );
};
export default EnergyTable;
