import { Table } from 'antd';
import React from 'react';
import { SearchDataType } from '../data';
import styles from '../style.less';

const RelateTable = ({
  loading,
  searchData,
  columns,
}: {
  loading: boolean;
  searchData: SearchDataType[];
  columns: SearchDataType[];
}) => (
  <div>
    <Table
      className={styles.table}
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
      scroll={{ y: 200 }}
    />
  </div>
);

export default RelateTable;
