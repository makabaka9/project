import { Card, Table, Typography } from 'antd';
import React from 'react';
import Trend from './Trend';
import styles from '../style.less';
import { FaultSystemDataType } from '../data.d';

export interface SubSystemErrorProps {
  height?: number;
  forceFit?: boolean;
  // loading?:boolean;
  borderWidth?: number;
  data1?: Array<FaultSystemDataType>;
}
const columns: any = [
  {
    title: '序号',
    dataIndex: 'faultNum',
    width: '10%',
    align: 'center',
    render: (text: any, record: any, index: number) => `${index + 1}`,
  },
  {
    title: '子系统',
    dataIndex: 'systemName',
    key: 'systemName',
    align: 'center',
  },
  {
    title: '故障数',
    dataIndex: 'faultNum',
    align: 'center',
    key: 'faultNum', // render: (text: React.ReactNode) => <a href="/">{text}</a>,
  },
  {
    title: '故障百分比',
    dataIndex: 'currentMonthFaultRate',
    key: 'currentMonthFaultRate',
    align: 'center',
  },
  {
    title: '故障率(本月)',
    dataIndex: 'currentMonthRate',
    align: 'center',
    key: 'currentMonthRate', // render: (text: React.ReactNode) => <a href="/">{text}</a>,
  },
  {
    title: '故障率(上月)',
    dataIndex: 'lastMonthFaultRate',
    align: 'center',
    key: 'lastMonthFaultRate', // render: (text: React.ReactNode) => <a href="/">{text}</a>,
  },
  {
    title: '故障率(去年同月)',
    dataIndex: 'lastYearFaultRate',
    align: 'center',
    key: 'lastYearFaultRate', // render: (text: React.ReactNode) => <a href="/">{text}</a>,
  },
  {
    title: '同比',
    dataIndex: 'yearOnYear',
    key: 'yearOnYear',
    align: 'center',
    render: (yearOnYear: number) => {
      const tempVal =
        yearOnYear > 0 ?
          <Typography.Text type="warning">{yearOnYear}%</Typography.Text>
          : <Typography.Text style={{ color: "#52c41a" }}>{yearOnYear}%</Typography.Text>
      return <span>{tempVal}</span>;
    },
  },
  {
    title: '环比',
    dataIndex: 'monthOnMonth',
    key: 'monthOnMonth',
    align: 'center',
    render: (monthOnMonth: number) => {
      const tempVal =
        monthOnMonth > 0 ?
          <Typography.Text type="warning">{monthOnMonth}%</Typography.Text>
          : <Typography.Text style={{ color: "#52c41a" }}>{monthOnMonth}%</Typography.Text>
      return <span>{tempVal}</span>;
    },
  },
  {
    title: '统计时间',
    dataIndex: 'statisticsTime',
    align: 'center',
    key: 'statisticsTime', // render: (text: React.ReactNode) => <a href="/">{text}</a>,
  },
];


const SubSystemError: React.FC<SubSystemErrorProps> = (props) => {
  const {
    height = 1,
    // loading,
    data1,
  } = props;

  return (
    <div>
      { height > 0 && (
        <Table<any>
          className={styles.system}
          rowKey={(record) => record.faultNum}
          size="small"
          columns={columns}
          dataSource={data1}
          pagination={{
            style: {
              marginBottom: 0,
            },
            pageSize: 50,
          }}
          scroll={{ y: 180 }}
        />
      )}
    </div>
  );
};
export default SubSystemError;
