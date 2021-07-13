import { Table } from 'antd';
import React from 'react';
import styles from '../style.less';

const WarnTable = ({
  // loading,
  columns,
  data,
}: {
  // loading: boolean;
  columns: any;
  data: Array<object>;
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
      scroll={{ y: 220 }}
    />
  );

export default WarnTable;
