import React, { useState } from 'react';
import { Form, Button, Select } from 'antd';

interface AssignOrderProps {
  itemKey: string;
  userList: Array<any>;
  onSubmit: Function;
  isAssigned: boolean;
}

const AssignOrder: React.FC<AssignOrderProps> = ({ itemKey, userList, onSubmit, isAssigned }) => {
  const { Option } = Select;
  const [assigned, setAssigned] = useState(isAssigned);
  const clickHandle = (event: any) => {
    onSubmit(event, itemKey);
    setAssigned(true);
  };

  return (
    <div>
      <Form layout="inline" onFinish={clickHandle}>
        <Form.Item
          label="请选择检测人员："
          name="testMemberAssign"
          rules={[{ required: true, message: '请选择记录模版' }]}
        >
          <Select
            mode="multiple"
            allowClear
            style={{ width: 200 }}
            // disabled={assigned}
          >
            {userList.map((item, index) => (
              <Option value={index}>{item.username}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={assigned}>
            分配
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default AssignOrder;
