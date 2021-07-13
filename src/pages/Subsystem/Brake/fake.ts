const faultData3: any[] = [];
for (let i = 1; i < 10; i += 1) {
  faultData.push({
    id: '1',
    trainCode: `${i}`,
    // site: "南宁-那洪战",
    faultCode: '4203',
    faultName: 'M2车BCU架1 轻微故障',
    faultLevel: '2',
    handle: {
      status: '未处理',
      color: 'red',
    },
    faultDec: '本转向架的网关阀子系统需要维护，但是性能没有降低。',
    solution: '无需马上采取措施，待回库后处理。',
    time: moment(new Date().getTime()).format('YYYY-MM-DD HH:MM:SS'),
  });
}