import { GroupedColumnChart } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';

export interface HorizonBarProps {
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  data: any;
}

const ClassStatistics: React.FC<HorizonBarProps> = (props) => {
  const {
    height,
    data,
  } = props;
  const padding: [number, number, number, number] = [30, 30, 30, 30];
  const chartHeight = "23vh";

  var dataSource = [
    {
      type: "",
      key: "",
      value: 0,
    }];
  var dataLength = data.length === 0 ? 1 : data[0].keyAndValues.length;
  for (let i = 0; i < dataLength; i++) {
    const dataTemp = data.map(item => ({
      type: item.type,
      key: item.keyAndValues.map(itemTem => (itemTem.key))[i],
      value: item.keyAndValues.map(itemTem => (itemTem.value))[i]
    }))
    for (let j = 0; j < dataTemp.length; j++) {
      dataSource.push(dataTemp[j])
    }
  }

  const dataSourceTemp = dataSource.filter(item => (item.type !== ""));


  return (
    <div>
      {height > 0 && (
        <GroupedColumnChart
          height={chartHeight}
          data={dataSourceTemp}
          // title={{
          //   visible: true,
          //   text: '故障频次统计',
          // }}
          forceFit
          padding={padding}
          xField="type"
          yField="value"
          groupField="key"
          meta={{
            type: {
              alias: '关键部件',
            },
            value: {
              alias: '故障次数',
            },
          }}
          legend={{
            position: 'top-center',
          }}
        />
      )}
    </div>
  );
};

export default autoHeight()(ClassStatistics);
