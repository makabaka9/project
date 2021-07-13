import { DonutChart, PieChart } from '@/pages/Monitor/Line/node_modules/bizcharts';
import React, { useState } from 'react';
import autoHeight from '@/pages/Monitor/Line/components/Charts/MiniArea/node_modules/@/components/autoHeight';
import { Alert, Button, Card, Col, Divider, Empty, Modal, Row, Statistic, Table, Tabs, Tag } from 'antd';
import styles from '../../style.less';
//空调
import Airc1Icon from './images/airc1.png';
import Airc2Icon from './images/airc2.png';
import Airc3Icon from './images/airc3.png';
import Airc4Icon from './images/airc4.png';
import Airc5Icon from './images/airc5.png';
import Airc6Icon from './images/airc6.png';
import Airc7Icon from './images/airc7.png';
import Airc8Icon from './images/airc8.png';
import Airc9Icon from './images/airc9.png';
import Airc10Icon from './images/airc10.png';
import Airc11Icon from './images/airc11.png';
import Airc12Icon from './images/airc12.png';

// 受电弓
import Pan1Icon from './images/pan1.png';
import Pan2Icon from './images/pan2.png';
import Pan3Icon from './images/pan3.png';
import Pan4Icon from './images/pan4.png';
import Pan5Icon from './images/pan5.png';
import Pan6Icon from './images/pan6.png';
import Pan7Icon from './images/pan7.png';

// 高速断路器
import Break1Icon from './images/break1.png';
import Break2Icon from './images/break2.png';
import Break3Icon from './images/break3.png';

//刀开关
import Knife1Icon from './images/knife1.png';
import Knife2Icon from './images/knife2.png';
import Knife3Icon from './images/knife3.png';
import Knife4Icon from './images/knife4.png';

//车门
import Door1Icon from './images/door1.png';
import Door2Icon from './images/door2.png';
import Door3Icon from './images/door3.png';
import Door4Icon from './images/door4.png';
import Door5Icon from './images/door5.png';
import Door6Icon from './images/door6.png';
import Door7Icon from './images/door7.png';
import Door8Icon from './images/door8.png';
import Door9Icon from './images/door9.png';
import Door10Icon from './images/door10.png';

//障碍物检测（主动）
import Obs1Icon from './images/obstacle1.png';
import Obs2Icon from './images/obstacle2.png';
import Obs3Icon from './images/obstacle3.png';
import Obs4Icon from './images/obstacle4.png';
import Obs5Icon from './images/obstacle5.png';
import Obs6Icon from './images/obstacle6.png';
//障碍物检测（被动）
import Pobs1Icon from './images/pobs1.png';
import Pobs2Icon from './images/pobs2.png';
import Pobs3Icon from './images/pobs3.png';
import Pobs4Icon from './images/pobs4.png';
import Pobs5Icon from './images/pobs5.png';
//脱轨检测
import Derail1Icon from './images/derail1.png';
import Derail2Icon from './images/derail2.png';
import Derail3Icon from './images/derail3.png';
import Derail4Icon from './images/derail4.png';
import Derail5Icon from './images/derail5.png';
import Derail6Icon from './images/derail6.png';
// 制动
import Braking1Icon from './images/braking1.png';
import Braking2Icon from './images/braking2.png';
import Braking3Icon from './images/braking3.png';
import Braking4Icon from './images/braking4.png';
import Braking5Icon from './images/braking5.png';
// 牵引
import Draw1Icon from './images/draw1.png';
import Draw2Icon from './images/draw2.png';
import Draw3Icon from './images/draw3.png';
import Draw4Icon from './images/draw4.png';
import Draw5Icon from './images/draw5.png';
// 压缩机
import Comp1Icon from './images/compressor1.png';
import Comp2Icon from './images/compressor2.png';
import Comp3Icon from './images/compressor3.png';
import Comp4Icon from './images/compressor4.png';
import Comp5Icon from './images/compressor5.png';
// 司机室逃生门
import Escapedoor1Icon from './images/escapedoor1.png';
import Escapedoor2Icon from './images/escapedoor2.png';

// 充电机
import Bach1Icon from './images/bach1.png';
import Bach2Icon from './images/bach2.png';
import Bach3Icon from './images/bach3.png';
import Bach4Icon from './images/bach4.png';
import Bach5Icon from './images/bach5.png';
import Bach6Icon from './images/bach6.png';

// 扩展供电
import Expand1Icon from './images/expand1.png';
import Expand2Icon from './images/expand2.png';
import Expand3Icon from './images/expand3.png';

// 停放制动
import Park1Icon from './images/park1.png';
import Park2Icon from './images/park2.png';
import Park3Icon from './images/park3.png';


// 辅助电源
import Ass1Icon from './images/ass1.png';
import Ass2Icon from './images/ass2.png';
import Ass3Icon from './images/ass3.png';
import Ass4Icon from './images/ass4.png';
import Ass5Icon from './images/ass5.png';
import Ass6Icon from './images/ass6.png';

// 紧急对讲
import Emer1Icon from './images/emer1.png';
import Emer2Icon from './images/emer2.png';
import Emer3Icon from './images/emer3.png';
import Emer4Icon from './images/emer4.png';

//烟/火
import Fire1Icon from './images/fire1.png';
import Fire2Icon from './images/fire2.png';
import Fire3Icon from './images/fire3.png';
import Fire4Icon from './images/fire4.png';
import Fire5Icon from './images/fire5.png';
//灭火器
import Ting1Icon from './images/fireextinguisher1.png';
import Ting2Icon from './images/fireextinguisher2.png';
//柜门
import Cabine1Icon from './images/cabinetdoor1.png';
import Cabine2Icon from './images/cabinetdoor2.png';
//司机室盖板
import Cover1Icon from './images/coverplate1.png';
import Cover2Icon from './images/coverplate2.png';
//逃生门解锁请求信号
import Deblock1Icon from './images/deblocking1.png';
import Deblock2Icon from './images/deblocking2.png';
//停车按钮
import Stop1Icon from './images/stop1.png';
import Stop2Icon from './images/stop2.png';
//机组1/2压缩机
import Crew1Icon from './images/crewcompressor1.png';
import Crew2Icon from './images/crewcompressor1.png';
//机组1 / 2新风档位
import Crewair1Icon from './images/crewair1.png';
import Crewair2Icon from './images/crewair2.png';
import Crewair3Icon from './images/crewair3.png';
import Crewair4Icon from './images/crewair4.png';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { divide } from 'lodash';

const { TabPane } = Tabs;
export interface CommunicationMapProps {
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;

  columns: any;
  important: any;
}


const vihiclesColumns = [
  {
    title: '数据名称',
    dataIndex: 'name',
    key: 'name',
    width: '10%',
    align: 'center',
    className: styles.tableText
  },
  {
    // title: '数据名称',
    dataIndex: 'Head1',
    key: 'Head1',
    // width: '15%',
    align: 'center',
    className: styles.tableText
  },
  {
    title: 'Tc1',
    dataIndex: 'Tc1',
    key: 'Tc1',
    // width: 100,
    align: 'center',
    className: styles.tableText
  },
  {
    title: 'Mp1',
    dataIndex: 'Mp1',
    key: 'Mp1',
    // width: 100,
    align: 'center',
    className: styles.tableText
  },
  {
    title: 'M1',
    dataIndex: 'M1',
    key: 'M1',
    // width: 100,
    align: 'center',
    className: styles.tableText
  },
  {
    title: 'M2',
    dataIndex: 'M2',
    key: 'M2',
    // width: 100,
    align: 'center',
    className: styles.tableText
  },
  {
    title: 'Mp2',
    dataIndex: 'Mp2',
    key: 'Mp2',
    // width: 100,
    align: 'center',
    className: styles.tableText
  },
  {
    title: 'Tc2',
    dataIndex: 'Tc2',
    key: 'Tc2',
    // width: 100,
    align: 'center',
    className: styles.tableText
  },
  {
    // title: 'Tc2',
    dataIndex: 'Head2',
    key: 'Head2',
    // width: 100,
    align: 'center',
    className: styles.tableText
  },
];
const fakeData = [
  { name: "受电弓/断路器、刀开关", Mc1: [], Tp1: [], M1: [], M2: [], Tp2: [], Mc2: [], },
  { name: "牵引系统", Mc1: [], Tp1: [], M1: [], M2: [], Tp2: [], Mc2: [], },
  { name: "制动系统", Mc1: [], Tp1: [], M1: [], M2: [], Tp2: [], Mc2: [], },
  { name: "辅助电源/充电机/扩展供电", Mc1: [], Tp1: [], M1: [], M2: [], Tp2: [], Mc2: [], },
  { name: "空调系统", Mc1: [], Tp1: [], M1: [], M2: [], Tp2: [], Mc2: [], },
  { name: "车门系统", Mc1: [], Tp1: [], M1: [], M2: [], Tp2: [], Mc2: [], },
  { name: "紧急对讲", Mc1: [], Tp1: [], M1: [], M2: [], Tp2: [], Mc2: [], },
  { name: "压缩机", Mc1: [], Tp1: [], M1: [], M2: [], Tp2: [], Mc2: [], },
  { name: "烟火/灭火器状态", Mc1: [], Tp1: [], M1: [], M2: [], Tp2: [], Mc2: [], },
  { name: "柜门/司机室盖板", Mc1: [], Tp1: [], M1: [], M2: [], Tp2: [], Mc2: [], },
  { name: "障碍物/脱轨检测", Mc1: [], Tp1: [], M1: [], M2: [], Tp2: [], Mc2: [], },

]
// function handle(coachCode) {
//   var stateIcon3: any[] = [];
//   if (coachCode?.length) {
//     coachCode?.map((item) => {
//       if (item.type === 'img') {
//         const imageurl1 = require('./' + item.value)
//         if (item.index === '2_1') {
//           stateIcon3.push(<><br /><img src={imageurl1} style={{ width: 23 }} /></>)
//         } else {
//           stateIcon3.push(<img src={imageurl1} style={{ width: 23 }} />)
//         }
//       } else {
//         stateIcon3.push(item.value)
//       }
//     })
//   }
//   return stateIcon3
// }

// const handleVehicleData = fakeData?.map(item => ({
//   name: item.name,
//   Mc1: handle(item.Mc1),
//   Tp1: handle(item.Tp1),
//   M1: handle(item.M1),
//   M2: handle(item.M2),
//   Tp2: handle(item.Tp2),
//   Mc2: handle(item.Mc2)
// }))





const CardStyle = { backgroundColor: "rgb(0,0,0,0)", padding: -24, }

const CommunicationMap: React.FC<CommunicationMapProps> = (props) => {
  const { height = 1, important } = props;
  const chartHeight = height + 200;

  // 车辆状态数据处理
  function handle(coachCode) {
    var stateIcon3: any[] = [];
    if (coachCode?.length) {
      coachCode?.map((item) => {
        if (item.type === 'img') {
          const imageurl1 = require('./' + item.value)
          if (item.index === '2_1') {
            stateIcon3.push(<><br /><img src={imageurl1} style={{ width: 20 }} /></>)
          } else if (item.index === '3_1') {
            stateIcon3.push(<><br /><img src={imageurl1} style={{ width: 20 }} /></>)
          }
          else {
            stateIcon3.push(<img src={imageurl1} style={{ width: 20 }} />)
          }
        } else {
          stateIcon3.push(item.value)
        }
      })
    }
    return stateIcon3
  }

  const handleVehicleData = important?.record?.map(item => ({
    name: item.name,
    Head1: handle(item.Head1),
    Tc1: handle(item.Tc1),
    Mp1: handle(item.Mp1),
    M1: handle(item.M1),
    M2: handle(item.M2),
    Tc2: handle(item.Tc2),
    Mp2: handle(item.Mp2),
    Head2: handle(item.Head2),
  }))

  const symbolColumns1 = [
    {
      // title: '数据名称',
      dataIndex: 'name',
      key: 'name',
      // width: '25%',
      align: 'center',
      className: styles.tableText
    },
    {
      // title: '一',
      dataIndex: '一',
      key: '一',
      // width: 100,
      align: 'center',
      className: styles.tableText
    },
    {
      // title: '二',
      dataIndex: '二',
      key: '二',
      // width: 100,
      align: 'center',
      className: styles.tableText
    },
    {
      // title: '三',
      dataIndex: '三',
      key: '三',
      // width: 100,
      align: 'center',
      className: styles.tableText
    },
    {
      // title: '四',
      dataIndex: '四',
      key: '四',
      // width: 100,
      align: 'center',
      className: styles.tableText
    },
    {
      // title: '五',
      dataIndex: '五',
      key: '五',
      // width: 100,
      align: 'center',
      className: styles.tableText
    },
    {
      // title: '六',
      dataIndex: '六',
      key: '六',
      // width: 100,
      align: 'center',
      className: styles.tableText
    },
    {
      // title: '七',
      dataIndex: '七',
      key: '七',
      // width: 100,
      align: 'center',
      className: styles.tableText
    },
    {
      // title: '八',
      dataIndex: '八',
      key: '八',
      // width: 100,
      align: 'center',
      className: styles.tableText
    },
    {
      // title: '八',
      dataIndex: '九',
      key: '九',
      // width: 100,
      align: 'center',
      className: styles.tableText
    },
    {
      // title: '七',
      dataIndex: '十',
      key: '十',
      // width: 100,
      align: 'center',
      className: styles.tableText
    },
    {
      // title: '八',
      dataIndex: '十一',
      key: '十一',
      // width: 100,
      align: 'center',
      className: styles.tableText
    },
    {
      // title: '八',
      dataIndex: '十二',
      key: '十二',
      // width: 100,
      align: 'center',
      className: styles.tableText
    },

  ];


  // 符号说明真实数据
  const vehicleData1 = [
    {
      name: "空调系统", 一: [{ index: "1_1", value: "images/airc1.png" }, { index: "2_1", value: "通讯故障" }], 二: [{ index: "1_1", value: "images/airc2.png" }, { index: "2_1", value: "故障" }], 三: [{ index: "1_1", value: "images/airc2.png" }, { index: "2_1", value: "警告" }], 四: [{ index: "1_1", value: "images/airc4.png" }, { index: "2_1", value: "停机模式" }], 五: [{ index: "1_1", value: "images/airc5.png" }, { index: "2_1", value: "测试模式" }],
      六: [{ index: "1_1", value: "images/airc6.png" }, { index: "2_1", value: "紧急通风模式" }], 七: [{ index: "1_1", value: "images/airc7.png" }, { index: "2_1", value: "自动强风模式" }], 八: [{ index: "1_1", value: "images/airc8.png" }, { index: "2_1", value: "自动模式" }], 九: [{ index: "1_1", value: "images/airc9.png" }, { index: "2_1", value: "预冷模式" }], 十: [{ index: "1_1", value: "images/airc10.png" }, { index: "2_1", value: "通风强风模式" }], 十一: [{ index: "1_1", value: "images/airc11.png" }, { index: "2_1", value: "通风模式" }], 十二: [{ index: "1_1", value: "images/airc12.png" }, { index: "2_1", value: "未知" }],
    },
    {
      name: "车门系统", 一: [{ index: "1_1", value: "images/door1.png" }, { index: "2_1", value: "通讯故障" }], 二: [{ index: "1_1", value: "images/door2.png" }, { index: "2_1", value: "门切除" }], 三: [{ index: "1_1", value: "images/door3.png" }, { index: "2_1", value: "对位隔离" }], 四: [{ index: "1_1", value: "images/door4.png" }, { index: "2_1", value: "门紧急解锁" }], 五: [{ index: "1_1", value: "images/door5.png" }, { index: "2_1", value: "门严重故障" }],
      六: [{ index: "1_1", value: "images/door6.png" }, { index: "2_1", value: "门中等故障" }], 七: [{ index: "1_1", value: "images/door7.png" }, { index: "2_1", value: "关门防夹(闪烁时为动态防夹)" }], 八: [{ index: "1_1", value: "images/door8.png" }, { index: "2_1", value: "开门防夹(闪烁时为动态防夹)" }], 九: [{ index: "1_1", value: "images/door9.png" }, { index: "2_1", value: "门关,无故障" }], 十: [{ index: "1_1", value: "images/door10.png" }, { index: "2_1", value: "门开,无故障" }], 十一: [], 十二: [],
    },
    {
      name: "受电弓", 一: [{ index: "1_1", value: "images/pan1.png" }, { index: "2_1", value: "切除" }], 二: [{ index: "1_1", value: "images/pan2.png" }, { index: "2_1", value: "升弓故障" }], 三: [{ index: "1_1", value: "images/pan3.png" }, { index: "2_1", value: "降弓故障" }], 四: [{ index: "1_1", value: "images/pan4.png" }, { index: "2_1", value: "弓网检测报警" }], 五: [{ index: "1_1", value: "images/pan5.png" }, { index: "2_1", value: "升弓" }],
      六: [{ index: "1_1", value: "images/pan6.png" }, { index: "2_1", value: "降弓" }], 七: [{ index: "1_1", value: "images/pan7.png" }, { index: "2_1", value: "未知" }], 八: [], 九: [], 十一: [], 十二: [],
    },
    {
      name: "高速断路器", 一: [{ index: "1_1", value: "images/break1.png" }, { index: "2_1", value: "通讯故障" }], 二: [{ index: "1_1", value: "images/break2.png" }, { index: "2_1", value: "HSCB合上" }], 三: [{ index: "1_1", value: "images/break3.png" }, { index: "2_1", value: "HSCB断开" }], 四: [], 五: [], 六: [], 七: [], 八: [], 九: [], 十一: [], 十二: [],
    },
    {
      name: "刀开关", 一: [{ index: "1_1", value: "images/knife1.png" }, { index: "2_1", value: "故障位" }], 二: [{ index: "1_1", value: "images/knife2.png" }, { index: "2_1", value: "库用位" }], 三: [{ index: "1_1", value: "images/knife3.png" }, { index: "2_1", value: "受电弓位" }], 四: [{ index: "1_1", value: "images/knife4.png" }, { index: "2_1", value: "未知" }], 五: [], 六: [], 七: [], 八: [], 九: [], 十一: [], 十二: [],
    },
    {
      name: "牵引", 一: [{ index: "1_1", value: "images/draw1.png" }, { index: "2_1", value: "通讯故障" }], 二: [{ index: "1_1", value: "images/draw2.png" }, { index: "2_1", value: "牵引故障" }], 三: [{ index: "1_1", value: "images/draw3.png" }, { index: "2_1", value: "牵引警告" }], 四: [{ index: "1_1", value: "images/draw4.png" }, { index: "2_1", value: "牵引激活" }], 五: [{ index: "1_1", value: "images/draw5.png" }, { index: "2_1", value: "牵引断开" }], 六: [], 七: [], 八: [], 九: [], 十一: [], 十二: [],
    },
    {
      name: "制动", 一: [{ index: "1_1", value: "images/braking1.png" }, { index: "2_1", value: "制动切除" }], 二: [{ index: "1_1", value: "images/braking2.png" }, { index: "2_1", value: "制动故障" }], 三: [{ index: "1_1", value: "images/braking3.png" }, { index: "2_1", value: "制动警告" }], 四: [{ index: "1_1", value: "images/draw4.png" }, { index: "2_1", value: "空气制动施加" }], 五: [{ index: "1_1", value: "images/draw5.png" }, { index: "2_1", value: "空气制动释放" }], 六: [], 七: [], 八: [], 九: [], 十一: [], 十二: [],
    },
    {
      name: "辅助电源", 一: [{ index: "1_1", value: "images/ass1.png" }, { index: "2_1", value: "通讯故障" }], 二: [{ index: "1_1", value: "images/ass2.png" }, { index: "2_1", value: "辅逆故障" }], 三: [{ index: "1_1", value: "images/ass3.png" }, { index: "2_1", value: "辅逆警告" }], 四: [{ index: "1_1", value: "images/ass4.png" }, { index: "2_1", value: "辅逆运行,无故障" }], 五: [{ index: "1_1", value: "images/ass5.png" }, { index: "2_1", value: "辅逆电源断开" }], 六: [{ index: "1_1", value: "images/ass6.png" }, { index: "2_1", value: "未知" }], 七: [], 八: [], 九: [], 十一: [], 十二: [],
    },
    { name: "充电机", 一: [{ index: "1_1", value: "images/bach1.png" }, { index: "2_1", value: "通讯故障" }], 二: [{ index: "1_1", value: "images/bach2.png" }, { index: "2_1", value: "充电机故障" }], 三: [{ index: "1_1", value: "images/bach3.png" }, { index: "2_1", value: "充电机警告" }], 四: [{ index: "1_1", value: "images/bach4.png" }, { index: "2_1", value: "充电机运行,无故障" }], 五: [{ index: "1_1", value: "images/bach5.png" }, { index: "2_1", value: "充电机电源断开" }], 六: [{ index: "1_1", value: "images/bach6.png" }, { index: "2_1", value: "未知" }], 七: [], 八: [], 九: [], 十一: [], 十二: [], },
    {
      name: "辅助电源", 一: [{ index: "1_1", value: "images/expand1.png" }, { index: "2_1", value: "通讯故障" }], 二: [{ index: "1_1", value: "images/expand2.png" }, { index: "2_1", value: "连接" }], 三: [{ index: "1_1", value: "images/expand3.png" }, { index: "2_1", value: "断开" }], 四: [], 五: [], 六: [], 七: [], 八: [], 九: [], 十一: [], 十二: [],
    },
    {
      name: "紧急对讲", 一: [{ index: "1_1", value: "images/emer1.png" }, { index: "2_1", value: "故障" }], 二: [{ index: "1_1", value: "images/emer2.png" }, { index: "2_1", value: "请求对讲" }], 三: [{ index: "1_1", value: "images/emer3.png" }, { index: "2_1", value: "激活" }], 四: [{ index: "1_1", value: "images/emer4.png" }, { index: "2_1", value: "待机" }], 五: [], 六: [], 七: [], 八: [], 九: [], 十一: [], 十二: [],
    },
    {
      name: "压缩机", 一: [{ index: "1_1", value: "images/compressor1.png" }, { index: "2_1", value: "通讯故障" }], 二: [{ index: "1_1", value: "images/compressor2.png" }, { index: "2_1", value: "空气压缩机故障" }], 三: [{ index: "1_1", value: "images/compressor3.png" }, { index: "2_1", value: "打风超时,警告" }], 四: [{ index: "1_1", value: "images/compressor4.png" }, { index: "2_1", value: "空气压缩机正常运行" }], 五: [{ index: "1_1", value: "images/compressor5.png" }, { index: "2_1", value: "空气压缩机待机状态" }], 六: [], 七: [], 八: [], 九: [], 十一: [], 十二: [],
    },
    {
      name: "烟/火", 一: [{ index: "1_1", value: "images/fire1.png" }, { index: "2_1", value: "探测到火或烟" }], 二: [{ index: "1_1", value: "images/fire2.png" }, { index: "2_1", value: "火或烟传感器故障" }], 三: [{ index: "1_1", value: "images/fire3.png" }, { index: "2_1", value: "隔离" }], 四: [{ index: "1_1", value: "images/fire4.png" }, { index: "2_1", value: "探测器污染" }], 五: [{ index: "1_1", value: "images/fire5.png" }, { index: "2_1", value: "未探测到火或烟" }], 六: [], 七: [], 八: [], 九: [], 十一: [], 十二: [],
    },
    {
      name: "灭火器", 一: [{ index: "1_1", value: "images/fireextinguisher1.png" }, { index: "2_1", value: "离线" }], 二: [{ index: "1_1", value: "images/fireextinguisher2.png" }, { index: "2_1", value: "在线" }], 三: [], 四: [], 五: [], 六: [], 七: [], 八: [], 九: [], 十一: [], 十二: [],
    },
    {
      name: "柜门", 一: [{ index: "1_1", value: "images/cabinetdoor1.png" }, { index: "2_1", value: "开门" }], 二: [{ index: "1_1", value: "images/cabinetdoor1.png" }, { index: "2_1", value: "关门" }], 三: [], 四: [], 五: [], 六: [], 七: [], 八: [], 九: [], 十一: [], 十二: [],
    },
    {
      name: "司机室盖板", 一: [{ index: "1_1", value: "images/coverplate1.png" }, { index: "2_1", value: "打开" }], 二: [{ index: "1_1", value: "images/coverplate2.png" }, { index: "2_1", value: "关闭" }], 三: [], 四: [], 五: [], 六: [], 七: [], 八: [], 九: [], 十一: [], 十二: [],
    },
    {
      name: "障碍物检测（主动)", 一: [{ index: "1_1", value: "images/obstacle1.png" }, { index: "2_1", value: "通讯故障" }], 二: [{ index: "1_1", value: "images/obstacle2.png" }, { index: "2_1", value: "检测到障碍物" }], 三: [{ index: "1_1", value: "images/obstacle3.png" }, { index: "2_1", value: "障碍物检测故障" }], 四: [{ index: "1_1", value: "images/obstacle4.png" }, { index: "2_1", value: "障碍物检测警告" }], 五: [{ index: "1_1", value: "images/obstacle5.png" }, { index: "2_1", value: "未检测到障碍物" }], 六: [{ index: "1_1", value: "images/obstacle6.png" }, { index: "2_1", value: "未知" }], 七: [], 八: [], 九: [], 十一: [], 十二: [],
    },
    {
      name: "障碍物检测（被动)", 一: [{ index: "1_1", value: "images/pobs1.png" }, { index: "2_1", value: "通讯故障" }], 二: [{ index: "1_1", value: "images/pobs2.png" }, { index: "2_1", value: "检测到障碍物" }], 三: [{ index: "1_1", value: "images/pobs3.png" }, { index: "2_1", value: "检测到系统故障" }], 四: [{ index: "1_1", value: "images/pobs4.png" }, { index: "2_1", value: "未检测到障碍物" }], 五: [{ index: "1_1", value: "images/pobs5.png" }, { index: "2_1", value: "未知" }], 六: [], 七: [], 八: [], 九: [], 十一: [], 十二: [],
    },
    {
      name: "脱轨检测", 一: [{ index: "1_1", value: "images/derail1.png" }, { index: "2_1", value: "通讯故障" }], 二: [{ index: "1_1", value: "images/derail2.png" }, { index: "2_1", value: "检测到脱轨" }], 三: [{ index: "1_1", value: "images/derail3.png" }, { index: "2_1", value: "脱轨检测故障" }], 四: [{ index: "1_1", value: "images/derail4.png" }, { index: "2_1", value: "脱轨检测警告" }], 五: [{ index: "1_1", value: "images/derail5.png" }, { index: "2_1", value: "未检测到脱轨" }], 六: [{ index: "1_1", value: "images/derail6.png" }, { index: "2_1", value: "未知" }], 七: [], 八: [], 九: [], 十一: [], 十二: [],
    },

  ]


  function stateIconFun1(name, coachCode) {
    var stateIcon3: any[] = [];
    // console.log("")
    if (coachCode?.length) {
      coachCode?.map((item) => {
        if (item.index === "2_1") {
          stateIcon3.push(<><br />{item.value}</>)
        } else {
          var imageurl1 = require('./' + item.value)
          stateIcon3.push(<img src={imageurl1} style={{ width: 20 }} />)
        }
      })
    }
    return stateIcon3
  }
  const handleVehicleData3 = vehicleData1?.map(item => ({
    name: item.name,
    一: stateIconFun1(item.name, item.一),
    二: stateIconFun1(item.name, item.二),
    三: stateIconFun1(item.name, item.三),
    四: stateIconFun1(item.name, item.四),
    五: stateIconFun1(item.name, item.五),
    六: stateIconFun1(item.name, item.六),
    七: stateIconFun1(item.name, item.七),
    八: stateIconFun1(item.name, item.八),
    九: stateIconFun1(item.name, item.九),
    十: stateIconFun1(item.name, item.十),
    十一: stateIconFun1(item.name, item.十一),
    十二: stateIconFun1(item.name, item.十二)
  }))
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div
    >
      <div style={{ width: "100%", float: "right", marginBottom: 2 }}>
        <Button type="link"
          onClick={showModal}
        >
          <QuestionCircleOutlined /> 符号说明
      </Button>
        <Modal title="符号说明" width={1700}
          // maskStyle={{backgroundColor:"rgba(25,31,46,0.7)"}}
          bodyStyle={{ backgroundColor: "rgba(25,31,46,0.7)" }}
          visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
        >
          <Table
            // style={{ height:  }}
            className={styles.system}
            rowKey={(record) => record.index}
            size="small"
            columns={symbolColumns1}
            dataSource={handleVehicleData3}
            pagination={false}
            scroll={{ y: 500 }}
          />
        </Modal>
      </div>

      <Table
        style={{
          height: chartHeight,
          marginTop: 16,
          backgroundColor: 'rgba(25,31,46,0.7)',
        }}
        // className={styles.system}
        rowKey={(record) => record.index}
        size="small"
        columns={vihiclesColumns}
        dataSource={handleVehicleData}
        pagination={false}
      // scroll={{ y: 350 }}
      />
    </div >
  );
};

export default CommunicationMap;
