import React, { useState } from 'react';
import { Button, Form, Input, InputNumber, Modal, Row, Select, Upload } from 'antd';
import moment from 'moment';
import { UploadOutlined } from '@ant-design/icons';
import { useModel } from 'umi';

const FormItem = Form.Item;
const { Option } = Select;
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
  const [visible, setVisible] = useState(false);
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};

  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    fieldsValue.time = moment(new Date()).format("YYYY-MM-DD HH:MM:SS")
    fieldsValue.person = currentUser.name
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
    // footer={null}link
    >

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
          <Input />
        </Form.Item>
        <Form.Item
          label="品牌型号"
          name="type"
          rules={[{ required: true, message: '请输入品牌型号!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="所属分类"
          name="sort"
          rules={[{ required: true, message: '请选择所属类型!' }]}
        >
          <Row>
            <Select
              showSearch
              style={{ width: 200 }}
              // mode="tags"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              filterSort={(optionA, optionB) =>
                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
              }
            >
              <Option value={1}>事故件</Option>
              <Option value={2}>计划维修件</Option>
              <Option value={3}>消耗件</Option>
              <Option value={4}>其他</Option>
            </Select >
            <Button type="link" onClick={() => setVisible(true)}>查看所属分类</Button>
          </Row>
        </Form.Item>
        <Form.Item
          label="数量"
          name="number"
          rules={[{ required: true, message: '请输入入库数量!' }]}
        >
          <InputNumber min={1} max={10000} defaultValue={1} />
        </Form.Item>
        <Form.Item
          label="数量最低警戒值"
          name="warnNumber"
          rules={[{ required: true, message: '请输入数量最低警戒值!' }]}
        >
          <InputNumber min={1} max={10000} defaultValue={1} />
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
          <Input />
        </Form.Item>
        {/* <Form.Item wrapperCol={{ span: 12, offset: 12 }}>
        <Button type="primary" htmlType="submit" onClick={() => handleNext()}>
          提交
        </Button>
      </Form.Item> */}
      </Form>
      <Modal visible={visible} onCancel={() => setVisible(false)} footer={null}
      >
        <p>根据维修模式进行分类:事故件、计划维修件、消耗件、其他。</p>
        <p>1.事故件主要指在采用事后维修方式时使用的设备备品备件。事故件又分为两种：一种是标准事故件，即商店货架上到处可见的设备备品备件（off the shelf）。
        这种设备备品备件容易购买但难预测更换周期，可以尽量少备或不备；另一种是专用事故件，
        主要指那些平时无法更换又难以预测更换周期，而一旦损坏对生产危害较大的设备备品备件。例如操作台的按钮、设备上的螺钉螺帽、接近开关等属于标准事故件，而脉冲编码器比例阀等往往属于专用事故件。</p>
        <p>2.计划维修件是按计划进行预防维修的设备。根据其运行状态确定合理的维修周期以进行更换的设备备品备件即是计划维修件，例如冷轧
        机的轧辊轴承就是计划维修件消耗件也称易损件，是指那些量大面广损坏无规律但又具备更换条件的设备备品备件。</p>
        <p>3.消耗件是可在一般的点检维修时快速更换的设备备品备件，消耗件技术含量低、消耗多、周转快、采购容易，例如电源熔断器保险液压密封橡胶等均属消耗件。</p>
      </Modal>
    </Modal>

  );
};

export default CreateForm;
