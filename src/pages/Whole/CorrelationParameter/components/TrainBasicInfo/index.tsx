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
import { TrainsMonitorType } from '../../data';

interface TrainBasicInfoProps {
  train: TrainsMonitorType;
}

const TrainBasicInfo: React.FC<TrainBasicInfoProps> = (props) => {
  const { train } = props
  // console.log('train11', train);
  return (
    <div style={{ paddingLeft: 10 }}>
      <Descriptions title="基础信息" column={4}>
        <Descriptions.Item
          label={
            <span>
              <Avatar size={20} src={CarIcon} style={{ paddingLeft: 3 }} />
              &nbsp; 列车号
            </span>
          }
        >
          {train.trainCode ? train.trainCode : '--'}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <span>
              <Avatar size={22} src={RunIcon} />
              &nbsp; 运行状态
            </span>
          }
        >
          {train?.runState === 0
            ? '在线'
            : train?.runState === 1
              ? '在库'
              : train?.runState === 2
                ? '离线'
                : '在线'}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <span>
              <Avatar
                size="small"
                style={{ backgroundColor: 'rgb(0,0,0,0.1)', color: '#008B8B' }}
                icon={<HistoryOutlined />}
              />
              &nbsp; 运营时间
            </span>
          }
        >
          {train.totalMiles ? train.totalMiles : '8760'}&nbsp;h
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <span>
              <Avatar
                size="small"
                style={{ backgroundColor: 'rgb(0,0,0,0.1)', color: '#008B8B' }}
                icon={<HistoryOutlined />}
              />
              &nbsp; 运营里程
            </span>
          }
        >
          {train.totalMiles ? train.totalMiles : '1000'}&nbsp;km
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
          {train?.trainWorkCondition === 0
            ? '上电至待命前'
            : train?.trainWorkCondition === 1
              ? '待命'
              : train?.trainWorkCondition === 2
                ? '正线服务'
                : train?.trainWorkCondition === 3
                  ? '清扫'
                  : train?.trainWorkCondition === 4
                    ? '检修'
                    : train?.trainWorkCondition === 5
                      ? '洗车'
                      : '无效'}
        </Descriptions.Item>
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
          {train.trainSpeed ? train.trainSpeed : '--'} &nbsp;km/h
        </Descriptions.Item>

        <Descriptions.Item
          label={
            <span>
              <Avatar
                size="small"
                style={{ backgroundColor: 'rgb(0,0,0,0.1)', color: '#52c41a' }}
                icon={<EnvironmentOutlined />}
              />
              &nbsp; 当前站/下一站
            </span>
          }
        >
          {train.currentStation && train.nextStation
            ? `${train.currentStation}/${train.nextStation}`
            : '--/--'}
        </Descriptions.Item>
        <Descriptions.Item
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
          {train?.driverCab === 1 ? 'Tc1端' : train?.driverCab === 0 ? 'Tc2端' : '--'}
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
          {train?.direction === 0 ? '上行' : train?.direction === 1 ? '下行' : '--'}
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
          {train.totalMiles ? train.totalMiles : '--'}&nbsp;km
        </Descriptions.Item>

        <Descriptions.Item
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
          {train?.track === 1 ? '有效' : train?.track === 0 ? '无效' : '--'}
        </Descriptions.Item>

        <Descriptions.Item
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
          {train?.brake === 1 ? '有效' : train?.brake === 0 ? '无效' : '--'}
        </Descriptions.Item>
        <Descriptions.Item
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
          {train?.fastTrack === 1 ? '有效' : train?.fastTrack === 0 ? '无效' : '--'}
        </Descriptions.Item>
        <Descriptions.Item
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
          {train?.keepBrakeRelieve === 1 ? '有效' : train?.keepBrakeRelieve === 0 ? '无效' : '--'}
        </Descriptions.Item> */}
      </Descriptions>
    </div>
  );
};

export default TrainBasicInfo;
