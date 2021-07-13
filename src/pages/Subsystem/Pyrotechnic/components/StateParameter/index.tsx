import React from 'react';
import autoHeight from '@/components/autoHeight';
import { Descriptions, Tabs } from 'antd';
import stateGreenIcon from '@/assets/stateGreen.svg';
import stateGrayIcon from '@/assets/stateGray.svg';
import stateRedIcon from '@/assets/stateRed.svg';
import stateWarnIcon from '@/assets/stateWarn.svg';
import stateOrangeIcon from '@/assets/stateOrange.svg';
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
    detectorStatusData,
  } = props;
  const renderFunction=(value)=>{

    switch (value){
      case 0:
        return (<img src={stateGrayIcon} className={styles.icon} alt='' />)
      case 1:
        return (<img src={stateGreenIcon} className={styles.icon} alt='' />)
      case 2:
        return (<img src={stateOrangeIcon} className={styles.icon} alt='' />)
      case 3:
        return (<img src={stateWarnIcon} className={styles.icon} alt='' />)
      case 4:
        return (<img src={stateRedIcon} className={styles.icon} alt='' />)
      default:
          return (<img src={stateGrayIcon} className={styles.icon} alt='' />)

    }
  }

  return (
    <div>
      <Descriptions
        bordered
        size="small"
        // title="Custom Size"
        column={7}
      >
        {detectorStatusData?Object.values(detectorStatusData)?.map((item,index)=>
          (<Descriptions.Item label={"探测器"+(index+1)+"状态"}>
            {renderFunction(item)}
          </Descriptions.Item>)
        ):null}

        {/*<Descriptions.Item label="探测器2状态">*/}
        {/*  {renderFunction(detectorStatusData?.detectorStatus2)}*/}
        {/*</Descriptions.Item>*/}
        {/*<Descriptions.Item label="探测器3状态">*/}
        {/*  {renderFunction(detectorStatusData?.detectorStatus3)}*/}
        {/*</Descriptions.Item>*/}
        {/*<Descriptions.Item label="探测器4状态">*/}
        {/*  {renderFunction(detectorStatusData?.detectorStatus4)}*/}
        {/*</Descriptions.Item>*/}
        {/*<Descriptions.Item label="探测器5状态">*/}
        {/*  {renderFunction(detectorStatusData?.detectorStatus5)}*/}
        {/*</Descriptions.Item>*/}
        {/*<Descriptions.Item label="探测器6状态">*/}
        {/*  {renderFunction(detectorStatusData?.detectorStatus1)}*/}
        {/*</Descriptions.Item>*/}
        {/*<Descriptions.Item label="探测器7状态">*/}
        {/*  {renderFunction(detectorStatusData?.detectorStatus1)}*/}
        {/*</Descriptions.Item>*/}
        {/*<Descriptions.Item label="探测器8状态">*/}
        {/*  {renderFunction(detectorStatusData?.detectorStatus1)}*/}
        {/*</Descriptions.Item>*/}
        {/*<Descriptions.Item label="探测器9状态">*/}
        {/*  {renderFunction(detectorStatusData?.detectorStatus1)}*/}
        {/*</Descriptions.Item>*/}
        {/*<Descriptions.Item label="探测器10状态">*/}
        {/*  {renderFunction(detectorStatusData?.detectorStatus1)}*/}
        {/*</Descriptions.Item>*/}
        {/*<Descriptions.Item label="探测器11状态">*/}
        {/*  {renderFunction(detectorStatusData?.detectorStatus1)}*/}
        {/*</Descriptions.Item>*/}
        {/*<Descriptions.Item label="探测器12状态">*/}
        {/*  {renderFunction(detectorStatusData?.detectorStatus1)}*/}
        {/*</Descriptions.Item>*/}
        {/*<Descriptions.Item label="探测器13状态">*/}
        {/*  {renderFunction(detectorStatusData?.detectorStatus1)}*/}
        {/*</Descriptions.Item>*/}
        {/*<Descriptions.Item label="探测器14状态">*/}
        {/*  {renderFunction(detectorStatusData?.detectorStatus1)}*/}
        {/*</Descriptions.Item>*/}
        {/*<Descriptions.Item label="探测器15状态">*/}
        {/*  {renderFunction(detectorStatusData?.detectorStatus1)}*/}
        {/*</Descriptions.Item>*/}
        {/*<Descriptions.Item label="探测器16状态">*/}
        {/*  {renderFunction(detectorStatusData?.detectorStatus1)}*/}
        {/*</Descriptions.Item>*/}
        {/*<Descriptions.Item label="探测器17状态">*/}
        {/*  {renderFunction(detectorStatusData?.detectorStatus1)}*/}
        {/*</Descriptions.Item>*/}
        {/*<Descriptions.Item label="探测器18状态">*/}
        {/*  {renderFunction(detectorStatusData?.detectorStatus1)}*/}
        {/*</Descriptions.Item>*/}
        {/*<Descriptions.Item label="探测器19状态">*/}
        {/*  {renderFunction(detectorStatusData?.detectorStatus1)}*/}
        {/*</Descriptions.Item>*/}
        {/*<Descriptions.Item label="探测器20状态">*/}
        {/*  {renderFunction(detectorStatusData?.detectorStatus1)}*/}
        {/*</Descriptions.Item>*/}
        {/*<Descriptions.Item label="探测器21状态">*/}
        {/*  {renderFunction(detectorStatusData?.detectorStatus1)}*/}
        {/*</Descriptions.Item>*/}
        {/*<Descriptions.Item label="探测器22状态">*/}
        {/*  {renderFunction(detectorStatusData?.detectorStatus1)}*/}
        {/*</Descriptions.Item>*/}
        {/*<Descriptions.Item label="探测器23状态">*/}
        {/*  {renderFunction(detectorStatusData?.detectorStatus1)}*/}
        {/*</Descriptions.Item>*/}
        {/*<Descriptions.Item label="探测器24状态">*/}
        {/*  {renderFunction(detectorStatusData?.detectorStatus1)}*/}
        {/*</Descriptions.Item>*/}
        {/*<Descriptions.Item label="探测器25状态">*/}
        {/*  {renderFunction(detectorStatusData?.detectorStatus1)}*/}
        {/*</Descriptions.Item>*/}
        {/*<Descriptions.Item label="探测器26状态">*/}
        {/*  {renderFunction(detectorStatusData?.detectorStatus1)}*/}
        {/*</Descriptions.Item>*/}
        {/*<Descriptions.Item label="探测器27状态">*/}
        {/*  {renderFunction(detectorStatusData?.detectorStatus1)}*/}
        {/*</Descriptions.Item>*/}
        {/*<Descriptions.Item label="探测器28状态">*/}
        {/*  {renderFunction(detectorStatusData?.detectorStatus1)}*/}
        {/*</Descriptions.Item>*/}
        {/*<Descriptions.Item label="探测器29状态">*/}
        {/*  {renderFunction(detectorStatusData?.detectorStatus1)}*/}
        {/*</Descriptions.Item>*/}
        {/*<Descriptions.Item label="探测器30状态">*/}
        {/*  {renderFunction(detectorStatusData?.detectorStatus1)}*/}
        {/*</Descriptions.Item>*/}
        {/*<Descriptions.Item label="探测器31状态">*/}
        {/*  {renderFunction(detectorStatusData?.detectorStatus1)}*/}
        {/*</Descriptions.Item>*/}
        {/*<Descriptions.Item label="探测器32状态">*/}
        {/*  {renderFunction(detectorStatusData?.detectorStatus1)}*/}
        {/*</Descriptions.Item>*/}
        {/*<Descriptions.Item label="探测器33状态">*/}
        {/*  {renderFunction(detectorStatusData?.detectorStatus1)}*/}
        {/*</Descriptions.Item>*/}
        {/*<Descriptions.Item label="探测器34状态">*/}
        {/*  {renderFunction(detectorStatusData?.detectorStatus1)}*/}
        {/*</Descriptions.Item>*/}
      </Descriptions>
    </div>
  );
};

export default StateParameter;
