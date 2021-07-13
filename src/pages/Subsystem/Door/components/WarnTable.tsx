import { Table } from 'antd';
import React from 'react';
import { SearchDataType } from '../data';
import styles from '../style.less';

const WarnTable = ({
  loading,
  data,
  columns,
}: // height
  {
    loading: boolean;
    data: SearchDataType[];
    columns: SearchDataType[];
    // height: number;
  }) => (
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
  );
export default WarnTable;
