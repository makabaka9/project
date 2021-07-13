import { Col, Form, Row, Select } from 'antd';

import React from 'react';
// import TableForm from './TableForm';
// import styles from './style.less';
import TableForm from './TableForm';

const { Option } = Select;

const fieldLabels = {
  // name: '检测项目',
  testLocal: '检测地点',
  testDevice: '测量设备',
  otherDevice: '其他设备',
  testUsername: '检测人员',
  // inputDate: '检测日期',
  // checker: '校核人员',
  // checkDate: '校核日期',
};

function Mechanics() {
  return (
    <div>
      {/* <Card title="检测过程" className={styles.card} bordered={false}> */}
      <Row gutter={16}>
        <Col lg={6} md={12} sm={24}>
          <Form.Item
            label={fieldLabels.testLocal}
            name="MechanicsTestLocal"
            rules={[{ required: true, message: '选择检测地点' }]}
          >
            <Select placeholder="请选择试验地点">
              <Option value="计量理化部力学测试实验室二、三">计量理化部力学测试实验室二、三</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
          <Form.Item
            label={fieldLabels.testDevice}
            name="MechanicsTestDevice"
            rules={[{ required: true, message: '请选择试验设备' }]}
          >
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="请选择试验设备"
              defaultValue={[]}
              // onChange={handleChange}
            >
              <Option value="微机控制电子万能试验机-CMT4205">微机控制电子万能试验机-CMT4205</Option>
              <Option value="微机控制电子万能试验机-CMT5105">微机控制电子万能试验机-CMT5105</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
          <Form.Item
            label={fieldLabels.otherDevice}
            name="MechanicsOtherDevice"
            rules={[{ required: true, message: '请选择其它设备' }]}
          >
            <Select mode="multiple" placeholder="请选择其它设备">
              <Option value="游标卡尺">游标卡尺</Option>
              <Option value="数显示游标卡尺">数显示游标卡尺</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      {/* </Card> */}

      {/* <Card title="检测记录" bordered={false}> */}
      <Form.Item name="rawDate">
        <TableForm />
      </Form.Item>
      {/* </Card> */}
      {/* <Card title="人员与日期" className={styles.card} bordered={false}> */}
      {/* <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item
                label={fieldLabels.MechanicsTestBasis}
                name="检测依据"
                rules={[{ required: true, message: '请输入' }]}
              >
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item
                label={fieldLabels.MechanicsJudgeBasis}
                name="判定依据"
                rules={[{ required: true, message: '请选择' }]}
              >
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <Form.Item
                label={fieldLabels.MechanicsTestEnvironment}
                name="检测环境"
                rules={[{ required: true, message: '请输入检测环境' }]}
              >
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
          </Row> */}
      {/* <Row gutter={16}>
          <Col lg={6} md={12} sm={24}>
            <Form.Item
              label={fieldLabels.testUsername}
              name="MechanicsTester"
              rules={[{ required: true, message: '请选择检测人员' }]}
            >
              <Select mode="multiple" placeholder="请选择检测人员">
                <Option value="张三">张三</Option>
                <Option value="李四">李四</Option>
                <Option value="王五">王五</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
            <Form.Item
              label={fieldLabels.inputDate}
              name="inputDate"
              rules={[{ required: true, message: '请选择检测日期' }]}
            >
              <DatePicker />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col lg={6} md={12} sm={24}>
            <Form.Item
              label={fieldLabels.checker}
              name="checker"
              rules={[{ required: true, message: '请选择校核人员' }]}
            >
              <Select mode="multiple" placeholder="请选择校核人员">
                <Option value="泰坦">泰坦</Option>
                <Option value="盲僧">盲僧</Option>
                <Option value="剑魔">剑魔</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
            <Form.Item
              label={fieldLabels.checkDate}
              name="checkDate"
              rules={[{ required: true, message: '请选择校核日期' }]}
            >
              <DatePicker />
            </Form.Item>
          </Col>
        </Row> */}
      {/* </Card> */}
    </div>
  );
}

export default Mechanics;
