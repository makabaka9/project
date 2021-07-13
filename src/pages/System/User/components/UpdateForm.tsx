import React, { useState } from 'react';
import { Form, Button, Input, Modal, Steps, Select } from 'antd';

import { TableListItem } from '../data.d';

export interface FormValueType extends Partial<TableListItem> {
  id: number,
  account: string,
  name: string,
  gender: string,
  department: string,
  position: string,
  role: string,
  mail: string,
  phone: string;
  password: string;
  // template?: string;
  // type?: string;
  // time?: string;
  // frequency?: string;
}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}
const FormItem = Form.Item;
const { Step } = Steps;
// const { TextArea } = Input;
const { Option } = Select;
// const RadioGroup = Radio.Group;

export interface UpdateFormState {
  formVals: FormValueType;
  currentStep: number;
}

const formLayout = {
  // 设置编辑页面的位置
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [formVals, setFormVals] = useState<FormValueType>({
    // name: props.values.name,
    // desc: props.values.desc,
    // key: props.values.key,
    // target: '0',
    // template: '0',
    // type: '1',
    // time: '',
    // frequency: 'month',
    id: props.values.id,
    account: props.values.account,
    name: props.values.name,
    gender: props.values.gender,
    department: props.values.department,
    position: props.values.position,
    role: props.values.role,
    phone: props.values.phone,
    mail: props.values.mail,
    password: props.values.password,
  });

  const [form] = Form.useForm();

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();

    setFormVals({ ...formVals, ...fieldsValue });
    handleUpdate({...formVals, ...fieldsValue});
  };

  // 编辑主体部分
  const renderContent = () => {
    return (
      <>
        <FormItem
          name="account"
          label="账号"
          rules={[{ required: true, message: '请输入账号！' }]}
        >
          <Input disabled/>
        </FormItem>
        <FormItem
          name="name"
          label="姓名"
          rules={[{ required: true, message: '请输入姓名！' }]}
        >
          <Input placeholder="请输入" />
          {/* <TextArea rows={1} placeholder="请输入至少五个字符" /> */}
        </FormItem>
        <FormItem name="gender" label="性别" rules={[{ required: true, message: '请输入性别！' }]}>
          {/* <Input placeholder="请输入" /> */}
          <Select>
            <Select.Option value="0">男</Select.Option>
            <Select.Option value="1">女</Select.Option>
          </Select>
        </FormItem>
        <FormItem name="department" label="部门" rules={[{ required: true, message: '请输入部门！' }]}>
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem name="position" label="岗位" rules={[{ required: true, message: '请输入岗位！' }]}>
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem name="role" label="角色" rules={[{ required: true, message: '请输入角色！' }]}>
          <Select >
              <Option value="admin">admin</Option>
              <Option value="monitor">monitor</Option>
              <Option value="operator">operator</Option>
              <Option value="guest">guest</Option>
            </Select >
        </FormItem>
        <FormItem name="phone" label="电话" >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem name="mail" label="邮箱" >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          name="password"
          label="密码"
        // rules={[{ required: true, message: '请输入密码！' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
      </>
    );
  };

  // 编辑页脚部分
  const renderFooter = () => {
    return (
      <>
        <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
        <Button type="primary" onClick={() => handleNext()}>
          完成
        </Button>
      </>
    );
  };

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="用户编辑"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible()}
    >
      {/* <Steps style={{ marginBottom: 28 }} size="small">
        <Step title="基本信息" />
      </Steps> */}
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          // 初始化显示
          // target: formVals.target,
          // template: formVals.template,
          // type: formVals.type,
          // frequency: formVals.frequency,
          // name: formVals.name,
          // desc: formVals.desc,
          // canshu: formVals.desc,
          account: formVals.account,
          name: formVals.name,
          gender: formVals.gender,
          department: formVals.department,
          position: formVals.position,
          role: formVals.role,
          phone: formVals.phone,
          mail: formVals.mail,
          password: formVals.password,
        }}
      >
        {renderContent() /* 调用编辑主体 */}
      </Form>
    </Modal>
  );
};
export default UpdateForm;
