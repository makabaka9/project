import { Card, Table, Typography } from 'antd';
import ExportExcel from '@/components/exportExcel';
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
    render: (text, record, index) => `${index + 1}`,
    // align: 'left',
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
    title: '车号',
    dataIndex: 'trainCode',
    key: 'trainCode',
    align: 'center',
  },
  {
    title: '行驶的总里程(万公里)',
    dataIndex: 'totalMile',
    key: 'totalMile',
    // width: "25%",
    align: 'center',
  },
  {
    title: '月行驶的总里程(万公里)',
    dataIndex: 'monthMile',
    key: 'monthMile',
    align: 'center',
  },
  {
    title: '同比',
    dataIndex: 'termsValue',
    key: 'termsValue',
    align: 'center',
    render: (termsValue?: number) => {
      const tempVal =
        termsValue > 0 ?
          <Typography.Text type="warning">{(termsValue * 100).toFixed(2)}%</Typography.Text>
          : <Typography.Text style={{ color: "#52c41a" }}>{(termsValue * 100).toFixed(3)}%</Typography.Text>
      return <span>{tempVal}</span>;
    },
  },
  {
    title: '环比',
    dataIndex: 'ratioValue',
    key: 'ratioValue',
    align: 'center',
    render: (ratioValue?: number) => {
      const tempVal =
        ratioValue > 0 ?
          <Typography.Text type="warning">{(ratioValue * 100).toFixed(2)}%</Typography.Text>
          : <Typography.Text style={{ color: "#52c41a" }}>{(ratioValue * 100).toFixed(3)}%</Typography.Text>
      return <span>{tempVal}</span>;
    },
  },
  // {
  //   title: '当月里程利用率',
  //   dataIndex: 'useRate',
  //   key: 'useRate',
  //   align: 'center',
  // },
  {
    title: '统计时间',
    dataIndex: 'statistcsTime',
    key: 'statistcsTime',
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
      extra={
        <ExportExcel
          fileName='车里程数据'
          sheetData={searchData}
          sheetName='sheet'
          sheetHeader={['序号', '车号', '行驶的总里程(万公里)', '月行驶的总里程（万公里）', '同比', '环比', '当月里程利用率']}
          sheetFilter={[]}
        />
      }
    >
      <Table
        className={styles.system}
        style={{ height: charHeight }}
        // rowKey={(record) => record.index}
        size="small"
        columns={columns}
        dataSource={searchData.length === 0 ? data : searchData}
        pagination={false}
        scroll={{ y: 250 }}
      />
    </Card>
  )
}

export default autoHeight()(TopSearch);
