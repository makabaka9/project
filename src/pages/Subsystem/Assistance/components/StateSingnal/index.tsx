import React from 'react';
import autoHeight from '@/components/autoHeight';
import { Descriptions } from 'antd';
import { CloseCircleFilled, ExclamationCircleFilled, CheckCircleFilled } from '@ant-design/icons';

export interface StateParameterProps {
  // height?: number;
  // forceFit?: boolean;
  // borderWidth?: number;
  // data: {
  //   time: string;
  //   type: string;
  //   humity: number;
  // }[];
}

const StateParameter: React.FC<StateParameterProps> = (props) => {
  // const {
  //   height = 1,
  //   data
  // } = props;

  return (
    <div>
      <Descriptions
        bordered
        // title="Custom Size"
        column={4}
      >
        <Descriptions.Item label="充电机轻微故障">
          <ExclamationCircleFilled style={{ color: 'red' }} />
        </Descriptions.Item>
        <Descriptions.Item label="充电机中等故障">
          <ExclamationCircleFilled style={{ color: 'red' }} />
        </Descriptions.Item>
        <Descriptions.Item label="充电机严重故障">
          <CheckCircleFilled style={{ color: '#52c41a' }} />
        </Descriptions.Item>
        <Descriptions.Item label="SIV轻微故障">
          <ExclamationCircleFilled style={{ color: 'red' }} />
        </Descriptions.Item>
        <Descriptions.Item label="SIV中等故障">
          <CheckCircleFilled style={{ color: '#52c41a' }} />
        </Descriptions.Item>
        <Descriptions.Item label="SIV严重故障">
          <CheckCircleFilled style={{ color: '#52c41a' }} />
        </Descriptions.Item>
        <Descriptions.Item label="逆变模块超温">
          <ExclamationCircleFilled style={{ color: 'red' }} />
        </Descriptions.Item>
        <Descriptions.Item label="充电机模块超温">
          <ExclamationCircleFilled style={{ color: 'red' }} />
        </Descriptions.Item>
        <Descriptions.Item label="蓄电池高温报警">
          <ExclamationCircleFilled style={{ color: 'red' }} />
        </Descriptions.Item>
        <Descriptions.Item label="蓄电池低温报警">
          <ExclamationCircleFilled style={{ color: 'red' }} />
        </Descriptions.Item>
        <Descriptions.Item label="蓄电池电压低黄色预警">
          <CheckCircleFilled style={{ color: '#52c41a' }} />
        </Descriptions.Item>
        <Descriptions.Item label="蓄电池电压低红色报警">
          <CheckCircleFilled style={{ color: '#52c41a' }} />
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default StateParameter;
