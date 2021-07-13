import React from 'react';
import { Steps, Typography, Row, Col, Space, Avatar } from 'antd';
import { CurrentDirType } from '../../data';
import TrainIcon from '@/assets/train.svg';
import styles from './index.less';

interface TrainStepsProps {
  data: CurrentDirType;
}
const { Step } = Steps;
const TrainSteps: React.FC<TrainStepsProps> = (props) => {
  const { data } = props;
  const stationPros = [
    { name: '那洪站' },
    { name: '那洪立交站' },
    { name: '金凯路站' },
    { name: '白沙壮锦立交站' },
    { name: '亭洪西路站' },
    { name: '旱塘站' },
    { name: '新阳路站' },
    { name: '广西大学站' },
    { name: '秀灵路站' },
    { name: '明秀路站' },
    { name: '北湖南路站' },
    { name: '虎丘村站' },
    { name: '狮山公园站' },
    { name: '小鸡村站' },
    { name: '邕宾立交站' },
    { name: '药用植物园站' },
    { name: '金桥客运站' },
  ];

  const stationLinePros = stationPros.map((item) => (
    <Step
      className={styles.stepRow}
      title={
        <div className={styles.dataCenter}>
          <Typography>{item.name}</Typography>
        </div>
      }
    />
  ));

  const stationCons = [
    { name: '金桥客运站' },
    { name: '药用植物园站' },
    { name: '邕宾立交站' },
    { name: '小鸡村站' },
    { name: '狮山公园站' },
    { name: '虎丘村站' },
    { name: '北湖南路站' },
    { name: '明秀路站' },
    { name: '秀灵路站' },
    { name: '广西大学站' },
    { name: '新阳路站' },
    { name: '旱塘站' },
    { name: '亭洪西路站' },
    { name: '白沙壮锦立交站' },
    { name: '金凯路站' },
    { name: '那洪立交站' },
    { name: '那洪站' },
  ];

  const stationLinecons = stationCons.map((item) => (
    <Step
      className={styles.stepRow}
      title={
        <div className={styles.dataCenter}>
          <Typography>{item.name}</Typography>
        </div>
      }
    />
  ));

  return (
    <div>
      <Row gutter={8}>
        <Col xl={4}>
          <div style={{ paddingLeft: 30 }}>
            <Space direction="vertical"  style={{ textAlign: 'center' }}>
            <Typography.Text style={{ fontSize: 16 }}>上行：那洪站 -{">"}金桥客运站站 </Typography.Text>
            </Space>
          </div>
        </Col>
        <Col xl={20}>
          <div>
            <span>
              {data?.upDirection?.map((item: any) => (
                <Avatar size={18} src={TrainIcon} style={{ marginLeft: 65 + 60 * item }} />
              ))}
            </span>
            <Steps progressDot current={-1}>
              {stationLinePros}
            </Steps>
          </div>
        </Col>
      </Row>
      <Row gutter={8} style={{ marginTop: 30 }}>
        <Col xl={4}>
          <div style={{ paddingLeft: 30 }}>
            <Space direction="vertical">
            <Typography.Text style={{ fontSize: 16 }}>下行：金桥客运站站 -{">"}那洪站</Typography.Text>
            </Space>
          </div>
        </Col>
        <Col xl={20}>
          <div>
            <span>
              {data?.downDirection?.map((item: any) => (
                <Avatar size={18} src={TrainIcon} style={{ marginLeft: 65 + 60 * item }} />
              ))}
            </span>
            <Steps progressDot current={-1}>
              {stationLinecons}
            </Steps>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default TrainSteps;
