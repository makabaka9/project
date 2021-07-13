import React, { FC } from 'react';
import autoHeight from '@/components/autoHeight';
import { Descriptions, Tabs } from 'antd';
import stateGreenIcon from '@/assets/stateGreen.svg';
import stateGrayIcon from '@/assets/stateGray.svg';
import stateRedIcon from '@/assets/stateRed.svg';
import styles from '../../style.less';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { TractionStateParametersDataType } from '../../data';

const { TabPane } = Tabs;
export interface StateParameterProps {
  height?: number;
  // forceFit?: boolean;
  // borderWidth?: number;
  tractionStateParameters: TractionStateParametersDataType;
}

const StateParameter: FC<StateParameterProps> = (props) => {
  const {
    tractionStateParameters,
  } = props;
  return (
    <div>
      {/* <Tabs defaultActiveKey="1" type="card" size="small" tabPosition="left"> */}
        {/* <TabPane tab="状态参数" key="1"> */}
          <Descriptions bordered size="small" column={5}>
            <Descriptions.Item label="牵引">
              <img src={tractionStateParameters.tow ? stateGreenIcon : stateGrayIcon} className={styles.icon} />
            </Descriptions.Item>
            <Descriptions.Item label="牵引逆变器启动">
              <img src={tractionStateParameters.startingOfTractionInverter ? stateGreenIcon : stateGrayIcon} className={styles.icon} />
            </Descriptions.Item>
            <Descriptions.Item label="牵引逆变器空转">
              <img src={tractionStateParameters.tractionInverterIdling ? stateGreenIcon : stateGrayIcon} className={styles.icon} />
            </Descriptions.Item>
            <Descriptions.Item label="牵引逆变器电制动">
              <img src={tractionStateParameters.electricBrakingOfTractionInverter ? stateGreenIcon : stateGrayIcon} className={styles.icon} />
            </Descriptions.Item>
            <Descriptions.Item label="高速断路器闭合">
              <img src={tractionStateParameters.highSpeedCircuitBreakerClosed ? stateGreenIcon : stateGrayIcon} className={styles.icon} />
            </Descriptions.Item>
            <Descriptions.Item label="充电接触器闭合">
              <img src={tractionStateParameters.chargingContactorClosed ? stateGreenIcon : stateGrayIcon} className={styles.icon} />
            </Descriptions.Item>
            <Descriptions.Item label="短接接触器闭合">
              <img src={tractionStateParameters.shortCircuitContactorClosed ? stateGreenIcon : stateGrayIcon} className={styles.icon} />
            </Descriptions.Item>
            <Descriptions.Item label="电制动可用">
              <img src={tractionStateParameters.electricBrakeAvailable ? stateGreenIcon : stateGrayIcon} className={styles.icon} />
            </Descriptions.Item>
            <Descriptions.Item label="电制动衰减">
              <img src={tractionStateParameters.electricBrakingAttenuation ? stateGreenIcon : stateGrayIcon} className={styles.icon} />
            </Descriptions.Item>
            <Descriptions.Item label="电制动滑行">
              <img src={tractionStateParameters.electricBrakingSliding ? stateGreenIcon : stateGrayIcon} className={styles.icon} />
            </Descriptions.Item>


          </Descriptions>
        {/* </TabPane>
        <TabPane tab="电流/电压等参数" key="2"> */}
          <Descriptions bordered size="small" column={6}>
            <Descriptions.Item label="中间电压">{tractionStateParameters.intermediateVoltage + "V"}</Descriptions.Item>
            <Descriptions.Item label="中间电流">{tractionStateParameters.intermediateCurrent + "A"}</Descriptions.Item>
            <Descriptions.Item label="电网电压">{tractionStateParameters.gridVoltage + "A"}</Descriptions.Item>
            <Descriptions.Item label="逆变电流">{tractionStateParameters.inverterCurrent + "A"}</Descriptions.Item>
            <Descriptions.Item label="电机综合转速">{tractionStateParameters.comprehensiveSpeedOfMotor + "km/h"}</Descriptions.Item>
            <Descriptions.Item label="斩波时间">{tractionStateParameters.chopTime + "ms"}</Descriptions.Item>
            <Descriptions.Item label="斩波电流1Ichop1">{tractionStateParameters.chopCurrent1 + "A"}</Descriptions.Item>
            <Descriptions.Item label="斩波电流2Ichop2 ">{tractionStateParameters.chopCurrent2 + "A"}</Descriptions.Item>
            <Descriptions.Item label="电机1温度">{tractionStateParameters.motorTemperature1 + "℃"}</Descriptions.Item>
            <Descriptions.Item label="电机2温度">{tractionStateParameters.motorTemperature2 + "℃"}</Descriptions.Item>
            <Descriptions.Item label="电机3温度">{tractionStateParameters.motorTemperature3 + "℃"}</Descriptions.Item>
            <Descriptions.Item label="电机4温度">{tractionStateParameters.motorTemperature4 + "℃"}</Descriptions.Item>
          </Descriptions>
        {/* </TabPane>
      </Tabs> */}
    </div>
  );
};

export default StateParameter;
