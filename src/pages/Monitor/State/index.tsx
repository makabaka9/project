/* eslint-disable no-nested-ternary */
import {Avatar, Card, List, Tooltip, Radio, Tag, Descriptions, Badge, Select, Row, Col} from 'antd';
import TrainIcon from '@/assets/train.svg';
import TrainoutIcon from '@/assets/trainoutline.svg';
import React, {FC, useEffect, useState} from 'react';
import {connect, Dispatch, useModel} from 'umi';
import {routerRedux} from 'dva/router';
import numeral from 'numeral';
import {BasicProfileDataType} from './data.d';
import styles from './style.less';
import {StateType} from './model';
import {stateInformation} from './service';
import DriveIcon from '@/assets/驾驶.svg';
import {DashboardOutlined, EnvironmentOutlined, TeamOutlined} from '@ant-design/icons';

const {Option} = Select;

interface TrainsProps {
    dispatch: Dispatch;
    monitorAndState: StateType;
    loading: boolean;
}

export const State: FC<TrainsProps> = (props) => {
    const {
        dispatch,
        loading,
        monitorAndState,
    } = props;

    // const { listState } = monitorAndState;
    // 初始加载假数据
    let fakeList = [
        {
            trainCode: "501",
            trainWorkingCondition: 1,
            gridVoltage: null,
            speed: null,
            indexStation: null,
            totalLoad: null,
            intermediateCurrent: null,
            nextStation: null,
            operatingMileage: null,
            runningDirection: null,
            stateTime: null,
            status: 2
        },
        {
            trainCode: "502",
            trainWorkingCondition: 1,
            gridVoltage: null,
            speed: null,
            indexStation: null,
            totalLoad: null,
            intermediateCurrent: null,
            nextStation: null,
            operatingMileage: null,
            runningDirection: null,
            stateTime: null,
            status: 2
        },
        {
            trainCode: "503",
            trainWorkingCondition: 1,
            gridVoltage: null,
            speed: null,
            indexStation: null,
            totalLoad: null,
            intermediateCurrent: null,
            nextStation: null,
            operatingMileage: null,
            runningDirection: null,
            stateTime: null,
            status: 2
        },
        {
            trainCode: "504",
            trainWorkingCondition: 1,
            gridVoltage: null,
            speed: null,
            indexStation: null,
            totalLoad: null,
            intermediateCurrent: null,
            nextStation: null,
            operatingMileage: null,
            runningDirection: null,
            stateTime: null,
            status: 2
        },
        {
            trainCode: "505",
            trainWorkingCondition: 1,
            gridVoltage: null,
            speed: null,
            indexStation: null,
            totalLoad: null,
            intermediateCurrent: null,
            nextStation: null,
            operatingMileage: null,
            runningDirection: null,
            stateTime: null,
            status: 2
        },
        {
            trainCode: "506",
            trainWorkingCondition: 1,
            gridVoltage: null,
            speed: null,
            indexStation: null,
            totalLoad: null,
            intermediateCurrent: null,
            nextStation: null,
            operatingMileage: null,
            runningDirection: null,
            stateTime: null,
            status: 2
        },
        {
            trainCode: "507",
            trainWorkingCondition: 1,
            gridVoltage: null,
            speed: null,
            indexStation: null,
            totalLoad: null,
            intermediateCurrent: null,
            nextStation: null,
            operatingMileage: null,
            runningDirection: null,
            stateTime: null,
            status: 2
        },
        {
            trainCode: "508",
            trainWorkingCondition: 1,
            gridVoltage: null,
            speed: null,
            indexStation: null,
            totalLoad: null,
            intermediateCurrent: null,
            nextStation: null,
            operatingMileage: null,
            runningDirection: null,
            stateTime: null,
            status: 2
        },
        {
            trainCode: "509",
            trainWorkingCondition: 1,
            gridVoltage: null,
            speed: null,
            indexStation: null,
            totalLoad: null,
            intermediateCurrent: null,
            nextStation: null,
            operatingMileage: null,
            runningDirection: null,
            stateTime: null,
            status: 2
        },
        {
            trainCode: "510",
            trainWorkingCondition: 1,
            gridVoltage: null,
            speed: null,
            indexStation: null,
            totalLoad: null,
            intermediateCurrent: null,
            nextStation: null,
            operatingMileage: null,
            runningDirection: null,
            stateTime: null,
            status: 2
        },
        {
            trainCode: "511",
            trainWorkingCondition: 1,
            gridVoltage: null,
            speed: null,
            indexStation: null,
            totalLoad: null,
            intermediateCurrent: null,
            nextStation: null,
            operatingMileage: null,
            runningDirection: null,
            stateTime: null,
            status: 2
        },
        {
            trainCode: "512",
            trainWorkingCondition: 1,
            gridVoltage: null,
            speed: null,
            indexStation: null,
            totalLoad: null,
            intermediateCurrent: null,
            nextStation: null,
            operatingMileage: null,
            runningDirection: null,
            stateTime: null,
            status: 2
        },
        {
            trainCode: "513",
            trainWorkingCondition: 1,
            gridVoltage: null,
            speed: null,
            indexStation: null,
            totalLoad: null,
            intermediateCurrent: null,
            nextStation: null,
            operatingMileage: null,
            runningDirection: null,
            stateTime: null,
            status: 2
        },
        {
            trainCode: "514",
            trainWorkingCondition: 1,
            gridVoltage: null,
            speed: null,
            indexStation: null,
            totalLoad: null,
            intermediateCurrent: null,
            nextStation: null,
            operatingMileage: null,
            runningDirection: null,
            stateTime: null,
            status: 2
        },
        {
            trainCode: "515",
            trainWorkingCondition: 1,
            gridVoltage: null,
            speed: null,
            indexStation: null,
            totalLoad: null,
            intermediateCurrent: null,
            nextStation: null,
            operatingMileage: null,
            runningDirection: null,
            stateTime: null,
            status: 2
        },
        {
            trainCode: "516",
            trainWorkingCondition: 1,
            gridVoltage: null,
            speed: null,
            indexStation: null,
            totalLoad: null,
            intermediateCurrent: null,
            nextStation: null,
            operatingMileage: null,
            runningDirection: null,
            stateTime: null,
            status: 2
        },
        {
            trainCode: "517",
            trainWorkingCondition: 1,
            gridVoltage: null,
            speed: null,
            indexStation: null,
            totalLoad: null,
            intermediateCurrent: null,
            nextStation: null,
            operatingMileage: null,
            runningDirection: null,
            stateTime: null,
            status: 2
        },
        {
            trainCode: "518",
            trainWorkingCondition: 1,
            gridVoltage: null,
            speed: null,
            indexStation: null,
            totalLoad: null,
            intermediateCurrent: null,
            nextStation: null,
            operatingMileage: null,
            runningDirection: null,
            stateTime: null,
            status: 2
        },
        {
            trainCode: "519",
            trainWorkingCondition: 1,
            gridVoltage: null,
            speed: null,
            indexStation: null,
            totalLoad: null,
            intermediateCurrent: null,
            nextStation: null,
            operatingMileage: null,
            runningDirection: null,
            stateTime: null,
            status: 2
        },
        {
            trainCode: "520",
            trainWorkingCondition: 1,
            gridVoltage: null,
            speed: null,
            indexStation: null,
            totalLoad: null,
            intermediateCurrent: null,
            nextStation: null,
            operatingMileage: null,
            runningDirection: null,
            stateTime: null,
            status: 2
        },
        {
            trainCode: "521",
            trainWorkingCondition: 1,
            gridVoltage: null,
            speed: null,
            indexStation: null,
            totalLoad: null,
            intermediateCurrent: null,
            nextStation: null,
            operatingMileage: null,
            runningDirection: null,
            stateTime: null,
            status: 2
        },
        {
            trainCode: "522",
            trainWorkingCondition: 1,
            gridVoltage: null,
            speed: null,
            indexStation: null,
            totalLoad: null,
            intermediateCurrent: null,
            nextStation: null,
            operatingMileage: null,
            runningDirection: null,
            stateTime: null,
            status: 2
        },
        {
            trainCode: "523",
            trainWorkingCondition: 1,
            gridVoltage: null,
            speed: null,
            indexStation: null,
            totalLoad: null,
            intermediateCurrent: null,
            nextStation: null,
            operatingMileage: null,
            runningDirection: null,
            stateTime: null,
            status: 2
        },
        {
            trainCode: "524",
            trainWorkingCondition: 1,
            gridVoltage: null,
            speed: null,
            indexStation: null,
            totalLoad: null,
            intermediateCurrent: null,
            nextStation: null,
            operatingMileage: null,
            runningDirection: null,
            stateTime: null,
            status: 2
        },
    ];
    const [list, setList] = useState<Array<object>>(fakeList); // 选择全部


    const [trainWorkingCondition, setTrainWorkingCondition] = useState(-1);
    // var evtSource:EventSource = null;
    const { train, setTrain } = useModel<useTrainModel>('train');
    const [event, setEvent] = useState<any>()
    const openProfile = (event: { currentTarget: { id: any } }) => {
        setTrain(event.currentTarget.id);
        dispatch(routerRedux.push(`/Monitor/Trains1/${event.currentTarget.id}`));
    };

    useEffect(() => {
        // const response = stateInformation(trainWorkingCondition);
        // response.then((data) => {
        //   setList(data)
        // });


        // const url = `/api/monitor/state/event?trainWorkingCondition=${trainWorkingCondition}`;
        const url = `/api/monitor/state/event?trainWorkingCondition=-1`;
        const evtSource = new EventSource(url);
        if (evtSource !== null) {
            evtSource.onmessage = (message) => {
                const addData = addNewElement(list, JSON.parse(message.data));
                setList([...addData])
            }
        }
        setEvent(evtSource);
        return function cleanup() {
            if (evtSource !== undefined) {
                evtSource.close();
            }
        }
    }, []);

    function onChange(e: { target: { value: number } }) {
        setTrainWorkingCondition(e.target.value)
        // const dataList: any = []
        // // 全部
        // if (e.target.value === -1) {
        //   // fakeList.map((item) => {
        //   //   if (item.indexStation !== null) {
        //   //     dataList.push(item)
        //   //   }
        //   // })
        //   // setSubList(dataList)
        // }
        // // 正线
        // else if (e.target.value === 0) {
        //   fakeList.map((item) => {
        //     if (item.indexStation >= 1 && new Date() - new Date(item.stateTime) < 300000) {
        //       dataList.push(item)
        //     }
        //   })
        //   setSubList(dataList)
        // }
        // // 库内
        // else if (e.target.value === 1) {
        //   fakeList.map((item) => {
        //     if ((item.indexStation === null || item.indexStation === 0) && new Date() - new Date(item.stateTime) < 300000) {
        //       dataList.push(item)
        //     }
        //   })
        //   setSubList(dataList)
        // }
        // // 离线
        // else if (e.target.value === 2) {
        //   fakeList.map((item) => {
        //     // console.log('111', new Date() - new Date(item.stateTime))
        //     if ((new Date() - new Date(item.stateTime) >= 300000) || isNaN(new Date() - new Date(item.stateTime.replace(/-/g, '/')))) {
        //       // console.log('item',item)
        //       dataList.push(item)
        //     }
        //   })
        //   setSubList(dataList)
        // }
        // setTrainWorkingCondition(e.target.value);
        // const params = { trainWorkingCondition: e.target.value }
        // var subList = [];
        // const response = stateInformation(params);
        // response.then((data) => {
        //   setSubList(data)
        // });
        // event.close()
        // const url = "/api/monitor/state/event?trainWorkingCondition=" + `${e.target.value}`;
        // const evtSource = new EventSource(url);
        // if (evtSource !== null) {
        //   evtSource.onmessage = (message) => {
        //     const addData = addNewElement(subList, JSON.parse(message.data));
        //     setSubList(addData)
        //   }
        //   setEvent(evtSource);
        // }
    }

    // console.log('subList', subList)
    // 按照车号排序
    function compare(key: React.ReactText) {
        return function (value1: { [x: string]: any; }, value2: { [x: string]: any; }) {
            var val1 = value1[key];
            var val2 = value2[key];
            return val1 - val2;
        }
    }

    // 按照车号更新或增加数组
    function addNewElement(arr: Array<object>, newElement: Array<object>) {
        // var found = false;

        for (var i = 0; i < arr.length; i++) {
            let element = arr[i];
            if (element.trainCode === newElement.trainCode) {
                // found = true;
                // if(newElement.population === 0) {
                //     arr[i] = false;
                // } else {
                arr[i] = newElement;
                // }
            }
            // if else
            //正线
            if (element.indexStation >= 1 && new Date() - new Date(element.stateTime) < 300000) {
                arr[i].status = 0;
            }
            //库内
            else if ((element.indexStation === null || element.indexStation === 0) && new Date() - new Date(element.stateTime) < 300000) {
                arr[i].status = 1;
            }
            //离线
            else if ((new Date() - new Date(element.stateTime) >= 300000) || isNaN(new Date() - new Date(element.stateTime.replace(/-/g, '/')))) {
                arr[i].status = 2;
            }

        }
        // if (found === false) {
        //   arr.push(newElement);
        // }
        // removing elements
        // var newArr = [];
        // for (var i = 0; element = arr[i]; i++) {
        //   if (element !== false) newArr.push(element);
        // }
        // console.log('newArr',newArr)
        return arr;
    }

    // console.log('fakeList',fakeList.sort(compare('trainCode')))
    return (
        <div className={styles.filterCardList}
             style={{overflowX: 'hidden', overflowY: 'hidden',
            //   width: 1664, 
              height: 1000}}>
      <span style={{paddingBottom: 16}}>
        <Row>
          <Col span={12} style={{paddingBottom: 16}}>
            <span>列车状态：</span>
            <Radio.Group onChange={onChange} defaultValue={-1}>
              <Radio value={-1}>全部</Radio>
              <Radio value={0}>正线</Radio>
              <Radio value={1}>库内</Radio>
              <Radio value={2}>离线</Radio>
            </Radio.Group>
          </Col>
          <Col span={12}>
            {/* <div style={{ float: "right", paddingBottom: 16 }}>
              <span >
                列车模式：</span>
              <Select
                placeholder="请选择列车模式"
                //  label="请选择列车模式"
                //  defaultValue="lucy"
                style={{ width: 200 }}
              // onChange={handleChange}
              >
                <Option value={0}>EMU模式</Option>
                <Option value={1}>AM模式</Option>
                <Option value={2}>CM模式</Option>
                <Option value={3}>RM模式</Option>
                <Option value={4}>退行模式</Option>
                <Option value={5}>洗车模式</Option>
                <Option value={6}>救援模式</Option>
                <Option value={7}>ATO模式</Option>
                <Option value={8}>AR模式</Option>
                <Option value={9}>FAM模式</Option>
                <Option value={10}>CAM模式</Option>
                <Option value={11}>紧急牵引</Option>
              </Select>
            </div> */}
          </Col>
        </Row>
      </span>
            <List<BasicProfileDataType>
                rowKey="id"
                grid={{
                    gutter: 16,
                    column: 4,
                    xs: 1,
                    sm: 2,
                    md: 3,
                    lg: 4,
                    xl: 4,
                }}
                // loading={loading}
                // dataSource={list}
                // dataSource={trainWorkingCondition === -1 ? fakeList.sort(compare('trainCode')) : subList.sort(compare('trainCode')).filter}
                dataSource={
                    list.filter((item) => {
                        if (trainWorkingCondition === -1) {
                            return true;
                        } else {
                            return item.status === trainWorkingCondition
                        }
                    })}
                pagination={{
                    pageSize: 16,
                    // total,
                    // onChange: changePage,
                }}
                renderItem={(item) => (
                    // console.log('item',item),
                    <List.Item key={item.trainCode}>
                        {/* <Badge count={1}> */}
                        <Card
                            hoverable
                            bordered={false}
                            // style={{ backgroundColor: "rgb(47,84,235,0.2)", padding: 0 }}
                            style={{backgroundColor: item.indexStation === null ? 'rgb(47,84,235,0.2)' : 'rgb(9,109,217,0.6) '}}
                            id={item.trainCode}
                            onClick={openProfile}
                            title={<div>{item.indexStation === null ? <Avatar src={TrainoutIcon}/> :
                                <Avatar src={TrainIcon}/>}&nbsp;
                                {`${numeral(item.trainCode).format('0000')}`}
                                &emsp;
                                {/* <Tag color="#3b5999">
                    FAM模式</Tag> */}
                            </div>}
                            // {/* RD模式\RM模式\CM模式\AM模式\CAM模式\FAM模式\AR模式 */
                            extra={item.stateTime ? item.stateTime : '0000-00-00 00:00:00'}
                            // extra={
                            //   item.trainWorkingCondition === 0 ? <Tag color='warning'>上电至待命前 </Tag> :
                            //     item.trainWorkingCondition === 1 ? <Tag color='warning'>待命 </Tag> :
                            //       item.trainWorkingCondition === 2 ? <Tag color='success'>正线服务 </Tag> :
                            //         item.trainWorkingCondition === 3 ? <Tag color='warning'>清扫 </Tag> :
                            //           item.trainWorkingCondition === 4 ? <Tag color='error'>检修 </Tag> :
                            //             item.trainWorkingCondition === 5 ? <Tag color='warning'>洗车 </Tag> : null
                            // }
                            // actions={[
                            //   <Tooltip key="1">
                            //     <div style={{ paddingLeft: 5 }}>
                            //       更新时间：{item.stateTime ? item.stateTime : '0000-00-00 00:00:00'}
                            //     </div>
                            //   </Tooltip>,
                            // ]}
                        >
                            <Descriptions
                                bordered={false}
                                size="small"
                                column={2}
                                // style={{ paddingLeft: 10 }}
                            >
                                <Descriptions.Item label={<div>
                                    <TeamOutlined/>
                                    &nbsp;下一站</div>}>
                                    {item.indexStation === 1 ? '国凯大道站' :
                                        item.indexStation === 2 ? '那洪立交站' :
                                            item.indexStation === 3 ? '金凯路站' :
                                                item.indexStation === 4 ? '江南公园站' :
                                                    item.indexStation === 5 ? '周家坡站' :
                                                        item.indexStation === 6 ? '五一立交站' :
                                                            item.indexStation === 7 ? '新秀公园站' :
                                                                item.indexStation === 8 ? '广西大学站' :
                                                                    item.indexStation === 9 ? '秀灵路站' :
                                                                        item.indexStation === 10 ? '明秀路站' :
                                                                            item.indexStation === 11 ? '北湖南路站' :
                                                                                item.indexStation === 12 ? '虎邱站' :
                                                                                    item.indexStation === 13 ? '狮山公园站' :
                                                                                        item.indexStation === 14 ? '小鸡村站' :
                                                                                            item.indexStation === 15 ? '邕宾立交站' :
                                                                                                item.indexStation === 16 ? '降桥站' :
                                                                                                    item.indexStation === 17 ? '金桥客运站' : '--'}
                                </Descriptions.Item>
                                <Descriptions.Item label={<div><DashboardOutlined/>&nbsp;速度</div>}>
                                    {item.runningDirection === null ? "--" : item.runningDirection === 1 ? "上行" : "下行"}{item.speed}km/h
                                </Descriptions.Item>
                                <Descriptions.Item label={<div><TeamOutlined/>&nbsp;载客量
                                </div>}>  {item.totalLoad === null ? "--" : (item.totalLoad-209787.4) / 60 / 6 <= 48 ? "AW0" :
                                    (item.totalLoad-209787.4) / 60 / 6 <= 310 ? "AW1" :
                                    (item.totalLoad-209787.4) / 60 / 6 <= 410 ? "AW2" : "AW3"}
                                </Descriptions.Item>
                                <Descriptions.Item label={<div><EnvironmentOutlined/>&nbsp;总公里数</div>}>
                                    {item.operatingMileage === null ? "--" : item.operatingMileage}KM
                                </Descriptions.Item>
                                <Descriptions.Item label={<div><Avatar size={15}>V</Avatar>&nbsp;网压</div>}>
                                    {item.gridVoltage === null ? "--" : item.gridVoltage}V
                                </Descriptions.Item>
                                <Descriptions.Item label={<div><Avatar size={15}>A</Avatar>&nbsp;网流 </div>}>
                                    {item.intermediateCurrent === null ? "--" : item.intermediateCurrent}A
                                </Descriptions.Item>
                            </Descriptions>
                        </Card>
                        {/* </Badge> */}
                    </List.Item>

                )}
            />
        </div>
    );
};

export default connect(
    ({
         monitorAndState,
         loading,
     }: {
        monitorAndState: StateType;
        loading: { models: { [key: string]: boolean } };
    }) => ({
        monitorAndState,
        loading: loading.models.monitorAndState,
    }),
)(State);
