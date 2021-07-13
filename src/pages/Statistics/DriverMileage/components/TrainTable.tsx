import { Card, Table, Tag } from 'antd';
import React from 'react';
// import { SearchDataType } from '../data';
import styles from '../style.less';
// import Trend from './Trend';
import autoHeight from '@/components/autoHeight';


const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    key: 'index',
    width: '8%',
    align: 'center',
  },
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
    title: '司机号',
    dataIndex: 'driverCode',
    key: 'driverCode',
    align: 'center',
  },
  {
    title: '司机姓名',
    dataIndex: 'driverName',
    key: 'driverName',
    align: 'center',
  },
  {
    title: '驾驶列车号',
    dataIndex: 'trainCode',
    key: 'trainCode',
    align: 'center',
  },
  {
    title: '上车打卡时间',
    dataIndex: 'clockIn',
    key: 'clockIn',
    align: 'center',
  },
  {
    title: '下车打卡时间',
    dataIndex: 'clockOut',
    key: 'clockOut',
    align: 'center',
  },
  {
    title: '区域运营里程/km',
    dataIndex: 'Miles',
    key: 'Miles',
    // width: "25%",
    align: 'center',
  },
  {
    title: '司乘运营总里程/km',
    dataIndex: 'totalMiles',
    key: 'totalMiles',
    align: 'center',
  },
  {
    title: '忘打卡记录',
    dataIndex: 'forget',
    key: 'forget',
    align: 'center',
    render: forget => (
      <>
        {forget.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === '下车忘记打卡') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },

];

const data = [
  { index: '1', driverCode: '0001', driverName: '李力', trainCode: '1601', clockIn: '2020.10.19 12:30', clockOut: '2020.10.19 23:30', Miles: '35', totalMiles: '260', forget: ['无'] },
  { index: '2', driverCode: '0002', driverName: '张三', trainCode: '1602', clockIn: '2020.10.19 12:30', clockOut: '2020.10.19 23:30', Miles: '96', totalMiles: '260', forget: ['下车忘记打卡'] },
  { index: '3', driverCode: '0001', driverName: '李力', trainCode: '1601', clockIn: '2020.10.19 12:30', clockOut: '2020.10.19 23:30', Miles: '35', totalMiles: '260', forget: ['无'] },

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
      title={<div>
        {/* {time} */}
        当月司乘里程信息</div>}
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
