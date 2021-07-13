import { Descriptions, Avatar } from 'antd';
import React from 'react';
import {
  ExclamationCircleOutlined,
  EnvironmentOutlined,
  DashboardOutlined,
  KeyOutlined,
  RedoOutlined,
  ControlOutlined,
  PlusCircleOutlined,
  PlayCircleOutlined,
  FileMarkdownOutlined,
  PoweroffOutlined,
} from '@ant-design/icons';
import CarIcon from '@/assets/Car.svg';
// import TempratureIcon from '@/assets/Temprature.svg';
import { BasicInfoDataType } from '../../data';
// import transform from 'wgs2mars';
// import GetDistance from '@/components/GetDistance'
import styles from './index.less';

interface BasicInfoProps {
  data: BasicInfoDataType;
}
const BasicInfo: React.FC<BasicInfoProps> = (props) => {
  const { data } = props;
  return (
    <div>
      <Descriptions style={{ marginBottom: 1, marginTop: 20 }} column={3}>
        <Descriptions.Item
          label={
            <span>
              <Avatar
                size="small"
                style={{ backgroundColor: 'rgb(0,0,0,0.1)', color: '#1890ff' }}
                src={CarIcon}
              />
              &nbsp; 车&emsp;&emsp;&emsp;号
            </span>
          }
          className={styles.descriptions}
        >
          {data?.trainCode ? 'NNL' + data?.trainCode : null}
        </Descriptions.Item>

        <Descriptions.Item
          label={
            <span>
              <Avatar
                size="small"
                style={{ backgroundColor: 'rgb(0,0,0,0.1)', color: '#1890ff' }}
                icon={<FileMarkdownOutlined />}
              />
              &nbsp; 出&nbsp;厂&nbsp;日&nbsp;期
            </span>
          }
        >
          {data?.createTime ? 'CJ6-0' + data?.createTime : null}
        </Descriptions.Item>

        <Descriptions.Item
          label={
            <span>
              <Avatar
                size="small"
                style={{ backgroundColor: 'rgb(0,0,0,0.1)', color: '#1890ff' }}
                icon={<PoweroffOutlined />}
              />
              &nbsp; 车&emsp;&emsp;重
            </span>
          }
        >
          {data?.weight ? 'CJ6-0' + data?.weight + '吨' : null}
        </Descriptions.Item>

        <Descriptions.Item
          label={
            <span>
              <Avatar
                size="small"
                style={{ backgroundColor: 'rgb(0,0,0,0.1)', color: '#52c41a' }}
                icon={<DashboardOutlined />}
              />
              &nbsp; 运&nbsp;营&nbsp;里&nbsp;程
            </span>
          }
        >
          {data?.operatingMileage ? data?.operatingMileage + 'km' : null}
        </Descriptions.Item>

        <Descriptions.Item
          label={
            <span>
              <Avatar
                size="small"
                style={{ backgroundColor: 'rgb(0,0,0,0.1)', color: '#52c41a' }}
                icon={<ControlOutlined />}
              />
              &nbsp; 总&nbsp;&nbsp;&nbsp;能&nbsp;&nbsp;&nbsp;耗
            </span>
          }
        >
          {data?.totalEnergyConsumption ? data?.totalEnergyConsumption + 'kw' : null}
        </Descriptions.Item>

        <Descriptions.Item
          label={
            <span>
              <Avatar
                size="small"
                style={{ backgroundColor: 'rgb(0,0,0,0.1)', color: '#52c41a' }}
                icon={<PlusCircleOutlined />}
              />
              &nbsp; 总&nbsp;&nbsp;载&nbsp;&nbsp;荷
            </span>
          }
        >
          {data?.totalLoad ? data?.totalLoad + '万吨' : null}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default BasicInfo;
