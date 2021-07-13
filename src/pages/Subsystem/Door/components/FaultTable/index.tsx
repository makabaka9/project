import { Table } from 'antd';
import React from 'react';
import { SearchDataType } from '../../data';
import styles from '../../style.less';

const columns = [
  {
    title: '门编号',
    dataIndex: 'trainCode',
    key: 'trainCode',
    align: 'left',
  },
  {
    title: '时间',
    dataIndex: 'faultTime',
    key: 'faultTime',
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
  {
    title: '描述',
    dataIndex: 'fault',
    key: 'fault',
    width: '25%',
    align: 'center',
  },
  {
    title: '处理措施',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
  },
  {
    title: '处理建议',
    dataIndex: 'advise',
    key: 'advise',
    align: 'center',
  },
];

const FaultTable = ({
  loading,
  searchData,
}: {
  loading: boolean;
  searchData: SearchDataType[];
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
    scroll={{ y: 200 }}
  />
  // </Card>
);

export default FaultTable;
