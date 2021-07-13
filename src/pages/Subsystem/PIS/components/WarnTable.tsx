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
      pagination={false}
      scroll={{ y: 160 }}
    />
  );

export default WarnTable;
