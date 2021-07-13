import { Descriptions, Avatar } from 'antd';
import React from 'react';
import {
  DashboardOutlined,
  ControlOutlined,
  PlusCircleOutlined,
  PlayCircleOutlined,
  EnvironmentOutlined,
  SplitCellsOutlined,
  HistoryOutlined,
  PullRequestOutlined,
  SwapOutlined,
} from '@ant-design/icons';
import CarIcon from '@/assets/Car.svg';
import RunIcon from '@/assets/yx.svg';
import { TrainBasicInfoType } from '../../data';

interface TrainBasicInfoProps {
  trainBasicList?: TrainBasicInfoType;
}
const stationList = [
  '库内',
  '国凯大道站',
  '那洪立交站',
  '金凯路站',
  '江南公园站',
  '周家坡站',
  '五一立交站',
  '新秀公园站',
  '广西大学站',
  '秀灵路站',
  '明秀路站',
  '北湖南路站',
  '虎邱站',
  '狮山公园站',
  '小鸡村站',
  '邕宾立交站',
  '降桥站',
  '金桥客运站', ''
]
const TrainBasicInfo: React.FC<TrainBasicInfoProps> = (props) => {
  const { trainBasicList } = props
  // console.log('trainBasicList',trainBasicList)
  return (
    <div style={{ paddingLeft: 10 }}>
      <Descriptions title="基础信息" column={4}
        extra={
          <span>{trainBasicList?.trainCode ? trainBasicList?.stateTime : '--'}</span>}
      >
        <Descriptions.Item
          label={
            <span>
              <Avatar size={20} src={CarIcon} style={{ paddingLeft: 3 }} />
              &nbsp; 列车号
            </span>
          }
        >
          {trainBasicList?.trainCode ? trainBasicList?.trainCode : '--'}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <span>
              <Avatar size={22} src={RunIcon} />
              &nbsp; 限速值
            </span>
          }
        >
          {trainBasicList?.speedLimit ? trainBasicList.speedLimit : '--'}&nbsp;km/h
          {/* {trainBasicList?.runState === 0
            ? '在线'
            : trainBasicList?.runState === 1
              ? '在库'
              : trainBasicList?.runState === 2
                ? '离线'
                : '--'} */}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <span>
              <Avatar
                size="small"
                style={{ backgroundColor: 'rgb(0,0,0,0.1)', color: '#1E90FF' }}
                icon={<PullRequestOutlined />}
              />
              &nbsp; 列车模式
            </span>
          }
        >
          {trainBasicList?.mode}
        </Descriptions.Item>
        {/* <Descriptions.Item
          label={
            <span>
              <Avatar
                size="small"
                style={{ backgroundColor: 'rgb(0,0,0,0.1)', color: '#1E90FF' }}
                icon={<PullRequestOutlined />}
              />
              &nbsp; 列车工况
            </span>
          }
        >
          {trainBasicList?.trainWorkingCondition === 0
            ? '上电至待命前'
            : trainBasicList?.trainWorkingCondition === 1
              ? '待命'
              : trainBasicList?.trainWorkingCondition === 2
                ? '正线服务'
                : trainBasicList?.trainWorkingCondition === 3
                  ? '清扫'
                  : trainBasicList?.trainWorkingCondition === 4
                    ? '检修'
                    : trainBasicList?.trainWorkingCondition === 5
                      ? '洗车'
                      : '无效'}
        </Descriptions.Item> */}
        <Descriptions.Item
          label={
            <span>
              <Avatar
                size="small"
                style={{ backgroundColor: 'rgb(0,0,0,0.1)', color: '#1890ff' }}
                icon={<DashboardOutlined />}
              />
              &nbsp; 速度
            </span>
          }
        >
          {trainBasicList?.speed ? trainBasicList.speed : '--'} &nbsp;km/h
        </Descriptions.Item>

        <Descriptions.Item
          label={
            <span>
              <Avatar
                size="small"
                style={{ backgroundColor: 'rgb(0,0,0,0.1)', color: '#52c41a' }}
                icon={<EnvironmentOutlined />}
              />
              &nbsp; 下一站
            </span>
          }
        >
          {trainBasicList?.indexStation
            ? stationList[trainBasicList.indexStation]
            : '--'}
        </Descriptions.Item>
        {/* <Descriptions.Item
          label={
            <span>
              <Avatar
                size="small"
                style={{ backgroundColor: 'rgb(0,0,0,0.1)', color: '#52c41a' }}
                icon={<PlusCircleOutlined />}
              />
              &nbsp; 司机室占有
            </span>
          }
        >
          {trainBasicList?.driverCab === 1 ? 'Tc1端' : trainBasicList?.driverCab === 0 ? 'Tc2端' : '--'}
        </Descriptions.Item> */}
        <Descriptions.Item
          label={
            <span>
              <Avatar
                size="small"
                style={{ backgroundColor: 'rgb(0,0,0,0.1)', color: '#52c41a' }}
                icon={<PlusCircleOutlined />}
              />
              &nbsp; 载客量
            </span>
          }
        >
          {trainBasicList?.totalLoad ? ((trainBasicList.totalLoad-20978.74)/6).toFixed(0)+'人' : '--'}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <span>
              <Avatar
                size="small"
                style={{ backgroundColor: 'rgb(0,0,0,0.1)', color: '#DA70D6' }}
                icon={<SwapOutlined />}
              />
              &nbsp; 列车方向
            </span>
          }
        >
          {trainBasicList?.runningDirection === 1 ? '上行' : trainBasicList?.runningDirection === -1 ? '下行' : '--'}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <span>
              <Avatar
                size="small"
                style={{ backgroundColor: 'rgb(0,0,0,0.1)', color: '#008B8B' }}
                icon={<HistoryOutlined />}
              />
              &nbsp; 当前运营总公里数
            </span>
          }
        >
          {trainBasicList?.operatingMileage ? trainBasicList?.operatingMileage : '--'}&nbsp;km
        </Descriptions.Item>

        {/* <Descriptions.Item
          label={
            <span>
              <Avatar
                size="small"
                style={{ backgroundColor: 'rgb(0,0,0,0.1)', color: '#1890ff' }}
                icon={<ControlOutlined />}
              />
              &nbsp; 牵引
            </span>
          }
        >
          {trainBasicList?.track === 1 ? '有效' : trainBasicList?.track === 0 ? '无效' : '--'}
        </Descriptions.Item> */}
        <Descriptions.Item
          label={
            <span>
              <Avatar
                size="small"
                style={{ backgroundColor: 'rgb(0,0,0,0.1)', color: '#1890ff' }}
                icon={<ControlOutlined />}
              />
              &nbsp; 牵引能耗
            </span>
          }
        >
          {trainBasicList?.tractionEnergyConsumption ? trainBasicList?.tractionEnergyConsumption : '--'}&nbsp;Kwh
        </Descriptions.Item>

        {/* <Descriptions.Item
          label={
            <span>
              <Avatar
                size="small"
                style={{ backgroundColor: 'rgb(0,0,0,0.1)', color: '#1890ff' }}
                icon={<PlayCircleOutlined />}
              />
              &nbsp; 制动
            </span>
          }
        >
          {trainBasicList?.brake === 1 ? '有效' : trainBasicList?.brake === 0 ? '无效' : '--'}
        </Descriptions.Item> */}
        <Descriptions.Item
          label={
            <span>
              <Avatar
                size="small"
                style={{ backgroundColor: 'rgb(0,0,0,0.1)', color: '#1890ff' }}
                icon={<PlayCircleOutlined />}
              />
              &nbsp; 制动能耗
            </span>
          }
        >
          {trainBasicList?.brakeEnergyConsumption ? trainBasicList?.brakeEnergyConsumption : '--'}&nbsp;Kwh
        </Descriptions.Item>

        {/* <Descriptions.Item
          label={
            <span>
              <Avatar
                size="small"
                style={{ backgroundColor: 'rgb(0,0,0,0.1)', color: '#1890ff' }}
                icon={<PlayCircleOutlined />}
              />
              &nbsp; 快速制动
            </span>
          }
        >
          {trainBasicList?.fastTrack === 1 ? '有效' : trainBasicList?.fastTrack === 0 ? '无效' : '--'}
        </Descriptions.Item> */}
        <Descriptions.Item
          label={
            <span>
              <Avatar
                size="small"
                style={{ backgroundColor: 'rgb(0,0,0,0.1)', color: '#1890ff' }}
                icon={<PlayCircleOutlined />}
              />
              &nbsp; 网压
            </span>
          }
        >
          {trainBasicList?.gridVoltage ? trainBasicList?.gridVoltage : '--'}&nbsp;V
        </Descriptions.Item>

        {/* <Descriptions.Item
          label={
            <span>
              <Avatar
                size="small"
                style={{ backgroundColor: 'rgb(0,0,0,0.1)', color: '#F08080' }}
                icon={<SplitCellsOutlined />}
              />
              &nbsp; 保持制动缓解
            </span>
          }
        >
          {trainBasicList?.keepBrakeRelieve === 1 ? '有效' : trainBasicList?.keepBrakeRelieve === 0 ? '无效' : '--'}
        </Descriptions.Item> */}
        <Descriptions.Item
          label={
            <span>
              <Avatar
                size="small"
                style={{ backgroundColor: 'rgb(0,0,0,0.1)', color: '#F08080' }}
                icon={<SplitCellsOutlined />}
              />
              &nbsp; 网流
            </span>
          }
        >
          {trainBasicList?.intermediateCurrent ? trainBasicList?.intermediateCurrent : '--'}&nbsp;A
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default TrainBasicInfo;
