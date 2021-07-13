// 平台全景第二部分-地图

import React, { useEffect, useState } from 'react';
import { Stage, Layer, Circle, Text, Line, Label, Tag } from 'react-konva';
import { BasicProfileDataType } from '../data';
import { stateInformation } from '../service';

// import { Portal } from 'react-konva-portal';
export interface FaultMapProps {
  // height?: number;
  // forceFit?: boolean;
  // borderWidth?: number;
  // data: {
  //   time: string;
  //   type: string;
  //   humity: number;
  // }[];
  text: Array<object>;
  // data: Array<object>;
}

export interface LabelProps {
  x: number,
  y: number
}
const FaultMap: React.FC<FaultMapProps> = (props) => {
  const { data } = props;

  const [stateList, setStateList] = useState<Array<BasicProfileDataType>>([])
  useEffect(() => {
    const params = { trainWorkingCondition: 2 }
    const response = stateInformation(params);
    response.then((data) => {
      setStateList(data)
    });
    // const StateEvtSource = localStorage.getItem('access_token') ?
    //   new EventSource("/api/monitor/state/event?trainWorkingCondition=2") : null;
    // if (StateEvtSource !== null) {
    //   StateEvtSource.onmessage = (message) => {
    //     const addData = addNewElement(stateList, JSON.parse(message.data));
    //     setStateList(addData)
    //     // dispatch({
    //     //   type: 'monitorAndGlobal/fetchState',
    //     //   payload: {
    //     //     trainWorkingCondition: 2
    //     //   },
    //     // });
    //   }
    // }
  }, []);

  const line1 = [70, 270, 390, 275, 390, 310, 660, 310, 660, 260];
  const line2 = [390, 130, 390, 560, 550, 560];
  const line3 = [330, 160, 510, 160, 510, 560];
  const line4 = [230, 450, 760, 450];
  const line5 = [290, 540, 290, 330, 330, 270, 740, 80];
  const point1 = 290;
  const point2 = 540;
  const point4 = 80;
  const circle = [
    { x: point1, y: point2, name: "那洪站", id: 1, },
    { x: point1, y: point2 - 40, name: "那洪立交站", id: 2, },
    { x: point1, y: point2 - 80, name: "金凯路站", id: 3 },
    { x: point1, y: point2 - 120, name: "白沙壮锦立交站", id: 4, },
    { x: point1, y: point2 - 160, name: "	亭洪西路站", id: 5, },
    { x: point1, y: point2 - 200, name: "旱塘站", id: 6, },
    { x: point1 + 20, y: point2 - 240, name: "新阳路站", id: 7, },
    { x: 630, y: point4 + 50, name: "金桥客运站站", id: 8, },
    { x: 590, y: point4 + 68, name: "	药用植物园站", id: 9, },
    { x: 550, y: point4 + 88, name: "邕宾立交站", id: 10, },
    { x: 510, y: point4 + 104, name: "小鸡村站", id: 11, },
    { x: 480, y: point4 + 118, name: "狮山公园站", id: 12, },
    { x: 450, y: point4 + 132, name: "虎丘村站", id: 13, },
    { x: 420, y: point4 + 148, name: "北湖南路站", id: 14, },
    { x: 390, y: point4 + 160, name: "明秀路站", id: 15, },
    { x: 360, y: point4 + 176, name: "秀灵路站", id: 16, },
    { x: 330, y: 270, name: "广西大学站", id: 17, },
  ];

  const circle1 = [
    { x: point1, y: point2 - 20, id: 1, },
    { x: point1, y: point2 - 60, id: 2, },
    { x: point1, y: point2 - 100, id: 3, },
    { x: point1, y: point2 - 140, id: 4, },
    { x: point1, y: point2 - 180, id: 5, },
    { x: point1 + 10, y: point2 - 220, id: 6, },
    { x: 320, y: 285, id: 7, },
    { x: 345, y: 263, id: 8, },
    { x: 375, y: point4 + 168, id: 9, },
    { x: 405, y: point4 + 154, id: 10, },
    { x: 435, y: point4 + 140, id: 11, },
    { x: 465, y: point4 + 125, id: 12, },
    { x: 495, y: point4 + 110, id: 13, },
    { x: 530, y: point4 + 96, id: 14, },
    { x: 570, y: point4 + 78, id: 15, },
    { x: 610, y: point4 + 59, id: 16, },
  ]


  // 默认后端传的车辆工况为正线服务 ：车号，工况，速度，故障数，当前站id,下一站ID，上下行，网压，网流，时间

  const train = stateList?.map(item => ({
    trainCode: item.trainCode,
    speed: item.speed,
    currentId: item.indexStation,
    direction: item.runningDirection,
  }))
  // console.log("train", train)
  const matchPosition = (trainItem: any) => {
    // console.log("trainItem", trainItem)
    if (trainItem.speed === 0) {
      const match = circle.filter(cicleItem => (cicleItem.id === trainItem.currentId))
      const matchxy = match[0];
      const matchAgain =
      {
        trainCode: trainItem.trainCode,
        speed: trainItem.speed,
        currentId: trainItem.currentId,
        direction: trainItem.direction,
        x: matchxy?.x,
        y: matchxy?.y
      }
      return matchAgain
    } else {
      const match1 = circle1.filter(cicleItem => (cicleItem.id === trainItem.currentId))
      const matchxy = match1[0];
      const matchAgain = {
        trainCode: trainItem.trainCode,
        speed: trainItem.speed,
        currentId: trainItem.currentId,
        direction: trainItem.direction,
        x: matchxy?.x,
        y: matchxy?.y
      }
      return matchAgain
    }
  }

  const position = train.map((item, index) =>
    matchPosition(item),
  )

  const [label, setLabel] = useState([])

  const onMouseMove = (e) => {
    const event = e.currentTarget.attrs
    const container = e.target.getStage().container();
    container.style.cursor = "pointer";
    setLabel(event);
  };
  const onMouseLeave = e => {
    const container = e.target.getStage().container();
    container.style.cursor = "default";
  }


  // 按照车号更新或增加数组
  function addNewElement(arr: Array<object>, newElement: Array<object>) {
    var found = false;
    for (var i = 0; i < arr.length; i++) {
      var element = arr[i];
      if (element.trainCode == newElement.trainCode) {
        found = true;
        // if(newElement.population === 0) {
        //     arr[i] = false;
        // } else {
        arr[i] = newElement;
        // }            
      }
    }
    if (found === false) {
      arr.push(newElement);
    }
    // removing elements
    var newArr = [];
    for (var i = 0; element = arr[i]; i++) {
      if (element !== false) newArr.push(element);
    }
    return newArr;
  }
  return (
    <Stage
      width={800} height={600}
    >
      <Layer style={{ backgroundColor: "#f1f1f1" }}>
        <Line
          points={line1}
          tension={0.05}
          strokeWidth={3}
          stroke="rgb(82,196,26,0.3)"
        />
        <Circle x={70} y={270} radius={5} fill="rgb(82,196,26,0.3)" />
        <Circle x={660} y={260} radius={5} fill="rgb(82,196,26,0.3)" />
        <Line
          points={line2}
          strokeWidth={3}
          stroke="rgb(130,0,20,0.3)"
        />
        <Circle x={390} y={130} radius={5} fill="rgb(130,0,20,0.3)" />
        <Circle x={550} y={560} radius={5} fill="rgb(130,0,20,0.3)" />
        <Line
          points={line3}
          strokeWidth={3}
          stroke="rgb(114,46,209,0.3)"
        />
        <Circle x={330} y={160} radius={5} fill="rgb(114,46,209,0.3)" />
        <Circle x={510} y={560} radius={5} fill="rgb(114,46,209,0.3)" />
        <Line
          points={line4}
          strokeWidth={3}
          stroke="rgb(255,197,61,0.3)"
        />
        <Circle x={230} y={450} radius={5} fill="rgb(255,197,61,0.3)" />
        <Circle x={760} y={450} radius={5} fill="rgb(255,197,61,0.3)" />
        <Line
          points={line5}
          strokeWidth={3}
          stroke="#3779fd"
          shadowOpacity={1}
          shadowColor="#fff"
          shadowBlur={4}
        />
        <Circle x={290} y={540} radius={5} fill="#3779fd" />
        <Circle x={740} y={80} radius={5} fill="#3779fd" />
        {
          circle.map(item => (
            <Circle x={item.x} y={item.y} radius={5} stroke="#3779fd" fill="black" />
          ))
        }
        {
          circle.map(item => (
            <Text x={item.x} y={item.y} text={item.name} fill="#d9d9d9" />
          ))
        }
        {
          position.map(item => (
            <Circle _id={item} x={item.x} y={item.y} radius={5} fill="#ffa523" shadowBlur={20}
            />
          ))
        }
        {
          position.map(item => (
            <Circle x={item.x} y={item.y}
              id={item.currentId}
              direction={item.direction}
              speed={item.speed}
              trainCode={item.trainCode}
              // faultNum={item.faultNum}
              radius={10}
              width={20}
              height={20}
              fill="#ffa523" opacity={0.3} shadowBlur={20}
              onMouseOut={onMouseMove}
              onMouseLeave={onMouseLeave}
            />
          ))
        }
      </Layer>
      <Layer>
        <Label
          x={label.x}
          y={label.y}>
          <Tag
            fill={'rgba(65,105,225,0.6)'}
            fontFamily={'Calibri'}
            fontSize={10}
            padding={5}

            pointerDirection={'down'}
            pointerWidth={10}
            pointerHeight={10}
            lineJoin={'round'}
            shadowColor={'black'}
            shadowBlur={10}
            shadowOffset={10}
            shadowOpacity={0.5}
          />

          <Text
            text={
              "列车编号：" + (label.trainCode ? label.trainCode : '--') + " \n " +
              "列车方向：" + (label.direction === 1 ? "上行" : label.direction === -1 ? "下行" : '--') + " \n " +
              "当前速度：" + (label.speed ? label.speed : '--') + "km"
            }
            fontFamily={'Calibri'}
            lineHeight={2}
            fontSize={12}
            padding={10}
            fill={'white'}
          />

        </Label>
      </Layer>
    </Stage >
  );
};
export default FaultMap;
