import {Card, Row, Col, Tag, Table, Radio, Divider, Space, Modal, Typography, DatePicker} from 'antd';
import React, {useEffect, useState} from 'react';
import {connect, Dispatch, useModel} from 'umi';
import moment from 'moment';
import {BasicProfileDataType,processFaultStatus,processDoorStatus,processDoorStatusNumeral} from './data.d';
import styles from './style.less';
import stateGreenIcon from '@/assets/stateGreen.svg';
import stateGrayIcon from '@/assets/stateGray.svg';
import WarnTable from './components/WarnTable';
import DoorMap from './components/DoorMap';
import ClassStatistics from './components/ClassStatistics';
import LineCodeAndTrainCodeQuery from '@/components/LineCodeAndTrainCodeQuery';
import TrainMap from './components/Train';
import ExportExcel from '@/components/exportExcel';
import Pie from './components/Pie';
import {useTrainModel} from '../../../models/train'


const {RangePicker} = DatePicker;

interface TrainProps {
    loading: boolean;
    dispatch: Dispatch<any>;
    SubsystemAndDoor: BasicProfileDataType;
}

const Door: React.FC<TrainProps> = (props) => {
    const {match, loading, dispatch, SubsystemAndDoor} = props;
    const { train, setTrain } = useModel<useTrainModel>('train');
    const {faultInfo,faultStatus,doorStatus} = SubsystemAndDoor;
    const [modalVisible, setModalVisible] = useState(false);
    const [coachCode, setCoachCode] = useState("Tc1")
    const [trainCode, setTrainCode] = useState(match.params.id === ":id" ? train : match.params.id);

    const openModal = (event: any) => {
        setModalVisible(true);
    };

    const handleOk = (event: any) => {
        setModalVisible(false);
    };
    useEffect(() => {
        dispatch({
            type: "SubsystemAndDoor/fetchFaultStatus",
            payload: {
                trainCode,
            }
        });
        dispatch({
            type: "SubsystemAndDoor/fetchFaultInfo",
            payload: {
                trainCode,
            }
        });
    }, [trainCode])

    useEffect(() => {
        dispatch({
            type: "SubsystemAndDoor/fetchDoorStatus",
            payload: {
                trainCode,
                coachCode
            }
        });
    }, [trainCode,coachCode])
    const clickQuery = (event: { trainCode: string }) => {
        setTrainCode(event);
        setTrain(event);
    }
    const onChangecoachCode =(event:any) =>{
        setCoachCode(event.target.value);
    }
    const stateColumns = [
        {
            key: 'type',
            dataIndex: 'type',
            title: '????????????',

        },
        {
            key: '1',
            dataIndex: '1',
            title: '1',
            valueEnum: {
                0: {status: 'Error'},
                1: {status: 'Processing'},
            },
        },
        {
            key: '2',
            dataIndex: '2',
            title: '2',
        },
        {
            key: '3',
            dataIndex: '3',
            title: '3',
        },
        {
            key: '4',
            dataIndex: '4',
            title: '4',
        },
        {
            key: '5',
            dataIndex: '5',
            title: '5',
        },
        {
            key: '6',
            dataIndex: '6',
            title: '6',
        },
        {
            key: '7',
            dataIndex: '7',
            title: '7',
        },
        {
            key: '8',
            dataIndex: '8',
            title: '8',
        },
    ];
    const stateData1 = [
        // { type: "????????????", 1: "??????", 2: "??????", 3: "??????", 4: "??????", 5: "??????", 6: "??????", 7: "??????", 8: "??????" },
        {type: "????????????????????????", 1: 5, 2: 5, 3: 8, 4: 6, 5: 5, 6: 4, 7: 5, 8: 12},
        {type: "????????????(mm)", 1: 5, 2: 5, 3: 8, 4: 6, 5: 5, 6: 4, 7: 5, 8: 12},
        {type: "???????????????mm/s???", 1: 5, 2: 5, 3: 8, 4: 6, 5: 5, 6: 4, 7: 5, 8: 12},
        {type: "??????????????????A???", 1: 5, 2: 5, 3: 8, 4: 6, 5: 5, 6: 4, 7: 5, 8: 12},
    ]


 
    const searchData: any[] = [];
    for (let i = 1; i < 10; i += 1) {
        searchData.push({
            trainCode: `050${i}`,
            faultTime: moment(new Date().getTime()).format('YYYY-MM-DD'),
            fault: '????????????',
            status: '?????????????????????',
            advise: '??????',
        });
    }

    const monthrunData = [
        {
            type: '??????????????????',
            value: 27,
        },
        {
            type: '??????????????????',
            value: 25,
        },
    ];
    const DoorMapData = [
        {
            type: '???????????????????????????',
            value: 27,
        },
        {
            type: '??????????????????????????????',
            value: 25,
        },
        {
            type: '??????????????????????????????',
            value: 18,
        },
        {
            type: '????????????????????????',
            value: 18,
        },
        {
            type: '???????????????????????????',
            value: 18,
        },
        {
            type: '??????????????????????????????',
            value: 18,
        },
    ];
    const subhealthyData = [
        {
            type: '?????????????????????',
            value: 27,
        },
        {
            type: '????????????????????????',
            value: 18,
        },
        {
            type: '??????????????????',
            value: 18,
        },
        {
            type: '???????????????????????????',
            value: 25,
        },
    ];
    const faultData: any[] = [];
    for (let i = 1; i < 10; i += 1) {
        faultData.push({
            id: '1',
            trainCode: `${i}`,
            // site: "??????-?????????",
            site: '???????????????120???',
            faultCode: '5124',
            faultName: 'TC1???2????????????????????????????????????',
            faultLevel: '2',
            handle: {
                status: '?????????',
                color: 'red',
            },
            // option: {
            faultDec: '?????????????????????(????????????????????????????????????????????????????????????????????????????????????',
            solution: "??????????????????????????????EDCU????????????????????????",
            // },
            time: moment(new Date().getTime()).format('YYYY-MM-DD HH:MM:SS'),
        });
    }
    const faultColumns = [
        {
            title: '??????',
            dataIndex: 'id',
            key: 'index',
            align: 'center',
            width: '5%',
        },
        {
            title: '????????????',
            dataIndex: 'faultCode',
            key: 'faultCode',
            align: 'center',
            width: '5%',
        },
        {
            title: '????????????',
            dataIndex: 'faultName',
            key: 'faultName',
            align: 'center',
            width: '20%',
        },
        {
            title: '????????????',
            dataIndex: 'faultLevel',
            key: 'faultLevel',
            width: '5%',
            align: 'center',
        },
        {
            title: '??????',
            dataIndex: 'status',
            key: 'status',
            width: '5%',
            align: 'center',
            render: (_, row: any) => (
                <Space>
                    {row.status === 1 ? <Tag color="red">?????????</Tag> : "?????????"}
                </Space>
            ),
        },
        {
            title: '????????????',
            dataIndex: 'faultDesc',
            key: 'faultDesc',
            width: '15%',
            align: 'center',
        },
        {
            title: '??????????????????',
            dataIndex: 'faultSolution',
            key: 'faultSolution',
            width: '25%',
            align: 'center',
        },
        {
            title: '????????????',
            dataIndex: 'startTime',
            key: 'startTime',
            width: '10%',
            align: 'center',
            render: (_, row: any) => (
                moment(row.startTime).format('YYYY-MM-DD HH:MM:SS')
            ),
            sorter: (
                a: {
                    count: number;
                },
                b: {
                    count: number;
                },
            ) => a.count - b.count,
            // className: styles.alignRight,
        },
    ];
    const faultTime = [
        {
            title: '??????',
            dataIndex: 'id',
            key: 'id',
            width: '5%',
            align: 'center',
        },
        {
            title: '????????????',
            dataIndex: 'faultName',
            key: 'faultName',
            width: '15%',
            align: 'center',
        },
        {
            title: '????????????',
            dataIndex: 'faultCode',
            key: 'faultCode',
            width: '5%',
            align: 'center',
        },
        {
            title: '????????????',
            dataIndex: 'faultLevel',
            key: 'faultLevel',
            width: '5%',
            align: 'center',
        },
        {
            title: '????????????',
            dataIndex: 'number',
            key: 'number',
            width: '5%',
            align: 'center',
        },
    ];
    return (
        <div>
            <div>
                <Row gutter={24}>
                    <Col xl={18} lg={24} md={24} sm={24} xs={24} style={{marginBottom: -8, marginTop: -8}}>
                        <LineCodeAndTrainCodeQuery defaultTrainCode={trainCode} onSubmit={clickQuery}/>
                    </Col>
                    <Col xl={6} lg={24} md={24} sm={24} xs={24}>
            <span style={{float: 'right'}}>
              {/* <Radio.Group name="date" defaultValue={0}>
                <Radio value={0}>????????????</Radio>
                <Radio value={1}>????????????</Radio>
                <Radio value={2}>????????????</Radio>
                <Radio value={3}>??????</Radio>
              </Radio.Group> */}
                <RangePicker
                    // showTime={{ format: 'HH:mm' }}
                    format="YYYY-MM-DD"
                    // onChange={onChangeTime}
                    // onOk={onChangeTime}
                />
            </span>
                    </Col>
                </Row>
            </div>
            <Card
                bordered={false}
                bodyStyle={{paddingTop: 16, paddingBottom: 0,}}
                className={styles.title}
                title="??????????????????"
                extra={
                    <div>
                        <Tag color="#a0d911">??????</Tag>
                        <Tag color="#faad14">????????????</Tag>
                        <Tag color="#f5222d">????????????</Tag>
                    </div>

                }
            >
                <DoorMap data={processFaultStatus(faultStatus)}
                    // style={{ padding: -8 }}
                />
                {/* <TrainMap /> */}

            </Card>
            <Card bordered={false}
                  bodyStyle={{paddingTop: 16, paddingBottom: 0,}}
                  className={styles.title}
                  extra={
                      <div>
                          <Radio.Group
                              onChange={onChangecoachCode}
                              name="DCU" defaultValue="Tc1">
                              <Radio value="Tc1">Tc1</Radio>
                              <Radio value="Mp1">Mp1</Radio>
                              <Radio value="M1">M1</Radio>
                              <Radio value="M2">M2</Radio>
                              <Radio value="Mp2">Mp2</Radio>
                              <Radio value="Tc2">Tc2</Radio>
                          </Radio.Group>
                      </div>

                  }>
                <Row gutter={16}>
                    <Col xl={12} lg={12} sm={24} xs={24}>
                        <Table columns={stateColumns} dataSource={processDoorStatus(doorStatus).map(item => ({
        type: item.type,
        1: <img src={item[1] ? stateGreenIcon
            : stateGrayIcon} className={styles.iconState}/>,
        2: <img src={item[2] ? stateGreenIcon
            : stateGrayIcon} className={styles.iconState}/>,
        3: <img src={item[3] ? stateGreenIcon
            : stateGrayIcon} className={styles.iconState}/>,
        4: <img src={item[4] ? stateGreenIcon
            : stateGrayIcon} className={styles.iconState}/>,
        5: <img src={item[5] ? stateGreenIcon
            : stateGrayIcon} className={styles.iconState}/>,
        6: <img src={item[6] ? stateGreenIcon
            : stateGrayIcon} className={styles.iconState}/>,
        7: <img src={item[7] ? stateGreenIcon
            : stateGrayIcon} className={styles.iconState}/>,
        8: <img src={item[8] ? stateGreenIcon
            : stateGrayIcon} className={styles.iconState}/>,

    }))} pagination={false} size="small"
                        />
                    </Col>
                    <Col xl={12} lg={12} sm={24} xs={24}>
                        <Table columns={stateColumns} dataSource={processDoorStatusNumeral(doorStatus)} pagination={false} size="small"/>
                    </Col>
                </Row>
            </Card>
            <Card title="????????????" bordered={false}
                  className={styles.title}
                  extra={
                      <ExportExcel
                          fileName='???????????????'
                          sheetData={faultInfo.pageList}
                          sheetName='sheet'
                          sheetHeader={['??????', '????????????', '????????????', '????????????', '????????????', '??????', '????????????', '???????????????????????????']}
                          sheetFilter={[]}
                      />
                  }>
                <WarnTable loading={loading} data={faultInfo.pageList} columns={faultColumns}/>
            </Card>
            {/*<Row gutter={16}>*/}
            {/*  /!* <Col xl={24} lg={24} sm={24} xs={24}>*/}
            {/*    <Card title="????????????" bordered={false} className={styles.title} >*/}
            {/*      <ClassStatistics*/}
            {/*        borderWidth={2}*/}
            {/*        height={160}*/}
            {/*        monthrunData={monthrunData}*/}
            {/*        classStatisticData={DoorMapData}*/}
            {/*        subhealthyData={subhealthyData}*/}
            {/*      />*/}
            {/*    </Card>*/}
            {/*  </Col> *!/*/}
            {/*  <Col xl={8} lg={12} sm={24} xs={24}>*/}
            {/*    <Card*/}
            {/*      title="????????????"*/}
            {/*      bordered={false}*/}
            {/*      className={styles.title}*/}
            {/*    >*/}
            {/*      /!* <span> <Typography.Text>????????????</Typography.Text></span> *!/*/}
            {/*      <Pie*/}
            {/*        // animate={false}*/}
            {/*        borderWidth={2}*/}
            {/*        height={70}*/}
            {/*      // data={faultPie}*/}
            {/*      />*/}
            {/*    </Card>*/}
            {/*  </Col>*/}
            {/*  <Col xl={16} lg={12} sm={24} xs={24}>*/}
            {/*    <Card bordered={false} title="??????????????????" className={styles.title}*/}
            {/*    >*/}

            {/*      <WarnTable*/}
            {/*        columns={faultTime}*/}
            {/*      />*/}
            {/*    </Card>*/}
            {/*  </Col>*/}
            {/*</Row>*/}


        </div>
    );
};

export default connect(
    ({
         SubsystemAndDoor,
         loading,
     }: {
        SubsystemAndDoor: BasicProfileDataType;
        loading: {
            effects: { [key: string]: boolean };
        };
    }) => ({
        SubsystemAndDoor,
        loading: loading.effects['SubsystemAndDoor/fetchBasic'],
    }),
)(Door);
