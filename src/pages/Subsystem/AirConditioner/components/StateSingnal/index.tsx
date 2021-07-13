import React from 'react';
// import autoHeight from '@/components/autoHeight';
import { Descriptions } from 'antd';
import { CloseCircleFilled, CheckCircleFilled } from '@ant-design/icons';
import stateGreenIcon from '@/assets/stateGreen.svg';
import stateGrayIcon from '@/assets/stateGray.svg';
import stateRedIcon from '@/assets/stateRed.svg';
import styles from '../../style.less';
import autoHeight from '@/pages/Monitor/Global/components/autoHeight';
// import { BrakeOperationStatusMonitoringDataType } from '../../data';

export interface StateSingnalProps {
  height?: number;
  // forceFit?: boolean;
  // borderWidth?: number;
  data: any;
}

const StateSingnal: React.FC<StateSingnalProps> = (props) => {
  const {
    data,
  } = props;
  // console.log("444", data)
  return (
    <div>
      <Descriptions
        bordered
        size='small'
        column={5}>
        {/* {monitor ? monitor.slice(0, 11).map(item => (
                  <Descriptions.Item label={item.type}><CloseCircleFilled style={{ color: item.value ? '#52c41a' : '#bfbfbf' }} /></Descriptions.Item>
                ))
                  : null} */}
        <Descriptions.Item label="室内火灾"><img src={data.indoorFire ? stateGreenIcon
          : stateGrayIcon} className={styles.icon} /></Descriptions.Item>
        <Descriptions.Item label="停机"><img src={data.downTime ? stateGreenIcon
          : stateGrayIcon} className={styles.icon} /></Descriptions.Item>
        <Descriptions.Item label="本地控制"><img src={data.localControl ? stateGreenIcon
          : stateGrayIcon} className={styles.icon} /></Descriptions.Item>
        <Descriptions.Item label="集控"><img src={data.setPoint ? stateGreenIcon
          : stateGrayIcon} className={styles.icon} /></Descriptions.Item>
        <Descriptions.Item label="自动模式"><img src={data.automaticMode ? stateGreenIcon
          : stateGrayIcon} className={styles.icon} /></Descriptions.Item>
        <Descriptions.Item label="通风"><img src={data.ventilation ? stateGreenIcon
          : stateGrayIcon} className={styles.icon} /></Descriptions.Item>
        <Descriptions.Item label="强风"><img src={data.strongWind ? stateGreenIcon
          : stateGrayIcon} className={styles.icon} /></Descriptions.Item>
        <Descriptions.Item label="预冷"><img src={data.precooling ? stateGreenIcon
          : stateGrayIcon} className={styles.icon} /></Descriptions.Item>
        <Descriptions.Item label="减载模式"><img src={data.lighteningMode ? stateGreenIcon
          : stateGrayIcon} className={styles.icon} /></Descriptions.Item>
        <Descriptions.Item label="紧急通风"><img src={data.emergencyVentilation ? stateGreenIcon
          : stateGrayIcon} className={styles.icon} /></Descriptions.Item>

        {/* <Descriptions.Item label="室外火灾"><CloseCircleFilled style={{ color: data.outDoorFire ? '#52c41a' : '#bfbfbf' }} /></Descriptions.Item>
        <Descriptions.Item label="停机"><CheckCircleFilled style={{ color: data.downTime ? '#52c41a' : '#bfbfbf' }} /></Descriptions.Item>
        <Descriptions.Item label="本地控制"><CloseCircleFilled style={{ color: data.localControl ? '#52c41a' : '#bfbfbf' }} /></Descriptions.Item>
        <Descriptions.Item label="集控"><CheckCircleFilled style={{ color: data.setPoint ? '#52c41a' : '#bfbfbf' }} /></Descriptions.Item>
        <Descriptions.Item label="自动模式"><CloseCircleFilled style={{ color: data.automaticMode ? '#52c41a' : '#bfbfbf' }} /></Descriptions.Item>
        <Descriptions.Item label="通风"><CheckCircleFilled style={{ color: data.ventilation ? '#52c41a' : '#bfbfbf' }} /></Descriptions.Item>
        <Descriptions.Item label="强风"><CheckCircleFilled style={{ color: data.strongWind ? '#52c41a' : '#bfbfbf' }} /></Descriptions.Item>
        <Descriptions.Item label="预冷"><CheckCircleFilled style={{ color: data.precooling ? '#52c41a' : '#bfbfbf' }} /></Descriptions.Item>
        <Descriptions.Item label="减载模式"><CheckCircleFilled style={{ color: data.lighteningMode ? '#52c41a' : '#bfbfbf' }} /></Descriptions.Item>
        <Descriptions.Item label="紧急通风"><CheckCircleFilled style={{ color: data.emergencyVentilation ? '#52c41a' : '#bfbfbf' }} /></Descriptions.Item> */}
      </Descriptions>
    </div>
  );
};

export default autoHeight()(StateSingnal);
