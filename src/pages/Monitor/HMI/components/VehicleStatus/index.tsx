import { DonutChart, PieChart } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';
import { Col, Row, Statistic, Table, Tabs } from 'antd';
import styles from '../../style.less';

const { TabPane } = Tabs;
export interface VehicleStatusTableProps {
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  data: any;
  columns: any
}

const VehicleStatusTable: React.FC<VehicleStatusTableProps> = (props) => {
  const { height = 1, data, columns } = props;
  const chartHeight = height + 100;

  return (
    <div>
      <Tabs defaultActiveKey="1" type="card"
      // onChange={callback}
      >
        <TabPane tab="牵引系统" key="1">
          <Table
            className={styles.warnTable}
            rowKey={(record) => record.index}
            size="small"
            columns={columns}
            dataSource={data}
            pagination={{
              style: {
                marginBottom: 0,
              },
              pageSize: 50,
            }}
            scroll={{ y: 180 }}
          />
        </TabPane>
        <TabPane tab="制动系统" key="2">
          <Table
            className={styles.warnTable}
            rowKey={(record) => record.index}
            size="small"
            columns={columns}
            dataSource={data}
            pagination={{
              style: {
                marginBottom: 0,
              },
              pageSize: 50,
            }}
            scroll={{ y: 180 }}
          />
        </TabPane>
        <TabPane tab="辅助系统" key="3">
          <Table
            className={styles.warnTable}
            rowKey={(record) => record.index}
            size="small"
            columns={columns}
            dataSource={data}
            pagination={{
              style: {
                marginBottom: 0,
              },
              pageSize: 50,
            }}
            scroll={{ y: 180 }}
          />
        </TabPane>

      </Tabs>
    </div>
  );
};

export default VehicleStatusTable;
