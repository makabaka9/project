import { Card, Table } from 'antd';
import React from 'react';
// import { SearchDataType } from '../data';
import styles from '../style.less';
// import Trend from './Trend';
import autoHeight from '@/components/autoHeight';


const columns = [
  // {
  //   title: '序号',
  //   dataIndex: 'index',
  //   key: 'index',
  //   width: '8%',
  //   // align: 'left',
  // },
  // {
  //   title: '统计时段',
  //   dataIndex: 'statisticalTime',
  //   key: 'statisticalTime',
  //   align: 'center',
  //   sorter: (
  //     a: {
  //       count: number;
  //     },
  //     b: {
  //       count: number;
  //     },
  //   ) => a.count - b.count,
  //   // className: styles.alignRight,
  // },
  {
    title: '车号',
    dataIndex: 'trainCode',
    key: 'trainCode',
    align: 'left',
  },
  {
    title: '行驶的总里程(万公里)',
    dataIndex: 'totalMiles',
    key: 'totalMiles',
    // width: "25%",
    align: 'center',
  },
  {
    title: '月行驶的总里程(万公里)',
    dataIndex: 'monthMiles',
    key: 'monthMiles',
    align: 'center',
  },
  {
    title: '同比',
    dataIndex: 'termsValue',
    key: 'termsValue',
    align: 'center',
  },
  {
    title: '环比',
    dataIndex: 'ratioValue',
    key: 'ratioValue',
    align: 'center',
  },
  {
    title: '当月里程利用率',
    dataIndex: 'utilizationRate',
    key: 'utilizationRate',
    align: 'center',
  },
];

const data = [
  { trainCode: '1601', totalMiles: '3500', monthMiles: '2600', termsValue: '96.5%', ratioValue: '92.6%', utilizationRate: '85%' },
  { trainCode: '1602', totalMiles: '7800', monthMiles: '5200', termsValue: '96.5%', ratioValue: '92.6%', utilizationRate: '85%' },
]

export interface TopSearchProps {
  loading: boolean;
  time: string;
  searchData: any
}

const TopSearch: React.FC<TopSearchProps> = (props) => {
  const { loading, time, searchData } = props;
  const charHeight = '20vh';

  return (
    <Card
      loading={loading}
      bordered={false}
      title={<div>{time}月每车里程数据</div>}
      style={{
        height: '100%',
      }}
    >
      <Table
        className={styles.system}
        style={{ height: charHeight }}
        // rowKey={(record) => record.index}
        size="small"
        columns={columns}
        dataSource={searchData == !null ? searchData : data}
        pagination={false}
        scroll={{ y: 180 }}
      />
    </Card>
  )
}

export default autoHeight()(TopSearch);
