import { Table } from 'antd';
import React from 'react';
import { SearchDataType } from '../data';
import styles from '../style.less';

const WarnTable = ({
  loading,
  searchData,
  columns,
}: // height
  {
    loading: boolean;
    searchData: SearchDataType[];
    columns: SearchDataType[];
    height: number;
  }) => (
    <Table
      className={styles.warnTable}
      rowKey={(record) => record.index}
      size="small"
      columns={columns}
      dataSource={searchData}
      pagination={{
        style: {
          marginBottom: 0,
        },
        pageSize: 50,
      }}
      scroll={{ y: 180 }}
    />
  );
export default WarnTable;
