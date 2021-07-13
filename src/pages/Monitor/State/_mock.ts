
import { BasicProfileDataType } from './data.d';
import moment from 'moment';

const listState: Array<BasicProfileDataType> = [];
const fakeCode = ['511', '509', '513'];
const nowDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
for (let i = 0; i < fakeCode.length; i += 1) {
  listState.push({
    trainCode: fakeCode[i],
    currentStation: 14,
    nextStation: ' ',
    stateTime: nowDate,
    state: 0,
    speedPerHour: 30,
    faultNum: 0,
    direction: '上行'
  });
};


export default {
  'GET  /api/monitor/state': listState,
};