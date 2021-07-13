import React from 'react';
import { Form, Descriptions, Card, Row, Divider } from 'antd';
import moment from 'moment';
import { ListItemDataType } from './data.d';

const DetailCalibrationTest = (props: { data: ListItemDataType }) => {
  const [form] = Form.useForm();
  const { data } = props;
  if (!data) {
    return null;
  }
  const {
    clientCompany,
    calibrationTestType,
    // clientDate,
    submitTime,
    clientAgent,
    clientPhone,
    clientAddress,
    sampleName,
    sampleModel,
    sampleNumber,
    sampleQuantity,
    completeTime,
    attachment,
    visualInspection,
    calibrationHours,
    calibrationCost,
    repairCost,
    clientRequire,
  } = data;

  // 日期：string->moment
  // const clientDateMoment = moment(clientDate).format('YYYY-MM-DD');
  return (
    <Form form={form} layout="horizontal">
      <div>
        <Card bordered={false}>
          <Row gutter={16}>
            <Divider orientation="left">委托方信息</Divider>
            <Descriptions>
              <Descriptions.Item label="委托单类型">{calibrationTestType}</Descriptions.Item>
              <Descriptions.Item label="委托方单位">{clientCompany}</Descriptions.Item>
              <Descriptions.Item label="送检日期">
                {submitTime ? moment(submitTime).format('YYYY-MM-DD HH:mm:ss') : null}
              </Descriptions.Item>
              <Descriptions.Item label="要求完成时间">{completeTime}</Descriptions.Item>
              <Descriptions.Item label="委托方代理人">{clientAgent}</Descriptions.Item>
              <Descriptions.Item label="联系电话/传真">{clientPhone}</Descriptions.Item>
              <Descriptions.Item label="通信地址">{clientAddress}</Descriptions.Item>
            </Descriptions>
          </Row>
          <Row gutter={16}>
            <Divider orientation="left">校准测试</Divider>
            <Descriptions>
              <Descriptions.Item label="样本名称">{sampleName}</Descriptions.Item>
              <Descriptions.Item label="附件名称">{attachment}</Descriptions.Item>
              <Descriptions.Item label="样品型号">{sampleModel}</Descriptions.Item>
              <Descriptions.Item label="样品编号">{sampleNumber}</Descriptions.Item>
              <Descriptions.Item label="外观检查">{visualInspection}</Descriptions.Item>
              <Descriptions.Item label="数量">{sampleQuantity}</Descriptions.Item>
              <Descriptions.Item label="校准工时">{calibrationHours}</Descriptions.Item>
              <Descriptions.Item label="校准费用">{calibrationCost}</Descriptions.Item>
              <Descriptions.Item label="修理费用">{repairCost}</Descriptions.Item>
              <Descriptions.Item label="委托方要求">{clientRequire}</Descriptions.Item>
            </Descriptions>
          </Row>
          {/* <Row gutter={16}>
            <Divider orientation="left">检测项目</Divider>
            <Descriptions>
              <Descriptions.Item label="化学成分检验">
                {...chemicalComposition &&
                  chemicalComposition.map(tag => <Tag key={tag}>{tag}</Tag>)}
              </Descriptions.Item>
              <Descriptions.Item label="金相检验">
                {...Metallography && Metallography.map(tag => <Tag key={tag}>{tag}</Tag>)}
              </Descriptions.Item>
            </Descriptions>
            <Descriptions>
              <Descriptions.Item label="拉伸试验">
                {...StretchingTest && StretchingTest.map(tag => <Tag key={tag}>{tag}</Tag>)}
              </Descriptions.Item>
              <Descriptions.Item label="弯曲试验">
                {bendingTest}
                &emsp;
                <Descriptions.Item label="弯曲直径">{bendingDiameter}</Descriptions.Item>
              </Descriptions.Item>
              <Descriptions.Item label="冲击试验">
                {impactTest}
                &emsp;
                <Descriptions.Item label="温度">{impactTestTemperature}</Descriptions.Item>
              </Descriptions.Item>
              <Descriptions.Item label="硬度试验">
                {hardnessTest && hardnessTest.map(tag => <Tag key={tag}>{tag}</Tag>)}
              </Descriptions.Item>
              <Descriptions.Item label="弹簧测试">
                {springTest}
                &emsp;
                <Descriptions.Item label="工作负载">{workLoad}</Descriptions.Item>
              </Descriptions.Item>
              <Descriptions.Item label="缺口类型及数量">
                {gaps}
                &emsp;
                <Descriptions.Item label="缺口数量">{gapsQuantity}</Descriptions.Item>
              </Descriptions.Item>
            </Descriptions>
          </Row> */}
        </Card>
      </div>
    </Form>
  );
};
export default DetailCalibrationTest;
