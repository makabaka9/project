import { DonutChart, PieChart } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';
import { Col, Row, Statistic, Table, Tabs } from 'antd';
import monitor from './monitor.png';
import styles from '../../style.less';

const { TabPane } = Tabs;
export interface MonitorMapProps {
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  data: any;
  columns: any
  data1: any;
  columns1: any
}

const MonitorMap: React.FC<MonitorMapProps> = (props) => {
  const { height = 1, data, columns, data1, columns1, } = props;
  // console.log("data", data)
  const chartHeight = height + 100;
  return (
    <div
    >
      <Tabs defaultActiveKey="1" type="card"
      // onChange={callback}
      >
        <TabPane tab="视频监控" key="1">
          <div style={{ height: chartHeight }}>
            <img
              style={{ width: "100%", height: "100%" }}
              src={monitor}
            />
          </div>
        </TabPane>

        <TabPane tab="事件记录" key="2">
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
        <TabPane tab="提示信息" key="3">
          <Table
            className={styles.warnTable}
            rowKey={(record) => record.index}
            size="small"
            columns={columns1}
            dataSource={data1}
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

export default MonitorMap;
