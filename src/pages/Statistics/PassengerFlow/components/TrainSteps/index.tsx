import React from 'react';
import { Steps, Typography, Row, Col, Avatar, Space, Tag } from 'antd';
import { Stage, Layer, Circle, Text, Line } from 'react-konva';
import greenIcon from '@/assets/green.svg';
import redIcon from '@/assets/red.svg';
import yellowIcon from '@/assets/yellow.svg';
import orangeIcon from '@/assets/orange.svg';
import styles from './index.less';

interface TrainStepsProps {
  data?: Array<any>;
}

const { Step } = Steps;
const dir = [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4];
const TrainSteps: React.FC<TrainStepsProps> = (props) => {
  const { data } = props;

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

  const lineLength = 1292; // 线路长度
  const interStation = 76; // 站点间隔为76
  const upLine = [20, 30, lineLength - 55, 30];
  const downLine = [20, 110, lineLength - 55, 110];
  const upStation = stationCons.map((item, index) => ({
    x: 20 + lineLength / stationCons.length * index,
    y: 30,
    name: item.name
  }))
  const downStation = stationCons.map((item, index) => ({
    x: lineLength - lineLength / stationCons.length * index - 55,
    y: 110,
    name: item.name
  }))

  const runTimeData = [
    { id: 1, runTime: 10, stopTime: 10 },
    { id: 2, runTime: 10, stopTime: 10 },
    { id: 3, runTime: 10, stopTime: 10 },
    { id: 4, runTime: 50, stopTime: 50 },
    { id: 5, runTime: 300, stopTime: 300 },
    { id: 6, runTime: 10, stopTime: 10 },
    { id: 7, runTime: 110, stopTime: 110 },
    { id: 8, runTime: 100, stopTime: 100 },
    { id: 9, runTime: 100, stopTime: 100 },
    { id: 10, runTime: 130, stopTime: 130 },
    { id: 11, runTime: 140, stopTime: 140 },
    { id: 12, runTime: 150, stopTime: 150 },
    { id: 13, runTime: 150, stopTime: 150 },
    { id: 14, runTime: 200, stopTime: 200 },
    { id: 15, runTime: 200, stopTime: 200 },
    { id: 16, runTime: 10, stopTime: 10 },
    { id: 17, runTime: 10, stopTime: 10 },
  ];
  const runTimeMap = runTimeData.map((item, index) => (
    <Line
      points={[20 + (index - 1) * interStation, 30, 20 + index * interStation, 30]}
      strokeWidth={3}
      stroke={item.runTime <= 90 ? "#a0d911" : (item.runTime <= 120 ? "#1890ff" : item.runTime <= 140 ? "#fa8c16" : item.runTime <= 160 ? "#fa541c" : "#f5222d")}
    />
  ))
  const stopTimeMap = runTimeData.map((item, index) => (
    <Circle
      x={20 + (index) * interStation}
      y={30} radius={5}
      fill={item.stopTime <= 90 ? "#a0d911" : (item.stopTime <= 120 ? "#1890ff" : item.stopTime <= 140 ? "#fa8c16" : item.runTime <= 160 ? "#fa541c" : "#f5222d")}
    />
  ))

  const runTimeMap1 = runTimeData.map((item, index) => (
    <Line
      points={[20 + (index - 1) * interStation, 110, 20 + index * interStation, 110]}
      strokeWidth={3}
      stroke={item.runTime <= 90 ? "#a0d911" : (item.runTime <= 120 ? "#1890ff" : item.runTime <= 140 ? "#fa8c16" : item.runTime <= 160 ? "#fa541c" : "#f5222d")}
    />
  ))
  const stopTimeMap1 = runTimeData.map((item, index) => (
    <Circle
      x={20 + (index) * interStation}
      y={110} radius={5}
      fill={item.stopTime <= 90 ? "#a0d911" : (item.stopTime <= 120 ? "#1890ff" : item.stopTime <= 140 ? "#fa8c16" : item.runTime <= 160 ? "#fa541c" : "#f5222d")}
    />
  ))


  return (
    <div>
      <Row gutter={8} justify="center">
        <Col xl={3}>
          <div>
            <Space direction="vertical" style={{ textAlign: 'center' }}>
              <Typography.Title level={4}>车站规模</Typography.Title>
              <span>
                <Typography.Text style={{ color: "#1890ff" }}>车站总数：</Typography.Text>
                <Typography.Text>18站</Typography.Text>
              </span>
              <span>
                <Typography.Text style={{ color: "#1890ff" }}>换乘车站：</Typography.Text>
                <Typography.Text>12站</Typography.Text>
              </span>
            </Space>
          </div>
          <div style={{ marginTop: 10 }}>
            <Space direction="vertical" style={{ textAlign: 'center' }}>
              <Typography.Title level={4}>客运规模</Typography.Title>
              <span>
                <Typography.Text style={{ color: "#1890ff" }}>日客运量约：</Typography.Text>
                <Typography.Text>{data}万人</Typography.Text>
              </span>
            </Space>
          </div>
        </Col>
        <Col xl={3}>
          <Space direction="vertical" style={{ textAlign: 'center' }}>
            <Typography.Title level={4}>上行</Typography.Title>
            <span>
              <Typography.Text style={{ color: "#1890ff" }}>那洪站 -{">"}金桥客运站站</Typography.Text>
            </span>
          </Space>
          {/* </div> */}
          <div style={{ marginTop: 32 }}>
            <Space direction="vertical" style={{ textAlign: 'center' }}>
              <Typography.Title level={4}>下行</Typography.Title>
              <span>
                <Typography.Text style={{ color: "#1890ff" }}>金桥客运站站 -{">"}那洪站</Typography.Text>
              </span>
            </Space>
          </div>
        </Col>
        <Col xl={18}>
          <div>
            <Tag color="#a0d911">舒适</Tag>
            <Tag color="#1890ff">一般</Tag>
            <Tag color="#fa8c16">较拥挤</Tag>
            <Tag color="#fa541c" >拥挤</Tag>
            <Tag color="#f5222d">非常拥挤</Tag>
          </div>
          <Stage
            width={lineLength} height={180}
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
          {/* {dir?.map((item: number, idx) =>
            item === 1 ? (
              <Avatar
                src={greenIcon}
                size={88}
                style={{ marginLeft: Distance(idx), marginBottom: -16, zIndex: 1 }}
              />
            ) : item === 2 ? (
              <Avatar
                src={yellowIcon}
                size={88}
                style={{ marginLeft: Distance(idx), marginBottom: -16, zIndex: 1 }}
              />
            ) : item === 3 ? (
              <Avatar
                src={redIcon}
                size={88}
                style={{ marginLeft: Distance(idx), marginBottom: -16, zIndex: 1 }}
              />
            ) : (
              <Avatar
                src={orangeIcon}
                size={88}
                style={{ marginLeft: Distance(idx), marginBottom: -16, zIndex: 1 }}
              />
            ),
          )}
          <div style={{ marginLeft: -40, marginRight: 40, marginTop: -30 }}>
            <Steps progressDot current={-1}>
              {stationLinePros}
            </Steps>
          </div> */}
        </Col>
      </Row>
      {/* <Row gutter={24} style={{ marginTop: -30 }}>
        <Col xl={4} style={{ marginTop: 60 }}>
          <div >
            <Space direction="vertical">
              <Typography.Text style={{ fontSize: 15, color: "#1890ff" }}>
                下行：金桥客运站站 -{">"}那洪站
                  </Typography.Text>
            </Space>
          </div>
        </Col> */}
      {/* <Col xl={20}> */}
      {/* {dir?.map((item: number, idx) =>
            item === 1 ? (
              <Avatar
                src={greenIcon}
                size={88}
                style={{ marginLeft: Distance(idx), marginBottom: -48, zIndex: 1 }}
              />
            ) : item === 2 ? (
              <Avatar
                src={yellowIcon}
                size={88}
                style={{ marginLeft: Distance(idx), marginBottom: -48, zIndex: 1 }}
              />
            ) : item === 3 ? (
              <Avatar
                src={redIcon}
                size={88}
                style={{ marginLeft: Distance(idx), marginBottom: -48, zIndex: 1 }}
              />
            ) : (
                    <Avatar
                      src={orangeIcon}
                      size={88}
                      style={{ marginLeft: Distance(idx), marginBottom: -48, zIndex: 1 }}
                    />
                  ),
          )}
          <div style={{ marginLeft: -40, marginRight: 40 }}>
            <Steps progressDot current={-1}>
              {stationLinecons}
            </Steps>
          </div> */}
      {/* </Col> */}
    </div >
  );
};

export default TrainSteps;
