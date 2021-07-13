import { Badge, Tag, Row, Col } from 'antd';
import React from 'react';
import { BasicProfileDataType } from '../../data';

interface FualtClassifyProps {
  train: BasicProfileDataType;
}
const FualtClassify: React.FC<FualtClassifyProps> = (props) => {
  const { train } = props;
  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Badge count={5}>
            <Tag color="red">一级告警</Tag>
          </Badge>
        </Col>
        <Col span={8}>
          <Badge count={0}>
            <Tag color="orange">二级告警</Tag>
          </Badge>
        </Col>
        <Col span={8}>
          <Badge count={5}>
            <Tag color="yellow">三级告警</Tag>
          </Badge>
        </Col>
      </Row>
    </div>
  );
};

export default FualtClassify;
