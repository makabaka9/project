import React, { useState } from 'react';
import { Button, Drawer, Form, Input, Modal } from 'antd';
import { RetweetOutlined } from '@ant-design/icons';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
interface ChangeDeviceProps {
    //   modalVisible: boolean;
    //   onCancel: () => void;
}

const ChangeDevice: React.FC<ChangeDeviceProps> = (props) => {
    //   const { modalVisible, onCancel } = props;
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };
    return (
        <div>
            <Button type="primary" onClick={showDrawer}>
                <RetweetOutlined />添加设备变更记录
      </Button>
            <Drawer
                title="添加变更记录"
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}
            >
                 <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
    //   onFinish={onFinish}
    //   onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="线路"
        name="lineCode"
        rules={[{ required: true, message: '请选择线路编号!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="列车编号"
        name="trainCode"
        rules={[{ required: true, message: '请选择列车编号!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="更换设备"
        name="device"
        rules={[{ required: true, message: '请选择更换的设备!' }]}
      >
        <Input />
      </Form.Item>


      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
            </Drawer>
        </div>
        // <Modal
        //   destroyOnClose
        //   title="新建用户"
        //   visible={modalVisible}
        //   onCancel={() => onCancel()}
        //   footer={null}
        // >
        //   {props.children}
        // </Modal>
    );
};

export default ChangeDevice;