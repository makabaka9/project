
const list: Array<any> = [];
const fakeCode = ['503', '504', '504', '506', '507', '508', '509', '510', '514', '517', '519', '520'];

for (let i = 0; i < fakeCode.length; i += 1) {
  list.push({
    trainCode: fakeCode[i],
    faultType: "DCU",
    faultNum: Math.ceil(Math.random()*10)
  });
};

export default {
  'GET  /api/monitor/fault/grouped': list,
};