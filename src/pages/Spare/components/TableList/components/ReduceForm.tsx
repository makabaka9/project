import React, { useState } from 'react';
import { Button, Form, Input, InputNumber, Modal, Select, Upload } from 'antd';
import moment from 'moment';
import { UploadOutlined } from '@ant-design/icons';
import { useModel } from 'umi';

const FormItem = Form.Item;
const { Option } = Select;
interface ReduceFormProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: { name: string }) => void;
  onCancel: () => void;
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const ReduceForm: React.FC<ReduceFormProps> = (props) => {
  const [form] = Form.useForm();
  const { modalVisible, onSubmit: handleAdd, onCancel } = props;
  // const [buttonState,setButtonState]=useState(false)
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
 
  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    fieldsValue.time=moment(new Date()).format("YYYY-MM-DD HH:MM:SS")
    fieldsValue.person=currentUser.name
    // console.log(  "xxxxxxxx",fieldsValue)
    form.resetFields();
    handleAdd(fieldsValue);
  };


  return (
    <Modal
      destroyOnClose
      title="新增备品备件入库"
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
        label="备品备件名称"
        name="name"
        rules={[{ required: true, message: '请选择或输入备品备件名称!' }]}
      >
         <Input/>
        {/* <Select 
        showSearch
        // mode="tags"
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        filterSort={(optionA, optionB) =>
          optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
        }
        > 
          <Option value={1}>车轴</Option>
          <Option value={2}>灯泡300W</Option>
          <Option value={1}> 哈罗</Option>
          <Option value={2}>谢谢你来看我哦</Option>
        </Select > */}
      </Form.Item>
       <Form.Item
        label="品牌型号"
        name="type"
        rules={[{ required: true, message: '请输入品牌型号!' }]}
      >
         <Input/>
      </Form.Item>
      <Form.Item
        label="数量"
        name="number"
        rules={[{ required: true, message: '请输入入库数量!' }]}
      >
        <InputNumber min={1} max={10000} defaultValue={1}  />
      </Form.Item>
      <Form.Item
        label="数量最低警戒值"
        name="warnNumber"
        rules={[{ required: true, message: '请输入数量最低警戒值!' }]}
      >
        <InputNumber min={1} max={10000} defaultValue={1}  />
      </Form.Item>
      <Form.Item
        label="入库方式"
        name="method"
        rules={[{ required: true, message: '请选择入库方式!' }]}
      >
       <Select 
        showSearch
        > 
          <Select.Option value={1}>采购入库</Select.Option>
          <Select.Option value={2}>调拨入库</Select.Option>
        </Select >
      </Form.Item>   
      <Form.Item
        label="备注"
        name="remark"
      >
     <Input/>
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

export default ReduceForm;
