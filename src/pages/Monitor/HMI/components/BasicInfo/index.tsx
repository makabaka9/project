import { Descriptions, Avatar, Row, Col, Steps } from 'antd';
import React from 'react';
import {
  ExclamationCircleOutlined,
  EnvironmentOutlined,
  DashboardOutlined,
  KeyOutlined,
  RedoOutlined,
  ControlOutlined,
  PlusCircleOutlined,
  PlayCircleOutlined,
  FileMarkdownOutlined,
  PoweroffOutlined,
  FieldTimeOutlined,
  SwapOutlined,
  SyncOutlined,
  RadarChartOutlined,
  AimOutlined,
} from '@ant-design/icons';
import CarIcon from '@/assets/Car.svg';
import airConditionerIcon from '../images/空调.svg';

// import TempratureIcon from '@/assets/Temprature.svg';
import { BasicInfoDataType } from '../../data';
// import transform from 'wgs2mars';
// import GetDistance from '@/components/GetDistance'
import styles from './index.less';

const { Step } = Steps;
interface BasicInfoProps {
  // data: BasicInfoDataType;
  height: any
}
const BasicInfo: React.FC<BasicInfoProps> = (props) => {
  const { height = 1, data } = props;
  const chartHeight = height + 100;
  return (
    <div style={{ height: chartHeight }}>

      <Row gutter={24}>
        <Col
          xl={16}
          lg={12}
          sm={24}
          xs={24}
        >
          <Descriptions title="列车基本信息" style={{ marginBottom: 1, marginTop: 20 }} column={2}>
            <Descriptions.Item
              label={
                <span>
                  <Avatar
                    size="small"
                    style={{ backgroundColor: 'rgb(0,0,0,0.1)', color: '#1890ff' }}
                    src={CarIcon}
                  />
               车号
            </span>
              }
              className={styles.descriptions}
            >
              NNL0501
              {/* {data?.trainCode ? 'NNL' + data?.trainCode : null} */}
            </Descriptions.Item>

            <Descriptions.Item
              label={
                <span>
                  <Avatar
                    size="small"
                    style={{ backgroundColor: 'rgb(0,0,0,0.1)', color: '#1890ff' }}
                    icon={<PoweroffOutlined />}
                  />
               列车状态
            </span>
              }
            >正线
              {/* {data?.createTime ? 'CJ6-0' + data?.createTime : null} */}
            </Descriptions.Item>

            <Descriptions.Item
              label={
                <span>
                  <Avatar
                    size="small"
                    style={{ backgroundColor: 'rgb(0,0,0,0.1)', color: '#1890ff' }}
                    icon={<DashboardOutlined />}
                  />
               运行速度
            </span>
              }
            >60km/h
              {/* {data?.weight ? 'CJ6-0' + data?.weight + '吨' : null} */}
            </Descriptions.Item>

            <Descriptions.Item
              label={
                <span>
                  <Avatar
                    size="small"
                    style={{ backgroundColor: 'rgb(0,0,0,0.1)', color: '#52c41a' }}
                    icon={<AimOutlined />}
                  />
               运行工况
            </span>
              }
            >
              牵引
              {/* {data?.operatingMileage ? data?.operatingMileage + 'km' : null} */}
            </Descriptions.Item>

            <Descriptions.Item
              label={
                <span>
                  <Avatar
                    size="small"
                    style={{ backgroundColor: 'rgb(0,0,0,0.1)', color: '#52c41a' }}
                    icon={<ControlOutlined />}
                  />
               牵引/制动级位
            </span>
              }
            >60%
              {/* {data?.totalEnergyConsumption ? data?.totalEnergyConsumption + 'kw' : null} */}
            </Descriptions.Item>

            <Descriptions.Item
              label={
                <span>
                  <Avatar
                    size="small"
                    style={{ backgroundColor: 'rgb(0,0,0,0.1)', color: '#52c41a' }}
                    icon={<SwapOutlined />}
                  />
               运行方向
            </span>
              }
            >
              上行
              {/* {data?.totalLoad ? data?.totalLoad + '万吨' : null} */}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <span>
                  <Avatar
                    size="small"
                    style={{ backgroundColor: 'rgb(0,0,0,0.1)', color: '#1890ff' }}
                    icon={<SyncOutlined />}
                  />
               模式信息
            </span>
              }
            >
              ATO模式
              {/* {data?.createTime ? 'CJ6-0' + data?.createTime : null} */}
            </Descriptions.Item>

            <Descriptions.Item
              label={
                <span>&nbsp;
                  <Avatar
                    size="small"
                    style={{ backgroundColor: 'rgb(0,0,0,0.1)', color: '#1890ff', height: 16, width: 16 }}
                    src={airConditionerIcon}
                  />&nbsp;
              空调温度
            </span>
              }
            >
              24°C{/* {data?.weight ? 'CJ6-0' + data?.weight + '吨' : null} */}
            </Descriptions.Item>

            <Descriptions.Item
              label={
                <span>
                  <Avatar
                    size="small"
                    style={{ backgroundColor: 'rgb(0,0,0,0.1)', color: 'red' }}
                    icon={<ExclamationCircleOutlined />}
                  />
               线路限速
            </span>
              }
            >
              80km/h {/* {data?.operatingMileage ? data?.operatingMileage + 'km' : null} */}
            </Descriptions.Item>

            <Descriptions.Item
              label={
                <span>
                  <Avatar
                    size="small"
                    style={{ backgroundColor: 'rgb(0,0,0,0.1)', color: 'gold' }}
                    icon={<RadarChartOutlined />}
                  />
               电网电压
            </span>
              }
            >1600kv
              {/* {data?.totalEnergyConsumption ? data?.totalEnergyConsumption + 'kw' : null} */}
            </Descriptions.Item>
          </Descriptions>
        </Col>
        <Col
          xl={8}
          lg={12}
          sm={24}
          xs={24}
        >
          <div style={{ paddingTop: 48 }}>
            <Steps direction="vertical" size="small" current={1} progressDot>
              <Step title="始发站" description="国博中心南站" />
              <Step title="当前站" description="国博中心南站" />
              <Step title="下一站" description="老关村站" />
              <Step title="终点站" description="周家河站" />
            </Steps>
          </div>

        </Col>
      </Row>
    </div>
  );
};

export default BasicInfo;
