//故障统计下的多组柱状图
const faultStatistic = [
  { type: 'VVVF牵引逆变器', value: 27, name: 'Mp1' },
  { type: '高速断路器', value: 25, name: 'Mp1' },
  { type: '短接接触器', value: 25, name: 'Mp1' },
  { type: '充电接触器', value: 25, name: 'Mp1' },
  { type: '电压传感器', value: 25, name: 'Mp1' },
  { type: '制动电阻', value: 18, name: 'Mp1' },
  { type: '电抗器', value: 18, name: 'Mp1' },
  { type: '电机温度传感器', value: 18, name: 'M1' },

  { type: 'VVVF牵引逆变器', value: 27, name: 'M1' },
  { type: '高速断路器', value: 25, name: 'M1' },
  { type: '短接接触器', value: 25, name: 'M1' },
  { type: '充电接触器', value: 25, name: 'Mp1' },
  { type: '电压传感器', value: 25, name: 'Mp1' },
  { type: '制动电阻', value: 18, name: 'Mp1' },
  { type: '电抗器', value: 18, name: 'Mp1' },
  { type: '电机温度传感器', value: 18, name: 'Mp1' },

  { type: 'VVVF牵引逆变器', value: 27, name: 'M2' },
  { type: '高速断路器', value: 25, name: 'M2' },
  { type: '短接接触器', value: 25, name: 'M2' },
  { type: '充电接触器', value: 25, name: 'M2' },
  { type: '电压传感器', value: 25, name: 'M2' },
  { type: '制动电阻', value: 18, name: 'M2' },
  { type: '电抗器', value: 18, name: 'M2' },
  { type: '电机温度传感器', value: 18, name: 'M2' },

  { type: 'VVVF牵引逆变器', value: 27, name: 'Mp2' },
  { type: '高速断路器', value: 25, name: 'Mp2' },
  { type: '短接接触器', value: 25, name: 'Mp2' },
  { type: '充电接触器', value: 25, name: 'Mp2' },
  { type: '电压传感器', value: 25, name: 'Mp2' },
  { type: '制动电阻', value: 18, name: 'Mp2' },
  { type: '电抗器', value: 18, name: 'Mp2' },
  { type: '电机温度传感器', value: 18, name: 'Mp2' },
];
// 故障信息下的表格
const faultData: any[] = [];
for (let i = 1; i < 10; i += 1) {
  faultData.push({
    id: '1',
    trainCode: `${i}`,
    // site: "南宁-那洪战",
    faultCode: '2203',
    faultName: 'MP1车DCU 充电接触器卡分故障',
    faultLevel: '2',
    handle: {
      status: '未处理',
      color: 'red',
    },
    faultDec: '检测到充电接触器卡在分位',
    solution: '可手动复位或DCU检测到故障2min内累积不足2次时自动复位',
    time: moment(new Date().getTime()).format('YYYY-MM-DD HH:MM:SS'),
  });
}