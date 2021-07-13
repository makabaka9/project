import { Card, Row, Descriptions, Divider, Typography } from 'antd';
import React from 'react';
import { ListItemDataType } from '@/pages/Report/ReviewList/data.d';
import styles from './style.less';

const Mechanics = (props: { data: ListItemDataType }) => {
  const { data } = props;
  if (!data) {
    return null;
  }
  const {
    sampleName,
    orderID,
    clientCompany,
    clientDate,
    sampleNumber,
    sampleMaterial,
    sampleDraw,
  } = data;
  const clientDateArray = (clientDate || '').split('-');
  const time = `${clientDateArray[0]} 年 ${clientDateArray[1]} 月 ${(
    clientDateArray[2] || ''
  ).substring(0, 2)} 日`;
  return (
    <div>
      <Card
        title={
          <div>
            <Typography.Title level={4}>力学实验检测报告</Typography.Title>
            <p>中车株洲电力机车有限公司试验检测工程中心计量理化部</p>
          </div>
        }
        className={styles.card}
        bordered={false}
      >
        <Row gutter={16}>
          <Descriptions>
            <Descriptions.Item label="物品名称">{sampleName}</Descriptions.Item>
            <Descriptions.Item label="报告编号">{orderID}</Descriptions.Item>
            <Descriptions.Item label="委托单位">{clientCompany}</Descriptions.Item>
            <Descriptions.Item label="报告日期">{time}</Descriptions.Item>
          </Descriptions>
          <Divider />
          <Descriptions>
            <Descriptions.Item label="样品编号">{sampleNumber}</Descriptions.Item>
            <Descriptions.Item label="样品材质">{sampleMaterial}</Descriptions.Item>
            <Descriptions.Item label="样品图号">{sampleDraw}</Descriptions.Item>
          </Descriptions>
          <Divider />
          <Descriptions>
            <Descriptions.Item label="抗拉强度(Rm)/MPa">***</Descriptions.Item>
            <Descriptions.Item label="屈服强度(ReL)/Mpa">***</Descriptions.Item>
            <Descriptions.Item label="断后伸长率(A)/%">***</Descriptions.Item>
            <Descriptions.Item label="断面收缩率(Z)/%">***</Descriptions.Item>
            <Descriptions.Item label="冲击吸收能量J KU2(5mm)">***</Descriptions.Item>
          </Descriptions>
          <Divider />
          <Descriptions>
            <Descriptions.Item label="检测标准">***</Descriptions.Item>
            <Descriptions.Item label="检测设备">***</Descriptions.Item>
            <Descriptions.Item label="检测环境">***</Descriptions.Item>
          </Descriptions>
          <Divider>此检测结果仅对来样负责</Divider>
          <Descriptions>
            <Descriptions.Item label="编制">***</Descriptions.Item>
            <Descriptions.Item label="审核">***</Descriptions.Item>
            <Descriptions.Item label="批准">***</Descriptions.Item>
          </Descriptions>
        </Row>
      </Card>
    </div>
  );
};

export default Mechanics;
