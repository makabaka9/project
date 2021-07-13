import { Col, Form, Input, Row, Select } from 'antd';
import React from 'react';
// import TableForm from './TableForm';
// import styles from './style.less';
import TableForm from './TableForm';

const { Option } = Select;

const fieldLabels = {
  testName: '金相检测项目',
  testLocal: '检测地点',
  testBasis: '检测依据',
  judgeBasis: '判定依据',
  testDevice: '检测设备',
  testTemperature: '检测温度',
  testHumidity: '检测湿度',
};

function Metallography() {
  return (
    <div>
      {/* <Card title="检测过程" className={styles.card} bordered={false}> */}
      <Row gutter={16}>
        <Col lg={8} md={12} sm={24}>
          <Form.Item
            label={fieldLabels.testLocal}
            name="testLocal"
            rules={[{ required: true, message: '请选检测地点' }]}
          >
            <Select placeholder="请选检测地点">
              <Option value="金相检测实验室">金相检测实验室</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xl={{ span: 8 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
          <Form.Item
            label={fieldLabels.testTemperature}
            name="testTemperature"
            rules={[{ required: true, message: '请输入检测温度' }]}
          >
            <Input prefix="温度:" suffix="℃" />
          </Form.Item>
        </Col>
        <Col xl={{ span: 8 }} lg={{ span: 8 }} md={{ span: 24 }} sm={24}>
          <Form.Item
            label={fieldLabels.testHumidity}
            name="testHumidity"
            rules={[{ required: true, message: '请输入检测湿度' }]}
          >
            <Input prefix="湿度:" suffix="%RH" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col lg={8} md={12} sm={24}>
          <Form.Item
            label={fieldLabels.testDevice}
            name="testDevice"
            rules={[{ required: true, message: '请输入/选择检测设备' }]}
          >
            <Select placeholder="请输入/选择检测设备" mode="tags">
              <Option value="金相显微镜-GX71-1J17629">金相显微镜-GX71-1J17629</Option>
              <Option value="金相显微镜-BX53M-6H43536">金相显微镜-BX53M-6H43536</Option>
              <Option value="维氏硬度计-Q60A-Q098101/17">维氏硬度计-Q60A-Q098101/17</Option>
              <Option value="显微硬度计-HM211-060130162">显微硬度计-HM211-060130162</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xl={{ span: 8 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
          <Form.Item
            label={fieldLabels.testBasis}
            name="testBasis"
            rules={[{ required: true, message: '请选择检测依据' }]}
          >
            <Select placeholder="请输入/选择检测依据" mode="tags">
              <Option value="GB/T 6394-2017《金属平均晶粒测定方法》">
                GB/T 6394-2017《金属平均晶粒测定方法》
              </Option>
              <Option value="GB/T 10561-2005 《钢中非金属夹杂物含量的测定标准评级图显微检测法》">
                GB/T 10561-2005 《钢中非金属夹杂物含量的测定标准评级图显微检测法》
              </Option>
              <Option value="GB/T 4340.1-2009 《金属材料 维氏硬度试验 第1部分：试验检测方法》">
                GB/T 4340.1-2009 《金属材料 维氏硬度试验 第1部分：试验检测方法》
              </Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xl={{ span: 8 }} lg={{ span: 8 }} md={{ span: 24 }} sm={24}>
          <Form.Item
            label={fieldLabels.judgeBasis}
            name="judgeBasis"
            rules={[{ required: true, message: '请输入判定依据' }]}
          >
            <Input placeholder="请输入判定依据" />
          </Form.Item>
        </Col>
      </Row>
      {/* </Card> */}
      {/* <Card title="检测记录" className={styles.card} bordered={false}> */}
      <Row>
        <Col span={24}>
          <Form.Item
            // label={fieldLabels.metallographyTestRecord}
            name="testRecord"
            label="检测记录："
            rules={[{ required: true, message: '请填写检测记录' }]}
          >
            <Input.TextArea
              placeholder="请填写检测记录"
              autoSize={{ minRows: 2, maxRows: 20 }}
              // style={{width:'120%'}}
            />
          </Form.Item>{' '}
          {/* <Card title="检测记录" bordered={false}> */}
          <Form.Item name="testRecords">
            <TableForm />
          </Form.Item>
          {/* </Card> */}
        </Col>
      </Row>
      {/* </Card> */}
    </div>
  );
}

export default Metallography;
