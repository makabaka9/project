import { Card, Table, Tag, Typography } from 'antd';
import moment from 'moment';
import React from 'react';
// import Trend from './Trend';
import styles from '../style.less';

const columns: any[] = [
  {
    title: '列车号',
    dataIndex: 'trainCode',
    // width: '15%',
    align: 'center',
  },

  {
    title: '在线',
    dataIndex: 'online',
    // width: '15%'
    align: 'center',
  },
  {
    title: '离线',
    dataIndex: 'outline',
    key: 'outline',
    align: 'center',
    // width: '15%',
  },
  {
    title: '故障',
    dataIndex: 'faultNum',
    align: 'center',
    key: 'faultNum',
    // width: '20%',
  },


];



const EachTrain = ({
  // loading,
  sysData,
}: {
  // loading: boolean;
  sysData: any;
}) => (

    <Table<any>
      style={{ height: '20vh' }}
      className={styles.system}
      rowKey={(record) => record.hitchNum}
      size="small"
      columns={columns}
      dataSource={sysData}
      pagination={false}
      scroll={{ y: 250 }}
      rowClassName={(record, index) => {
        if (index % 2 === 1)
          return styles.bgRow;
      }}
    />

  );

export default EachTrain;
