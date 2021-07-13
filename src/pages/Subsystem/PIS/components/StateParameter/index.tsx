import React from 'react';
import autoHeight from '@/components/autoHeight';
import { Descriptions, Tabs } from 'antd';
import stateGreenIcon from '@/assets/stateGreen.svg';
import stateGrayIcon from '@/assets/stateGray.svg';
import stateRedIcon from '@/assets/stateRed.svg';
import stateWarnIcon from '@/assets/stateWarn.svg';
import stateOrangeIcon from '@/assets/stateOrange.svg';
import styles from '../../style.less';
// import { ExclamationCircleFilled, CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { AuxiliaryStatusDataDataType } from '../../data';

const { TabPane } = Tabs;
export interface StateParameterProps {
  height?: number;
  // forceFit?: boolean;
  // borderWidth?: number;
  auxiliaryStatusData: AuxiliaryStatusDataDataType;
}

const StateParameter: React.FC<StateParameterProps> = (props) => {
  const {
    pisStatusData,
  } = props;


  return (
    <div>
      <Descriptions
        bordered
        size="small"
        // title="Custom Size"
        column={8}
      >
        <Descriptions.Item label="ACSU主控">
          {pisStatusData.acsuMainController?<img src={stateGreenIcon} className={styles.icon} alt='' />:<img src={stateGrayIcon} className={styles.icon} alt='' />}
        </Descriptions.Item>
        <Descriptions.Item label="ACSU 副控">
          {pisStatusData.acsuSecondController?<img src={stateGreenIcon} className={styles.icon} alt='' />:<img src={stateGrayIcon} className={styles.icon} alt='' />}
        </Descriptions.Item>
        <Descriptions.Item label="PA功能激活">
          {pisStatusData.paFunctionActive?<img src={stateGreenIcon} className={styles.icon} alt='' />:<img src={stateGrayIcon} className={styles.icon} alt='' />}
        </Descriptions.Item>
        <Descriptions.Item label="人工广播">
          {pisStatusData.manualBroadcast?<img src={stateGreenIcon} className={styles.icon} alt='' />:<img src={stateGrayIcon} className={styles.icon} alt='' />}
        </Descriptions.Item>
        <Descriptions.Item label="OCC 广播">
          {pisStatusData.occBroadcast?<img src={stateGreenIcon} className={styles.icon} alt='' />:<img src={stateGrayIcon} className={styles.icon} alt='' />}
        </Descriptions.Item>
        <Descriptions.Item label="司机对讲">
          {pisStatusData.driverCall?<img src={stateGreenIcon} className={styles.icon} alt='' />:<img src={stateGrayIcon} className={styles.icon} alt='' />}
        </Descriptions.Item>
        <Descriptions.Item label="紧急对讲">
          {pisStatusData.emergencyCall?<img src={stateGreenIcon} className={styles.icon} alt='' />:<img src={stateGrayIcon} className={styles.icon} alt='' />}
        </Descriptions.Item>
        <Descriptions.Item label="紧急对讲激活">
          {pisStatusData.emergencyCallActive?<img src={stateGreenIcon} className={styles.icon} alt='' />:<img src={stateGrayIcon} className={styles.icon} alt='' />}
        </Descriptions.Item>
        <Descriptions.Item label="全自动模式">
          {pisStatusData.autoMode?<img src={stateGreenIcon} className={styles.icon} alt='' />:<img src={stateGrayIcon} className={styles.icon} alt='' />}
        </Descriptions.Item>
        <Descriptions.Item label="半自动模式">
          {pisStatusData.semiAutoMode?<img src={stateGreenIcon} className={styles.icon} alt='' />:<img src={stateGrayIcon} className={styles.icon} alt='' />}
        </Descriptions.Item>
        <Descriptions.Item label="手动模式">
          {pisStatusData.manualMode?<img src={stateGreenIcon} className={styles.icon} alt='' />:<img src={stateGrayIcon} className={styles.icon} alt='' />}
        </Descriptions.Item>
        <Descriptions.Item label="PECU1呼叫">
          {pisStatusData.pecu1Call?<img src={stateRedIcon} className={styles.icon} alt='' />:<img src={stateGrayIcon} className={styles.icon} alt='' />}
        </Descriptions.Item>
        <Descriptions.Item label="PECU1激活">
          {pisStatusData.pecu1Active?<img src={stateRedIcon} className={styles.icon} alt='' />:<img src={stateGrayIcon} className={styles.icon} alt='' />}
        </Descriptions.Item>
        <Descriptions.Item label="PECU2呼叫">
          {pisStatusData.pecu2Call?<img src={stateRedIcon} className={styles.icon} alt='' />:<img src={stateGrayIcon} className={styles.icon} alt='' />}
        </Descriptions.Item>
        <Descriptions.Item label="PECU2激活">
          {pisStatusData.pecu2Active?<img src={stateRedIcon} className={styles.icon} alt='' />:<img src={stateGrayIcon} className={styles.icon} alt='' />}
        </Descriptions.Item>
        <Descriptions.Item label="PECU3呼叫">
          {pisStatusData.pecu3Call?<img src={stateRedIcon} className={styles.icon} alt='' />:<img src={stateGrayIcon} className={styles.icon} alt='' />}
        </Descriptions.Item>
        <Descriptions.Item label="PECU3激活">
          {pisStatusData.pecu3Active?<img src={stateRedIcon} className={styles.icon} alt='' />:<img src={stateGrayIcon} className={styles.icon} alt='' />}
        </Descriptions.Item>
        <Descriptions.Item label="PECU4呼叫">
          {pisStatusData.pecu4Call?<img src={stateRedIcon} className={styles.icon} alt='' />:<img src={stateGrayIcon} className={styles.icon} alt='' />}
        </Descriptions.Item>
        <Descriptions.Item label="PECU4激活">
          {pisStatusData.pecu4Active?<img src={stateRedIcon} className={styles.icon} alt='' />:<img src={stateGrayIcon} className={styles.icon} alt='' />}
        </Descriptions.Item>
        <Descriptions.Item label="PECU5呼叫">
          {pisStatusData.pecu5Call?<img src={stateRedIcon} className={styles.icon} alt='' />:<img src={stateGrayIcon} className={styles.icon} alt='' />}
        </Descriptions.Item>
        <Descriptions.Item label="PECU5激活">
          {pisStatusData.pecu5Active?<img src={stateRedIcon} className={styles.icon} alt='' />:<img src={stateGrayIcon} className={styles.icon} alt='' />}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default StateParameter;
