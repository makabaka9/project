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
} from '@ant-design/icons';
import CarIcon from '@/assets/Car.svg';
// import TempratureIcon from '@/assets/Temprature.svg';
import { BasicProfileDataType } from '../../data';
// import transform from 'wgs2mars';
// import GetDistance from '@/components/GetDistance'

interface BasicInfoProps {
  train: BasicProfileDataType;
}
const BasicInfo: React.FC<BasicInfoProps> = (props) => {
  const { train } = props;
  return (
    <div>
      <Descriptions column={4}>
        <Descriptions.Item
          label={
            <span>
              <Avatar size={20} src={CarIcon} />
            </span>
          }
        >
          {/* {train?.trainCode ? "CJ6-0" + train?.trainCode : "--"} */}
        </Descriptions.Item>

        <Descriptions.Item
          label={
            <span>
              <Avatar size={20} src={CarIcon} />
              {/* &nbsp; 车号 */}
            </span>
          }
        >
          {/* {train?.trainCode ? "CJ6-0" + train?.trainCode : "1104"} */}
        </Descriptions.Item>

        <Descriptions.Item
          label={
            <span>
              <Avatar size={20} src={CarIcon} />
              {/* &nbsp; 出厂日期 */}
            </span>
          }
        >
          {/* {train?.trainCode ? "CJ6-0" + train?.trainCode : "2020-06-01"} */}
        </Descriptions.Item>

        <Descriptions.Item
          label={
            <span>
              <Avatar size={20} src={CarIcon} />
              {/* &nbsp; 车重 */}
            </span>
          }
        >
          {/* {train?.trainCode ? "CJ6-0" + train?.trainCode : "8000吨"} */}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default BasicInfo;
