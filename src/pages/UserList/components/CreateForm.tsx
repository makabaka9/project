import React from 'react';
import { Form, Input, Modal, Select } from 'antd';

import FillProjectApply from '@/pages/Submit/OrderSubmit/components/FillProjectApply';

const { Option } = Select;
const FormItem = Form.Item;
interface CreateFormProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: { name: string }) => void;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = props => {
  const [form] = Form.useForm();

  const { modalVisible, onSubmit: handleAdd, onCancel } = props;
  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    form.resetFields();
    handleAdd(fieldsValue);
  };

  return (
    <Modal
      destroyOnClose
      title="项目申请"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <FillProjectApply />
      {/* <Form form={form}>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="工号"
          name="key"
          rules={[{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="姓名"
          name="username"
          rules={[{ required: true, message: '请输入至少两个字符的规则描述！', min: 2 }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="部门"
          name="department"
          rules={[{ required: true }]}
        >
          <Select placeholder="请选择/输入" mode="tags">
            <Option value="试验检测工程中心计量理化部">试验检测工程中心计量理化部</Option>
          </Select>
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="角色"
          name="role"
          rules={[{ required: true }]}
        >
          <Select placeholder="请选择/输入" mode="tags">
            <Option value="0">管理员</Option>
            <Option value="1">送检单位</Option>
            <Option value="2">业务室</Option>
            <Option value="3">加工班组长</Option>
            <Option value="4">加工人员</Option>
            <Option value="5">检测班组长</Option>
            <Option value="6">检测人员</Option>
            <Option value="7">批准人员</Option>
            <Option value="8">监察人员</Option>
          </Select>
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="电话"
          name="telephone"
          rules={[{ required: true }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="班组"
          name="group"
          rules={[{ required: true }]}
        >
          <Select placeholder="请选择/输入" mode="tags">
            <Option value="管理员">管理员</Option>
            <Option value="计划管理组">计划管理组</Option>
            <Option value="力学组">力学组</Option>
            <Option value="长度组">长度组</Option>
            <Option value="热电组">热电组</Option>
            <Option value="物理组">物理组</Option>
            <Option value="化学组">化学组</Option>
            <Option value="绝缘组">绝缘组</Option>
            <Option value="加工组">加工组</Option>
          </Select>
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="职位"
          name="position"
          rules={[{ required: true }]}
        >
          <Select placeholder="请选择/输入" mode="tags">
            <Option value="副总监兼部长">副总监兼部长</Option>
            <Option value="计量技术主管">计量技术主管</Option>
            <Option value="理化技术主管">理化技术主管</Option>
            <Option value="计划管理主管">计划管理主管</Option>
            <Option value="退二线部长">退二线部长</Option>
            <Option value="计划管理专员">计划管理专员</Option>
            <Option value="力学班长">力学班长</Option>
            <Option value="力学组员工">力学组员工</Option>
            <Option value="长度班长">长度班长</Option>
            <Option value="长度员工">长度员工</Option>
            <Option value="热电班长">热电班长</Option>
            <Option value="热电员工">热电员工</Option>
            <Option value="物理班长">物理班长</Option>
            <Option value="物理员工">物理员工</Option>
            <Option value="金相员工">金相员工</Option>
            <Option value="化学班长">化学班长</Option>
            <Option value="化学员工">化学员工</Option>
            <Option value="绝缘班长">绝缘班长</Option>
            <Option value="绝缘员工">绝缘员工</Option>
            <Option value="加工班长">加工班长</Option>
            <Option value="加工员工">加工员工</Option>
          </Select>
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="密码"
          name="password"
          rules={[{ required: true }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
      </Form> */}
    </Modal>
  );
};
export default CreateForm;
