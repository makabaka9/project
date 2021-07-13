import { TopTenData, CurrentDirType, SearchDataType, SysListType, subFaultType } from './data.d';

// mock data
const currentDir: CurrentDirType = {
  totalTrain: 30,
  onLineTrain: 30,
  millionMeter: 30,
  upDirection: [],
  downDirection: [],
};

const dataList: Array<SearchDataType> = [
  {
    coachCode: "2",
    faultCode: "2267",
    currentLocation: '华山路-惠河路',
    faultDescription: "检测到方向指令向前和向后同时有效",
    faultName: "MP1车DCU 方向指令错误",
    faultSolution: "故障消失后自动复位↵检查列车线及司控器。",
    faultType: "DCU",
    happenTime: "2020-10-13 15:20:35",
    lineCode: "5",
    repairSuggestion: null,
    resetTime: null,
    status: 1,
    trainCode: "504",
    trainFaultLevel: 3,
  },
  {
    coachCode: "2",
    faultCode: "2255",
    currentLocation: '明秀路-北湖南路',
    faultDescription: "检测到电机3温度大于170℃",
    faultName: "MP1车DCU 3#电机超温保护",
    faultSolution: "电机温度小于160℃后DCU自动复位↵检查电机出风口是否有异物阻塞，检查相应温度传感器及其接线。 ",
    faultType: "DCU",
    happenTime: "2020-10-13 15:30:32",
    lineCode: "5",
    repairSuggestion: null,
    resetTime: null,
    status: 1,
    trainCode: "505",
    trainFaultLevel: 3,
  },
  {
    coachCode: "2",
    faultCode: "2260",
    currentLocation: '明秀路-北湖南路',
    faultDescription: "检测到电机4温度大于220℃或小于-50℃",
    faultName: "MP1车DCU 电机温度传感器4故障",
    faultSolution: "故障消失后自动复位↵检查相应温度传感器及其接线。",
    faultType: "DCU",
    happenTime: "2020-10-13 15:30:32",
    lineCode: "5",
    repairSuggestion: null,
    resetTime: null,
    status: 1,
    trainCode: "505",
    trainFaultLevel: 4,
  },
  {
    coachCode: "2",
    faultCode: "2231",
    currentLocation: '那洪-壮锦大道',
    faultDescription: "检测到制动电阻风机接触器卡在分位",
    faultName: "MP1车DCU 制动电阻风机接触器卡分",
    faultSolution: "故障消失后自动复位↵检查制动电阻风机接触器及其辅助触点、接触器控制回路及状态反馈线。",
    faultType: "DCU",
    happenTime: "2020-10-13 15:30:32",
    lineCode: "5",
    repairSuggestion: null,
    resetTime: null,
    status: 1,
    trainCode: "505",
    trainFaultLevel: 4,
  },
  {
    coachCode: "2",
    faultCode: "2270",
    currentLocation: '明秀路-北湖南路',
    faultDescription: "牵引工况速度大于2km/h持续一定时间仍检测到“所有制动已缓解”信号无效",
    faultName: "MP1车DCU 制动缓解不良",
    faultSolution: "故障消失后自动复位↵检查列车是否缓解，检查“所有制动已缓解”列车线。",
    faultType: "DCU",
    happenTime: "2020-10-13 15:20:35",
    lineCode: "5",
    repairSuggestion: null,
    resetTime: null,
    status: 1,
    trainCode: "505",
    trainFaultLevel: 4,
  },
  {
    coachCode: "2",
    faultCode: "2231",
    currentLocation: '明秀路-北湖南路',
    faultDescription: "检测到制动电阻风机接触器卡在分位",
    faultName: "MP1车DCU 制动电阻风机接触器卡分",
    faultSolution: "故障消失后自动复位↵检查制动电阻风机接触器及其辅助触点、接触器控制回路及状态反馈线。",
    faultType: "DCU",
    happenTime: "2020-10-13 15:37:30",
    lineCode: "5",
    repairSuggestion: null,
    resetTime: null,
    status: 1,
    trainCode: "505",
    trainFaultLevel: 4,
  }
];

const faultList: Array<TopTenData> = [];
const fakeNum = [1, 2, 0, 0, 0, 0, 0, 1, 0, 1];
for (let i = 0; i < fakeNum.length; i += 1) {
  faultList.push({
    trainCode: `50${i}`,
    faultNum: fakeNum[i],
  });
};

const sysList: Array<SysListType> = [];
const fakeName = ['BCU', 'DCU', 'PIS'];
for (let i = 0; i < fakeName.length; i += 1) {
  sysList.push({
    subSysName: fakeName[i],
    faultNum: 0,
    samePer: 0,
    roundPer: -1
  });
};

const subFaultList: Array<subFaultType> = [];
const fakeSysName = ['BCU', 'DCU', 'PIS'];
for (let i = 0; i < fakeSysName.length; i += 1) {
  subFaultList.push({
    systemName: fakeSysName[i],
    faultNum: i
  });
};

export default {
  'GET  /api/monitor/fault/online_train': currentDir,
  'GET  /api/monitor/fault': dataList,
  'GET  /api/monitor/fault/fault_statistics': faultList,
  'GET  /api/monitor/fault/fault_subsystem': sysList,
  'GET  /api/monitor/fault/by_subsystem': subFaultList,
};