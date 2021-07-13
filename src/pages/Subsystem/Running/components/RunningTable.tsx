import autoHeight from '@/components/autoHeight';
import { Table } from 'antd';
import React from 'react';
import { SearchDataType } from '../data';
import styles from '../style.less';

export interface RunningTableProps {
  loading: boolean;
  searchData: any;
  columns: any;
  height: number;
}

const RunningTable: React.FC<RunningTableProps> = (props) => {
  const { height, loading, columns, searchData } = props;
  const chartHeight = '16vh';

  return (
    <Table
      loading={loading}
      className={styles.table}
      height={chartHeight}
      // rowKey={(record) => record.index}
      size="small"
      columns={columns}
      dataSource={searchData}
      // pagination={{
      //   style: {
      //     marginBottom: 0,
      //   },
      //   pageSize: 50,
      // }}
      scroll={{ y: 200 }}
    />
  )
};

export default autoHeight()(RunningTable);
