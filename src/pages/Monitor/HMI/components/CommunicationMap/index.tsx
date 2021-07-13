import { DonutChart, PieChart } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';
import { Col, Row, Statistic, Table, Tabs } from 'antd';
import communicationState from './communicationState.png';
import tip from './tip.png';
import styles from '../../style.less';

const { TabPane } = Tabs;
export interface CommunicationMapProps {
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  data: any;
  columns: any;
}

const CommunicationMap: React.FC<CommunicationMapProps> = (props) => {
  const { height = 1, data, columns } = props;
  const chartHeight = height + 100;
  return (
    <div
    >
      <Tabs defaultActiveKey="1" type="card"
      // onChange={callback}
      >
        <TabPane tab="通讯状态" key="1">
          <div style={{ height: chartHeight }}>
            <img
              style={{ width: "100%", height: "100%" }}
              src={communicationState}
            />
          </div>
        </TabPane>

        <TabPane tab="司机操作记录" key="2">
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
        <TabPane tab="帮助说明" key="3">
          <div style={{ height: chartHeight }}>
            <img
              style={{ width: "100%", height: "100%" }}
              src={tip}
            />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default CommunicationMap;
