// import { Form } from '@ant-design/compatible';
import { Card, Col, Input, Form, Row, Select, InputNumber, DatePicker } from 'antd';
import React from 'react';
// import TableForm from './components/TableForm';
import styles from './style.less';

const { Option } = Select;

const fieldLabels = {
  Order: '销售订单',
  zhuji: '株机项计',
  calibrationTestType: '委托单类型',
  clientCompany: '委托方单位',
  clientDate: '送检日期',
  completeTime: '要求完成时间',
  orderID: '流水号',
  sampleName: '样本名称',
  attachment: '附件名称',
  sampleModel: '样品型号',
  sampleNumber: '样品编号',
  visualInspection: '外观检查',
  sampleQuantity: '数量',
  calibrationHours: '校准工时',
  calibrationCost: '校准费用',
  repairCost: '修理费用',
  clientRequire: '委托方要求',
  clientAgent: '委托方代理人',
  clientPhone: '联系电话/传真',
  clientAddress: '通信地址',
};
function FillPlan() {
  return (
    <div>
      <Card title="销售订单" className={styles.card} bordered={false}>
        <Row gutter={16}>
          <Col lg={8} md={12} sm={24}>
            <Form.Item
              label={fieldLabels.Order}
              name="Order"
              rules={[{ required: true, message: '请输入销售订单' }]}
            >
              <Input placeholder="请输入销售订单" />
            </Form.Item>
          </Col>
          <Col lg={8} md={12} sm={24}>
            <Form.Item
              label={fieldLabels.zhuji}
              name="zhuji"
              rules={[{ required: true, message: '请输入株机项计' }]}
            >
              <Input placeholder="请输入株机项计" />
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
function FillCalibrationTest() {
  return (
    <div>
      <Card title="委托方基本信息" className={styles.card} bordered={false}>
        <Row gutter={16}>
          <Col lg={8} md={12} sm={24}>
            <Form.Item
              label={fieldLabels.calibrationTestType}
              name="calibrationTestType"
              rules={[{ required: true, message: '请选择/输入委托单类型' }]}
            >
              <Select>
                <Option value="计量校准委托单">计量校准委托单</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col lg={8} md={12} sm={24}>
            <Form.Item
              label={fieldLabels.clientCompany}
              name="clientCompany"
              rules={[{ required: true, message: '请输入单位名称' }]}
            >
              <Input placeholder="请输入单位名称" />
            </Form.Item>
          </Col>
          {/* <Col xl={{ span: 8 }} lg={{ span: 8 }} md={{ span: 24 }} sm={24}>
            <Form.Item
              label={fieldLabels.clientDate}
              name="clientDate"
              rules={[{ required: true, type: 'object', message: '请选择送检日期' }]}
            >
              <DatePicker />
            </Form.Item>
          </Col> */}
        </Row>
        <Row gutter={16}>
          <Col lg={8} md={12} sm={24}>
            <Form.Item
              label={fieldLabels.clientAgent}
              name="clientAgent"
              rules={[{ required: true, message: '请输入代理人名称' }]}
            >
              <Input placeholder="请输入代理人名称" />
            </Form.Item>
          </Col>
          <Col xl={{ span: 8 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
            <Form.Item
              label={fieldLabels.clientPhone}
              name="clientPhone"
              rules={[{ required: true, message: '请输入联系电话/传真' }]}
            >
              <Input placeholder="请输入联系电话/传真" />
            </Form.Item>
          </Col>
          <Col xl={{ span: 8 }} lg={{ span: 8 }} md={{ span: 24 }} sm={24}>
            <Form.Item
              label={fieldLabels.clientAddress}
              name="clientAddress"
              rules={[{ required: true, message: '请输入通信地址' }]}
            >
              <Input placeholder="请输入详细通信地址" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col lg={8} md={12} sm={24}>
            <Form.Item
              label={fieldLabels.completeTime}
              name="completeTime"
              rules={[{ required: true, message: '请选择完成时间' }]}
            >
              <Select placeholder="请选择完成时间">
                <Option value="正常">正常</Option>
                <Option value="加急">加急</Option>
                <Option value="特急">特急</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Card>

      <Card title="校准测试" className={styles.card} bordered={false}>
        <Row gutter={16}>
          <Col lg={8} md={12} sm={24}>
            <Form.Item
              label={fieldLabels.sampleName}
              name="sampleName"
              rules={[{ required: true, message: '请输入样品名称' }]}
            >
              <Input placeholder="请输入样品名称" />
            </Form.Item>
          </Col>
          <Col xl={{ span: 8 }} lg={{ span: 8 }} md={{ span: 24 }} sm={24}>
            <Form.Item
              label={fieldLabels.attachment}
              name="attachment"
              rules={[{ required: true, message: '请输入附件/配件/资料名称' }]}
            >
              <Input placeholder="请输入附件/配件/资料名称" />
            </Form.Item>
          </Col>
          <Col xl={{ span: 8 }} lg={{ span: 8 }} md={{ span: 24 }} sm={24}>
            <Form.Item
              label={fieldLabels.sampleModel}
              name="sampleModel"
              rules={[{ required: true, message: '请输入样品型号' }]}
            >
              <Input placeholder="请输入样品型号" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col lg={8} md={12} sm={24}>
            <Form.Item
              label={fieldLabels.sampleNumber}
              name="sampleNumber"
              rules={[{ required: true, message: '请输入样品编号' }]}
            >
              <Input placeholder="请输入样品编号" />
            </Form.Item>
          </Col>
          <Col xl={{ span: 8 }} lg={{ span: 8 }} md={{ span: 24 }} sm={24}>
            <Form.Item
              label={fieldLabels.visualInspection}
              name="visualInspection"
              rules={[{ required: true, message: '请输入外观检查' }]}
            >
              <Input placeholder="请输入外观检查" />
            </Form.Item>
          </Col>
          <Col xl={{ span: 8 }} lg={{ span: 8 }} md={{ span: 24 }} sm={24}>
            <Form.Item
              label={fieldLabels.sampleQuantity}
              name="sampleQuantity"
              rules={[{ required: true, message: '请输入样本数量' }]}
            >
              <InputNumber placeholder="请输入数量" min={1} max={1000} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col lg={8} md={12} sm={24}>
            <Form.Item
              label={fieldLabels.calibrationHours}
              name="calibrationHours"
              rules={[{ required: true, message: '请输入校准工时' }]}
            >
              <Input placeholder="请输入校准工时" />
            </Form.Item>
          </Col>
          <Col xl={{ span: 8 }} lg={{ span: 8 }} md={{ span: 24 }} sm={24}>
            <Form.Item
              label={fieldLabels.calibrationCost}
              name="calibrationCost"
              rules={[{ required: true, message: '请输入校准费用' }]}
            >
              <Input placeholder="请输入校准费用" />
            </Form.Item>
          </Col>
          <Col xl={{ span: 8 }} lg={{ span: 8 }} md={{ span: 24 }} sm={24}>
            <Form.Item
              label={fieldLabels.repairCost}
              name="repairCost"
              rules={[{ required: true, message: '请输入修理费用' }]}
            >
              <Input placeholder="请输入修理费用" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col lg={8} md={12} sm={24}>
            <Form.Item
              label={fieldLabels.clientRequire}
              name="clientRequire"
              rules={[{ required: true, message: '请输入委托方的要求和说明及校准方法' }]}
            >
              <Input placeholder="请输入委托方的要求和说明及校准方法" />
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default FillPlan;
