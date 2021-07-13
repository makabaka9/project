const PieData = [
    {
      type: '空调系统',
      value: 27,
    },
    {
      type: '弓网系统',
      value: 25,
    },
    {
      type: '牵引系统',
      value: 18,
    },
    {
      type: '制动系统',
      value: 15,
    },
    {
      type: '走行部',
      value: 10,
    },
    {
      type: '车门系统',
      value: 5,
    },
    {
      type: '辅助系统',
      value: 16,
    },
    {
      type: '烟火系统',
      value: 16,
    },
    {
      type: '乘客信息系统',
      value: 16,
    },
    {
      type: '主动式障碍物检测系统',
      value: 16,
    },
    {
      type: '网络系统',
      value: 16,
    },
  ];
  // 各子系统故障分布数据
  const data = {
    name: 'root',
    children: [
      { name: '空调系统', value: 27 },
      { name: '弓网系统', value: 50 },
      { name: '牵引系统', value: 50 },
      { name: '制动系统', value: 40 },
      { name: '走行部', value: 15 },
      { name: '车门系统', value: 95 },
      { name: '辅助系统', value: 90 },
      { name: '烟火系统', value: 75 },
      { name: '乘客信息系统', value: 98 },
      { name: '主动式障碍物检测系统', value: 60 },
      { name: '网络系统', value: 45 },
    ],
  };
  
  const StackedColumnData = [
    {
      year: '空调',
      value: 3,
      type: '本月(增)',
    },
    {
      year: '弓网',
      value: 4,
      type: '本月(增)',
    },
    {
      year: '牵引',
      value: 3.5,
      type: '本月(增)',
    },
    {
      year: '制动',
      value: 5,
      type: '本月(增)',
    },
    {
      year: '走行部',
      value: 4.9,
      type: '本月(增)',
    },
    {
      year: '车门',
      value: 6,
      type: '本月(增)',
    },
    {
      year: '辅助',
      value: 7,
      type: '本月(增)',
    },
    {
      year: '空调',
      value: 3,
      type: '上月(增)',
    },
    {
      year: '弓网',
      value: 4,
      type: '上月(增)',
    },
    {
      year: '牵引',
      value: 3.5,
      type: '上月(增)',
    },
    {
      year: '制动',
      value: 5,
      type: '上月(增)',
    },
    {
      year: '走行部',
      value: 4.9,
      type: '上月(增)',
    },
    {
      year: '车门',
      value: 6,
      type: '上月(增)',
    },
    {
      year: '辅助',
      value: 7,
      type: '上月(增)',
    },
  ];
  const GroupedColumnData = [
    {
      name: '本月',
      系统: '空调',
      系统故障: 18.9,
    },
    {
      name: '本月',
      系统: '弓网',
      系统故障: 28.8,
    },
    {
      name: '本月',
      系统: '牵引',
      系统故障: 39.3,
    },
    {
      name: '本月',
      系统: '制动',
      系统故障: 81.4,
    },
    {
      name: '本月',
      系统: '走行部',
      系统故障: 20,
    },
    {
      name: '本月',
      系统: '车门',
      系统故障: 20.3,
    },
    {
      name: '本月',
      系统: '辅助',
      系统故障: 24,
    },
    {
      name: '本月',
      系统: '烟火',
      系统故障: 24,
    },
    {
      name: '本月',
      系统: '网络',
      系统故障: 24,
    },
    {
      name: '本月',
      系统: 'PIS',
      系统故障: 24,
    },
    {
      name: '本月',
      系统: 'AODS',
      系统故障: 24,
    },
    {
      name: '上月',
      系统: '空调',
      系统故障: 12.4,
    },
    {
      name: '上月',
      系统: '弓网',
      系统故障: 23.2,
    },
    {
      name: '上月',
      系统: '牵引',
      系统故障: 34.5,
    },
    {
      name: '上月',
      系统: '制动',
      系统故障: 99.7,
    },
    {
      name: '上月',
      系统: '走行部',
      系统故障: 52.6,
    },
    {
      name: '上月',
      系统: '车门',
      系统故障: 35.5,
    },
    {
      name: '上月',
      系统: '辅助',
      系统故障: 37.4,
    },
    {
      name: '上月',
      系统: '烟火',
      系统故障: 24,
    },
    {
      name: '上月',
      系统: '网络',
      系统故障: 24,
    },
    {
      name: '上月',
      系统: 'PIS',
      系统故障: 24,
    },
    {
      name: '上月',
      系统: 'AODS',
      系统故障: 24,
    },
    {
      name: '去年同月',
      系统: '空调',
      系统故障: 22,
    },
    {
      name: '去年同月',
      系统: '弓网',
      系统故障: 34,
    },
    {
      name: '去年同月',
      系统: '牵引',
      系统故障: 20,
    },
    {
      name: '去年同月',
      系统: '制动',
      系统故障: 10,
    },
    {
      name: '去年同月',
      系统: '走行部',
      系统故障: 50,
    },
    {
      name: '去年同月',
      系统: '车门',
      系统故障: 40,
    },
    {
      name: '去年同月',
      系统: '辅助',
      系统故障: 60,
    },
    {
      name: '去年同月',
      系统: '烟火',
      系统故障: 24,
    },
    {
      name: '去年同月',
      系统: '网络',
      系统故障: 24,
    },
    {
      name: '去年同月',
      系统: 'PIS',
      系统故障: 24,
    },
    {
      name: '去年同月',
      系统: 'AODS',
      系统故障: 24,
    },
  ];
  
  const TimeLineData = [
    {
      month: '2019-8',
      city: '牵引系统',
      temperature: 0,
    },
    {
      month: '2019-8',
      city: '走行部',
      temperature: 3.9,
    },
    {
      month: '2019-8',
      city: '车门系统',
      temperature: 11,
    },
    {
      month: '2019-9',
      city: '牵引系统',
      temperature: 20,
    },
    {
      month: '2019-9',
      city: '走行部',
      temperature: 40,
    },
    {
      month: '2019-9',
      city: '车门系统',
      temperature: 28,
    },
    {
      month: '2019-10',
      city: '牵引系统',
      temperature: 20,
    },
    {
      month: '2019-10',
      city: '走行部',
      temperature: 5.7,
    },
    {
      month: '2019-10',
      city: '车门系统',
      temperature: 33,
    },
    {
      month: '2019-11',
      city: '牵引系统',
      temperature: 14.5,
    },
    {
      month: '2019-11',
      city: '走行部',
      temperature: 8.5,
    },
    {
      month: '2019-11',
      city: '车门系统',
      temperature: 20,
    },
    {
      month: '2019-12',
      city: '牵引系统',
      temperature: 18.4,
    },
    {
      month: '2019-12',
      city: '走行部',
      temperature: 11.9,
    },
    {
      month: '2019-12',
      city: '车门系统',
      temperature: 40,
    },
    {
      month: '2020-1',
      city: '牵引系统',
      temperature: 21.5,
    },
    {
      month: '2020-1',
      city: '走行部',
      temperature: 15.2,
    },
    {
      month: '2020-1',
      city: '车门系统',
      temperature: 40,
    },
    {
      month: '2020-2',
      city: '牵引系统',
      temperature: 25.2,
    },
    {
      month: '2020-2',
      city: '走行部',
      temperature: 17,
    },
    {
      month: '2020-2',
      city: '车门系统',
      temperature: 10,
    },
    {
      month: '2020-3',
      city: '牵引系统',
      temperature: 26.5,
    },
    {
      month: '2020-3',
      city: '走行部',
      temperature: 16.6,
    },
    {
      month: '2020-3',
      city: '车门系统',
      temperature: 15,
    },
    {
      month: '2020-4',
      city: '牵引系统',
      temperature: 23.3,
    },
    {
      month: '2020-4',
      city: '走行部',
      temperature: 14.2,
    },
    {
      month: '2020-4',
      city: '车门系统',
      temperature: 44,
    },
    {
      month: '2020-5',
      city: '牵引系统',
      temperature: 18.3,
    },
    {
      month: '2020-5',
      city: '走行部',
      temperature: 10.3,
    },
    {
      month: '2020-5',
      city: '车门系统',
      temperature: 26,
    },
    {
      month: '2020-6',
      city: '牵引系统',
      temperature: 13.9,
    },
    {
      month: '2020-6',
      city: '走行部',
      temperature: 6.6,
    },
    {
      month: '2020-6',
      city: '车门系统',
      temperature: 18,
    },
    {
      month: '2020-7',
      city: '牵引系统',
      temperature: 23,
    },
    {
      month: '2020-7',
      city: '走行部',
      temperature: 60,
    },
    {
      month: '2020-7',
      city: '车门系统',
      temperature: 50,
    },
  ];
  const MinBarData = [
    { faultNum: 45, trainCode: "0501" },
    { faultNum: 344, trainCode: "0502" },
    { faultNum: 345, trainCode: "0503" },
    { faultNum: 33, trainCode: "0504" },
    { faultNum: 24, trainCode: "0505" },
    { faultNum: 24, trainCode: "0506" },
    { faultNum: 122, trainCode: "0507" },
    { faultNum: 152, trainCode: "0508" },
    { faultNum: 122, trainCode: "0509" },
  ]
  const searchData: any[] = [];
  const dataVar = ['弓网系统', '牵引系统', '空调系统', '制动系统', '车门系统', '走行部', '辅助系统', '烟火系统', '乘客信息系统', '主动式障碍物检测系统', '网络系统'];
  
  for (let i = 0; i < dataVar.length; i += 1) {
    searchData.push({
      system: dataVar[i],
      index: i + 1,
      thisFaultRate: 0.2,
      lastFaultRate: 0,
      faultRate: 0,
      range: Math.floor(Math.random() * 100),
      status: Math.floor((Math.random() * 10) % 2),
    });
  }

  const getFakeChartData = {
    PieData,
    data,
    StackedColumnData,
    GroupedColumnData,
    TimeLineData,
    MinBarData,
    searchData
  };
  
  export default getFakeChartData;
  