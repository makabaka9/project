import React from 'react';
import { Row, Col, Statistic, Badge } from 'antd';
import { SiteStatusDataType, TotalSpeedTimeDataType } from '../../data';
import { Stage, Layer, Circle, Text, Line } from 'react-konva';
import { LineOutlined } from '@ant-design/icons';

interface TrainStepsProps {
  totalSpeedTime: TotalSpeedTimeDataType;
  siteStatus: any
}

const TrainSteps: React.FC<TrainStepsProps> = (props) => {
  const { totalSpeedTime, siteStatus } = props;
  // console.log("siteStatus", siteStatus)

  const stationCons = [
    { name: '那洪站' },
    { name: '那洪立交站' },
    { name: '金凯路站' },
    { name: '白沙壮锦立交站' },
    { name: '亭洪西路站' },
    { name: '旱塘站' },
    { name: '新阳路站' },
    { name: '广西大学站' },
    { name: '秀灵路站' },
    { name: '明秀路站' },
    { name: '北湖南路站' },
    { name: '虎丘村站' },
    { name: '狮山公园站' },
    { name: '小鸡村站' },
    { name: '邕宾立交站' },
    { name: '药用植物园站' },
    { name: '金桥客运站站' },
  ];

  const lineLength = 1275; // 线路长度
  const interStation = 75; // 站点间隔为75
  const upLine = [20, 20, lineLength - 55, 20];
  const downLine = [20, 100, lineLength - 55, 100];
  const upStation = stationCons.map((item, index) => ({
    x: 20 + lineLength / stationCons.length * index,
    y: 20,
    name: item.name
  }))
  const downStation = stationCons.map((item, index) => ({
    x: lineLength - lineLength / stationCons.length * index - 55,
    y: 100,
    name: item.name
  }))
  // 对传过来的数据进行排序
  const compare = function (prop) {
    return function (obj1, obj2) {
      var val1 = obj1[prop];
      var val2 = obj2[prop];
      if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
        val1 = Number(val1);
        val2 = Number(val2);
      }
      if (val1 < val2) {
        return -1;
      } else if (val1 > val2) {
        return 1;
      } else {
        return 0;
      }
    }
  }
  const data1 = siteStatus.sort(compare('stationCode'));
  const StationStatus1: any[] = [];
  const StationStatus2: any[] = [];
  for (let i = 0; i < data1.length; i++) {
    StationStatus1.push({
      stationCode: data1[i].stationCode,
      stationName: data1[i].stationName,
      StopTime: ((data1[i].upStopTime) * 3600).toFixed(3),
      RunTime: ((data1[i].upRunTime) * 3600).toFixed(3),
    })
  }
  const data2 = (siteStatus.sort(compare('stationCode'))).reverse();
  // console.log("data2", data2)
  for (let i = 0; i < data2.length; i++) {
    StationStatus2.push({
      stationCode: data1[i].stationCode,
      stationName: data2[i].stationName,
      StopTime: ((data2[i].downStopTime) * 3600).toFixed(3),
      RunTime: ((data2[i].downRunTime) * 3600).toFixed(3),
    })
  }
  // console.log("StationStatus1", StationStatus1)
  // console.log("StationStatus2", StationStatus2)
  const runTimeMap = StationStatus1.map((item, index) => (
    <Line
      points={[20 + (index - 1) * interStation, 20, 20 + index * interStation, 20]}
      strokeWidth={3}
      stroke={item.RunTime <= 90 ? "#a0d911" : item.RunTime > 120 ? "#f5222d" : "#fa8c16"}
    />
  ))
  const stopTimeMap = StationStatus1.map((item, index) => (
    <Circle
      x={20 + (index) * interStation}
      y={20} radius={5}
      fill={item.StopTime <= 30 ? "#a0d911" : item.StopTime > 45 ? "#f5222d" : "#fa8c16"}
    />
  ))

  const runTimeMap1 = StationStatus2.map((item, index) => (
    <Line
      points={[20 + (index - 1) * interStation, 100, 20 + index * interStation, 100]}
      strokeWidth={3}
      stroke={item.RunTime <= 90 ? "#a0d911" : item.RunTime > 120 ? "#f5222d" : "#fa8c16"}
    />
  ))
  const stopTimeMap1 = StationStatus2.map((item, index) => (
    <Circle
      x={20 + (index) * interStation}
      y={100} radius={5}
      fill={item.StopTime <= 30 ? "#a0d911" : item.StopTime > 45 ? "#f5222d" : "#fa8c16"}
    />
  ))
  return (
    <div>
      <Row gutter={8} justify="center">
        <Col xl={6}>
          <Row gutter={8}>
            <Col xl={12}>
              <Statistic title="上行全程平均运行速度"
                value={totalSpeedTime.upTotalAverageSpeed.toFixed(3)}
                suffix="km/h"
                valueStyle={{ color: "#52c41a" }}
              />
              <Statistic title="下行全程平均运行速度"
                value={totalSpeedTime.downTotalAverageSpeed.toFixed(3)}
                suffix="km/h"
                valueStyle={{ color: "#52c41a" }}
              />
            </Col>
            <Col xl={12}>
              <Statistic title="上行全程平均耗时"
                value={totalSpeedTime.upTotalAverageTime.toFixed(3)}
                suffix="h"
                valueStyle={{ color: "gold" }}
              />
              <Statistic title="下行全程平均耗时"
                value={totalSpeedTime.downTotalAverageTime.toFixed(3)}
                suffix="h"
                valueStyle={{ color: "gold" }}
              />
            </Col>
          </Row>
        </Col>
        <Col xl={18}>
          <div style={{ marginLeft: 5, marginTop: -12 }}>
            <span>停靠时间：</span>
            <Badge color="#a0d911" text="0s~30s" />&emsp;
            <Badge color="#fa8c16" text="30s~60s" />&emsp;
            <Badge color="#f5222d" text="60s以上" />&emsp;&emsp;
            <span>运行时间：</span>
            <LineOutlined style={{ color: "#a0d911" }} />&nbsp;0s~90s&emsp;
          <LineOutlined style={{ color: "#fa8c16" }} />&nbsp;90s~120s&emsp;
          <LineOutlined style={{ color: "#f5222d" }} />120s以上
          </div>
          <Stage
            width={lineLength} height={140}
          // width={window.innerWidth} height={window.innerHeight}
          >
            <Layer>
              {/* <Text x={10} y={20} text="上行" fill="#d9d9d9" />
            <Text x={10} y={100} text="下行" fill="#d9d9d9" /> */}
              <Line
                points={upLine}
                strokeWidth={3}
                stroke="#597ef7"
              />
              {upStation.map(item => (
                <Circle x={item.x} y={item.y} radius={5} stroke="#597ef7" fill="black" />
              ))}
              {upStation.map(item => (
                <Text x={item.x} y={item.y + 20} text={item.name} fill="#d9d9d9" />
              ))}
              {runTimeMap}
              {stopTimeMap}
              <Line
                points={downLine}
                strokeWidth={3}
                stroke="#597ef7"
              />
              {downStation.map(item => (
                <Circle x={item.x} y={item.y} radius={5} stroke="#597ef7" fill="black" />
              ))}
              {downStation.map(item => (
                <Text x={item.x} y={item.y + 20} text={item.name} fill="#d9d9d9" />
              ))}
              {runTimeMap1}
              {stopTimeMap1}
            </Layer>
          </Stage>
        </Col>
      </Row>
    </div>

  );
};

export default TrainSteps;
