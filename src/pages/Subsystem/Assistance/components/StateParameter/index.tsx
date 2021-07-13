import React from 'react';
import autoHeight from '@/components/autoHeight';
import { Descriptions, Tabs } from 'antd';
import stateGreenIcon from '@/assets/stateGreen.svg';
import stateGrayIcon from '@/assets/stateGray.svg';
import stateRedIcon from '@/assets/stateRed.svg';
import styles from '../../style.less';
import { ExclamationCircleFilled, CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
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
    auxiliaryStatusData,
  } = props;


  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        type="card"
        size="small"
      //  onChange={callback}
      >
        <TabPane tab="状态数据" key="1">
          <Descriptions
            bordered
            size="small"
            // title="Custom Size"
            column={5}
          >
            <Descriptions.Item label="充电机轻微故障">
              <img src={auxiliaryStatusData.chargerSlightFault ? stateRedIcon : stateGrayIcon} className={styles.icon} />
            </Descriptions.Item>
            <Descriptions.Item label="充电机中等故障">
              <img src={auxiliaryStatusData.chargerMediumFault ? stateRedIcon : stateGrayIcon} className={styles.icon} />
            </Descriptions.Item>
            <Descriptions.Item label="充电机严重故障">
              <img src={auxiliaryStatusData.chargerSeriousFault ? stateRedIcon : stateGrayIcon} className={styles.icon} />
            </Descriptions.Item>
            <Descriptions.Item label="SIV轻微故障">
              <img src={auxiliaryStatusData.sivslightFault ? stateRedIcon : stateGrayIcon} className={styles.icon} />
            </Descriptions.Item>
            <Descriptions.Item label="SIV中等故障">
              <img src={auxiliaryStatusData.sivmediumFault ? stateRedIcon : stateGrayIcon} className={styles.icon} />
            </Descriptions.Item>
            <Descriptions.Item label="SIV严重故障">
              <img src={auxiliaryStatusData.sivseriousFault ? stateRedIcon : stateGrayIcon} className={styles.icon} />
            </Descriptions.Item>
            <Descriptions.Item label="逆变模块超温">
              <img src={auxiliaryStatusData.inverterModuleOverTemperature ? stateRedIcon : stateGrayIcon} className={styles.icon} />
            </Descriptions.Item>
            <Descriptions.Item label="充电机模块超温">
              <img src={auxiliaryStatusData.chargerModuleOverTemperature ? stateRedIcon : stateGrayIcon} className={styles.icon} />
            </Descriptions.Item>
            <Descriptions.Item label="蓄电池高温报警">
              <img src={auxiliaryStatusData.batteryHighTemperatureAlarm ? stateRedIcon : stateGrayIcon} className={styles.icon} />
            </Descriptions.Item>
            <Descriptions.Item label="蓄电池低温报警">
              <img src={auxiliaryStatusData.batteryLowTemperatureAlarm ? stateRedIcon : stateGrayIcon} className={styles.icon} />
            </Descriptions.Item>
            <Descriptions.Item label="蓄电池电压低黄色预警">
              <img src={auxiliaryStatusData.lowBatteryVoltageYellowWarning ? stateRedIcon : stateGrayIcon} className={styles.icon} />
            </Descriptions.Item>
            <Descriptions.Item label="蓄电池电压低红色报警">
              <img src={auxiliaryStatusData.lowBatteryVoltageRedAlarm ? stateRedIcon : stateGrayIcon} className={styles.icon} />
            </Descriptions.Item>
            <Descriptions.Item label="逆变器短路接触器KM1">
              <img src={auxiliaryStatusData.inverterShortCircuitContactorKM1 ? stateGreenIcon : stateGrayIcon} className={styles.icon} />
            </Descriptions.Item>
            <Descriptions.Item label="逆变器充电接触器KM2">
              <img src={auxiliaryStatusData.inverterChargingContactorKM2 ? stateGreenIcon : stateGrayIcon} className={styles.icon} />
            </Descriptions.Item>
            <Descriptions.Item label="逆变器输出接触器KMA">
              <img src={auxiliaryStatusData.inverterOutputContactorKMA ? stateGreenIcon : stateGrayIcon} className={styles.icon} />
            </Descriptions.Item>
            <Descriptions.Item label="变速风机接触器K12">
              <img src={auxiliaryStatusData.variableSpeedFanContactorK12 ? stateGreenIcon : stateGrayIcon} className={styles.icon} />
            </Descriptions.Item>
            <Descriptions.Item label="变速风机接触器K13">
              <img src={auxiliaryStatusData.variableSpeedFanContactorK13 ? stateGreenIcon : stateGrayIcon} className={styles.icon} />
            </Descriptions.Item>
            <Descriptions.Item label="散热风机断路器状态信号K4">
              <img src={auxiliaryStatusData.coolingFanCircuitBreakerStatusSignalK4 ? stateGreenIcon : stateGrayIcon} className={styles.icon} />
            </Descriptions.Item>
            <Descriptions.Item label="应急电源启动">
              <img src={auxiliaryStatusData.emergencyPowerOn ? stateGreenIcon : stateGrayIcon} className={styles.icon} />
            </Descriptions.Item>
            <Descriptions.Item label="充电机输入保护开关QF11">
              <img src={auxiliaryStatusData.chargerInputProtectionSwitchQF11 ? stateGreenIcon : stateGrayIcon} className={styles.icon} />
            </Descriptions.Item>
            <Descriptions.Item label="充电机KM11接触器">
              <img src={auxiliaryStatusData.chargerKM11Contactor ? stateGreenIcon : stateGrayIcon} className={styles.icon} />
            </Descriptions.Item>
            <Descriptions.Item label="充电机输出OK反馈">
              <img src={auxiliaryStatusData.chargerOutputOKFeedback ? stateGreenIcon : stateGrayIcon} className={styles.icon} />
            </Descriptions.Item>
            <Descriptions.Item label="辅变输出OK反馈">
              <img src={auxiliaryStatusData.auxiliaryTransformerOutputOKFeedback ? stateGreenIcon : stateGrayIcon} className={styles.icon} />
            </Descriptions.Item>
            <Descriptions.Item label="充电机输出正常">
              <img src={auxiliaryStatusData.theOutputOfChargerIsNormal ? stateGreenIcon : stateGrayIcon} className={styles.icon} />
            </Descriptions.Item>
            <Descriptions.Item label="逆变器输出三相电压正常">
              <img src={auxiliaryStatusData.inverterOutputThreePhaseVoltageIsNormal ? stateGreenIcon : stateGrayIcon} className={styles.icon} />
            </Descriptions.Item>
          </Descriptions>
        </TabPane>
        <TabPane tab="电流/电压等数据" key="2">
          <Descriptions
            bordered
            // title="Custom Size"
            size="small"
            column={5}
          >
            <Descriptions.Item label="线路输入电压">{auxiliaryStatusData.lineInputVoltage + "V"}</Descriptions.Item>
            <Descriptions.Item label="逆变器输入电流">{auxiliaryStatusData.inverterInputCurrent + "A"}</Descriptions.Item>
            <Descriptions.Item label="逆变电路输出线电压">{auxiliaryStatusData.outputLineVoltageOfInverterCircuit + "V"}</Descriptions.Item>
            <Descriptions.Item label="逆变器中间电容电压">{auxiliaryStatusData.voltageOfIntermediateCapacitorOfInverter + "V"}</Descriptions.Item>
            <Descriptions.Item label="逆变器输出U相电压">{auxiliaryStatusData.inverterOutputPhaseVoltageU + "V"}</Descriptions.Item>
            <Descriptions.Item label="逆变器输出V相电压">{auxiliaryStatusData.inverterOutputPhaseVoltageV + "V"}</Descriptions.Item>
            <Descriptions.Item label="逆变器输出W相电压">{auxiliaryStatusData.inverterOutputPhaseVoltageW + "V"}</Descriptions.Item>
            <Descriptions.Item label="逆变器输出A相电流">{auxiliaryStatusData.inverterOutputPhaseVoltageA + "A"}</Descriptions.Item>
            <Descriptions.Item label="逆变器输出C相电流">{auxiliaryStatusData.inverterOutputPhaseVoltageC + "A"}</Descriptions.Item>
            <Descriptions.Item label="逆变器输出U电流">{auxiliaryStatusData.inverterOutputCurrentU + "A"}</Descriptions.Item>
            <Descriptions.Item label="逆变器输出V电流">{auxiliaryStatusData.inverterOutputCurrentV + "A"}</Descriptions.Item>
            <Descriptions.Item label="逆变器输出W电流">{auxiliaryStatusData.inverterOutputCurrentW + "A"}</Descriptions.Item>
            {/* <Descriptions.Item label="斩波电流1Ichop1">110A</Descriptions.Item>
        <Descriptions.Item label="斩波电流2Ichop2 ">110A</Descriptions.Item> */}
            <Descriptions.Item label="逆变器输出频率">{auxiliaryStatusData.inverterOutputFrequency + "Hz"}</Descriptions.Item>
            <Descriptions.Item label="充电机输入整流桥后直流电压">{auxiliaryStatusData.outputVoltageOfChargerCircuit + "V"}</Descriptions.Item>
            <Descriptions.Item label="充电机电路输出电压">{auxiliaryStatusData.outputCurrentOfChargerCircuit + "V"}</Descriptions.Item>
            <Descriptions.Item label="充电机电路输出电流">{auxiliaryStatusData.chargingCurrentOfBatteryOfCharger + "A"}</Descriptions.Item>
            <Descriptions.Item label="充电机蓄电池充电电流">{auxiliaryStatusData.batteryTemperature + "A"}</Descriptions.Item>
            <Descriptions.Item label="蓄电池温度">{auxiliaryStatusData.inverterModuleTemperature + "°C"}</Descriptions.Item>
            <Descriptions.Item label="逆变模块温度">{auxiliaryStatusData.dcvoltageAfterRectifierBridgeInputByCharger*0.1 + "°C"}</Descriptions.Item>
          </Descriptions>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default StateParameter;
