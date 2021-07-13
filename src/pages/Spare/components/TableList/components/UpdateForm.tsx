import React, { useState } from 'react';
import { Form, Button, Input, Modal, Steps } from 'antd';

import { TableListItem } from '../data';

export interface FormValueType extends Partial<TableListItem> {
  // type: string;
  // name: string;
  // orgCode: string;
  // phone: string;
  // email: string;
  // password: string;

  // target?: string;
  sort?:string;
  name?: string;
  type?: string;
  number?:number;
  warnNumber?: number;
  time?: string;
  person?: string;
  method?: string;
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
// const { Option } = Select;
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
    // type: props.values.type,
    // name: props.values.name,
    // orgCode: props.values.orgCode,
    // phone: props.values.phone,
    // email: props.values.email,
    // password: props.values.password,
    sort:props.values.sort,
    name: props.values.name,
    type: props.values.type,
    number: props.values.number,
    warnNumber: props.values.warnNumber,
    time: props.values.time,
    person: props.values.person,
    method: props.values.method,
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
    handleUpdate(formVals);
  };

  // 编辑主体部分
  const renderContent = () => {
    return (
      <>
        <FormItem
          name="name"
          label="名称"
        // rules={[{ required: true, message: '请输入文件类型！' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          name="type"
          label="文件名"
          rules={[{ required: true, message: '请输入文件名字！' }]}
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
      title="备品备件出库/入库"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible()}
    >
      <Steps style={{ marginBottom: 28 }} size="small">
        <Step title="基本信息" />
      </Steps>
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
          // type: formVals.type,
          // name: formVals.name,
          // orgCode: formVals.orgCode,
          // phone: formVals.phone,
          // email: formVals.email,
          // password: formVals.password,
          sort:formVals.sort,
          name: formVals.name,
          type: formVals.type,
          number: formVals.number,
          warnNumber: formVals.warnNumber,
          time: formVals.time,
          person: formVals.person,
          method: formVals.method,
        }}
      >
        {renderContent() /* 调用编辑主体 */}
      </Form>
    </Modal>
  );
};
export default UpdateForm;
