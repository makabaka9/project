import { Table } from 'antd';
import React from 'react';
import { FualtDataType } from '../data';
import styles from '../style.less';

const columns = [
  {
    title: '故障信息',
    dataIndex: 'faultContent',
    key: 'faultContent',
    width: '25%',
    align: 'center',
  },
  {
    title: '处理情况',
    dataIndex: 'solveType',
    key: 'solveType',
    align: 'center',
  },
  {
    title: '时间',
    dataIndex: 'time',
    key: 'time',
    align: 'center',
    sorter: (
      a: {
        count: number;
      },
      b: {
        count: number;
      },
    ) => a.count - b.count,
  },
];

const FualtTable = ({ loading, data }: { loading: boolean; data: FualtDataType[] }) => (
  <Table
    className={styles.faultTable}
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
    scroll={{ y: 200 }}
  />
  // </Card>
);

export default FualtTable;
