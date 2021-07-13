import { Card, Table, Tag, Typography } from 'antd';
import moment from 'moment';
import React from 'react';
// import Trend from './Trend';
import styles from '../style.less';

const columns: any[] = [
  // {
  //   title: '序号',
  //   dataIndex: 'index',
  //   width: '15%',
  //   align: 'left',
  //   render:(text,record,index)=>`${index+1}`,
  // },
  {
    title: '子系统',
    dataIndex: 'subSysName',
    key: 'subSysName',
    align: 'center',
    width: '15%',
  },
  {
    title: '故障数',
    dataIndex: 'faultNum',
    align: 'center',
    key: 'faultNum',
    width: '20%',
  },
  {
    title: '同比',
    dataIndex: 'samePer',
    key: 'samePer',
    width: '20%',
    align: 'center',
    render: (samePer?: number) => {
      const tempVal =
        samePer > 0 ?
          <Typography.Text style={{color:"#ffa523"}}>{samePer}</Typography.Text>
          : <Typography.Text style={{color:"#3779fd"}}>{samePer}</Typography.Text>
      return <span>{tempVal}</span>;
    },
  },
  {
    title: '环比',
    dataIndex: 'roundPer',
    key: 'roundPer',
    width: '20%',
    align: 'center',
    render: (roundPer?: number) => {
      const tempVal =
      roundPer > 0 ?
          <Typography.Text style={{color:"#ffa523"}}>{roundPer?.toFixed(2)}</Typography.Text>
          : <Typography.Text style={{color:"#3779fd"}}>{roundPer?.toFixed(2)}</Typography.Text>
      return <span>{tempVal}</span>;
    },
  },
];



const SubSystemError = ({
  // loading,
  sysData,
}: {
  // loading: boolean;
  sysData: any;
}) => (

    <Table<any>
      style={{ height: '20vh' }}
      className={styles.system}
      rowKey={(record) => record.hitchNum}
      size="small"
      columns={columns}
      dataSource={sysData}
      pagination={false}
      scroll={{ y: 250 }}
      rowClassName={(record, index) => {
        if (index % 2 === 1)
          return styles.bgRow;
      }}
    />

  );

export default SubSystemError;
