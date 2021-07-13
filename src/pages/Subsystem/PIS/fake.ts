const faultStatistic1 = [
  { type: '辅助逆变器', value: 27, name: 'Tc1' },
  { type: '应急电源', value: 25, name: 'Tc1' },
  { type: '充电机', value: 18, name: 'Tc1' },
  { type: '蓄电池', value: 18, name: 'Tc1' },
  { type: '辅助逆变器', value: 27, name: 'Tc2' },
  { type: '应急电源', value: 25, name: 'Tc2' },
  { type: '充电机', value: 18, name: 'Tc2' },
  { type: '蓄电池', value: 18, name: 'Tc2' },
];
const faultData1: any[] = [];
for (let i = 1; i < 10; i += 1) {
  faultData.push({
    id: '1',
    trainCode: `${i}`,
    // site: "南宁-那洪战",
    faultCode: '3203',
    faultName: 'TC2车SIV GDU反馈C相下管保护',
    faultLevel: '2',
    handle: {
      status: '未处理',
      color: 'red',
    },
    faultDec: '检测到逆变模块反馈C相下管故障',
    solution:
      '仅发生单管故障，无桥臂过流，无输入过流条件下自动复位2次，如复位后无效，扩展供电运行，可维持运营到终点站',
    time: moment(new Date().getTime()).format('YYYY-MM-DD HH:MM:SS'),
  });
}