import { Badge, Card, Col, Row, Tag, Typography } from 'antd';
// import moment from 'moment';
import { connect, Dispatch } from 'umi';
import React, { FC, useEffect, useState } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { Radar } from './components/Charts';
import TrainTable from './components/TrainTable';
import moment from 'moment';
import { random } from 'lodash';
import { StateType } from './model';
import styles from './style.less'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { stateInformation } from './service';


// const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK

interface GlobalProps {
  dispatch: Dispatch;
  faultAndGlobal: StateType;
  loading: boolean;
  dataList?: Array<Object>;
  // targetList?: Array<Object>;
  subFaultList?: Array<Object>;
  stateList?: Array<Object>;
}

export const Global: FC<GlobalProps> = (props) => {
  const { dispatch, faultAndGlobal } = props;

  // const [count, setCount] = useState(7894.14);
  const [stateList, setStateList] = useState<Array<object>>([])
  // useInterval(() => {
  //   setCount(count + random(0, 10))
  // }, 3000);

  const { dataList, subFaultList } = faultAndGlobal;
  const columns: any[] = [
    {
      title: '序号',
      dataIndex: 'index',
      width: '5%',
      align: 'left',
      render: (text, record, index) => <Tag color="#3779fd">{`${index + 1}`}</Tag>,
    },
    {
      title: '车号',
      dataIndex: 'trainCode',
      key: 'trainCode',
      width: '5%',
      align: 'left',
    },
    // {
    //   title: '车节',
    //   dataIndex: 'trainFestival',
    //   key: 'trainFestival',
    //   width: '5%',
    //   align: 'left',
    // },
    {
      title: '系统',
      dataIndex: 'faultType',
      key: 'faultType',
      width: '5%',
      align: 'left',
    },
    // {
    //   title: '当前位置',
    //   dataIndex: 'currentLocation',
    //   key: 'currentLocation',
    //   width: '10%',
    //   align: 'center',
    // },
    {
      title: '故障内容',
      dataIndex: 'faultName',
      key: 'faultName',
      width: '20%',
      align: 'center',
    },
    {
      title: '故障等级',
      dataIndex: 'trainFaultLevel',
      width: '10%',
      align: 'center',
      render: (val?: number) => {
        const tempVal =
          val === 1 ? <Badge color="#f50" text="一级" /> :
            val === 2 ? <Badge color="gold" text="二级" /> :
              val === 3 ? <Badge color="#87d068" text="三级" /> :
                val === 4 ? <Badge color="#108ee9" text="四级" /> : null;
        return <span>{tempVal}</span>;
      },
    },
    {
      title: '故障时间',
      dataIndex: 'happenTime',
      key: 'faultTime',
      width: '15%',
      align: 'center',
    },
    {
      title: '持续时间',
      dataIndex: 'happenTime',
      key: 'duration',
      width: '15%',
      align: 'center',
      render: (val?: String) => {
        return moment(val).fromNow();
      }
    },
    // {
    //   title: '故障描述和解决方案',
    //   dataIndex: 'option',
    //   key: 'option',
    //   width: '14%',
    //   align: 'center',
    //   render: (_, row: any) => (
    //     <>
    //       <a onClick={openModal}>查看详情</a>
    //       <Modal
    //         title="故障描述和解决方案"
    //         visible={modalVisible}
    //         onOk={handleOk}
    //         closable={false}
    //         // cancelText=" "
    //         onCancel={handleOk}
    //       >
    //         <p
    //         // style={{ borderWidth: "1px", borderStyle: "silid", borderColor: "#fff"}}
    //         >报警描述：&nbsp;{row.option.faultDescription}</p>
    //         <p style={{ borderWidth: "1px" }}>解决方案：&nbsp;{row.option.faultSolution}</p>
    //       </Modal>
    //       <Divider type="vertical" />
    //     </>
    //   ),
    // },
  ];

  useEffect(() => {
    dispatch({
      type: 'faultAndGlobal/fetch',
    });
    dispatch({
      type: 'faultAndGlobal/fetchSysList',
    });
    dispatch({
      type: 'faultAndGlobal/fetchFaultRate',
    });
    dispatch({
      type: 'faultAndGlobal/fetchFaultstatistics',
      // payload: {},
    });
    dispatch({
      type: 'faultAndGlobal/fetchFaultSubsystem',
      // payload: {},
    });
    dispatch({
      type: 'faultAndGlobal/fetchFaultSubsystem',
      // payload: {},
    });
    dispatch({
      type: 'faultAndGlobal/fetchReliability',
      // payload: {},
    });
    // dispatch({
    //   type: 'faultAndGlobal/fetchState',
    //   payload: {
    //     trainWorkingCondition: 2
    //   },
    // });
    // const evtSource = localStorage.getItem('access_token') ?
    //   new EventSource("/api/monitor/fault/event") : null;
    // if (evtSource !== null) {
    //   evtSource.onmessage = (message) => {
    //     dispatch({
    //       type: 'faultAndGlobal/fetch',
    //     });
    //   }
    // }
    //
    // const params = { trainWorkingCondition: 2 }
    // const response = stateInformation(params);
    // response.then((data) => {
    //   setStateList(data)
    // });
    // const StateEvtSource = localStorage.getItem('access_token') ?
    //   new EventSource("/api/monitor/state/event?trainWorkingCondition=2") : null;
    // if (StateEvtSource !== null) {
    //   StateEvtSource.onmessage = (message) => {
    //     const addData = addNewElement(stateList, JSON.parse(message.data));
    //     setStateList(addData)
    //     // dispatch({
    //     //   type: 'faultAndGlobal/fetchState',
    //     //   payload: {
    //     //     trainWorkingCondition: 2
    //     //   },
    //     // });
    //   }
    // }
  }, []);

  // 按照车号更新或增加数组
  function addNewElement(arr: Array<object>, newElement: Array<object>) {
    var found = false;
    for (var i = 0; i < arr.length; i++) {
      var element = arr[i];
      if (element.trainCode == newElement.trainCode) {
        found = true;
        // if(newElement.population === 0) {
        //     arr[i] = false;
        // } else {
        arr[i] = newElement;
        // }            
      }
    }
    if (found === false) {
      arr.push(newElement);
    }
    // removing elements
    var newArr = [];
    for (var i = 0; element = arr[i]; i++) {
      if (element !== false) newArr.push(element);
    }
    return newArr;
  }

  // useEffect(() => {
  //   dispatch({
  //     type: 'faultAndGlobal/fetchCurrentDir',
  //     payload: {},
  //   });
  // }, []);

  const nowDate = moment(new Date()).format('YYYY-MM-DD HH:MM:SS')
  // 故障监控假数据
  // const faultData = [
  //   {
  //     trainCode: '0501',
  //     system: '制动',
  //     currentLocation: '华山路-惠河路',
  //     faultContent: 'TC2车BCU架1	制动不缓解故障',
  //     faultLevel: 2,
  //     faultTime: nowDate,
  //     duration: '3分06秒',
  //     option: {
  //       faultDescription: 'EP1902阀无制动力请求但机械制动未缓解',
  //       faultSolution: '司机或者调度中心应评估故障的本质并采取必要纠正措施。',
  //     }
  //   },
  //   {
  //     trainCode: '0502',
  //     system: '牵引',
  //     currentLocation: '明秀路-北湖南路',
  //     faultContent: 'MP1车DCU	方向指令错误',
  //     faultLevel: 3,
  //     faultTime: nowDate,
  //     duration: '2分34秒',
  //     option: {
  //       faultDescription: '检测到方向指令向前和向后同时有效',
  //       faultSolution: '故障消失后自动复位检查列车线及司控器。',
  //     }
  //   },
  //   {
  //     trainCode: '0503',
  //     system: '制动',
  //     currentLocation: '明秀路-北湖南路',
  //     faultContent: 'TC2车BCU架1	制动不缓解故障',
  //     faultLevel: 4,
  //     faultTime: nowDate,
  //     duration: '1分03秒',
  //     option: {
  //       faultDescription: 'EP1902阀无制动力请求但机械制动未缓解。',
  //       faultSolution: '司机或者调度中心应评估故障的本质并采取必要纠正措施。',
  //     }
  //   }, {
  //     trainCode: '0504',
  //     system: '牵引',
  //     currentLocation: '那洪-壮锦大道',
  //     faultContent: 'MP1车DCU	高速断路器卡合',
  //     faultLevel: 3,
  //     faultTime: nowDate,
  //     duration: '3分04秒',
  //     option: {
  //       faultDescription: '发出主断合命令一定时间后检测主断状态为断开',
  //       faultSolution: '可手动复位或DCU检测到故障累积不足2次时自动复位；',
  //     }
  //   }, {
  //     trainCode: '0505',
  //     system: '电机',
  //     currentLocation: '明秀路-北湖南路',
  //     faultContent: '电机温度传感器4故障',
  //     faultLevel: 2,
  //     faultTime: nowDate,
  //     duration: '1分34秒',
  //     option: {
  //       faultDescription: '检测到电机4温度大于220℃或小于-50℃',
  //       faultSolution: '故障消失后自动复位检查相应温度传感器及其接线',
  //     }
  //   }, {
  //     trainCode: '0506',
  //     system: 'PIS',
  //     currentLocation: '明秀路-北湖南路',
  //     faultContent: 'MP1车DCU	高速断路器10分钟内闭合超过3次',
  //     faultLevel: 2,
  //     faultTime: nowDate,
  //     duration: '4分12秒',
  //     option: {
  //       faultDescription: '检测到高速断路器10分钟内闭合超过3次',
  //       faultSolution: '可手动复位或延时后DCU自动复位',
  //     }
  //   }, {
  //     trainCode: '0507',
  //     system: 'PIS',
  //     currentLocation: '明秀路-北湖南路',
  //     faultContent: 'MP1车DCU	制动电阻风机接触器卡分',
  //     faultLevel: 4,
  //     faultTime: nowDate,
  //     duration: '2分51秒',
  //     option: {
  //       faultDescription: '检测到制动电阻风机接触器卡在分位',
  //       faultSolution: '故障消失后自动复位检查制动电阻风机接触器及其辅助触点、接触器控制回路及状态反馈线。',
  //     }
  //   },
  //   {
  //     trainCode: '0504',
  //     system: '牵引',
  //     currentLocation: '那洪-壮锦大道',
  //     faultContent: 'MP1车DCU	高速断路器卡合',
  //     faultLevel: 3,
  //     faultTime: nowDate,
  //     duration: '2分04秒',
  //     option: {
  //       faultDescription: '发出主断合命令一定时间后检测主断状态为断开',
  //       faultSolution: '可手动复位或DCU检测到故障累积不足2次时自动复位；',
  //     }
  //   }, {
  //     trainCode: '0505',
  //     system: '电机',
  //     currentLocation: '明秀路-北湖南路',
  //     faultContent: '电机温度传感器4故障',
  //     faultLevel: 2,
  //     faultTime: nowDate,
  //     duration: '2分34秒',
  //     option: {
  //       faultDescription: '检测到电机4温度大于220℃或小于-50℃',
  //       faultSolution: '故障消失后自动复位检查相应温度传感器及其接线',
  //     }
  //   },
  // ]
  // const faultMonitoring: any[] = [];
  // const i = random(0, 7);
  // const j = i + 1;
  // faultMonitoring.push(
  //   {
  //     trainCode: faultData[i].trainCode,
  //     system: faultData[i].system,
  //     currentLocation: faultData[i].currentLocation,
  //     faultContent: faultData[i].faultContent,
  //     faultLevel: faultData[i].faultLevel,
  //     faultTime: faultData[i].faultTime,
  //     duration: faultData[i].duration,
  //     option: {
  //       faultDescription: faultData[i].option.faultDescription,
  //       faultSolution: faultData[i].option.faultSolution,
  //     }
  //   },
  //   {
  //     trainCode: faultData[j].trainCode,
  //     system: faultData[j].system,
  //     currentLocation: faultData[j].currentLocation,
  //     faultContent: faultData[j].faultContent,
  //     faultLevel: faultData[j].faultLevel,
  //     faultTime: faultData[j].faultTime,
  //     duration: faultData[j].duration,
  //     option: {
  //       faultDescription: faultData[j].option.faultDescription,
  //       faultSolution: faultData[j].option.faultSolution,
  //     }
  //   },
  //   {
  //     trainCode: faultData[j].trainCode,
  //     system: faultData[j].system,
  //     currentLocation: faultData[j].currentLocation,
  //     faultContent: faultData[j].faultContent,
  //     faultLevel: faultData[j].faultLevel,
  //     faultTime: faultData[j].faultTime,
  //     duration: faultData[j].duration,
  //     option: {
  //       faultDescription: faultData[j].option.faultDescription,
  //       faultSolution: faultData[j].option.faultSolution,
  //     }
  //   },
  // );

  return (
    <GridContent>
      <React.Fragment>
        <div style={{ marginTop: 8 }}>
          <Row gutter={8}>
            <Col xl={16} lg={24} sm={24} xs={24} >
              <Card bordered={false}
                bodyStyle={{ padding: 0 }}
                className={styles.card}
                size="small"
                title={<div><Typography.Text strong style={{ fontSize: 20 }}>实时故障监控 </Typography.Text>
                </div>}
                style={{ "width": "100%", height: 270 }}
                extra={
                  <div><ExclamationCircleOutlined style={{ fontSize: '20px', color: "#f52e5a" }} />
                    &nbsp; <Typography.Text strong style={{ fontSize: 20, color: "#f52e5a" }}>

                      {dataList?.length} </Typography.Text>
                  </div>
                }>
                <TrainTable
                  bodyStyle={{ marginTop: -16, }}
                  searchData={dataList}
                  columns={columns}
                />
              </Card>
            </Col>
            <Col xl={8} lg={24} md={24} sm={24} xs={24}>
              <Card
                className={styles.card}
                size="small"
                title={<div><Typography.Text strong style={{ fontSize: 20 }}>子系统故障分布 </Typography.Text>
                </div>}
                extra={<div><Typography.Text strong style={{ fontSize: 12 }}> 统计类型：子系统 </Typography.Text>
                  <br /> <Typography.Text strong style={{ fontSize: 12 }}> 统计单位：个 </Typography.Text>
                </div>}
                style={{ marginBottom: 8 }} bordered={false}>
                <Radar
                  height={185}
                  // data={subFaultList?.length === 0 ? faultDistribution : subFaultList}
                  data={subFaultList}
                />
              </Card>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    </GridContent>
  );
};

export default connect(
  ({
    faultAndGlobal,
    loading,
  }: {
    faultAndGlobal: StateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    faultAndGlobal,
    loading: loading.models.faultAndGlobal,
  }),
)(Global);
