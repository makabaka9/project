import React from 'react';
import { Form, Input, Modal, Select } from 'antd';
import moment from 'moment';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
interface CreateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  onSubmit: (fieldsValue: { name: string }) => void;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { modalVisible, onCancel, onSubmit: handleAdd, } = props;
  const [form] = Form.useForm();
  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    // fieldsValue.time=moment(new Date()).format("YYYY-MM-DD HH:MM:SS")
    // console.log(fieldsValue)
    form.resetFields();
    handleAdd(fieldsValue);
  };
  return (
    // <Modal
    //   destroyOnClose
    //   title="新建用户"
    //   visible={modalVisible}
    //   onCancel={() => onCancel()}
    //   footer={null}
    // >
    //   {props.children}
    // </Modal>
    <Modal
      destroyOnClose
      title="新增用户"
      visible={modalVisible}
      onCancel={() => onCancel()}
      onOk={okHandle}
    // footer={null}
    >

      {/* {props.children} */}
      <Form
        {...layout}
        form={form}
      // name="basic"
      // initialValues={{ remember: true }}
      // onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="账号"
          name="account"
          rules={[{ required: true, message: '请输入账号!' }]}
        >
          <Input />

        </Form.Item>
        <Form.Item
          label="姓名"
          name="name"
          rules={[{ required: true, message: '请输入姓名!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="性别"
          name="gender"
          rules={[{ required: true, message: '请选择性别!' }]}
        >
          <Select >
            <Option value='0'>男</Option>
            <Option value='1'>女</Option>
          </Select >
        </Form.Item>
        <Form.Item
          label="部门"
          name="department"
          rules={[{ required: true, message: '请输入部门!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="岗位"
          name="position"
          rules={[{ required: true, message: '请输入岗位!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="角色"
          name="role"
          rules={[{ required: true, message: '请选择角色!' }]}
        >
          <Select >
            <Option value="admin">admin</Option>
            <Option value="monitor">monitor</Option>
            <Option value="operator">operator</Option>
            <Option value="guest">guest</Option>
          </Select >
        </Form.Item>
        <Form.Item
          label="电话"
          name="phone"
        // rules={[{ required: true, message: '请输入部门!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="邮箱"
          name="mail"
        // rules={[{ required: true, message: '请输入部门!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          initialValue="123456"
          rules={[{ required: true, message: '请输入部门!' }]}
        >
          <Input />
        </Form.Item>
        {/* <Form.Item wrapperCol={{ span: 12, offset: 12 }}>
        <Button type="primary" htmlType="submit" onClick={() => handleNext()}>
          提交
        </Button>
      </Form.Item> */}
      </Form>
    </Modal>
  );
};

export default CreateForm;
