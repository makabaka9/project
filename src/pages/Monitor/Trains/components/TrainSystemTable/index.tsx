/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-nested-ternary */
import { Tabs, Table } from 'antd';
import React, { useState, useEffect } from 'react';
import doorGreenIcon from '@/assets/doorGreen.svg';
import doorRedIcon from '@/assets/doorRed.svg';
// import doorYellowIcon from '@/assets/doorYellow.svg';
import { BellFilled, ConsoleSqlOutlined, ControlOutlined, FireOutlined, PartitionOutlined, PlayCircleOutlined, UserOutlined, WalletOutlined } from '@ant-design/icons';
import styles from '../../style.less'
import { subsystemDataType } from '../../data'
import { queryOperationStatus, querytrainImportantStatus, querytrainAxleStatus, querytrainFireStatus, querytrainAdosStatus, querytrainHavcStatus, queryBrakeStatus, queryTractionStatus, queryAuxiliaryStatus } from '../../service';
import useInterval from '@/components/useInterval';


const { TabPane } = Tabs;
interface TrainSystemTableProps {
  subsystemData?: subsystemDataType;
  columns?: Array<any>;
  trainCode: string;
  // trainImportantList: any
}

const TrainSystemTable: React.FC<TrainSystemTableProps> = (props, state) => {
  const { trainCode, } = props;

  const [subsystemData, setSubsystemData] = useState([]);
  const [timer, setTimer] = useState();
  const [tabValue, setTabValue] = useState("keyParams");
  const columns = [
    {
      title: '数据名称',
      dataIndex: 'name',
      key: 'name',
      // width: 100,
      align: 'left',
    },
    {
      title: 'Tc1',
      dataIndex: 'tc1',
      key: 'tc1',
      // width: 100,
      align: 'center',
    },
    {
      title: 'Mp1',
      dataIndex: 'mp1',
      key: 'mp1',
      // width: 100,
      align: 'center',
    },
    {
      title: 'M1',
      dataIndex: 'm1',
      key: 'm1',
      // width: 100,
      align: 'center',
    },
    {
      title: 'M2',
      dataIndex: 'm2',
      key: 'm2',
      // width: 100,
      align: 'center',
    },
    {
      title: 'Mp2',
      dataIndex: 'mp2',
      key: 'mp2',
      // width: 100,
      align: 'center',
    },
    {
      title: 'Tc2',
      dataIndex: 'tc2',
      key: 'tc2',
      // width: 100,
      align: 'center',
    },
  ];

  // 重要参数数据处理
  const important = (data: any) => {
    const array = [
      {
        name: '载客量',
        tc1: <div> <UserOutlined style={{ color: '#52c41a', fontSize: 16 }} /> <br />{(data.Tc1?.loadCapacity * 0.01).toFixed(1)}吨</div>,
        mp1: <div> <UserOutlined style={{ color: '#52c41a', fontSize: 16 }} /> <br />{(data.Mp1?.loadCapacity * 0.01).toFixed(1)}吨</div>,
        m1: <div> <UserOutlined style={{ color: '#52c41a', fontSize: 16 }} /> <br />{(data.M1?.loadCapacity * 0.01).toFixed(1)}吨</div>,
        m2: <div> <UserOutlined style={{ color: '#52c41a', fontSize: 16 }} /> <br />{(data.M2?.loadCapacity * 0.01).toFixed(1)}吨</div>,
        mp2: <div> <UserOutlined style={{ color: '#52c41a', fontSize: 16 }} /> <br />{(data.Mp2?.loadCapacity * 0.01).toFixed(1)}吨</div>,
        tc2: <div> <UserOutlined style={{ color: '#52c41a', fontSize: 16 }} /> <br />{(data.Tc2?.loadCapacity * 0.01).toFixed(1)}吨</div>
      },
      {
        name: '牵引状态',
        // tc1: data.Tc1?.tractionStatus === 1 ? <ControlOutlined style={{ color: '#52c41a', fontSize: 16 }} /> : data.Tc1?.tractionStatus === 0 ? <ControlOutlined style={{ fontSize: 16 }} /> : '--',
        mp1: data.Mp1?.tractionStatus === 1 ? <ControlOutlined style={{ color: '#52c41a', fontSize: 16 }} /> : data.Mp1?.tractionStatus === 0 ? <ControlOutlined style={{ fontSize: 16 }} /> : '--',
        m1: data.M1?.tractionStatus === 1 ? <ControlOutlined style={{ color: '#52c41a', fontSize: 16 }} /> : data.M1?.tractionStatus === 0 ? <ControlOutlined style={{ fontSize: 16 }} /> : '--',
        m2: data.M2?.tractionStatus === 1 ? <ControlOutlined style={{ color: '#52c41a', fontSize: 16 }} /> : data.M2?.tractionStatus === 0 ? <ControlOutlined style={{ fontSize: 16 }} /> : '--',
        mp2: data.Mp2?.tractionStatus === 1 ? <ControlOutlined style={{ color: '#52c41a', fontSize: 16 }} /> : data.Mp2?.tractionStatus === 0 ? <ControlOutlined style={{ fontSize: 16 }} /> : '--',
        // tc2: data.Tc2?.tractionStatus === 1 ? <ControlOutlined style={{ color: '#52c41a', fontSize: 16 }} /> : data.Tc2?.tractionStatus === 0 ? <ControlOutlined style={{ fontSize: 16 }} /> : '--',
      },
      {
        name: '制动状态',
        // tc1: data.Tc1?.brakingStatus === 1 ? <PlayCircleOutlined style={{ color: '#52c41a', fontSize: 16 }} /> : data.Tc1?.brakingStatus === 0 ? <PlayCircleOutlined style={{ fontSize: 16 }} /> : '--',
        mp1: data.Mp1?.brakingStatus === 1 ? <PlayCircleOutlined style={{ color: '#52c41a', fontSize: 16 }} /> : data.Mp1?.brakingStatus === 0 ? <PlayCircleOutlined style={{ fontSize: 16 }} /> : '--',
        m1: data.M1?.brakingStatus === 1 ? <PlayCircleOutlined style={{ color: '#52c41a', fontSize: 16 }} /> : data.M1?.brakingStatus === 0 ? <PlayCircleOutlined style={{ fontSize: 16 }} /> : '--',
        m2: data.M2?.brakingStatus === 1 ? <PlayCircleOutlined style={{ color: '#52c41a', fontSize: 16 }} /> : data.M2?.brakingStatus === 0 ? <PlayCircleOutlined style={{ fontSize: 16 }} /> : '--',
        mp2: data.Mp2?.brakingStatus === 1 ? <PlayCircleOutlined style={{ color: '#52c41a', fontSize: 16 }} /> : data.Mp2?.brakingStatus === 0 ? <PlayCircleOutlined style={{ fontSize: 16 }} /> : '--',
        // tc2: data.Tc2?.brakingStatus === 1 ? <PlayCircleOutlined style={{ color: '#52c41a', fontSize: 16 }} /> : data.Tc2?.brakingStatus === 0 ? <PlayCircleOutlined style={{ fontSize: 16 }} /> : '--',
      },
      {
        name: '门状态',
        tc1: <div>
          {data.Tc1?.doorClosed2 === 1 ? <img src={doorGreenIcon} style={{ width: 16, marginRight: 10 }} /> : <img src={doorRedIcon} style={{ width: 16, marginRight: 10 }} />}
          {data.Tc1?.doorClosed4 === 1 ? <img src={doorGreenIcon} style={{ width: 16, marginRight: 10 }} /> : <img src={doorRedIcon} style={{ width: 16, marginRight: 10 }} />}
          {data.Tc1?.doorClosed6 === 1 ? <img src={doorGreenIcon} style={{ width: 16, marginRight: 10 }} /> : <img src={doorRedIcon} style={{ width: 16, marginRight: 10 }} />}
          {data.Tc1?.doorClosed8 === 1 ? <img src={doorGreenIcon} style={{ width: 16 }} /> : <img src={doorRedIcon} style={{ width: 16 }} />} <br />
          {data.Tc1?.doorClosed1 === 1 ? <img src={doorGreenIcon} style={{ width: 16, marginRight: 10 }} /> : <img src={doorRedIcon} style={{ width: 16, marginRight: 10 }} />}
          {data.Tc1?.doorClosed3 === 1 ? <img src={doorGreenIcon} style={{ width: 16, marginRight: 10 }} /> : <img src={doorRedIcon} style={{ width: 16, marginRight: 10 }} />}
          {data.Tc1?.doorClosed5 === 1 ? <img src={doorGreenIcon} style={{ width: 16, marginRight: 10 }} /> : <img src={doorRedIcon} style={{ width: 16, marginRight: 10 }} />}
          {data.Tc1?.doorClosed7 === 1 ? <img src={doorGreenIcon} style={{ width: 16 }} /> : <img src={doorRedIcon} style={{ width: 16 }} />}
        </div>,
        mp1: <div>
          {data.Mp1?.doorClosed2 === 1 ? <img src={doorGreenIcon} style={{ width: 16, marginRight: 10 }} /> : <img src={doorRedIcon} style={{ width: 16, marginRight: 10 }} />}
          {data.Mp1?.doorClosed4 === 1 ? <img src={doorGreenIcon} style={{ width: 16, marginRight: 10 }} /> : <img src={doorRedIcon} style={{ width: 16, marginRight: 10 }} />}
          {data.Mp1?.doorClosed6 === 1 ? <img src={doorGreenIcon} style={{ width: 16, marginRight: 10 }} /> : <img src={doorRedIcon} style={{ width: 16, marginRight: 10 }} />}
          {data.Mp1?.doorClosed8 === 1 ? <img src={doorGreenIcon} style={{ width: 16 }} /> : <img src={doorRedIcon} style={{ width: 16 }} />} <br />
          {data.Mp1?.doorClosed1 === 1 ? <img src={doorGreenIcon} style={{ width: 16, marginRight: 10 }} /> : <img src={doorRedIcon} style={{ width: 16, marginRight: 10 }} />}
          {data.Mp1?.doorClosed3 === 1 ? <img src={doorGreenIcon} style={{ width: 16, marginRight: 10 }} /> : <img src={doorRedIcon} style={{ width: 16, marginRight: 10 }} />}
          {data.Mp1?.doorClosed5 === 1 ? <img src={doorGreenIcon} style={{ width: 16, marginRight: 10 }} /> : <img src={doorRedIcon} style={{ width: 16, marginRight: 10 }} />}
          {data.Mp1?.doorClosed7 === 1 ? <img src={doorGreenIcon} style={{ width: 16 }} /> : <img src={doorRedIcon} style={{ width: 16 }} />}
        </div>,
        m1: <div>
          {data.M1?.doorClosed2 === 1 ? <img src={doorGreenIcon} style={{ width: 16, marginRight: 10 }} /> : <img src={doorRedIcon} style={{ width: 16, marginRight: 10 }} />}
          {data.M1?.doorClosed4 === 1 ? <img src={doorGreenIcon} style={{ width: 16, marginRight: 10 }} /> : <img src={doorRedIcon} style={{ width: 16, marginRight: 10 }} />}
          {data.M1?.doorClosed6 === 1 ? <img src={doorGreenIcon} style={{ width: 16, marginRight: 10 }} /> : <img src={doorRedIcon} style={{ width: 16, marginRight: 10 }} />}
          {data.M1?.doorClosed8 === 1 ? <img src={doorGreenIcon} style={{ width: 16 }} /> : <img src={doorRedIcon} style={{ width: 16 }} />} <br />
          {data.M1?.doorClosed1 === 1 ? <img src={doorGreenIcon} style={{ width: 16, marginRight: 10 }} /> : <img src={doorRedIcon} style={{ width: 16, marginRight: 10 }} />}
          {data.M1?.doorClosed3 === 1 ? <img src={doorGreenIcon} style={{ width: 16, marginRight: 10 }} /> : <img src={doorRedIcon} style={{ width: 16, marginRight: 10 }} />}
          {data.M1?.doorClosed5 === 1 ? <img src={doorGreenIcon} style={{ width: 16, marginRight: 10 }} /> : <img src={doorRedIcon} style={{ width: 16, marginRight: 10 }} />}
          {data.M1?.doorClosed7 === 1 ? <img src={doorGreenIcon} style={{ width: 16 }} /> : <img src={doorRedIcon} style={{ width: 16 }} />}
        </div>,
        m2: <div>
          {data.M2?.doorClosed7 === 1 ? <img src={doorGreenIcon} style={{ width: 16, marginRight: 10 }} /> : <img src={doorRedIcon} style={{ width: 16, marginRight: 10 }} />}
          {data.M2?.doorClosed5 === 1 ? <img src={doorGreenIcon} style={{ width: 16, marginRight: 10 }} /> : <img src={doorRedIcon} style={{ width: 16, marginRight: 10 }} />}
          {data.M2?.doorClosed3 === 1 ? <img src={doorGreenIcon} style={{ width: 16, marginRight: 10 }} /> : <img src={doorRedIcon} style={{ width: 16, marginRight: 10 }} />}
          {data.M2?.doorClosed1 === 1 ? <img src={doorGreenIcon} style={{ width: 16 }} /> : <img src={doorRedIcon} style={{ width: 16 }} />} <br />
          {data.M2?.doorClosed8 === 1 ? <img src={doorGreenIcon} style={{ width: 16, marginRight: 10 }} /> : <img src={doorRedIcon} style={{ width: 16, marginRight: 10 }} />}
          {data.M2?.doorClosed6 === 1 ? <img src={doorGreenIcon} style={{ width: 16, marginRight: 10 }} /> : <img src={doorRedIcon} style={{ width: 16, marginRight: 10 }} />}
          {data.M2?.doorClosed4 === 1 ? <img src={doorGreenIcon} style={{ width: 16, marginRight: 10 }} /> : <img src={doorRedIcon} style={{ width: 16, marginRight: 10 }} />}
          {data.M2?.doorClosed2 === 1 ? <img src={doorGreenIcon} style={{ width: 16 }} /> : <img src={doorRedIcon} style={{ width: 16 }} />}
        </div>,
        mp2: <div>
          {data.Mp2?.doorClosed7 === 1 ? <img src={doorGreenIcon} style={{ width: 16, marginRight: 10 }} /> : <img src={doorRedIcon} style={{ width: 16, marginRight: 10 }} />}
          {data.Mp2?.doorClosed5 === 1 ? <img src={doorGreenIcon} style={{ width: 16, marginRight: 10 }} /> : <img src={doorRedIcon} style={{ width: 16, marginRight: 10 }} />}
          {data.Mp2?.doorClosed3 === 1 ? <img src={doorGreenIcon} style={{ width: 16, marginRight: 10 }} /> : <img src={doorRedIcon} style={{ width: 16, marginRight: 10 }} />}
          {data.Mp2?.doorClosed1 === 1 ? <img src={doorGreenIcon} style={{ width: 16 }} /> : <img src={doorRedIcon} style={{ width: 16 }} />} <br />
          {data.Mp2?.doorClosed8 === 1 ? <img src={doorGreenIcon} style={{ width: 16, marginRight: 10 }} /> : <img src={doorRedIcon} style={{ width: 16, marginRight: 10 }} />}
          {data.Mp2?.doorClosed6 === 1 ? <img src={doorGreenIcon} style={{ width: 16, marginRight: 10 }} /> : <img src={doorRedIcon} style={{ width: 16, marginRight: 10 }} />}
          {data.Mp2?.doorClosed4 === 1 ? <img src={doorGreenIcon} style={{ width: 16, marginRight: 10 }} /> : <img src={doorRedIcon} style={{ width: 16, marginRight: 10 }} />}
          {data.Mp2?.doorClosed2 === 1 ? <img src={doorGreenIcon} style={{ width: 16 }} /> : <img src={doorRedIcon} style={{ width: 16 }} />}
        </div>,
        tc2: <div>
          {data.Tc2?.doorClosed7 === 1 ? <img src={doorGreenIcon} style={{ width: 16, marginRight: 10 }} /> : <img src={doorRedIcon} style={{ width: 16, marginRight: 10 }} />}
          {data.Tc2?.doorClosed5 === 1 ? <img src={doorGreenIcon} style={{ width: 16, marginRight: 10 }} /> : <img src={doorRedIcon} style={{ width: 16, marginRight: 10 }} />}
          {data.Tc2?.doorClosed3 === 1 ? <img src={doorGreenIcon} style={{ width: 16, marginRight: 10 }} /> : <img src={doorRedIcon} style={{ width: 16, marginRight: 10 }} />}
          {data.Tc2?.doorClosed1 === 1 ? <img src={doorGreenIcon} style={{ width: 16 }} /> : <img src={doorRedIcon} style={{ width: 16 }} />} <br />
          {data.Tc2?.doorClosed8 === 1 ? <img src={doorGreenIcon} style={{ width: 16, marginRight: 10 }} /> : <img src={doorRedIcon} style={{ width: 16, marginRight: 10 }} />}
          {data.Tc2?.doorClosed6 === 1 ? <img src={doorGreenIcon} style={{ width: 16, marginRight: 10 }} /> : <img src={doorRedIcon} style={{ width: 16, marginRight: 10 }} />}
          {data.Tc2?.doorClosed4 === 1 ? <img src={doorGreenIcon} style={{ width: 16, marginRight: 10 }} /> : <img src={doorRedIcon} style={{ width: 16, marginRight: 10 }} />}
          {data.Tc2?.doorClosed2 === 1 ? <img src={doorGreenIcon} style={{ width: 16 }} /> : <img src={doorRedIcon} style={{ width: 16 }} />}
        </div>,
      },
      {
        name: '空调状态',
        tc1: data.Tc1?.airConditionerClosed === 1 ? <WalletOutlined style={{ color: '#52c41a', fontSize: 16 }} /> : data.Tc1?.brakingStatus === 0 ? <WalletOutlined style={{ fontSize: 16 }} /> : '--',
        mp1: data.Mp1?.airConditionerClosed === 1 ? <WalletOutlined style={{ color: '#52c41a', fontSize: 16 }} /> : data.Mp1?.brakingStatus === 0 ? <WalletOutlined style={{ fontSize: 16 }} /> : '--',
        m1: data.M1?.airConditionerClosed === 1 ? <WalletOutlined style={{ color: '#52c41a', fontSize: 16 }} /> : data.M1?.brakingStatus === 0 ? <WalletOutlined style={{ fontSize: 16 }} /> : '--',
        m2: data.M2?.airConditionerClosed === 1 ? <WalletOutlined style={{ color: '#52c41a', fontSize: 16 }} /> : data.M2?.brakingStatus === 0 ? <WalletOutlined style={{ fontSize: 16 }} /> : '--',
        mp2: data.Mp2?.airConditionerClosed === 1 ? <WalletOutlined style={{ color: '#52c41a', fontSize: 16 }} /> : data.Mp2?.brakingStatus === 0 ? <WalletOutlined style={{ fontSize: 16 }} /> : '--',
        tc2: data.Tc2?.airConditionerClosed === 1 ? <WalletOutlined style={{ color: '#52c41a', fontSize: 16 }} /> : data.Tc2?.brakingStatus === 0 ? <WalletOutlined style={{ fontSize: 16 }} /> : '--',
      },
      {
        name: '火警状态',
        tc1: <div>
          {data.Tc1?.fireStatus1 === 1 ? <FireOutlined style={{ color: '#52c41a', fontSize: 16 }} /> : <FireOutlined style={{ fontSize: 16 }} />}
          {data.Tc1?.fireStatus2 === 1 ? <FireOutlined style={{ color: '#52c41a', fontSize: 16 }} /> : <FireOutlined style={{ fontSize: 16 }} />}
          {data.Tc1?.fireStatus3 === 1 ? <FireOutlined style={{ color: '#52c41a', fontSize: 16 }} /> : <FireOutlined style={{ fontSize: 16 }} />}
          {data.Tc1?.fireStatus4 === 1 ? <FireOutlined style={{ color: '#52c41a', fontSize: 16 }} /> : <FireOutlined style={{ fontSize: 16 }} />}
          {data.Tc1?.fireStatus5 === 1 ? <FireOutlined style={{ color: '#52c41a', fontSize: 16 }} /> : <FireOutlined style={{ fontSize: 16 }} />}
          {data.Tc1?.fireStatus6 === 1 ? <FireOutlined style={{ color: '#52c41a', fontSize: 16 }} /> : <FireOutlined style={{ fontSize: 16 }} />}
        </div>,
        mp1: <div>
          {data.Mp1?.fireStatus1 === 1 ? <FireOutlined style={{ color: '#52c41a', fontSize: 16 }} /> : <FireOutlined style={{ fontSize: 16 }} />}
          {data.Mp1?.fireStatus2 === 1 ? <FireOutlined style={{ color: '#52c41a', fontSize: 16 }} /> : <FireOutlined style={{ fontSize: 16 }} />}
          {data.Mp1?.fireStatus3 === 1 ? <FireOutlined style={{ color: '#52c41a', fontSize: 16 }} /> : <FireOutlined style={{ fontSize: 16 }} />}
          {data.Mp1?.fireStatus4 === 1 ? <FireOutlined style={{ color: '#52c41a', fontSize: 16 }} /> : <FireOutlined style={{ fontSize: 16 }} />}
          {data.Mp1?.fireStatus5 === 1 ? <FireOutlined style={{ color: '#52c41a', fontSize: 16 }} /> : <FireOutlined style={{ fontSize: 16 }} />}
          {data.Mp1?.fireStatus6 === 1 ? <FireOutlined style={{ color: '#52c41a', fontSize: 16 }} /> : <FireOutlined style={{ fontSize: 16 }} />}
        </div>,
        m1: <div>
          {data.M1?.fireStatus1 === 1 ? <FireOutlined style={{ color: '#52c41a', fontSize: 16 }} /> : <FireOutlined style={{ fontSize: 16 }} />}
          {data.M1?.fireStatus2 === 1 ? <FireOutlined style={{ color: '#52c41a', fontSize: 16 }} /> : <FireOutlined style={{ fontSize: 16 }} />}
          {data.M1?.fireStatus3 === 1 ? <FireOutlined style={{ color: '#52c41a', fontSize: 16 }} /> : <FireOutlined style={{ fontSize: 16 }} />}
          {data.M1?.fireStatus4 === 1 ? <FireOutlined style={{ color: '#52c41a', fontSize: 16 }} /> : <FireOutlined style={{ fontSize: 16 }} />}
          {data.M1?.fireStatus5 === 1 ? <FireOutlined style={{ color: '#52c41a', fontSize: 16 }} /> : <FireOutlined style={{ fontSize: 16 }} />}
          {data.M1?.fireStatus6 === 1 ? <FireOutlined style={{ color: '#52c41a', fontSize: 16 }} /> : <FireOutlined style={{ fontSize: 16 }} />}
        </div>,
        m2: <div>
          {data.M2?.fireStatus1 === 1 ? <FireOutlined style={{ color: '#52c41a', fontSize: 16 }} /> : <FireOutlined style={{ fontSize: 16 }} />}
          {data.M2?.fireStatus2 === 1 ? <FireOutlined style={{ color: '#52c41a', fontSize: 16 }} /> : <FireOutlined style={{ fontSize: 16 }} />}
          {data.M2?.fireStatus3 === 1 ? <FireOutlined style={{ color: '#52c41a', fontSize: 16 }} /> : <FireOutlined style={{ fontSize: 16 }} />}
          {data.M2?.fireStatus4 === 1 ? <FireOutlined style={{ color: '#52c41a', fontSize: 16 }} /> : <FireOutlined style={{ fontSize: 16 }} />}
          {data.M2?.fireStatus5 === 1 ? <FireOutlined style={{ color: '#52c41a', fontSize: 16 }} /> : <FireOutlined style={{ fontSize: 16 }} />}
          {data.M2?.fireStatus6 === 1 ? <FireOutlined style={{ color: '#52c41a', fontSize: 16 }} /> : <FireOutlined style={{ fontSize: 16 }} />}
        </div>,
        mp2: <div>
          {data.Mp2?.fireStatus1 === 1 ? <FireOutlined style={{ color: '#52c41a', fontSize: 16 }} /> : <FireOutlined style={{ fontSize: 16 }} />}
          {data.Mp2?.fireStatus2 === 1 ? <FireOutlined style={{ color: '#52c41a', fontSize: 16 }} /> : <FireOutlined style={{ fontSize: 16 }} />}
          {data.Mp2?.fireStatus3 === 1 ? <FireOutlined style={{ color: '#52c41a', fontSize: 16 }} /> : <FireOutlined style={{ fontSize: 16 }} />}
          {data.Mp2?.fireStatus4 === 1 ? <FireOutlined style={{ color: '#52c41a', fontSize: 16 }} /> : <FireOutlined style={{ fontSize: 16 }} />}
          {data.Mp2?.fireStatus5 === 1 ? <FireOutlined style={{ color: '#52c41a', fontSize: 16 }} /> : <FireOutlined style={{ fontSize: 16 }} />}
          {data.Mp2?.fireStatus6 === 1 ? <FireOutlined style={{ color: '#52c41a', fontSize: 16 }} /> : <FireOutlined style={{ fontSize: 16 }} />}
        </div>,
        tc2: <div>
          {data.Tc2?.fireStatus1 === 1 ? <FireOutlined style={{ color: '#52c41a', fontSize: 16 }} /> : <FireOutlined style={{ fontSize: 16 }} />}
          {data.Tc2?.fireStatus2 === 1 ? <FireOutlined style={{ color: '#52c41a', fontSize: 16 }} /> : <FireOutlined style={{ fontSize: 16 }} />}
          {data.Tc2?.fireStatus3 === 1 ? <FireOutlined style={{ color: '#52c41a', fontSize: 16 }} /> : <FireOutlined style={{ fontSize: 16 }} />}
          {data.Tc2?.fireStatus4 === 1 ? <FireOutlined style={{ color: '#52c41a', fontSize: 16 }} /> : <FireOutlined style={{ fontSize: 16 }} />}
          {data.Tc2?.fireStatus5 === 1 ? <FireOutlined style={{ color: '#52c41a', fontSize: 16 }} /> : <FireOutlined style={{ fontSize: 16 }} />}
          {data.Tc2?.fireStatus6 === 1 ? <FireOutlined style={{ color: '#52c41a', fontSize: 16 }} /> : <FireOutlined style={{ fontSize: 16 }} />}
        </div>,
      },
      {
        name: '灭火器状态',
        tc1: <div>
          {data.Tc1?.fireExtinguisherStatus1 === 1 ? <BellFilled style={{ color: '#52c41a', fontSize: 16 }} /> : <BellFilled style={{ fontSize: 16 }} />}
          {data.Tc1?.fireExtinguisherStatus2 === 1 ? <BellFilled style={{ color: '#52c41a', fontSize: 16 }} /> : <BellFilled style={{ fontSize: 16 }} />}
          {/* {data.Tc1?.fireExtinguisherStatus3 === 1 ? <BellFilled style={{ color: '#52c41a', fontSize: 16 }} /> : <BellFilled style={{ fontSize: 16 }} />} */}
          {/* {data.Tc1?.fireExtinguisherStatus4 === 1 ? <BellFilled style={{ color: '#52c41a', fontSize: 16 }} /> : <BellFilled style={{ fontSize: 16 }} />} */}
        </div>,
        mp1: <div>
          {data.Mp1?.fireExtinguisherStatus1 === 1 ? <BellFilled style={{ color: '#52c41a', fontSize: 16 }} /> : <BellFilled style={{ fontSize: 16 }} />}
          {data.Mp1?.fireExtinguisherStatus2 === 1 ? <BellFilled style={{ color: '#52c41a', fontSize: 16 }} /> : <BellFilled style={{ fontSize: 16 }} />}
          {/* {data.Mp1?.fireExtinguisherStatus3 === 1 ? <BellFilled style={{ color: '#52c41a', fontSize: 16 }} /> : <BellFilled style={{ fontSize: 16 }} />}
          {data.Mp1?.fireExtinguisherStatus4 === 1 ? <BellFilled style={{ color: '#52c41a', fontSize: 16 }} /> : <BellFilled style={{ fontSize: 16 }} />} */}
        </div>,
        m1: <div>
          {data.M1?.fireExtinguisherStatus1 === 1 ? <BellFilled style={{ color: '#52c41a', fontSize: 16 }} /> : <BellFilled style={{ fontSize: 16 }} />}
          {data.M1?.fireExtinguisherStatus2 === 1 ? <BellFilled style={{ color: '#52c41a', fontSize: 16 }} /> : <BellFilled style={{ fontSize: 16 }} />}
          {/* {data.M1?.fireExtinguisherStatus3 === 1 ? <BellFilled style={{ color: '#52c41a', fontSize: 16 }} /> : <BellFilled style={{ fontSize: 16 }} />}
          {data.M1?.fireExtinguisherStatus4 === 1 ? <BellFilled style={{ color: '#52c41a', fontSize: 16 }} /> : <BellFilled style={{ fontSize: 16 }} />} */}
        </div>,
        m2: <div>
          {data.M2?.fireExtinguisherStatus1 === 1 ? <BellFilled style={{ color: '#52c41a', fontSize: 16 }} /> : <BellFilled style={{ fontSize: 16 }} />}
          {data.M2?.fireExtinguisherStatus2 === 1 ? <BellFilled style={{ color: '#52c41a', fontSize: 16 }} /> : <BellFilled style={{ fontSize: 16 }} />}
          {/* {data.M2?.fireExtinguisherStatus3 === 1 ? <BellFilled style={{ color: '#52c41a', fontSize: 16 }} /> : <BellFilled style={{ fontSize: 16 }} />}
          {data.M2?.fireExtinguisherStatus4 === 1 ? <BellFilled style={{ color: '#52c41a', fontSize: 16 }} /> : <BellFilled style={{ fontSize: 16 }} />} */}
        </div>,
        mp2: <div>
          {data.Mp2?.fireExtinguisherStatus1 === 1 ? <BellFilled style={{ color: '#52c41a', fontSize: 16 }} /> : <BellFilled style={{ fontSize: 16 }} />}
          {data.Mp2?.fireExtinguisherStatus2 === 1 ? <BellFilled style={{ color: '#52c41a', fontSize: 16 }} /> : <BellFilled style={{ fontSize: 16 }} />}
          {/* {data.Mp2?.fireExtinguisherStatus3 === 1 ? <BellFilled style={{ color: '#52c41a', fontSize: 16 }} /> : <BellFilled style={{ fontSize: 16 }} />}
          {data.Mp2?.fireExtinguisherStatus4 === 1 ? <BellFilled style={{ color: '#52c41a', fontSize: 16 }} /> : <BellFilled style={{ fontSize: 16 }} />} */}
        </div>,
        tc2: <div>
          {data.Tc2?.fireExtinguisherStatus1 === 1 ? <BellFilled style={{ color: '#52c41a', fontSize: 16 }} /> : <BellFilled style={{ fontSize: 16 }} />}
          {data.Tc2?.fireExtinguisherStatus2 === 1 ? <BellFilled style={{ color: '#52c41a', fontSize: 16 }} /> : <BellFilled style={{ fontSize: 16 }} />}
          {/* {data.Tc2?.fireExtinguisherStatus3 === 1 ? <BellFilled style={{ color: '#52c41a', fontSize: 16 }} /> : <BellFilled style={{ fontSize: 16 }} />} */}
          {/* {data.Tc2?.fireExtinguisherStatus4 === 1 ? <BellFilled style={{ color: '#52c41a', fontSize: 16 }} /> : <BellFilled style={{ fontSize: 16 }} />} */}
        </div>,
      },
    ]
    setSubsystemData(array);
  }
  // 轴温系统数据处理
  const axleStatus = (data: any) => {
    const array = [{
      name: '轴端传感器温度1(°C)',
      tc1: data.Tc1.temperature1,
      mp1: data.Mp1.temperature1,
      m1: data.M1.temperature1,
      m2: data.M2.temperature1,
      mp2: data.Mp2.temperature1,
      tc2: data.Tc2.temperature1
    },
    {
      name: '轴端传感器温度2(°C)',
      tc1: data.Tc1.temperature2,
      mp1: data.Mp1.temperature2,
      m1: data.M1.temperature2,
      m2: data.M2.temperature2,
      mp2: data.Mp2.temperature2,
      tc2: data.Tc2.temperature2
    },
    {
      name: '轴端传感器温度3(°C)',
      tc1: data.Tc1.temperature3,
      mp1: data.Mp1.temperature3,
      m1: data.M1.temperature3,
      m2: data.M2.temperature3,
      mp2: data.Mp2.temperature3,
      tc2: data.Tc2.temperature3
    },
    {
      name: '轴端传感器温度4(°C)',
      tc1: data.Tc1.temperature4,
      mp1: data.Mp1.temperature4,
      m1: data.M1.temperature4,
      m2: data.M2.temperature4,
      mp2: data.Mp2.temperature4,
      tc2: data.Tc2.temperature4
    },
    {
      name: '轴端传感器温度5(°C)',
      tc1: data.Tc1.temperature5,
      mp1: data.Mp1.temperature5,
      m1: data.M1.temperature5,
      m2: data.M2.temperature5,
      mp2: data.Mp2.temperature5,
      tc2: data.Tc2.temperature5
    },
    {
      name: '轴端传感器温度6(°C)',
      tc1: data.Tc1.temperature6,
      mp1: data.Mp1.temperature6,
      m1: data.M1.temperature6,
      m2: data.M2.temperature6,
      mp2: data.Mp2.temperature6,
      tc2: data.Tc2.temperature6
    },
    {
      name: '轴端传感器温度7(°C)',
      tc1: data.Tc1.temperature7,
      mp1: data.Mp1.temperature7,
      m1: data.M1.temperature7,
      m2: data.M2.temperature1,
      mp2: data.Mp2.temperature7,
      tc2: data.Tc2.temperature7
    },
    {
      name: '轴端传感器温度8(°C)',
      tc1: data.Tc1.temperature8,
      mp1: data.Mp1.temperature8,
      m1: data.M1.temperature8,
      m2: data.M2.temperature8,
      mp2: data.Mp2.temperature8,
      tc2: data.Tc2.temperature8
    }]
    setSubsystemData(array);
  }
  // 烟火报警数据处理
  const fireStatus = (data: any) => {
    const array = [{
      name: '探测器1状态',
      tc1: data.Tc1.detectorStatus1 === 0 ? '无数据' : data.Tc1.detectorStatus1 === 1 ? '正常' : data.Tc1.detectorStatus1 === 2 ? '污染' : data.Tc1.detectorStatus1 === 3 ? '故障' : '火警',
      mp1: '--',
      m1: '--',
      m2: '--',
      mp2: '--',
      tc2: data.Tc2.detectorStatus1 === 0 ? '无数据' : data.Tc1.detectorStatus1 === 1 ? '正常' : data.Tc1.detectorStatus1 === 2 ? '污染' : data.Tc1.detectorStatus1 === 3 ? '故障' : '火警'
    },
    {
      name: '探测器2状态',
      tc1: data.Tc1.detectorStatus2 === 0 ? '无数据' : data.Tc1.detectorStatus2 === 1 ? '正常' : data.Tc1.detectorStatus2 === 2 ? '污染' : data.Tc1.detectorStatus2 === 3 ? '故障' : '火警',
      mp1: '--',
      m1: '--',
      m2: '--',
      mp2: '--',
      tc2: data.Tc2.detectorStatus2 === 0 ? '无数据' : data.Tc1.detectorStatus2 === 1 ? '正常' : data.Tc1.detectorStatus2 === 2 ? '污染' : data.Tc1.detectorStatus3 === 3 ? '故障' : '火警'
    },
    {
      name: '探测器3状态',
      tc1: data.Tc1.detectorStatus3 === 0 ? '无数据' : data.Tc1.detectorStatus3 === 1 ? '正常' : data.Tc1.detectorStatus3 === 2 ? '污染' : data.Tc1.detectorStatus3 === 3 ? '故障' : '火警',
      mp1: '--',
      m1: '--',
      m2: '--',
      mp2: '--',
      tc2: data.Tc2.detectorStatus3 === 0 ? '无数据' : data.Tc1.detectorStatus3 === 1 ? '正常' : data.Tc1.detectorStatus3 === 2 ? '污染' : data.Tc1.detectorStatus3 === 3 ? '故障' : '火警'
    },
    {
      name: '探测器4状态',
      tc1: data.Tc1.detectorStatus4 === 0 ? '无数据' : data.Tc1.detectorStatus4 === 1 ? '正常' : data.Tc1.detectorStatus4 === 2 ? '污染' : data.Tc1.detectorStatus4 === 3 ? '故障' : '火警',
      mp1: '--',
      m1: '--',
      m2: '--',
      mp2: '--',
      tc2: data.Tc2.detectorStatus4 === 0 ? '无数据' : data.Tc1.detectorStatus4 === 1 ? '正常' : data.Tc1.detectorStatus4 === 2 ? '污染' : data.Tc1.detectorStatus4 === 3 ? '故障' : '火警'
    },
    {
      name: '探测器5状态',
      tc1: data.Tc1.detectorStatus5 === 0 ? '无数据' : data.Tc1.detectorStatus5 === 1 ? '正常' : data.Tc1.detectorStatus5 === 2 ? '污染' : data.Tc1.detectorStatus5 === 3 ? '故障' : '火警',
      mp1: '--',
      m1: '--',
      m2: '--',
      mp2: '--',
      tc2: data.Tc2.detectorStatus5 === 0 ? '无数据' : data.Tc1.detectorStatus5 === 1 ? '正常' : data.Tc1.detectorStatus5 === 2 ? '污染' : data.Tc1.detectorStatus5 === 3 ? '故障' : '火警'
    },
    {
      name: '探测器6状态',
      tc1: data.Tc1.detectorStatus6 === 0 ? '无数据' : data.Tc1.detectorStatus6 === 1 ? '正常' : data.Tc1.detectorStatus6 === 2 ? '污染' : data.Tc1.detectorStatus6 === 3 ? '故障' : '火警',
      mp1: '--',
      m1: '--',
      m2: '--',
      mp2: '--',
      tc2: data.Tc2.detectorStatus6 === 0 ? '无数据' : data.Tc1.detectorStatus6 === 1 ? '正常' : data.Tc1.detectorStatus6 === 2 ? '污染' : data.Tc1.detectorStatus6 === 3 ? '故障' : '火警'
    },
    {
      name: '探测器7状态',
      tc1: data.Tc1.detectorStatus7 === 0 ? '无数据' : data.Tc1.detectorStatus7 === 1 ? '正常' : data.Tc1.detectorStatus7 === 2 ? '污染' : data.Tc1.detectorStatus7 === 3 ? '故障' : '火警',
      mp1: '--',
      m1: '--',
      m2: '--',
      mp2: '--',
      tc2: data.Tc2.detectorStatus7 === 0 ? '无数据' : data.Tc1.detectorStatus7 === 1 ? '正常' : data.Tc1.detectorStatus7 === 2 ? '污染' : data.Tc1.detectorStatus7 === 3 ? '故障' : '火警'
    },
    {
      name: '探测器8状态',
      tc1: data.Tc1.detectorStatus8 === 0 ? '无数据' : data.Tc1.detectorStatus8 === 1 ? '正常' : data.Tc1.detectorStatus8 === 2 ? '污染' : data.Tc1.detectorStatus8 === 3 ? '故障' : '火警',
      mp1: '--',
      m1: '--',
      m2: '--',
      mp2: '--',
      tc2: data.Tc2.detectorStatus8 === 0 ? '无数据' : data.Tc1.detectorStatus8 === 1 ? '正常' : data.Tc1.detectorStatus8 === 2 ? '污染' : data.Tc1.detectorStatus8 === 3 ? '故障' : '火警'
    },
    {
      name: '探测器9状态',
      tc1: data.Tc1.detectorStatus9 === 0 ? '无数据' : data.Tc1.detectorStatus9 === 1 ? '正常' : data.Tc1.detectorStatus9 === 2 ? '污染' : data.Tc1.detectorStatus9 === 3 ? '故障' : '火警',
      mp1: '--',
      m1: '--',
      m2: '--',
      mp2: '--',
      tc2: data.Tc2.detectorStatus9 === 0 ? '无数据' : data.Tc1.detectorStatus9 === 1 ? '正常' : data.Tc1.detectorStatus9 === 2 ? '污染' : data.Tc1.detectorStatus9 === 3 ? '故障' : '火警'
    },
    {
      name: '探测器10状态',
      tc1: data.Tc1.detectorStatus10 === 0 ? '无数据' : data.Tc1.detectorStatus10 === 1 ? '正常' : data.Tc1.detectorStatus10 === 2 ? '污染' : data.Tc1.detectorStatus10 === 3 ? '故障' : '火警',
      mp1: '--',
      m1: '--',
      m2: '--',
      mp2: '--',
      tc2: data.Tc2.detectorStatus10 === 0 ? '无数据' : data.Tc1.detectorStatus10 === 1 ? '正常' : data.Tc1.detectorStatus10 === 2 ? '污染' : data.Tc1.detectorStatus10 === 3 ? '故障' : '火警'
    },
    {
      name: '探测器11状态',
      tc1: data.Tc1.detectorStatus11 === 0 ? '无数据' : data.Tc1.detectorStatus11 === 1 ? '正常' : data.Tc1.detectorStatus11 === 2 ? '污染' : data.Tc1.detectorStatus11 === 3 ? '故障' : '火警',
      mp1: '--',
      m1: '--',
      m2: '--',
      mp2: '--',
      tc2: data.Tc2.detectorStatus11 === 0 ? '无数据' : data.Tc1.detectorStatus11 === 1 ? '正常' : data.Tc1.detectorStatus11 === 2 ? '污染' : data.Tc1.detectorStatus11 === 3 ? '故障' : '火警'
    },
    {
      name: '探测器12状态',
      tc1: data.Tc1.detectorStatus12 === 0 ? '无数据' : data.Tc1.detectorStatus12 === 1 ? '正常' : data.Tc1.detectorStatus12 === 2 ? '污染' : data.Tc1.detectorStatus12 === 3 ? '故障' : '火警',
      mp1: '--',
      m1: '--',
      m2: '--',
      mp2: '--',
      tc2: data.Tc2.detectorStatus12 === 0 ? '无数据' : data.Tc1.detectorStatus12 === 1 ? '正常' : data.Tc1.detectorStatus12 === 2 ? '污染' : data.Tc1.detectorStatus12 === 3 ? '故障' : '火警'
    },
    {
      name: '探测器13状态',
      tc1: data.Tc1.detectorStatus8 === 0 ? '无数据' : data.Tc1.detectorStatus13 === 1 ? '正常' : data.Tc1.detectorStatus13 === 2 ? '污染' : data.Tc1.detectorStatus13 === 3 ? '故障' : '火警',
      mp1: '--',
      m1: '--',
      m2: '--',
      mp2: '--',
      tc2: data.Tc2.detectorStatus13 === 0 ? '无数据' : data.Tc1.detectorStatus13 === 1 ? '正常' : data.Tc1.detectorStatus13 === 2 ? '污染' : data.Tc1.detectorStatus13 === 3 ? '故障' : '火警'
    },
    {
      name: '探测器14状态',
      tc1: data.Tc1.detectorStatus14 === 0 ? '无数据' : data.Tc1.detectorStatus14 === 1 ? '正常' : data.Tc1.detectorStatus14 === 2 ? '污染' : data.Tc1.detectorStatus14 === 3 ? '故障' : '火警',
      mp1: '--',
      m1: '--',
      m2: '--',
      mp2: '--',
      tc2: data.Tc2.detectorStatus14 === 0 ? '无数据' : data.Tc1.detectorStatus14 === 1 ? '正常' : data.Tc1.detectorStatus14 === 2 ? '污染' : data.Tc1.detectorStatus14 === 3 ? '故障' : '火警'
    },
    {
      name: '探测器15状态',
      tc1: data.Tc1.detectorStatus15 === 0 ? '无数据' : data.Tc1.detectorStatus15 === 1 ? '正常' : data.Tc1.detectorStatus15 === 2 ? '污染' : data.Tc1.detectorStatus15 === 3 ? '故障' : '火警',
      mp1: '--',
      m1: '--',
      m2: '--',
      mp2: '--',
      tc2: data.Tc2.detectorStatus15 === 0 ? '无数据' : data.Tc1.detectorStatus15 === 1 ? '正常' : data.Tc1.detectorStatus15 === 2 ? '污染' : data.Tc1.detectorStatus15 === 3 ? '故障' : '火警'
    },
    {
      name: '探测器16状态',
      tc1: data.Tc1.detectorStatus16 === 0 ? '无数据' : data.Tc1.detectorStatus16 === 1 ? '正常' : data.Tc1.detectorStatus16 === 2 ? '污染' : data.Tc1.detectorStatus16 === 3 ? '故障' : '火警',
      mp1: '--',
      m1: '--',
      m2: '--',
      mp2: '--',
      tc2: data.Tc2.detectorStatus16 === 0 ? '无数据' : data.Tc1.detectorStatus16 === 1 ? '正常' : data.Tc1.detectorStatus16 === 2 ? '污染' : data.Tc1.detectorStatus16 === 3 ? '故障' : '火警'
    },
    {
      name: '探测器17状态',
      tc1: data.Tc1.detectorStatus17 === 0 ? '无数据' : data.Tc1.detectorStatus17 === 1 ? '正常' : data.Tc1.detectorStatus17 === 2 ? '污染' : data.Tc1.detectorStatus17 === 3 ? '故障' : '火警',
      mp1: '--',
      m1: '--',
      m2: '--',
      mp2: '--',
      tc2: data.Tc2.detectorStatus17 === 0 ? '无数据' : data.Tc1.detectorStatus17 === 1 ? '正常' : data.Tc1.detectorStatus17 === 2 ? '污染' : data.Tc1.detectorStatus17 === 3 ? '故障' : '火警'
    },
    {
      name: '探测器18状态',
      tc1: data.Tc1.detectorStatus18 === 0 ? '无数据' : data.Tc1.detectorStatus18 === 1 ? '正常' : data.Tc1.detectorStatus18 === 2 ? '污染' : data.Tc1.detectorStatus18 === 3 ? '故障' : '火警',
      mp1: '--',
      m1: '--',
      m2: '--',
      mp2: '--',
      tc2: data.Tc2.detectorStatus18 === 0 ? '无数据' : data.Tc1.detectorStatus18 === 1 ? '正常' : data.Tc1.detectorStatus18 === 2 ? '污染' : data.Tc1.detectorStatus18 === 3 ? '故障' : '火警'
    },
    {
      name: '探测器19状态',
      tc1: data.Tc1.detectorStatus19 === 0 ? '无数据' : data.Tc1.detectorStatus19 === 1 ? '正常' : data.Tc1.detectorStatus19 === 2 ? '污染' : data.Tc1.detectorStatus19 === 3 ? '故障' : '火警',
      mp1: '--',
      m1: '--',
      m2: '--',
      mp2: '--',
      tc2: data.Tc2.detectorStatus19 === 0 ? '无数据' : data.Tc1.detectorStatus19 === 1 ? '正常' : data.Tc1.detectorStatus19 === 2 ? '污染' : data.Tc1.detectorStatus19 === 3 ? '故障' : '火警'
    },
    {
      name: '探测器20状态',
      tc1: data.Tc1.detectorStatus20 === 0 ? '无数据' : data.Tc1.detectorStatus20 === 1 ? '正常' : data.Tc1.detectorStatus20 === 2 ? '污染' : data.Tc1.detectorStatus20 === 3 ? '故障' : '火警',
      mp1: '--',
      m1: '--',
      m2: '--',
      mp2: '--',
      tc2: data.Tc2.detectorStatus20 === 0 ? '无数据' : data.Tc1.detectorStatus20 === 1 ? '正常' : data.Tc1.detectorStatus20 === 2 ? '污染' : data.Tc1.detectorStatus20 === 3 ? '故障' : '火警'
    },
    {
      name: '探测器21状态',
      tc1: data.Tc1.detectorStatus21 === 0 ? '无数据' : data.Tc1.detectorStatus21 === 1 ? '正常' : data.Tc1.detectorStatus21 === 2 ? '污染' : data.Tc1.detectorStatus21 === 3 ? '故障' : '火警',
      mp1: '--',
      m1: '--',
      m2: '--',
      mp2: '--',
      tc2: data.Tc2.detectorStatus21 === 0 ? '无数据' : data.Tc1.detectorStatus21 === 1 ? '正常' : data.Tc1.detectorStatus21 === 2 ? '污染' : data.Tc1.detectorStatus21 === 3 ? '故障' : '火警'
    },
    {
      name: '探测器22状态',
      tc1: data.Tc1.detectorStatus22 === 0 ? '无数据' : data.Tc1.detectorStatus22 === 1 ? '正常' : data.Tc1.detectorStatus22 === 2 ? '污染' : data.Tc1.detectorStatus22 === 3 ? '故障' : '火警',
      mp1: '--',
      m1: '--',
      m2: '--',
      mp2: '--',
      tc2: data.Tc2.detectorStatus22 === 0 ? '无数据' : data.Tc1.detectorStatus22 === 1 ? '正常' : data.Tc1.detectorStatus22 === 2 ? '污染' : data.Tc1.detectorStatus22 === 3 ? '故障' : '火警'
    },
    {
      name: '探测器23状态',
      tc1: data.Tc1.detectorStatus23 === 0 ? '无数据' : data.Tc1.detectorStatus23 === 1 ? '正常' : data.Tc1.detectorStatus23 === 2 ? '污染' : data.Tc1.detectorStatus23 === 3 ? '故障' : '火警',
      mp1: '--',
      m1: '--',
      m2: '--',
      mp2: '--',
      tc2: data.Tc2.detectorStatus23 === 0 ? '无数据' : data.Tc1.detectorStatus23 === 1 ? '正常' : data.Tc1.detectorStatus23 === 2 ? '污染' : data.Tc1.detectorStatus23 === 3 ? '故障' : '火警'
    },
    {
      name: '探测器24状态',
      tc1: data.Tc1.detectorStatus24 === 0 ? '无数据' : data.Tc1.detectorStatus24 === 1 ? '正常' : data.Tc1.detectorStatus24 === 2 ? '污染' : data.Tc1.detectorStatus24 === 3 ? '故障' : '火警',
      mp1: '--',
      m1: '--',
      m2: '--',
      mp2: '--',
      tc2: data.Tc2.detectorStatus24 === 0 ? '无数据' : data.Tc1.detectorStatus24 === 1 ? '正常' : data.Tc1.detectorStatus24 === 2 ? '污染' : data.Tc1.detectorStatus24 === 3 ? '故障' : '火警'
    },
    {
      name: '探测器25状态',
      tc1: data.Tc1.detectorStatus25 === 0 ? '无数据' : data.Tc1.detectorStatus25 === 1 ? '正常' : data.Tc1.detectorStatus25 === 2 ? '污染' : data.Tc1.detectorStatus25 === 3 ? '故障' : '火警',
      mp1: '--',
      m1: '--',
      m2: '--',
      mp2: '--',
      tc2: data.Tc2.detectorStatus25 === 0 ? '无数据' : data.Tc1.detectorStatus25 === 1 ? '正常' : data.Tc1.detectorStatus25 === 2 ? '污染' : data.Tc1.detectorStatus25 === 3 ? '故障' : '火警'
    },
    {
      name: '探测器26状态',
      tc1: data.Tc1.detectorStatus26 === 0 ? '无数据' : data.Tc1.detectorStatus26 === 1 ? '正常' : data.Tc1.detectorStatus26 === 2 ? '污染' : data.Tc1.detectorStatus26 === 3 ? '故障' : '火警',
      mp1: '--',
      m1: '--',
      m2: '--',
      mp2: '--',
      tc2: data.Tc2.detectorStatus26 === 0 ? '无数据' : data.Tc1.detectorStatus26 === 1 ? '正常' : data.Tc1.detectorStatus26 === 2 ? '污染' : data.Tc1.detectorStatus26 === 3 ? '故障' : '火警'
    },
    {
      name: '探测器27状态',
      tc1: data.Tc1.detectorStatus27 === 0 ? '无数据' : data.Tc1.detectorStatus27 === 1 ? '正常' : data.Tc1.detectorStatus27 === 2 ? '污染' : data.Tc1.detectorStatus27 === 3 ? '故障' : '火警',
      mp1: '--',
      m1: '--',
      m2: '--',
      mp2: '--',
      tc2: data.Tc2.detectorStatus27 === 0 ? '无数据' : data.Tc1.detectorStatus27 === 1 ? '正常' : data.Tc1.detectorStatus27 === 2 ? '污染' : data.Tc1.detectorStatus27 === 3 ? '故障' : '火警'
    },
    {
      name: '探测器28状态',
      tc1: data.Tc1.detectorStatus28 === 0 ? '无数据' : data.Tc1.detectorStatus28 === 1 ? '正常' : data.Tc1.detectorStatus28 === 2 ? '污染' : data.Tc1.detectorStatus28 === 3 ? '故障' : '火警',
      mp1: '--',
      m1: '--',
      m2: '--',
      mp2: '--',
      tc2: data.Tc2.detectorStatus28 === 0 ? '无数据' : data.Tc1.detectorStatus28 === 1 ? '正常' : data.Tc1.detectorStatus28 === 2 ? '污染' : data.Tc1.detectorStatus28 === 3 ? '故障' : '火警'
    },
    {
      name: '探测器29状态',
      tc1: data.Tc1.detectorStatus29 === 0 ? '无数据' : data.Tc1.detectorStatus29 === 1 ? '正常' : data.Tc1.detectorStatus29 === 2 ? '污染' : data.Tc1.detectorStatus29 === 3 ? '故障' : '火警',
      mp1: '--',
      m1: '--',
      m2: '--',
      mp2: '--',
      tc2: data.Tc2.detectorStatus29 === 0 ? '无数据' : data.Tc1.detectorStatus29 === 1 ? '正常' : data.Tc1.detectorStatus29 === 2 ? '污染' : data.Tc1.detectorStatus29 === 3 ? '故障' : '火警'
    },
    {
      name: '探测器30状态',
      tc1: data.Tc1.detectorStatus30 === 0 ? '无数据' : data.Tc1.detectorStatus30 === 1 ? '正常' : data.Tc1.detectorStatus30 === 2 ? '污染' : data.Tc1.detectorStatus30 === 3 ? '故障' : '火警',
      mp1: '--',
      m1: '--',
      m2: '--',
      mp2: '--',
      tc2: data.Tc2.detectorStatus30 === 0 ? '无数据' : data.Tc1.detectorStatus30 === 1 ? '正常' : data.Tc1.detectorStatus30 === 2 ? '污染' : data.Tc1.detectorStatus30 === 3 ? '故障' : '火警'
    },
    {
      name: '探测器31状态',
      tc1: data.Tc1.detectorStatus31 === 0 ? '无数据' : data.Tc1.detectorStatus31 === 1 ? '正常' : data.Tc1.detectorStatus31 === 2 ? '污染' : data.Tc1.detectorStatus31 === 3 ? '故障' : '火警',
      mp1: '--',
      m1: '--',
      m2: '--',
      mp2: '--',
      tc2: data.Tc2.detectorStatus31 === 0 ? '无数据' : data.Tc1.detectorStatus31 === 1 ? '正常' : data.Tc1.detectorStatus31 === 2 ? '污染' : data.Tc1.detectorStatus31 === 3 ? '故障' : '火警'
    },
    {
      name: '探测器32状态',
      tc1: data.Tc1.detectorStatus32 === 0 ? '无数据' : data.Tc1.detectorStatus32 === 1 ? '正常' : data.Tc1.detectorStatus32 === 2 ? '污染' : data.Tc1.detectorStatus32 === 3 ? '故障' : '火警',
      mp1: '--',
      m1: '--',
      m2: '--',
      mp2: '--',
      tc2: data.Tc2.detectorStatus32 === 0 ? '无数据' : data.Tc1.detectorStatus32 === 1 ? '正常' : data.Tc1.detectorStatus32 === 2 ? '污染' : data.Tc1.detectorStatus32 === 3 ? '故障' : '火警'
    },
    {
      name: '探测器33状态',
      tc1: data.Tc1.detectorStatus33 === 0 ? '无数据' : data.Tc1.detectorStatus33 === 1 ? '正常' : data.Tc1.detectorStatus33 === 2 ? '污染' : data.Tc1.detectorStatus33 === 3 ? '故障' : '火警',
      mp1: '--',
      m1: '--',
      m2: '--',
      mp2: '--',
      tc2: data.Tc2.detectorStatus33 === 0 ? '无数据' : data.Tc1.detectorStatus33 === 1 ? '正常' : data.Tc1.detectorStatus33 === 2 ? '污染' : data.Tc1.detectorStatus33 === 3 ? '故障' : '火警'
    },
    {
      name: '探测器34状态',
      tc1: data.Tc1.detectorStatus34 === 0 ? '无数据' : data.Tc1.detectorStatus34 === 1 ? '正常' : data.Tc1.detectorStatus34 === 2 ? '污染' : data.Tc1.detectorStatus34 === 3 ? '故障' : '火警',
      mp1: '--',
      m1: '--',
      m2: '--',
      mp2: '--',
      tc2: data.Tc2.detectorStatus34 === 0 ? '无数据' : data.Tc1.detectorStatus34 === 1 ? '正常' : data.Tc1.detectorStatus34 === 2 ? '污染' : data.Tc1.detectorStatus34 === 3 ? '故障' : '火警'
    },
    ]
    setSubsystemData(array);
  }
  // 主动式障碍物数据处理
  const adosStatu = (data: any) => {
    data.map((item: any) => {
      if (item.name === '障碍物距离') {
        item.name = '障碍物距离(m)'
      }
      if (item.name === '障碍物尺寸长') {
        item.name = '障碍物尺寸长(mm)'
      }
      if (item.name === '障碍物尺寸高') {
        item.name = '障碍物尺寸高(mm)'
      }
    })
    return data;
  }

  // 空调系统数据处理
  const havcStatus = (data: any) => {
    data.map((item: any) => {
      if (item.name === '设定温度') {
        item.name = '设定温度(°C)'
      }
      if (item.name === '车内温度') {
        item.name = '车内温度(°C)',
          item.tc1 = item.tc1 === null ? '--' : Math.round(item.tc1 * 0.1),
          item.mp1 = item.mp1 === null ? '--' : Math.round(item.mp1 * 0.1),
          item.m1 = item.m1 === null ? '--' : Math.round(item.m1 * 0.1),
          item.m2 = item.m2 === null ? '--' : Math.round(item.m2 * 0.1),
          item.mp2 = item.mp2 === null ? '--' : Math.round(item.mp2 * 0.1),
          item.tc2 = item.tc2 === null ? '--' : Math.round(item.tc2 * 0.1)
      }
      if (item.name === '车外温度') {
        item.name = '车外温度(°C)',
          item.tc1 = item.tc1 === null ? '--' : Math.round(item.tc1 * 0.1),
          item.mp1 = item.mp1 === null ? '--' : Math.round(item.mp1 * 0.1),
          item.m1 = item.m1 === null ? '--' : Math.round(item.m1 * 0.1),
          item.m2 = item.m2 === null ? '--' : Math.round(item.m2 * 0.1),
          item.mp2 = item.mp2 === null ? '--' : Math.round(item.mp2 * 0.1),
          item.tc2 = item.tc2 === null ? '--' : Math.round(item.tc2 * 0.1)
      }
      if (item.name === '机组1能耗') {
        item.name = '机组1能耗(kwh)'
      }
      if (item.name === '机组2能耗') {
        item.name = '机组2能耗(kwh)'
      }
    })
    return data;
  }

  // 制动系统数据处理
  const brakeStatus = (data: any) => {
    data.map((item: any) => {
      if (item.name.substring(item.name.length - 2) === '压力') {
        item.name = item.name + '(kpa)',
          item.tc1 = item.tc1 === null ? '--' : Math.round(item.tc1 * 0.05),
          item.mp1 = item.mp1 === null ? '--' : Math.round(item.mp1 * 0.05),
          item.m1 = item.m1 === null ? '--' : Math.round(item.m1 * 0.05),
          item.m2 = item.m2 === null ? '--' : Math.round(item.m2 * 0.05),
          item.mp2 = item.mp2 === null ? '--' : Math.round(item.mp2 * 0.05),
          item.tc2 = item.tc2 === null ? '--' : Math.round(item.tc2 * 0.05)
      }
      if (item.name.substring(item.name.length - 3) === '实际力') {
        item.name = item.name + '(kN)',
          item.tc1 = item.tc1 === null ? '--' : Math.round(item.tc1 * 0.01),
          item.mp1 = item.mp1 === null ? '--' : Math.round(item.mp1 * 0.01),
          item.m1 = item.m1 === null ? '--' : Math.round(item.m1 * 0.01),
          item.m2 = item.m2 === null ? '--' : Math.round(item.m2 * 0.01),
          item.mp2 = item.mp2 === null ? '--' : Math.round(item.mp2 * 0.01),
          item.tc2 = item.tc2 === null ? '--' : Math.round(item.tc2 * 0.01)
      }
      if (item.name.substring(item.name.length - 4) === '制动能力') {
        item.name = item.name + '(N)',
          item.tc1 = item.tc1 === null ? '--' : Math.round(item.tc1 * 10),
          item.mp1 = item.mp1 === null ? '--' : Math.round(item.mp1 * 10),
          item.m1 = item.m1 === null ? '--' : Math.round(item.m1 * 10),
          item.m2 = item.m2 === null ? '--' : Math.round(item.m2 * 10),
          item.mp2 = item.mp2 === null ? '--' : Math.round(item.mp2 * 10),
          item.tc2 = item.tc2 === null ? '--' : Math.round(item.tc2 * 10)
      }
      if (item.name.substring(item.name.length - 2) === '速度') {
        item.name = item.name + '(km/h)',
          item.tc1 = item.tc1 === null ? '--' : Math.round(item.tc1 * 0.01),
          item.mp1 = item.mp1 === null ? '--' : Math.round(item.mp1 * 0.01),
          item.m1 = item.m1 === null ? '--' : Math.round(item.m1 * 0.01),
          item.m2 = item.m2 === null ? '--' : Math.round(item.m2 * 0.01),
          item.mp2 = item.mp2 === null ? '--' : Math.round(item.mp2 * 0.01),
          item.tc2 = item.tc2 === null ? '--' : Math.round(item.tc2 * 0.01)
      }

    })
    return data;
  }

  // 牵引系统数据处理
  const tractionStatus = (data: any) => {
    data.map((item: any) => {
      if (item.name.substring(item.name.length - 2) === '电压') {
        item.name = item.name + '(V)'
      }
      if (item.name.indexOf("电流") != -1) {
        item.name = item.name + '(A)'
      }
      if (item.name.indexOf("温度") != -1) {
        item.name = item.name + '(°C)'
      }
      if (item.name.substring(item.name.length - 2) === '时间') {
        item.name = item.name + '(ms)'
      }
      if (item.name.substring(item.name.length - 1) === '力') {
        item.name = item.name + '(kN)',
          item.tc1 = item.tc1 === null ? '--' : Math.round(item.tc1 * 0.01),
          item.mp1 = item.mp1 === null ? '--' : Math.round(item.mp1 * 0.01),
          item.m1 = item.m1 === null ? '--' : Math.round(item.m1 * 0.01),
          item.m2 = item.m2 === null ? '--' : Math.round(item.m2 * 0.01),
          item.mp2 = item.mp2 === null ? '--' : Math.round(item.mp2 * 0.01),
          item.tc2 = item.tc2 === null ? '--' : Math.round(item.tc2 * 0.01)
      }
      if (item.name === '电机综合转速') {
        item.name = item.name + '(km/h)',
          item.tc1 = item.tc1 === null ? '--' : Math.round(item.tc1 * 0.1),
          item.mp1 = item.mp1 === null ? '--' : Math.round(item.mp1 * 0.1),
          item.m1 = item.m1 === null ? '--' : Math.round(item.m1 * 0.1),
          item.m2 = item.m2 === null ? '--' : Math.round(item.m2 * 0.1),
          item.mp2 = item.mp2 === null ? '--' : Math.round(item.mp2 * 0.1),
          item.tc2 = item.tc2 === null ? '--' : Math.round(item.tc2 * 0.1)
      }


    })
    return data;
  }
  // 辅助系统数据处理
  const auxiliaryStatus = (data: any) => {
    data.map((item: any) => {
      if (item.name.substring(item.name.length - 2) === '电压') {
        item.name = item.name + '(V)'
      }
      if (item.name.substring(item.name.length - 2) === '电流') {
        item.name = item.name + '(A)'
      }
      if (item.name.indexOf("温度") != -1) {
        item.name = item.name + '(°C)'
      }
      if (item.name.indexOf("频率") != -1) {
        item.name = item.name + '(Hz)'
      }
    })
    return data;
  }
  // 子系统数据处理
  const systemData = (data: any) => {
    const array = data.map((item: any) => ({
      name: item.name,
      tc1: item.tc1 === null ? '--' : item.tc1,
      mp1: item.mp1 === null ? '--' : item.mp1,
      m1: item.m1 === null ? '--' : item.m1,
      m2: item.m2 === null ? '--' : item.m2,
      mp2: item.mp2 === null ? '--' : item.mp2,
      tc2: item.tc2 === null ? '--' : item.tc2,
    }))
    setSubsystemData(array);
  }

  // useEffect(() => {
  //   const response = querytrainImportantStatus({ trainCode });
  //   response.then((data) => {
  //     if (data) {
  //       important(data);
  //     }
  //   })
  // }, [trainCode])

  // useInterval(() => {
  //   if (dispatch) {
  //     dispatch({
  //       type: 'monitorAndTrains/fetchTrainImportant',
  //       payload: {
  //         trainCode,
  //       },
  //     });
  //   }
  // }, 1000);

  const handleChange = async (activeKey: string) => {
    setTabValue(activeKey);
    // const coachArray = ["Tc1", "Mp1", "M1", "M2", "Mp2", "Tc2"];
    // const arraySubsystem = [];
    // const typeName = ["轴端传感器温度1", "轴端传感器温度2", "轴端传感器温度3", "轴端传感器温度4", "轴端传感器温度5", "轴端传感器温度6", "轴端传感器温度7", "轴端传感器温度8"]
    // const subsystemDataArray: any = [];
    if (activeKey === "keyParams") {

      // const mytimer = setTimeout(()=>{
      //   alert('Saved data to cloud!');
      // },1000)
      // setTimer(mytimer);
      const response = querytrainImportantStatus({ trainCode });
      response.then((data) => {
        if (data) {
          important(data);
        }
      })
    };
    if (activeKey === "zw") {
      const response = querytrainAxleStatus({ trainCode });
      response.then((data) => {
        if (data) {
          axleStatus(data)
        }
      })
    };
    if (activeKey === "bj") {
      const response = querytrainFireStatus({ trainCode });
      response.then((data) => {
        if (data) {
          fireStatus(data)
        }
      })
    };
    if (activeKey === "jc") {
      const response = querytrainAdosStatus({ trainCode });
      response.then((data) => {
        if (data) {
          systemData(adosStatu(data))
        }
      })
    };
    if (activeKey === "kt") {
      const response = querytrainHavcStatus({ trainCode });
      response.then((data) => {
        if (data) {
          systemData(havcStatus(data))
        }
      })
    };
    if (activeKey === "zd") {
      const response = queryBrakeStatus({ trainCode });
      response.then((data) => {
        if (data) {
          systemData(brakeStatus(data))
        }
      })
    };
    if (activeKey === "qy") {
      const response = queryTractionStatus({ trainCode });
      response.then((data) => {
        if (data) {
          systemData(tractionStatus(data))
        }
      })
    };
    if (activeKey === "fz") {
      const response = queryAuxiliaryStatus({ trainCode });
      response.then((data) => {
        if (data) {
          systemData(auxiliaryStatus(data))
        }
      })
    };
  }
  // 定时请求后端数据

  useInterval(() => {
    if (tabValue === "keyParams") {

      // const mytimer = setTimeout(()=>{
      //   alert('Saved data to cloud!');
      // },1000)
      // setTimer(mytimer);
      const response = querytrainImportantStatus({ trainCode });
      response.then((data) => {
        if (data) {
          important(data);
        }
      })
    };
    if (tabValue === "zw") {
      const response = querytrainAxleStatus({ trainCode });
      response.then((data) => {
        if (data) {
          axleStatus(data)
        }
      })
    };
    if (tabValue === "bj") {
      const response = querytrainFireStatus({ trainCode });
      response.then((data) => {
        if (data) {
          fireStatus(data)
        }
      })
    };
    if (tabValue === "jc") {
      const response = querytrainAdosStatus({ trainCode });
      response.then((data) => {
        if (data) {
          systemData(adosStatu(data))
        }
      })
    };
    if (tabValue === "kt") {
      const response = querytrainHavcStatus({ trainCode });
      response.then((data) => {
        if (data) {
          systemData(havcStatus(data))
        }
      })
    };
    if (tabValue === "zd") {
      const response = queryBrakeStatus({ trainCode });
      response.then((data) => {
        if (data) {
          systemData(brakeStatus(data))
        }
      })
    };
    if (tabValue === "qy") {
      const response = queryTractionStatus({ trainCode });
      response.then((data) => {
        if (data) {
          systemData(tractionStatus(data))
        }
      })
    };
    if (tabValue === "fz") {
      const response = queryAuxiliaryStatus({ trainCode });
      response.then((data) => {
        if (data) {
          systemData(auxiliaryStatus(data))
        }
      })
    };
  }, 1200);

  const tabsData = [
    {
      tab: '重要参数',
      key: 'keyParams',
      subsystemData,
      columns,
    },
    {
      tab: '轴温系统',
      key: 'zw',
      subsystemData,
      columns,
    },
    {
      tab: '烟火报警系统',
      key: 'bj',
      subsystemData,
      columns,
    },
    {
      tab: '主动式障碍物检测系统',
      key: 'jc',
      subsystemData,
      columns,
    },
    // {
    //   tab: '车门系统',
    //   key: 'cm',
    //   subsystemData,
    //   columns,
    // },
    // {
    //   tab: '弓网系统',
    //   key: 'gw',
    //   subsystemData,
    //   columns,
    // },
    // {
    //   tab: '走行部系统',
    //   key: 'zx',
    //   subsystemData,
    //   columns,
    // },
    {
      tab: '空调系统',
      key: 'kt',
      subsystemData,
      columns,
    },
    {
      tab: '制动系统',
      key: 'zd',
      subsystemData,
      columns,
    },
    {
      tab: '牵引系统',
      key: 'qy',
      subsystemData,
      columns,
    },
    {
      tab: '辅助系统',
      key: 'fz',
      subsystemData,
      columns,
    },
  ];

  return (
    <div>
      <Tabs type="card"
        onChange={handleChange}
      >
        {tabsData ? tabsData.map(item => (
          <TabPane tab={item.tab} key={item.key}>
            <Table
              className={styles.system}
              columns={item.columns}
              dataSource={item.subsystemData}
              bordered
              size="middle"
              pagination={false}
              scroll={{ x: 'calc(700px + 50%)', y: 600 }}
            />
          </TabPane>
        )) : null}
      </Tabs>
    </div>
  );
};
export default TrainSystemTable;
