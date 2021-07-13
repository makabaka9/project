
import React, { useEffect, useState } from 'react';
import { Table, Tabs } from 'antd';
import styles from '../../style.less';
import LCU from './LCU';
import BCU from './BCU';
import TCU from './TCU';
import { connect, Dispatch } from 'umi';
import { StateType } from '../../model';
import Battery from './Battery';
import Sensor from './Sensor';
import { queryJsonMap, queryTrainParams } from '../../service';
import useInterval from '@/components/useInterval';

const { TabPane } = Tabs;
export interface TrainparaMapProps {
  loading: boolean;
  dispatch: Dispatch;
  monitorAndHMI2: StateType;
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  coachColumns: any;
  lineCode: string;
  trainCode: string;
  // lcuList: [];
}


const TrainparaMap: React.FC<TrainparaMapProps> = (props) => {
  const { height = 1, lineCode, trainCode, coachColumns,
    // data, airconditionData,bcu, tcu, battery, sensor
  } = props;



  const chartHeight = height + 54;

  return (
    <div
    >
      <Tabs defaultActiveKey="1" type="card"
      // onChange={changeTab}
      >

        <TabPane tab={<div style={{ width: 55, textAlign: "center" }}>{"车辆参数"}</div>} key="车辆参数" >
          <Table
            style={{ height: chartHeight, }}
            className={styles.warnTable}
            rowKey={(record) => record.index}
            size="small"
            columns={coachColumns}
            // dataSource={handleSubSystemData}
            // pagination={false}
            // scroll={{ y: 350 }}
            pagination={{
              style: {
                marginTop: 16,
                marginBottom: -16,
              },
              pageSize: 8,
              simple: true,
            }}

            scroll={{ y: 290 }}
          />
        </TabPane>
        <TabPane tab={<div style={{ width: 55, textAlign: "center" }}>{"空调"}</div>} key="空调">
          <Table
            style={{ height: chartHeight, }}
            className={styles.warnTable}
            rowKey={(record) => record.index}
            size="small"
            columns={coachColumns}
            // dataSource={handleSubSystemData}
            // pagination={false}
            // scroll={{ y: 300 }}
            pagination={{
              style: {
                marginBottom: -5,
              },
              pageSize: 13,
              simple: true,
            }}
            scroll={{ y: 290 }}

          />
        </TabPane>
        <TabPane style={{ height: 406 }} tab={<div style={{ width: 55, textAlign: "center" }}>{"LCU"}</div>} key="LCU参数">
          {/* <LCU
            lcuList={lcuList}
            // lineCode={lineCode}
            // trainCode={trainCode}
            height={240} /> */}
        </TabPane>

      </Tabs>
    </div>
  );
};

// export default TrainparaMap;
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
    loading: loading.effects['monitorAndHMI2/fetchOtherMap'],
  }),
)(TrainparaMap);
