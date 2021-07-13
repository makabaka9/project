import { Card, Table } from 'antd';
import React from 'react';
import Trend from './Trend';
import styles from '../style.less';

const columns = [
  {
    title: '子系统',
    dataIndex: 'system',
    key: 'system',
    width: '26%',
  },
  {
    title: '故障数',
    dataIndex: 'index',
    align: 'center',
    key: 'index', // render: (text: React.ReactNode) => <a href="/">{text}</a>,
  },
  {
    title: '同比',
    dataIndex: 'range',
    key: 'range',
    sorter: (
      a: {
        range: number;
      },
      b: {
        range: number;
      },
    ) => a.range - b.range,
    render: (
      text: React.ReactNode,
      record: {
        status: number;
      },
    ) => (
      <Trend flag={record.status === 1 ? 'down' : 'up'}>
        <span
          style={{
            marginRight: 4,
          }}
        >
          {text}%
        </span>
      </Trend>
    ),
  },
  {
    title: '环比',
    dataIndex: 'range',
    key: 'range',
    sorter: (
      a: {
        range: number;
      },
      b: {
        range: number;
      },
    ) => a.range - b.range,
    render: (
      text: React.ReactNode,
      record: {
        status: number;
      },
    ) => (
      <Trend flag={record.status === 1 ? 'down' : 'up'}>
        <span
          style={{
            marginRight: 4,
          }}
        >
          {text}%
        </span>
      </Trend>
    ),
  },
];

const searchData: any[] = [];
const dataVar = ['弓网系统', '牵引系统', '空调系统', '网络与控制', '车门系统', '走行部'];

for (let i = 0; i < dataVar.length; i += 1) {
  searchData.push({
    system: dataVar[i],
    index: i + 1,
    range: Math.floor(Math.random() * 100),
    status: Math.floor((Math.random() * 10) % 2),
  });
}

const SubSystemError = ({ loading }: { loading: boolean }) => (
  <Card
    loading={loading}
    bordered={false}
    title="各子系统故障统计"
    style={{
      height: '100%',
    }}
  >
    <Table<any>
      className={styles.system}
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
  </Card>
);

export default SubSystemError;
