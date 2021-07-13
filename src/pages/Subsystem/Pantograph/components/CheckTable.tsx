import { Table } from 'antd';
import React from 'react';
import { SearchDataType } from '../data';
import styles from '../style.less';

const CheckTable = ({
  loading,
  searchData,
  columns,
}: {
  loading: boolean;
  searchData: SearchDataType[];
  columns: SearchDataType[];
  height: number;
}) => (
  // <Card
  //   loading={loading}
  //   bordered={false}
  //   title="故障监控"
  //   style={{
  //     height: '100%',
  //   }}
  // >
  <Table
    className={styles.warnTable}
    rowKey={(record) => record.index}
    size="small"
    columns={columns}
    dataSource={searchData}
    pagination={false}
    scroll={{ y: 200 }}
  />
  // </Card>
);

export default CheckTable;
