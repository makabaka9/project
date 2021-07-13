export interface BasicGood {
  id: string;
  name?: string;
  barcode?: string;
  price?: string;
  num?: string | number;
  amount?: string | number;
}

export interface BasicProgress {
  key: string;
  time: string;
  rate: string;
  status: string;
  operator: string;
  cost: string;
}

export interface BasicProfileDataType {
  basicGoods: BasicGood[];
  basicProgress: BasicProgress[];
}
export const faultState = [
  {
      name: "Tc1", value: [
          {state: 0, doorCode: 2},
          {state: 0, doorCode: 4},
          {state: 0, doorCode: 6},
          {state: 0, doorCode: 8},
          {state: 0, doorCode: 1},
          {state: 0, doorCode: 3},
          {state: 0, doorCode: 5},
          {state: 0, doorCode: 7}]
  },
  {
      name: "Mp1", value: [
          {state: 0, doorCode: 2},
          {state: 0, doorCode: 4},
          {state: 0, doorCode: 6},
          {state: 0, doorCode: 8},
          {state: 0, doorCode: 1},
          {state: 0, doorCode: 3},
          {state: 0, doorCode: 5},
          {state: 0, doorCode: 7}]
  },
  {
      name: "M1", value: [
          {state: 0, doorCode: 2},
          {state: 0, doorCode: 4},
          {state: 0, doorCode: 6},
          {state: 0, doorCode: 8},
          {state: 0, doorCode: 1},
          {state: 0, doorCode: 3},
          {state: 0, doorCode: 5},
          {state: 0, doorCode: 7}]
  },
  {
      name: "M2", value: [
          {state: 0, doorCode: 2},
          {state: 0, doorCode: 4},
          {state: 0, doorCode: 6},
          {state: 0, doorCode: 8},
          {state: 0, doorCode: 1},
          {state: 0, doorCode: 3},
          {state: 0, doorCode: 5},
          {state: 0, doorCode: 7}]
  },
  {
      name: "Mp2", value: [
          {state: 0, doorCode: 2},
          {state: 0, doorCode: 4},
          {state: 0, doorCode: 6},
          {state: 0, doorCode: 8},
          {state: 0, doorCode: 1},
          {state: 0, doorCode: 3},
          {state: 0, doorCode: 5},
          {state: 0, doorCode: 7}]
  },
  {
      name: "Tc2", value: [
          {state: 0, doorCode: 2},
          {state: 0, doorCode: 4},
          {state: 0, doorCode: 6},
          {state: 0, doorCode: 8},
          {state: 0, doorCode: 1},
          {state: 0, doorCode: 3},
          {state: 0, doorCode: 5},
          {state: 0, doorCode: 7}]
  },
]

export const processFaultStatus = (data:any)=>{
  if(data!=={}& data.Tc1){
      return [
          {
              name: "Tc1", value: [
                  {state: data.Tc1.hasSeriousFault2?2:data.Tc1.hasMinorFault2?1:0, doorCode: 2},
                  {state: data.Tc1.hasSeriousFault4?2:data.Tc1.hasMinorFault4?1:0, doorCode: 4},
                  {state: data.Tc1.hasSeriousFault6?2:data.Tc1.hasMinorFault6?1:0, doorCode: 6},
                  {state: data.Tc1.hasSeriousFault8?2:data.Tc1.hasMinorFault8?1:0, doorCode: 8},
                  {state: data.Tc1.hasSeriousFault1?2:data.Tc1.hasMinorFault1?1:0, doorCode: 1},
                  {state: data.Tc1.hasSeriousFault3?2:data.Tc1.hasMinorFault3?1:0, doorCode: 3},
                  {state: data.Tc1.hasSeriousFault5?2:data.Tc1.hasMinorFault5?1:0, doorCode: 5},
                  {state: data.Tc1.hasSeriousFault7?2:data.Tc1.hasMinorFault7?1:0, doorCode: 7}]
          },
          {
              name: "Mp1", value: [
                  {state: data.Mp1.hasSeriousFault2?2:data.Tc1.hasMinorFault2?1:0, doorCode: 2},
                  {state: data.Mp1.hasSeriousFault4?2:data.Tc1.hasMinorFault4?1:0, doorCode: 4},
                  {state: data.Mp1.hasSeriousFault6?2:data.Tc1.hasMinorFault6?1:0, doorCode: 6},
                  {state: data.Mp1.hasSeriousFault8?2:data.Tc1.hasMinorFault8?1:0, doorCode: 8},
                  {state: data.Mp1.hasSeriousFault1?2:data.Tc1.hasMinorFault1?1:0, doorCode: 1},
                  {state: data.Mp1.hasSeriousFault3?2:data.Tc1.hasMinorFault3?1:0, doorCode: 3},
                  {state: data.Mp1.hasSeriousFault5?2:data.Tc1.hasMinorFault5?1:0, doorCode: 5},
                  {state: data.Mp1.hasSeriousFault7?2:data.Tc1.hasMinorFault7?1:0, doorCode: 7}]
          },
          {
              name: "M1", value: [
                  {state: data.M1.hasSeriousFault2?2:data.Tc1.hasMinorFault2?1:0, doorCode: 2},
                  {state: data.M1.hasSeriousFault4?2:data.Tc1.hasMinorFault4?1:0, doorCode: 4},
                  {state: data.M1.hasSeriousFault6?2:data.Tc1.hasMinorFault6?1:0, doorCode: 6},
                  {state: data.M1.hasSeriousFault8?2:data.Tc1.hasMinorFault8?1:0, doorCode: 8},
                  {state: data.M1.hasSeriousFault1?2:data.Tc1.hasMinorFault1?1:0, doorCode: 1},
                  {state: data.M1.hasSeriousFault3?2:data.Tc1.hasMinorFault3?1:0, doorCode: 3},
                  {state: data.M1.hasSeriousFault5?2:data.Tc1.hasMinorFault5?1:0, doorCode: 5},
                  {state: data.M1.hasSeriousFault7?2:data.Tc1.hasMinorFault7?1:0, doorCode: 7}]
          },
          {
              name: "M2", value: [
                  {state: data.M2.hasSeriousFault2?2:data.Tc1.hasMinorFault2?1:0, doorCode: 2},
                  {state: data.M2.hasSeriousFault4?2:data.Tc1.hasMinorFault4?1:0, doorCode: 4},
                  {state: data.M2.hasSeriousFault6?2:data.Tc1.hasMinorFault6?1:0, doorCode: 6},
                  {state: data.M2.hasSeriousFault8?2:data.Tc1.hasMinorFault8?1:0, doorCode: 8},
                  {state: data.M2.hasSeriousFault1?2:data.Tc1.hasMinorFault1?1:0, doorCode: 1},
                  {state: data.M2.hasSeriousFault3?2:data.Tc1.hasMinorFault3?1:0, doorCode: 3},
                  {state: data.M2.hasSeriousFault5?2:data.Tc1.hasMinorFault5?1:0, doorCode: 5},
                  {state: data.M2.hasSeriousFault7?2:data.Tc1.hasMinorFault7?1:0, doorCode: 7}]
          },
          {
              name: "Mp2", value: [
                  {state: data.Mp2.hasSeriousFault2?2:data.Tc1.hasMinorFault2?1:0, doorCode: 2},
                  {state: data.Mp2.hasSeriousFault4?2:data.Tc1.hasMinorFault4?1:0, doorCode: 4},
                  {state: data.Mp2.hasSeriousFault6?2:data.Tc1.hasMinorFault6?1:0, doorCode: 6},
                  {state: data.Mp2.hasSeriousFault8?2:data.Tc1.hasMinorFault8?1:0, doorCode: 8},
                  {state: data.Mp2.hasSeriousFault1?2:data.Tc1.hasMinorFault1?1:0, doorCode: 1},
                  {state: data.Mp2.hasSeriousFault3?2:data.Tc1.hasMinorFault3?1:0, doorCode: 3},
                  {state: data.Mp2.hasSeriousFault5?2:data.Tc1.hasMinorFault5?1:0, doorCode: 5},
                  {state: data.Mp2.hasSeriousFault7?2:data.Tc1.hasMinorFault7?1:0, doorCode: 7}]
          },
          {
              name: "Tc2", value: [
                  {state: data.Tc2.hasSeriousFault2?2:data.Tc1.hasMinorFault2?1:0, doorCode: 2},
                  {state: data.Tc2.hasSeriousFault4?2:data.Tc1.hasMinorFault4?1:0, doorCode: 4},
                  {state: data.Tc2.hasSeriousFault6?2:data.Tc1.hasMinorFault6?1:0, doorCode: 6},
                  {state: data.Tc2.hasSeriousFault8?2:data.Tc1.hasMinorFault8?1:0, doorCode: 8},
                  {state: data.Tc2.hasSeriousFault1?2:data.Tc1.hasMinorFault1?1:0, doorCode: 1},
                  {state: data.Tc2.hasSeriousFault3?2:data.Tc1.hasMinorFault3?1:0, doorCode: 3},
                  {state: data.Tc2.hasSeriousFault5?2:data.Tc1.hasMinorFault5?1:0, doorCode: 5},
                  {state: data.Tc2.hasSeriousFault7?2:data.Tc1.hasMinorFault7?1:0, doorCode: 7}]
          },
        ];
  }else{
      return faultState;
  }
}


const stateData = [
  // { type: "对位隔离", 1: "有效", 2: "有效", 3: "有效", 4: "有效", 5: "有效", 6: "有效", 7: "有效", 8: "有效" },
  {type: "门关闭", 1: 1, 2: 1, 3: 1, 4: 0, 5: 1, 6: 0, 7: 0, 8: 1},
  {type: "门完全打开", 1: 1, 2: 1, 3: 1, 4: 0, 5: 1, 6: 0, 7: 0, 8: 1},
  {type: "门紧急解锁", 1: 1, 2: 1, 3: 1, 4: 0, 5: 1, 6: 0, 7: 0, 8: 1},
  {type: "门隔离", 1: 1, 2: 1, 3: 1, 4: 0, 5: 1, 6: 0, 7: 0, 8: 1},
  {type: "门锁闭", 1: 1, 2: 1, 3: 1, 4: 0, 5: 1, 6: 0, 7: 0, 8: 1},
]

export const processDoorStatus=(data:any)=>{
  if(data!={}){
  return [
    // { type: "对位隔离", 1: "有效", 2: "有效", 3: "有效", 4: "有效", 5: "有效", 6: "有效", 7: "有效", 8: "有效" },
    {type: "门关闭", 1: data.close1, 2: data.close2, 3: data.close3, 4: data.close4, 5: data.close5, 6: data.close6, 7: data.close7, 8: data.close8},
    {type: "门完全打开", 1: data.open1, 2: data.open2, 3: data.open3, 4: data.open4, 5: data.open5, 6: data.open6, 7: data.open7, 8: data.open8},
    {type: "门紧急解锁", 1: data.emergencyUnlock1, 2: data.emergencyUnlock2, 3: data.emergencyUnlock3, 4: data.emergencyUnlock4, 5: data.emergencyUnlock5, 6: data.emergencyUnlock6, 7: data.emergencyUnlock7, 8: data.emergencyUnlock8},
    {type: "门隔离", 1: data.isolate1, 2: data.isolate2, 3: data.isolate3, 4: data.isolate4, 5: data.isolate5, 6: data.isolate6, 7: data.isolate7, 8: data.isolate8},
    {type: "门锁闭", 1: data.lock1, 2: data.lock2, 3: data.lock3, 4: data.lock4, 5: data.lock5, 6: data.lock6, 7: data.lock7, 8: data.lock8},
  ]}else{
    return stateDate;
  }
}

const stateData1 = [
  // { type: "对位隔离", 1: "有效", 2: "有效", 3: "有效", 4: "有效", 5: "有效", 6: "有效", 7: "有效", 8: "有效" },
  {type: "开关门计数（次）", 1: 5, 2: 5, 3: 8, 4: 6, 5: 5, 6: 4, 7: 5, 8: 12},
  {type: "门页位置(mm)", 1: 5, 2: 5, 3: 8, 4: 6, 5: 5, 6: 4, 7: 5, 8: 12},
  {type: "门页速度（mm/s）", 1: 5, 2: 5, 3: 8, 4: 6, 5: 5, 6: 4, 7: 5, 8: 12},
  {type: "门电机电流（A）", 1: 5, 2: 5, 3: 8, 4: 6, 5: 5, 6: 4, 7: 5, 8: 12},
]

export const processDoorStatusNumeral=(data:any)=>{
  if(data!={}){
  return [
    // { type: "对位隔离", 1: "有效", 2: "有效", 3: "有效", 4: "有效", 5: "有效", 6: "有效", 7: "有效", 8: "有效" },
    {type: "开关门计数（次）", 1: data.closeCount1, 2: data.closeCount2, 3: data.closeCount3, 4: data.closeCount4, 5: data.closeCount5, 6: data.closeCount6, 7: data.closeCount7, 8: data.closeCount8},
    {type: "门页位置(mm)", 1: data.position1, 2: data.position2, 3: data.position3, 4: data.position4, 5: data.position5, 6: data.position6, 7: data.position7, 8: data.position8},
    {type: "门页速度（mm/s）", 1: data.speed1, 2: data.speed2, 3: data.speed3, 4: data.speed4, 5: data.speed5, 6: data.speed6, 7: data.speed7, 8: data.speed8},
    {type: "门电机电流（A）", 1: data.electricity1, 2: data.electricity2, 3: data.electricity3, 4: data.electricity4, 5: data.electricity5, 6: data.electricity6, 7: data.electricity7, 8: data.electricity8},  ]
  }else{
    return stateDate1;
  }
}