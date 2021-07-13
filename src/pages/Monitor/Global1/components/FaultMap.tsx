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
  data: Array<object>;
  getList: Function
}

export interface LabelProps {
  x: number,
  y: number
}
const FaultMap: React.FC<FaultMapProps> = (props) => {
  const { data, getList } = props;
  const [list, setList] = useState<Array<object>>([]); // 选择全部
  // console.log("list33", list)

  // 将数据传给父组件
  getList(list);

  const [stateList, setStateList] = useState<Array<object>>([])
  const [event, setEvent] = useState<any>()
  const [trainWorkingCondition, setTrainWorkingCondition] = useState(-1);
  useEffect(() => {
    // const response = stateInformation(trainWorkingCondition);
    // response.then((data) => {
    //   setList(data)
    // });
    const url = `/api/monitor/state/event?trainWorkingCondition=${trainWorkingCondition}`;
    const evtSource = new EventSource(url);
    if (evtSource !== null) {
      evtSource.onmessage = (message) => {
        const addData = addNewElement(list, JSON.parse(message.data));
        setList(addData)
      }
    }
    setEvent(evtSource);
    return function cleanup() {
      if (evtSource !== undefined) {
        evtSource.close();
      }
    }
  }, []);

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


  // const [stateList, setStateList] = useState<Array<BasicProfileDataType>>([])
  // useEffect(() => {
  //   const params = { trainWorkingCondition: 2 }
  //   const response = stateInformation(params);
  //   response.then((data) => {
  //     setStateList(data)
  //   });
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
  // }, []);

  // const line1 = [70, 270, 390, 275, 390, 310, 660, 310, 660, 260];
  // const line2 = [390, 130, 390, 560, 550, 560];
  // const line3 = [330, 160, 510, 160, 510, 560];
  // const line4 = [230, 450, 760, 450];
  // const line5 = [290, 540, 290, 330, 330, 270, 740, 80];
  const line1 = [105, 405, 585, 405, 585, 465, 990, 465, 990, 390];
  const line2 = [585, 195, 585, 840, 825, 840];
  const line3 = [520, 250, 765, 250, 765, 840];
  const line4 = [345, 750, 1140, 750];
  const line5 = [435, 810, 435, 495, 495, 405, 945, 120 + 75];
  const point1 = 435;
  const point2 = 810;
  const point4 = 120;
  const circle = [
    { x: point1, y: point2 + 30, name: "", id: -1, },
    { x: point1, y: point2 + 30, name: "那洪车辆基地", id: 0, },
    { x: point1, y: point2, name: "国凯大道站", id: 1, },
    { x: point1, y: point2 - 60, name: "那洪立交站", id: 2, },
    { x: point1, y: point2 - 120, name: "金凯路站", id: 3 },
    { x: point1, y: point2 - 180, name: "江南公园站", id: 4, },
    { x: point1, y: point2 - 240, name: "	周家坡站", id: 5, },
    { x: point1, y: point2 - 300, name: "五一立交站", id: 6, },
    { x: point1 + 30, y: point2 - 360, name: "新秀公园站", id: 7, },
    { x: 495, y: 405, name: "广西大学站", id: 8, },
    { x: 540, y: point4 + 264, name: "秀灵路站", id: 9, },
    { x: 585, y: point4 + 240, name: "明秀路站", id: 10, },
    { x: 630, y: point4 + 222, name: "北湖南路站", id: 11, },
    { x: 675, y: point4 + 198, name: "虎邱站", id: 12, },
    { x: 720, y: point4 + 177, name: "狮山公园站", id: 13, },
    { x: 765, y: point4 + 157.5, name: "小鸡村站", id: 14, },
    { x: 825, y: point4 + 132, name: "邕宾立交站", id: 15, },
    { x: 885, y: point4 + 102, name: "降桥站", id: 16, },
    { x: 945, y: point4 + 75, name: "金桥客运站", id: 17, },
    { x: 985, y: point4 + 45, name: "", id: 18, },
  ];

  const circle1 = [
    { x: point1, y: point2 + 10, id: -1, },
    { x: point1, y: point2 + 15, id: 0, },
    { x: point1, y: point2 - 30, id: 1, },
    { x: point1, y: point2 - 90, id: 2, },
    { x: point1, y: point2 - 150, id: 3, },
    { x: point1, y: point2 - 210, id: 4, },
    { x: point1, y: point2 - 270, id: 5, },
    { x: point1 + 15, y: point2 - 330, id: 6, },
    { x: 480, y: 427.5, id: 7, },
    { x: 517.5, y: 394.5, id: 8, },
    { x: 562.5, y: point4 + 252, id: 9, },
    { x: 607.5, y: point4 + 231, id: 10, },
    { x: 652.5, y: point4 + 210, id: 11, },
    { x: 697.5, y: point4 + 187.5, id: 12, },
    { x: 742.5, y: point4 + 165, id: 13, },
    { x: 795, y: point4 + 144, id: 14, },
    { x: 855, y: point4 + 117, id: 15, },
    { x: 915, y: point4 + 88.5, id: 16, },
    { x: 915, y: point4 + 88.5, id: 17, },
  ]
  const line = [
    { x: 105, y: 415, name: "一号线" },
    { x: 825, y: 850, name: "二号线" },
    { x: 520, y: 250, name: "三号线" },
    { x: 345, y: 750, name: "四号线" },
    { x: 945, y: 195, name: "五号线" },
  ]

  // 默认后端传的车辆工况为正线服务 ：车号，工况，速度，故障数，当前站id,下一站ID，上下行，网压，网流，时间

  const train = list?.map(item => ({
    trainCode: item.trainCode,
    speed: item.speed,
    currentId: item.indexStation,
    direction: item.runningDirection,
  }))

  //图片显示假数据
  // const train = [{ trainCode: '0503', speed: 68, currentId: 7, direction: 1, faultLevel: 0 },
  // { trainCode: '0504', speed: 68, currentId: 12, direction: 1, faultLevel: 1 }]
  // const train = [];
  const matchPosition = (trainItem: any) => {
    if (trainItem.speed === 0) {
      const match = circle.filter(cicleItem => (cicleItem.id === (trainItem.currentId-trainItem.direction)))

      const matchxy = match[0];
      const matchAgain =
      {
        trainCode: trainItem.trainCode,
        speed: trainItem.speed,
        currentId: trainItem.currentId,
        direction: trainItem.direction,
        faultLevel: trainItem.faultLevel,
        x: matchxy?.x,
        y: matchxy?.y
      }
      return matchAgain
    } else {
      const match1 = circle1.filter(cicleItem => (cicleItem.id === (trainItem.direction>0?(trainItem.currentId-1):trainItem.currentId)));
      const matchxy = match1[0];
      const matchAgain = {
        trainCode: trainItem.trainCode,
        speed: trainItem.speed,
        currentId: trainItem.currentId,
        direction: trainItem.direction,
        faultLevel: trainItem.faultLevel,
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
  const onMouseMove = (e: any) => {
    const event = e.currentTarget.attrs
    const container = e.target.getStage().container();
    container.style.cursor = "pointer";
    setLabel(event);
  };
  const onMouseLeave = (e: any) => {
    const container = e.target.getStage().container();
    container.style.cursor = "default";
    setLabel([]);
  }


  // const onMouseMove = (e) => {
  //   console.log("222",e)
  //   const event = e.currentTarget

  //   const container = e.target.getStage().container();
  //   container.style.cursor = "pointer";
  //   setLabel(event);
  // };
  // const onMouseLeave = e => {
  //   const container = e.target.getStage().container();
  //   container.style.cursor = "default";
  //   setLabel([]);
  // }


  // 按照车号更新或增加数组
  // function addNewElement(arr: Array<object>, newElement: Array<object>) {
  //   var found = false;
  //   for (var i = 0; i < arr.length; i++) {
  //     var element = arr[i];
  //     if (element.trainCode == newElement.trainCode) {
  //       found = true;
  //       // if(newElement.population === 0) {
  //       //     arr[i] = false;
  //       // } else {
  //       arr[i] = newElement;
  //       // }            
  //     }
  //   }
  //   if (found === false) {
  //     arr.push(newElement);
  //   }
  //   // removing elements
  //   var newArr = [];
  //   for (var i = 0; element = arr[i]; i++) {
  //     if (element !== false) newArr.push(element);
  //   }
  //   return newArr;
  // }
  return (
    <Stage
      width={1300} height={1000}
    // width={800} height={600}
    >
      <Layer style={{ backgroundColor: "#f1f1f1" }}>
        <Line
          points={line1}
          tension={0.05}
          strokeWidth={3}
          stroke="rgb(82,196,26,0.3)"
        />
        <Circle x={105} y={405} radius={5} fill="rgb(82,196,26,0.3)" />
        <Circle x={990} y={390} radius={5} fill="rgb(82,196,26,0.3)" />
        <Line
          points={line2}
          strokeWidth={3}
          stroke="rgb(130,0,20,0.3)"
        />
        <Circle x={585} y={195} radius={5} fill="rgb(130,0,20,0.3)" />
        <Circle x={825} y={840} radius={5} fill="rgb(130,0,20,0.3)" />
        <Line
          points={line3}
          strokeWidth={3}
          stroke="rgb(114,46,209,0.3)"
        />
        {/* 520, y: 250, */}
        <Circle x={520} y={250} radius={5} fill="rgb(114,46,209,0.3)" />
        <Circle x={765} y={840} radius={5} fill="rgb(114,46,209,0.3)" />
        <Line
          points={line4}
          strokeWidth={3}
          stroke="rgb(255,197,61,0.3)"
        />
        <Circle x={345} y={750} radius={5} fill="rgb(255,197,61,0.3)" />
        <Circle x={1140} y={750} radius={5} fill="rgb(255,197,61,0.3)" />
        <Line
          points={line5}
          strokeWidth={6}
          // #40a9ff
          // stroke="#3779fd"
          stroke="#1890ff"
          shadowOpacity={1}
          shadowColor="#fff"
          shadowBlur={4}
        />
        <Circle x={435} y={810} radius={5} fill="#1890ff" />
        {/* <Circle x={1110} y={120} radius={5} fill="#1890ff" /> */}
        {
          circle.map(item => (
            <Circle x={item.x} y={item.y} radius={5} stroke="#d9d9d9" fill="#fff" shadowBlur={20} />
          ))
        }
        {
          circle.map(item => (
            <Text x={item.x + 15} y={item.y - 5} text={item.name} fill="#d9d9d9" />
          ))
        }
        {
          line.map(item => (
            <Text x={item.x - 20} y={item.y - 30} text={item.name} fill="#d9d9d9" />
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
              faultLevel={item.faultLevel}
              radius={10}
              width={20}
              height={20}
              fill="#ffa523" opacity={0.3} shadowBlur={20}
              onMouseOver={onMouseMove}
              onMouseOut={onMouseLeave}
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
              ` 列车编号:${label.trainCode ? label.trainCode : '--'} \n ` + `速度:${label.speed ? label.speed : '--'}km/h \n` +
              ` 列车方向:${label.direction === null ? "--" : label.direction === 1 ? "上行" : '下行'}`
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
