import React from 'react';
import { Descriptions, Tabs } from 'antd';
import { CloseCircleFilled, CheckCircleFilled } from '@ant-design/icons';
import { BrakeOperationStatusMonitoringDataType } from '../../data';
import stateGreenIcon from '@/assets/stateGreen.svg';
import stateGrayIcon from '@/assets/stateGray.svg';
import stateRedIcon from '@/assets/stateRed.svg';
import styles from '../../style.less';

const { TabPane } = Tabs;
export interface StateParameterProps {
  height?: number;
  // forceFit?: boolean;
  // borderWidth?: number;
  data: BrakeOperationStatusMonitoringDataType,
}

const StateParameter: React.FC<StateParameterProps> = (props) => {
  const {
    data
  } = props;
  // const brakeOperationStatusMonitoring = data
  // console.log("666", data)

  return (
    <div>
      <Tabs defaultActiveKey="1" type="card" size="small" tabPosition="left">
        <TabPane tab="状态参数" key="1">
          <Descriptions bordered size="small" column={5}>
            <Descriptions.Item label="车架1滑行">
              <img src={data.frameSliding1 ? stateGreenIcon : stateGrayIcon} className={styles.icon} />
            </Descriptions.Item>
            <Descriptions.Item label="车架1紧急制动施加">
              <img src={data.frameEmergencyBrakeApplication1 ? stateGreenIcon : stateGrayIcon} className={styles.icon} />
            </Descriptions.Item>
            <Descriptions.Item label="车架1制动已缓解">
              <img src={data.frameBrakeReleased1 ? stateGreenIcon : stateGrayIcon} className={styles.icon} />
            </Descriptions.Item>
            <Descriptions.Item label="车架1制动风缸压力低">
              <img src={data.lowPressureOfBrakeAirCylinderOfFrame1 ? stateGreenIcon : stateGrayIcon} className={styles.icon} />
            </Descriptions.Item>
            <Descriptions.Item label="车架1气制动状态">
              <img src={data.frameAirBrakeStatus1 ? stateGreenIcon : stateGrayIcon} className={styles.icon} />
            </Descriptions.Item>
            <Descriptions.Item label="车架2滑行">
              <img src={data.frameSliding2 ? stateGreenIcon : stateGrayIcon} className={styles.icon} />
            </Descriptions.Item>
            <Descriptions.Item label="车架2紧急制动施加">
              <img src={data.frameEmergencyBrakeApplication2 ? stateGreenIcon : stateGrayIcon} className={styles.icon} />
            </Descriptions.Item>
            <Descriptions.Item label="车架2制动已缓解">
              <img src={data.frameBrakeReleased2 ? stateGreenIcon : stateGrayIcon} className={styles.icon} />
            </Descriptions.Item>
            <Descriptions.Item label="车架2制动风缸压力低">
              <img src={data.lowPressureOfBrakeAirCylinderOfFrame2 ? stateGreenIcon : stateGrayIcon} className={styles.icon} />
            </Descriptions.Item>
            <Descriptions.Item label="车架2气制动状态">
              <img src={data.frameAirBrakeStatus2 ? stateGreenIcon : stateGrayIcon} className={styles.icon} />
            </Descriptions.Item>
          </Descriptions>
        </TabPane>
        <TabPane tab="输出数值" key="2">
          <Descriptions bordered size="small" column={6}>
            <Descriptions.Item label="车架1制动风缸压力">{data.brakeFrameAirCylinderPressure1*0.05 + "kPa"}</Descriptions.Item>
            <Descriptions.Item label="车架1制动实际力">{data.actualBrakingForceOfFrame1*0.01 + "kN"}</Descriptions.Item>
            <Descriptions.Item label="车架1制动缸压力">{data.frameBrakeCylinderPressure1*0.05 + "kPa"}</Descriptions.Item>
            <Descriptions.Item label="车架1气制动能力 ">{data.airBrakeCapacityOfFrame1*0.01 + "kN"}</Descriptions.Item>
            <Descriptions.Item label="车架1空簧1压力">{data.frame1AirSpring1Pressure*0.05 + "kPa"}</Descriptions.Item>
            <Descriptions.Item label="车架1空簧2压力">{data.frame1AirSpring2Pressure*0.05 + "kPa"}</Descriptions.Item>
            <Descriptions.Item label="车架2制动风缸压力">{data.brakeFrameAirCylinderPressure2*0.05 + "kPa"}</Descriptions.Item>
            <Descriptions.Item label="车架2制动实际力">{data.actualBrakingForceOfFrame2*0.01 + "kN"}</Descriptions.Item>
            <Descriptions.Item label="车架2制动缸压力">{data.frameBrakeCylinderPressure2*0.05 + "kPa"}</Descriptions.Item>
            <Descriptions.Item label="车架2气制动能力">{data.airBrakeCapacityOfFrame2*0.01 + "kN"}</Descriptions.Item>
            <Descriptions.Item label="车架2空簧1压力">{data.frame2AirSpring1Pressure*0.05 + "kPa"}</Descriptions.Item>
            <Descriptions.Item label="车架2空簧2压力 ">{data.brakeFrameAirCylinderPressure1*0.05 + "kPa"}</Descriptions.Item>
            <Descriptions.Item label="1轴速度">{data.axialSpeed1 + "km/h"}</Descriptions.Item>
            <Descriptions.Item label="2轴速度">{data.axialSpeed2 + "km/h"}</Descriptions.Item>
            <Descriptions.Item label="3轴速度">{data.axialSpeed3 + "km/h"}</Descriptions.Item>
            <Descriptions.Item label="4轴速度">{data.axialSpeed4 + "km/h"}</Descriptions.Item>
          </Descriptions>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default StateParameter;
