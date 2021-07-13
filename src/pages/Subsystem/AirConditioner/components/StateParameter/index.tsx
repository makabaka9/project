import React from 'react';
import { Descriptions, Typography } from 'antd';
import stateGreenIcon from '@/assets/stateGreen.svg';
import stateGrayIcon from '@/assets/stateGray.svg';
import styles from '../../style.less';
import autoHeight from '@/components/autoHeight';

export interface StateParameterProps {
  data: any;
}

const StateParameter: React.FC<StateParameterProps> = (props) => {
  const { data } = props;

  return (
    <div>
      {/* <div style={{ paddingBottom: 8 }}>
        <span > <Typography.Text>空调模式参数</Typography.Text></span>
      </div>
      <Descriptions bordered
        // title="Custom Size" 
        column={7}>
        <Descriptions.Item label="集控"><CheckCircleFilled style={{color: '#52c41a' }} /></Descriptions.Item>
        <Descriptions.Item label="自动模式"><CloseCircleFilled  style={{ color: '#bfbfbf' }} /></Descriptions.Item>
        <Descriptions.Item label="通风"><CheckCircleFilled style={{color: '#52c41a' }} /></Descriptions.Item>
        <Descriptions.Item label="强风"><CheckCircleFilled style={{color: '#52c41a' }} /></Descriptions.Item>
        <Descriptions.Item label="预冷"><CheckCircleFilled style={{color: '#52c41a' }} /></Descriptions.Item>
        <Descriptions.Item label="减载模式"><CheckCircleFilled style={{color: '#52c41a' }} /></Descriptions.Item>
        <Descriptions.Item label="紧急通风"><CheckCircleFilled style={{color: '#52c41a' }} /></Descriptions.Item>
      </Descriptions> */}
      {/* <div style={{ paddingBottom: 8, paddingTop: 16 }}>
        <span > <Typography.Text>输出状态参数</Typography.Text></span>
      </div> */}
      <Descriptions
        bordered
        size="small"
        column={{ xxl: 7, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
      // title="Custom Size"
      // column={7}
      >
        {/* {data ? data.slice(11, 25).map(item => (
          <Descriptions.Item label={item.type}><CloseCircleFilled style={{ color: item.value ? '#52c41a' : '#bfbfbf' }} /></Descriptions.Item>
        ))
          : null} */}
        <Descriptions.Item label="机组1通风机1运行"><img src={data.unit1Ventilator1Up ? stateGreenIcon : stateGrayIcon} className={styles.icon} /></Descriptions.Item>
        <Descriptions.Item label="机组1通风机2运行"><img src={data.unit1Ventilator2Up ? stateGreenIcon
          : stateGrayIcon} className={styles.icon} /></Descriptions.Item>
        <Descriptions.Item label="机组1冷凝风机1运行"><img src={data.unit1Condenser1Up ? stateGreenIcon
          : stateGrayIcon} className={styles.icon} /></Descriptions.Item>
        <Descriptions.Item label="机组1冷凝风机2运行"><img src={data.unit1Compressor2Up ? stateGreenIcon
          : stateGrayIcon} className={styles.icon} /></Descriptions.Item>
        <Descriptions.Item label="机组1压缩机1运行"><img src={data.unit1Compressor1Up ? stateGreenIcon
          : stateGrayIcon} className={styles.icon} /></Descriptions.Item>
        <Descriptions.Item label="机组1压缩机2运行"><img src={data.unit1Compressor2Up ? stateGreenIcon
          : stateGrayIcon} className={styles.icon} /></Descriptions.Item>
        <Descriptions.Item label="机组1新风阀关闭"><img src={data.unit1AirValveDown ? stateGreenIcon
          : stateGrayIcon} className={styles.icon} /></Descriptions.Item>
        <Descriptions.Item label="机组2通风机1运行"><img src={data.unit2Ventilator1Up ? stateGreenIcon
          : stateGrayIcon} className={styles.icon} /></Descriptions.Item>
        <Descriptions.Item label="机组2通风机2运行"><img src={data.unit2Ventilator2Up ? stateGreenIcon
          : stateGrayIcon} className={styles.icon} /></Descriptions.Item>
        <Descriptions.Item label="机组2冷凝风机1运行"><img src={data.unit2Condenser1Up ? stateGreenIcon
          : stateGrayIcon} className={styles.icon} /></Descriptions.Item>
        <Descriptions.Item label="机组2冷凝风机2运行"><img src={data.unit2Condenser2Up ? stateGreenIcon
          : stateGrayIcon} className={styles.icon} /></Descriptions.Item>
        <Descriptions.Item label="机组2压缩机1运行"><img src={data.unit2Compressor1Up ? stateGreenIcon
          : stateGrayIcon} className={styles.icon} /></Descriptions.Item>
        <Descriptions.Item label="机组2压缩机2运行"><img src={data.unit2Compressor2Up ? stateGreenIcon
          : stateGrayIcon} className={styles.icon} /></Descriptions.Item>
        <Descriptions.Item label="机组2新风阀关闭"><img src={data.unit2AirValveDown ? stateGreenIcon
          : stateGrayIcon} className={styles.icon} /></Descriptions.Item>
        {/* <Descriptions.Item label="机组1通风机1运行"><CheckCircleFilled style={{ color: data.unit1Ventilator1Up ? '#52c41a' : '#bfbfbf' }} /></Descriptions.Item>
        <Descriptions.Item label="机组1通风机2运行"><CheckCircleFilled style={{ color: data.unit1Ventilator2Up ? '#52c41a' : '#bfbfbf' }} /></Descriptions.Item>
        <Descriptions.Item label="机组1冷凝风机1运行"><CheckCircleFilled style={{ color: data.unit1Condenser1Up ? '#52c41a' : '#bfbfbf' }} /></Descriptions.Item>
        <Descriptions.Item label="机组1冷凝风机2运行"><CheckCircleFilled style={{ color: data.unit1Condenser2Up ? '#52c41a' : '#bfbfbf' }} /></Descriptions.Item>
        <Descriptions.Item label="机组1压缩机1运行"><CheckCircleFilled style={{ color: data.unit1Compressor1Up ? '#52c41a' : '#bfbfbf' }} /></Descriptions.Item>
        <Descriptions.Item label="机组1压缩机2运行"><CheckCircleFilled style={{ color: data.unit1Compressor2Up ? '#52c41a' : '#bfbfbf' }} /></Descriptions.Item>
        <Descriptions.Item label="机组1新风阀关闭"><CheckCircleFilled style={{ color: data.unit1AirValveDown ? '#52c41a' : '#bfbfbf' }} /></Descriptions.Item>
        <Descriptions.Item label="机组2通风机1运行"><CheckCircleFilled style={{ color: data.unit2Ventilator1Up ? '#52c41a' : '#bfbfbf' }} /></Descriptions.Item>
        <Descriptions.Item label="机组2通风机2运行"><CheckCircleFilled style={{ color: data.unit2Ventilator2Up ? '#52c41a' : '#bfbfbf' }} /></Descriptions.Item>
        <Descriptions.Item label="机组2冷凝风机1运行"><CheckCircleFilled style={{ color: data.unit2Condenser1Up ? '#52c41a' : '#bfbfbf' }} /></Descriptions.Item>
        <Descriptions.Item label="机组2冷凝风机2运行"><CheckCircleFilled style={{ color: data.unit2Condenser2Up ? '#52c41a' : '#bfbfbf' }} /></Descriptions.Item>
        <Descriptions.Item label="机组2压缩机1运行"><CheckCircleFilled style={{ color: data.unit2Compressor1Up ? '#52c41a' : '#bfbfbf' }} /></Descriptions.Item>
        <Descriptions.Item label="机组2压缩机2运行"><CheckCircleFilled style={{ color: data.unit2Compressor2Up ? '#52c41a' : '#bfbfbf' }} /></Descriptions.Item>
        <Descriptions.Item label="机组2新风阀关闭"><CheckCircleFilled style={{ color: data.unit2AirValveDown ? '#52c41a' : '#bfbfbf' }} /></Descriptions.Item> */}
      </Descriptions>
    </div>
  );
};

export default autoHeight()(StateParameter);
