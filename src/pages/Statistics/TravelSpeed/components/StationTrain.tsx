import { Card, Table } from 'antd';
import ExportExcel from '@/components/exportExcel';
import React from 'react';
import styles from '../style.less';
// import autoHeight from '@/components/autoHeight';


export interface StationTrainProps {
  loading: boolean;
  columns: any;
  // time: string;
  data: any;
}

const StationTrain: React.FC<StationTrainProps> = (props) => {
  const { loading, columns, data, } = props;
  const charHeight = '16vh';

  // averageSpeed: 72.4
  // averageSpeedUtilization: 0.6
  // averageTime: 50.5
  // direction: 1
  // nextStationName: "那洪立交站"
  // stationName: "那洪站"
  // var dataSource = [{
  //   type: "",
  //   key: "",
  //   value: 0,
  // }];
  // var dataLength = data.pageList.length === 0 ? 1 : data.pageList[0].length;
  // for (let i = 0; i < dataLength; i++) {

  //   const dataTemp = data.map((item) => ({
  //     type: item.type,
  //     key: item.keyAndValues.map((itemTem) => (itemTem.key))[i],
  //     value: item.keyAndValues.map((itemTem) => (itemTem.value))[i]
  //   }))
  //   for (let j = 0; j < dataTemp.length; j++) {
  //     dataSource.push(dataTemp[j])
  //   }
  // }
  // var dataSource = []
  // const dataTemp = data.pageList.map((item) => ({
  //   averageSpeed: item.averageSpeed,
  //   averageSpeedUtilization: item.averageSpeedUtilization,
  //   averageTime: item.averageTime,
  //   direction: item.direction,
  //   nextStationName: item.nextStationName,
  //   stationName: item.stationName,
  // }))
  // dataSource.push(dataTemp)
  // console.log('1111', dataSource)


  return (

    <Table
      className={styles.system}
      style={{ height: charHeight }}
      // rowKey={(record) => record.index}
      size="small"
      columns={columns}
      dataSource={data}
      pagination={false}
      scroll={{ y: 120 }}
    />
  );
}

export default StationTrain;
