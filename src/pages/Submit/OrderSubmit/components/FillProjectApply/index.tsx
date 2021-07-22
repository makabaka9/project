import { ConsoleSqlOutlined, UploadOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Radio,
  Upload,
  Button,
  message,
} from 'antd';
import React, { useState } from 'react';
import styles from './style.less';

const { Option } = Select;

const fieldLabels = {
  projectID: '项目编号',
  projectManager: '项目负责人',
  projectCompany: '单位',
  projectName: '项目名称',
  projectCategory: '项目类别',
  projectStartTime: '项目开始时间',
  projectEndTime: '项目结束时间',
  projectBudget: '项目经费预算',
  projectOutsource: '是否委外',
  projectIntroduction: '项目简介',
  projectResearchContent: '研究内容',
};

function FillProjectApply() {//项目申报表单
  // const testItemsOptions = [
  //   { label: '工艺部', value: '工艺部' },
  //   { label: '转向架事业部', value: '转向架事业部' },

  // ];
  const { TextArea } = Input;
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const props = {
    name: 'file',
    action: './upload.do',//后台接口地址
    // headers: {
    //   authorization: 'authorization-text',
    // },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 文件上传成功`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 文件上传失败`);
      }
    },
  };
  return (
    <div>
      <Card title="项目基本信息" className={styles.card} bordered={false}>
        <Row gutter={16}>
          <Col lg={8} md={12} sm={24}>
            <Form.Item
              label={fieldLabels.projectManager}
              name="projectManager"
              rules={[{ required: true, message: '请输入项目负责人名称' }]}
            >
              <Input placeholder="请输入项目负责人名称" />
            </Form.Item>
          </Col>
          <Col xl={{ span: 8 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
            <Form.Item
              label={fieldLabels.projectCompany}
              name="projectCompany"
              rules={[{ required: true, message: '请选择/输入单位名称' }]}
            >
              <Select placeholder="请选择/输入单位名称">
                <Option value="工艺部">工艺部</Option>
                <Option value="转向架事业部">转向架事业部</Option>
                <Option value="机车事业部">机车事业部</Option>
                <Option value="城轨事业部">城轨事业部</Option>
                <Option value="车体事业部">车体事业部</Option>

              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col lg={8} md={12} sm={24}>
            <Form.Item
              label={fieldLabels.projectName}
              name="projectName"
              rules={[{ required: true, message: '请输入项目名称' }]}
            >
              <Input placeholder="请输入项目名称" />
            </Form.Item>
          </Col>
          <Col xl={{ span: 8 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
            <Form.Item
              label={fieldLabels.projectCategory}
              name="projectCategory"
              rules={[{ required: true, message: '请输入项目类别' }]}
            >
              <Input placeholder="请输入项目类别" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col lg={8} md={12} sm={24}>
            <Form.Item
              label={fieldLabels.projectStartTime}
              name="projectStartTime"
              rules={[{ required: true, message: '请输入项目开始时间' }]}
            >
              <Input placeholder="请输入项目开始时间" />
            </Form.Item>
          </Col>
          <Col xl={{ span: 8 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
            <Form.Item
              label={fieldLabels.projectEndTime}
              name="projectEndTime"
              rules={[{ required: true, message: '请输入项目结束时间' }]}
            >
              <Input placeholder="请输入项目结束时间" />
            </Form.Item>
          </Col>
          {/* <Col xl={{ span: 8 }} lg={{ span: 8 }} md={{ span: 24 }} sm={24}>
            <Form.Item
              label={fieldLabels.projectStartTime}
              name="projectStartTime"
              rules={[{ required: true, type: 'object', message: '请选择项目开始时间' }]}
            >
              <DatePicker />
            </Form.Item>
          </Col>
          <Col xl={{ span: 8 }} lg={{ span: 8 }} md={{ span: 24 }} sm={24}>
            <Form.Item
              label={fieldLabels.projectEndTime}
              name="projectEndTime"
              rules={[{ required: true, type: 'object', message: '请选择项目结束时间' }]}
            >
              <DatePicker />
            </Form.Item>
          </Col> */}
        </Row>
        <Row>
          <Col lg={8} md={12} sm={24}>
            <Form.Item
              label={fieldLabels.projectBudget}
              name="projectBudget"
              rules={[{ required: true, message: '请输入项目经费预算' }]}
            >
              <Input placeholder="万元" />
            </Form.Item>
          </Col>
          <Col xl={{ span: 8 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
            <Form.Item label={fieldLabels.projectOutsource} name="projectOutsource"
              rules={[{ required: true, message: '请选择' }]}
            >
              <Radio.Group>
                <Radio value="是">是</Radio>
                <Radio value="否">否</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col lg={8} md={12} sm={24}>
            <Form.Item
              label={fieldLabels.projectIntroduction}
              name="projectIntroduction"
              rules={[{ required: true, message: '请输入项目简介' }]}
            >
              <TextArea placeholder="(字数300字以内)" rows={4} showCount maxLength={300} className={styles.context} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col lg={8} md={12} sm={24}>
            <Form.Item
              label={fieldLabels.projectResearchContent}
              name="projectResearchContent"
              rules={[{ required: true, message: '请输入研究内容' }]}
            >
              <TextArea placeholder="(字数500字以内)" rows={6} showCount maxLength={500} className={styles.context} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col >
            <Upload {...props}>
              <Button icon={<UploadOutlined />} type="primary">
                上传文件
              </Button>
            </Upload>


          </Col>
        </Row>
      </Card>

    </div>
  );
}

export default FillProjectApply;
