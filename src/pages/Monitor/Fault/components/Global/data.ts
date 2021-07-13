import { random } from "lodash";
import moment from "moment";

 //假数据
 const mainlineFaultData = [
    {
      month: "09",
      city: "前12个月故障数",
      temperature: 7
    },
    {
      month: "09",
      city: "近12个月故障数",
      temperature: 3.9
    },
    {
      month: "10",
      city: "前12个月故障数",
      temperature: 13
    },
    {
      month: "10",
      city: "近12个月故障数",
      temperature: 4.2
    },
    {
      month: "11",
      city: "前12个月故障数",
      temperature: 16.5
    },
    {
      month: "11",
      city: "近12个月故障数",
      temperature: 5.7
    },
    {
      month: "12",
      city: "前12个月故障数",
      temperature: 14.5
    },
    {
      month: "12",
      city: "近12个月故障数",
      temperature: 8.5
    },
    {
      month: "01",
      city: "前12个月故障数",
      temperature: 10
    },
    {
      month: "01",
      city: "近12个月故障数",
      temperature: 11.9
    },
    {
      month: "02",
      city: "前12个月故障数",
      temperature: 7.5
    },
    {
      month: "02",
      city: "近12个月故障数",
      temperature: 15.2
    },
    {
      month: "03",
      city: "前12个月故障数",
      temperature: 9.2
    },
    {
      month: "03",
      city: "近12个月故障数",
      temperature: 17
    },
    {
      month: "04",
      city: "前12个月故障数",
      temperature: 14.5
    },
    {
      month: "04",
      city: "近12个月故障数",
      temperature: 16.6
    },
    {
      month: "05",
      city: "前12个月故障数",
      temperature: 9.3
    },
    {
      month: "05",
      city: "近12个月故障数",
      temperature: 14.2
    },
    {
      month: "06",
      city: "前12个月故障数",
      temperature: 8.3
    },
    {
      month: "06",
      city: "近12个月故障数",
      temperature: 10.3
    },
    {
      month: "07",
      city: "前12个月故障数",
      temperature: 8.9
    },
    {
      month: "07",
      city: "近12个月故障数",
      temperature: 5.6
    },
    {
      month: "08",
      city: "前12个月故障数",
      temperature: 5.6
    },
    {
      month: "08",
      city: "近12个月故障数",
      temperature: 9.8
    }
  ];
  //全网正线故障率数据
  const fualtRateData = [
    { monthNum: 0, rate: 1.0 },
    { monthNum: 1, rate: 1.0 },
    { monthNum: 2, rate: 1.1 },
    { monthNum: 3, rate: 1.0 },
    { monthNum: 4, rate: 1.12 },
    { monthNum: 5, rate: 1.08 },
    { monthNum: 6, rate: 0.99 },
    { monthNum: 7, rate: 0.98 },
    { monthNum: 8, rate: 1.0 },
    { monthNum: 9, rate: 1.1 },
    { monthNum: 10, rate: 1.0 },
    { monthNum: 11, rate: 1.0 },
    { monthNum: 12, rate: 1.11 }
  ];
  const reliableData = [
    { monthNum: 0, rate: 98.2 },
    { monthNum: 1, rate: 98.0 },
    { monthNum: 2, rate: 97.1 },
    { monthNum: 3, rate: 97.0 },
    { monthNum: 4, rate: 96.12 },
    { monthNum: 5, rate: 95.08 },
    { monthNum: 6, rate: 94.99 },
    { monthNum: 7, rate: 94.98 },
    { monthNum: 8, rate: 95.0 },
    { monthNum: 9, rate: 96.1 },
    { monthNum: 10, rate: 96.0 },
    { monthNum: 11, rate: 97.0 },
    { monthNum: 12, rate: 98.11 }
  ];
  //各系统故障分布数据
  const faultDistribution = [
    {
      subsystemName: '牵引',
      coachType: 'a',
      faultNum: 70,
    },
    {
      subsystemName: '辅助',
      coachType: 'a',
      faultNum: 60,
    },
    {
      subsystemName: '制动',
      coachType: 'a',
      faultNum: 60,
    },
    {
      subsystemName: '空调',
      coachType: 'a',
      faultNum: 40,
    },
    {
      subsystemName: '走行部',
      coachType: 'a',
      faultNum: 60,
    },
    {
      subsystemName: '车门',
      coachType: 'a',
      faultNum: 70,
    },
    {
      subsystemName: 'PIS',
      coachType: 'a',
      faultNum: 50,
    },
    {
      subsystemName: '火灾',
      coachType: 'a',
      faultNum: 30,
    },
  ];
  //车辆故障Top10数据
  const topTen = [
    {
      age: '0501',
      count: 18,
    },
    {
      age: '0502',
      count: 12,
    },
    {
      age: '0503',
      count: 15,
    },
    {
      age: '0504',
      count: 25,
    },
    {
      age: '0505',
      count: 2,
    },
    {
      age: '0506',
      count: 14,
    },
    {
      age: '0507',
      count: 5,
    },
    {
      age: '0508',
      count: 17,
    },
    {
      age: '0509',
      count: 10,
    },
    {
      age: '0510',
      count: 11,
    },
  ];
  function compare(key: React.ReactText) {
    return function (value1: { [x: string]: any; }, value2: { [x: string]: any; }) {
      var val1 = value1[key];
      var val2 = value2[key];
      return val2 - val1;
    }
  }
  topTen.sort(compare('count'));
  const nowDate = moment(new Date()).format('YYYY-MM-DD HH:MM:SS')
  //故障监控数据
  const faultData = [
    {
      trainCode: '0501',
      system: '制动',
      currentLocation: '华山路-惠河路',
      faultContent: 'TC2车BCU架1	制动不缓解故障',
      faultLevel: 2,
      faultTime: nowDate,
      duration: '3分06秒',
      option: {
        faultDescription: 'EP2002阀无制动力请求但机械制动未缓解',
        faultSolution: '司机或者调度中心应评估故障的本质并采取必要纠正措施。',
      }
    },
    {
      trainCode: '0502',
      system: '牵引',
      currentLocation: '明秀路-北湖南路',
      faultContent: 'MP1车DCU	方向指令错误',
      faultLevel: 3,
      faultTime: nowDate,
      duration: '2分34秒',
      option: {
        faultDescription: '检测到方向指令向前和向后同时有效',
        faultSolution: '故障消失后自动复位检查列车线及司控器。',
      }
    },
    {
      trainCode: '0503',
      system: '制动',
      currentLocation: '明秀路-北湖南路',
      faultContent: 'TC2车BCU架1	制动不缓解故障',
      faultLevel: 4,
      faultTime: nowDate,
      duration: '1分03秒',
      option: {
        faultDescription: 'EP2002阀无制动力请求但机械制动未缓解。',
        faultSolution: '司机或者调度中心应评估故障的本质并采取必要纠正措施。',
      }
    }, {
      trainCode: '0504',
      system: '牵引',
      currentLocation: '那洪-壮锦大道',
      faultContent: 'MP1车DCU	高速断路器卡合',
      faultLevel: 3,
      faultTime: nowDate,
      duration: '3分04秒',
      option: {
        faultDescription: '发出主断合命令一定时间后检测主断状态为断开',
        faultSolution: '可手动复位或DCU检测到故障累积不足2次时自动复位；',
      }
    }, {
      trainCode: '0505',
      system: '电机',
      currentLocation: '明秀路-北湖南路',
      faultContent: '电机温度传感器4故障',
      faultLevel: 2,
      faultTime: nowDate,
      duration: '1分34秒',
      option: {
        faultDescription: '检测到电机4温度大于220℃或小于-50℃',
        faultSolution: '故障消失后自动复位检查相应温度传感器及其接线',
      }
    }, {
      trainCode: '0506',
      system: 'PIS',
      currentLocation: '明秀路-北湖南路',
      faultContent: 'MP1车DCU	高速断路器10分钟内闭合超过3次',
      faultLevel: 2,
      faultTime: nowDate,
      duration: '4分12秒',
      option: {
        faultDescription: '检测到高速断路器10分钟内闭合超过3次',
        faultSolution: '可手动复位或延时后DCU自动复位',
      }
    }, {
      trainCode: '0507',
      system: 'PIS',
      currentLocation: '明秀路-北湖南路',
      faultContent: 'MP1车DCU	制动电阻风机接触器卡分',
      faultLevel: 4,
      faultTime: nowDate,
      duration: '2分51秒',
      option: {
        faultDescription: '检测到制动电阻风机接触器卡在分位',
        faultSolution: '故障消失后自动复位检查制动电阻风机接触器及其辅助触点、接触器控制回路及状态反馈线。',
      }
    },
    {
      trainCode: '0504',
      system: '牵引',
      currentLocation: '那洪-壮锦大道',
      faultContent: 'MP1车DCU	高速断路器卡合',
      faultLevel: 3,
      faultTime: nowDate,
      duration: '2分04秒',
      option: {
        faultDescription: '发出主断合命令一定时间后检测主断状态为断开',
        faultSolution: '可手动复位或DCU检测到故障累积不足2次时自动复位；',
      }
    }, {
      trainCode: '0505',
      system: '电机',
      currentLocation: '明秀路-北湖南路',
      faultContent: '电机温度传感器4故障',
      faultLevel: 2,
      faultTime: nowDate,
      duration: '2分34秒',
      option: {
        faultDescription: '检测到电机4温度大于220℃或小于-50℃',
        faultSolution: '故障消失后自动复位检查相应温度传感器及其接线',
      }
    },
  ]
  const faultMonitoring: any[] = [];
  const i = random(0, 7);
  const j = i + 1;
  faultMonitoring.push(
    {
      trainCode: faultData[i].trainCode,
      system: faultData[i].system,
      currentLocation: faultData[i].currentLocation,
      faultContent: faultData[i].faultContent,
      faultLevel: faultData[i].faultLevel,
      faultTime: faultData[i].faultTime,
      duration: faultData[i].duration,
      option: {
        faultDescription: faultData[i].option.faultDescription,
        faultSolution: faultData[i].option.faultSolution,
      }
    },
    {
      trainCode: faultData[j].trainCode,
      system: faultData[j].system,
      currentLocation: faultData[j].currentLocation,
      faultContent: faultData[j].faultContent,
      faultLevel: faultData[j].faultLevel,
      faultTime: faultData[j].faultTime,
      duration: faultData[j].duration,
      option: {
        faultDescription: faultData[j].option.faultDescription,
        faultSolution: faultData[j].option.faultSolution,
      }
    },
    {
      trainCode: faultData[j].trainCode,
      system: faultData[j].system,
      currentLocation: faultData[j].currentLocation,
      faultContent: faultData[j].faultContent,
      faultLevel: faultData[j].faultLevel,
      faultTime: faultData[j].faultTime,
      duration: faultData[j].duration,
      option: {
        faultDescription: faultData[j].option.faultDescription,
        faultSolution: faultData[j].option.faultSolution,
      }
    },
  );

  //故障同比/环比数据
  const searchData = [
    {
      sysName: '牵引',
      hitchNum: '4',
      samePer: 3.84,
      roundPer: -3.33,
    },
    {
      sysName: '空调',
      hitchNum: '5',
      samePer: 7.45,
      roundPer: -7.2,
    },
    {
      sysName: '制动',
      hitchNum: '8',
      samePer: -4.6,
      roundPer: 4.26,
    },
    {
      sysName: '车门',
      hitchNum: '9',
      samePer: 8.4,
      roundPer: -2.1,
    },
  ];

  const getFakeChartData = {
    mainlineFaultData,
    fualtRateData,
    reliableData,
    faultDistribution,
    topTen,
    faultMonitoring,
    searchData
  };
  
  export default getFakeChartData;