import { Card, Divider, Modal, Table, Tag } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import autoHeight from '@/components/autoHeight';
import { SearchDataType } from '../data';
import styles from '../style.less';

export interface RunningTableProps {
  // loading: boolean;
  searchData: any;
  columns: any;
  // height: number;
}

const TopSearch: React.FC<RunningTableProps> = (props) => {
  const { columns, searchData} = props;

  return(
    <Table
    // style={{ height: '20vh' }}
    className={styles.system}
    // rowKey={(record) => record.line}
    size="small"
    columns={columns}
    // dataSource={(searchData == !null) ? searchData : faultMonitoring}
    dataSource={searchData}
    pagination={false}
    scroll={{ y: 250 }}
    rowClassName={(record, index) => {
      if (index % 2 === 1)
        return styles.bgRow;
    }}
  />
  );
  };
export default autoHeight()(TopSearch);
