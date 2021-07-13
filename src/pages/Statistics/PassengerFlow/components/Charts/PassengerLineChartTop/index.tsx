import { Chart, Line, Axis } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';
import moment from 'moment';
import { PassengerFlowDayDataType } from '../../../data';

export interface EnergyStatisticsProps {
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  data: PassengerFlowDayDataType;
}

const GroupedColumn: React.FC<EnergyStatisticsProps> = (props) => {
  const { height = 1, data } = props;
  // const padding: [number, number, number, number] = [30, 30, 30, 30];
  const chartHeight = '13.5vh';

  // var dataSource = [{
  //   time: "",
  //   value: 0,
  // }];
  // var dataLength = data.length === 0 ? 1 : data[0].keyAndValueList.length;
  // for (let i = 0; i < dataLength; i++) {
  //   const dataTemp = (data.length === 0) ? dataSource : data.map((item) => ({
  //     time: moment(item.time).format("HH:mm"),
  //     key: item.keyAndValueList[i].key,
  //     value: item.keyAndValueList[i].value,
  //   }))
  //   for (let j = 0; j < dataTemp.length; j++) {
  //     dataSource.push(dataTemp[j])
  //   }
  // }
  // const dataSourceTemp = dataSource.filter(item => (item.time !== ""));
  // stationName":"那洪站","timePoint":"6:30","passengerVolume":500.0
  const grid = {
    line: {
      type: 'line',
      style: {
        stroke: '#DDDDDD',
        lineWidth: 1,
        strokeOpacity: 0.1,
      },
    },
  };
  const scale = {
    passengerVolume: {
      alias: '客运量' // 别名
    },
    timePoint: {
      alias: '时间/分' // 别名
    },
  };
  // time: '6:30',
  //   station: "那洪站",
  //   passenger: 1000,
  return (
    <div>
      <Chart
        scale={scale}
        padding={[10, 20, 70, 60]}
        autoFit
        height={chartHeight}
        data={data}
      >
        <Axis
          name="passengerVolume"
          grid={grid}
          title={{
            style: {
              textAlign: 'center',
              fill: '#999',
            }
          }} />
        <Axis
          name="timePoint"
          title={{
            style: {
              textAlign: 'center',
              fill: '#999',
            }
          }} />
        <Line shape="smooth" position="timePoint*passengerVolume" color="stationName" />
        {/* <Point position="month*temperature" color="city" /> */}
      </Chart>
    </div>
  );
};

export default autoHeight()(GroupedColumn);
