import { DonutChart, PieChart } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';
import { Col, Row, Statistic, Table, Tabs } from 'antd';
import styles from '../../style.less';

const { TabPane } = Tabs;
export interface HavcMapProps {
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  airconditionData: any;
  bypassInformationData1: any;
  columns: any
  columns1: any

}

const Havc: React.FC<HavcMapProps> = (props) => {
  const { height = 1, airconditionData, bypassInformationData1, columns, columns1 } = props;
  const chartHeight = height + 100;

  return (
    <div>
      <Tabs defaultActiveKey="1" type="card"
      // onChange={callback}
      >
        <TabPane tab="空调状态" key="1">
          <Table
            className={styles.warnTable}
            rowKey={(record) => record.index}
            size="small"
            columns={columns}
            dataSource={airconditionData}
            pagination={false}
            // pagination={{
            //   style: {
            //     marginBottom: 0,
            //   },
            //   pageSize: 50,
            // }}
            scroll={{ y: 180 }}
          />
        </TabPane>
        <TabPane tab="旁路信息" key="2">
          <Table
            className={styles.warnTable}
            rowKey={(record) => record.index}
            size="small"
            columns={columns1}
            dataSource={bypassInformationData1}
            // pagination={{
            //   style: {
            //     marginBottom: 0,
            //   },
            //   pageSize: 50,
            // }}
            scroll={{ y: 180 }}
          />
        </TabPane>

      </Tabs>
    </div>
  );
};

export default Havc;
