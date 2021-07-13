import { Avatar, Tag, Typography } from 'antd';
import React from 'react';
import moment from 'moment';
import styles from './index.less';

const { Title } = Typography;
interface BasicOrderInfoProps {
  data: {
    clientAgent: string;
    clientPhone: string;
    clientDate: string;
    testItems: Array<string>;
    orderID: string;
    submitTime: number;
    // clientCompany: string;
    sampleName: string;
  };
}

const BasicOrderInfo: React.FC<BasicOrderInfoProps> = ({
  data: { clientAgent, clientPhone, submitTime, testItems, orderID, sampleName },
}) => (
  <div className={styles.listContent}>
    <Title level={4} style={{ color: '#52C41A' }}>
      {orderID}-{sampleName}
    </Title>
    <span>检测项目：</span>
    {/* {...testItems && testItems.map(tag => <Tag key={tag}>{tag}</Tag>)} */}
    <div className={styles.extra}>
      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" size="small" />
      委托人：{clientAgent} &emsp;电话：{clientPhone} &emsp;送检日期：
      {submitTime ? moment(submitTime).format('YYYY-MM-DD HH:mm:ss') : null}
      {/* {moment(submitTime).format('YYYY-MM-DD')} */}
    </div>
  </div>
);

export default BasicOrderInfo;
