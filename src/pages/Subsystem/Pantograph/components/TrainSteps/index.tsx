import React from 'react';
import { Steps, Typography, Row, Col, Space, Progress, Descriptions } from 'antd';
import styles from './style.less';
import stateGreenIcon from '@/assets/stateGreen.svg';
import stateGrayIcon from '@/assets/stateGray.svg';
import stateRedIcon from '@/assets/stateRed.svg';

import { CheckCircleFilled } from '@ant-design/icons';

// import autoHeight from '@/components/autoHeight'

interface TrainStepsProps {
  // height?: number;
  // data?: Array<any>;
}

const { Step } = Steps;

const TrainSteps: React.FC<TrainStepsProps> = () => {
  // const { data } = props;

  const stationPros = [
    { name: '莘庄站' },
    { name: '春申路站' },
    { name: '银都路站' },
    { name: '颖桥站' },
    { name: '北桥站' },
    { name: '剑川路站' },
    { name: '东川路站' },
    { name: '江川路站' },
    { name: '西波站' },
    { name: '萧塘站' },
    { name: '莘浦大道站' },
    { name: '环城东路站' },
    { name: '望园路站' },
    { name: '金海湖站' },
    { name: '莘贤新城站' },
    { name: '北桥站' },
    { name: '金平路站' },
    { name: '闵行开发区站' },
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
    { name: '闵行开发区站' },
    { name: '金平路站' },
    { name: '北桥站' },
    { name: '莘贤新城站' },
    { name: '金海湖站' },
    { name: '望园路站' },
    { name: '环城东路站' },
    { name: '莘浦大道站' },
    { name: '萧塘站' },
    { name: '西波站' },
    { name: '江川路站' },
    { name: '东川路站' },
    { name: '剑川路站' },
    { name: '北桥站' },
    { name: '颖桥站' },
    { name: '银都路站' },
    { name: '春申路站' },
    { name: '莘庄站' },
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
      <Row gutter={4}>
        <Col xl={2} >
          <div style={{ paddingLeft: 2 }}>
            <Descriptions column={1}>
              <Descriptions.Item label="网压">1400V</Descriptions.Item>
              <Descriptions.Item label="网流">1810A</Descriptions.Item>
              <Descriptions.Item label="受电弓降下">
                <img src={stateGreenIcon}
                  className={styles.icon} />
              </Descriptions.Item>
              <Descriptions.Item label="受电弓升起">
                <img src={stateGrayIcon}
                  className={styles.icon} /></Descriptions.Item>
            </Descriptions>
          </div>
        </Col>
        <Col xl={22} >
          <Row gutter={4}>
            <Col xl={4}>
              <div style={{ paddingLeft: 20 }}>
                <Space direction="vertical">
                  {/* <Tag color="cyan"> 莘庄站—>闵行开发区站</Tag> */}
                  <Typography.Text style={{ fontSize: 16, color: "#1890ff" }}>
                    上行：莘庄站 ->闵行开发区站
                  </Typography.Text>
                </Space>
              </div>
            </Col>
            <Col xl={20}>
              {/* <Progress
                strokeColor={{
                  '0%': 'green',
                  '7%': 'red',
                  '14%': 'green',
                  '21%': 'red',
                  '100%': 'green',
                }}
                percent={100}
              /> */}
              <div style={{ marginLeft: -35, marginRight: 10, padding: 0 }}>
                <Steps progressDot current={6}>
                  {stationLinePros}
                </Steps>
              </div>
            </Col>
          </Row>
          <Row gutter={4} >
            <Col xl={4}>
              <div style={{ paddingLeft: 20, }}>
                <Space direction="vertical">
                  {/* <Tag color="cyan"> 闵行开发区站—>莘庄站</Tag> */}
                  <Typography.Text strong style={{ fontSize: 16, color: "#1890ff" }}>
                    下行：闵行开发区站->莘庄站
                  </Typography.Text>
                </Space>
              </div>
            </Col>
            <Col xl={20}>
              {/* <Progress
                strokeColor={{
                  '0%': 'green',
                  '7%': 'red',
                  '14%': 'green',
                  '21%': 'red',
                  '100%': 'green',
                }}
                percent={100}
              /> */}
              <div style={{ marginLeft: -35, marginRight: 10, padding: 0 }}>
                <Steps progressDot current={6}>
                  {stationLinecons}
                </Steps>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
// export default autoHeight()(TrainSteps);
export default TrainSteps;
