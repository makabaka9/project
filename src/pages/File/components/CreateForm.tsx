import React, { useState } from 'react';
import { Button, Form, Input, Modal, Select, Upload } from 'antd';
import moment from 'moment';
import { UploadOutlined } from '@ant-design/icons';

const FormItem = Form.Item;
interface CreateFormProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: { name: string }) => void;
  onCancel: () => void;
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();
  const { modalVisible, onSubmit: handleAdd, onCancel } = props;
  const [buttonState,setButtonState]=useState(false)
  const changeState=()=>{
    setButtonState(true)
  }
  const normFile = e => {
    // console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    fieldsValue.time=moment(new Date()).format("YYYY-MM-DD HH:MM:SS")
    // console.log(fieldsValue)
    form.resetFields();
    handleAdd(fieldsValue);
  };


  return (
    <Modal
      destroyOnClose
      title="新增文档"
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
        label="文件类型"
        name="type"
        rules={[{ required: true, message: '请选择文件类型!' }]}
      >
        <Select > 
          <Select.Option value={1}>规章制度管理文件</Select.Option>
          <Select.Option value={2}>设备技术文件</Select.Option>
          <Select.Option value={3}>维修案例文件</Select.Option>
          <Select.Option value={4}>其他文件</Select.Option>
        </Select >
      </Form.Item>
     
      <Form.Item
        name="upload"
        label="上传文件"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        extra="请上传格式为 .word或.pdf的文件"
        rules={[{ required: true, message: '请输入文件名称!' }]}
      >
        <Upload name="logo" action="/upload.do" 
        // listType="picture" 
        // disabled={buttonState}
        // onRemove ={changeState}
        // onChange={handleChange}
        >
          <Button icon={<UploadOutlined />} 
          onClick={changeState} 
          //disabled={buttonState}
          > 点击上传</Button>
        </Upload >
      </Form.Item>
      {/* <Form.Item
        label="文件名称"
        name="name"
        rules={[{ required: true, message: '请输入文件名称!' }]}
      >
        <Input/>
      </Form.Item> */}
      <Form.Item
        label="备注"
        name="remark"
        // rules={[{ required: true, message: '请选择选择文件类型!' }]}
      >
        <Input/>
      </Form.Item>
      
      <Form.Item
        label="上传时间"
        name="time"
        // rules={[{ required: true, message: '请选择选择文件类型!' }]}
      >
        <span >{moment(new Date()).format("YYYY-MM-DD HH:MM:SS")}</span>
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
