import React from 'react';
// import autoHeight from '@/components/autoHeight';
import { Descriptions } from 'antd';
import { CloseCircleFilled, CheckCircleFilled } from '@ant-design/icons';
import { BrakeOperationStatusMonitoringDataType } from '../../data';
import stateGreenIcon from '@/assets/stateGreen.svg';
import stateGrayIcon from '@/assets/stateGray.svg';
import stateRedIcon from '@/assets/stateRed.svg';
import styles from '../../style.less';

export interface StateSingnalProps {
  height?: number;
  // forceFit?: boolean;
  // borderWidth?: number;
  data: BrakeOperationStatusMonitoringDataType;
}

const StateSingnal: React.FC<StateSingnalProps> = (props) => {
  const {
    data,
  } = props;
  return (
    <div>
      <Descriptions
        // bordered
        column={5}
      >
        <Descriptions.Item label="制动">
          <img src={data.braking ? stateGreenIcon : stateGrayIcon} className={styles.icon} />
        </Descriptions.Item>
        <Descriptions.Item label="电制动能力">{data.electricBrakingCapacity ? data.electricBrakingCapacity : "--" + "kN"}</Descriptions.Item>
        <Descriptions.Item label="实际电制动力 ">{data.actualElectricBrakingForce ? data.actualElectricBrakingForce : "--" + "kN"}</Descriptions.Item>
        <Descriptions.Item label="快速制动">
          <img src={data.quickBraking ? stateGreenIcon : stateGrayIcon} className={styles.icon} />
        </Descriptions.Item>
        <Descriptions.Item label="保持制动缓解">
          <img src={data.holdBrakeRelease ? stateGreenIcon : stateGrayIcon} className={styles.icon} />
        </Descriptions.Item>
        <Descriptions.Item label="电制动可用">
          <img src={data.electricBrakeAvailable ? stateGreenIcon : stateGrayIcon} className={styles.icon} />
        </Descriptions.Item>
        <Descriptions.Item label="电制动有效">
          <img src={data.electricBrakingIsEffective ? stateGreenIcon : stateGrayIcon} className={styles.icon} />
        </Descriptions.Item>
        <Descriptions.Item label="电制动滑行">
          <img src={data.electricBrakingSliding ? stateGreenIcon : stateGrayIcon} className={styles.icon} />
        </Descriptions.Item>
        <Descriptions.Item label="电制动衰减">
          <img src={data.electricBrakingAttenuation ? stateGreenIcon : stateGrayIcon} className={styles.icon} />
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default StateSingnal;
