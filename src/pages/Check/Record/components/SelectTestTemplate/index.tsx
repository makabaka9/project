import React, { useState, useEffect } from 'react';
import { Form, TreeSelect, Row, Col, Select, Divider } from 'antd';
import { CurrentUser } from '@/models/user';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import Metallography from '../Metallography';
import Mechanics from '../Mechanics';
import { StateType } from '../../model';

const formItemLayout = {
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};
interface SelectTestTemplateProps {
  userList: Array<any>;
  checkAndRecord: StateType;
  dispatch: Dispatch<any>;
  currentUser?: Array<any>;
  user?: Array<any>;
}
const templateTreeData = [
  {
    value: '金相检测',
    title: '金相检测',
    component: <Metallography />,
  },
  {
    value: '力学检测',
    title: '力学检测',
    component: <Mechanics />,
  },
];

const SelectTestTemplate: React.FC<SelectTestTemplateProps> = ({
  dispatch,
  checkAndRecord: { user },
  currentUser,
}) => {
  const [selectComponent, setSelectComponent] = useState<React.ReactElement>(<Metallography />);
  const handleChange = (event: string) => {
    const tempTreeData = templateTreeData.filter(item => item.value === event);
    setSelectComponent(tempTreeData[0].component);
  };

  useEffect(() => {
    dispatch({
      type: 'checkAndRecord/fetchUser',
      payload: {
        group: currentUser?.group,
      },
    });
  }, []);

  return (
    <div>
      <Row gutter={16}>
        <Col lg={8} md={12} sm={24}>
          {/* <Typography style={{ color: '#52C41A', margin: 8 }}>请选择检测记录模版:</Typography> */}
          <Form.Item
            label="请选择记录模版："
            name="testRecordTemplate"
            rules={[{ required: true, message: '请选择记录模版' }]}
          >
            <TreeSelect
              style={{ width: '40%' }}
              treeData={templateTreeData}
              treeDefaultExpandAll
              onChange={handleChange}
            />
          </Form.Item>
        </Col>
        <Col xl={{ span: 8 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
          <Form.Item
            label="请选择审核人："
            name="testReviewer"
            rules={[{ required: true, message: '请选择审核人' }]}
          >
            <Select allowClear style={{ width: '40%' }}>
              {user
                .filter(item => item.username !== currentUser?.username)
                .map(item => (
                  <Select.Option value={item.username}>{item.username}</Select.Option>
                ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Divider dashed />
      <Form.Item {...formItemLayout}>{selectComponent}</Form.Item>
    </div>
  );
};
export default connect(
  ({
    checkAndRecord,
    user,
  }: {
    checkAndRecord: StateType;
    user: { currentUser: CurrentUser };
  }) => ({
    checkAndRecord,
    currentUser: user.currentUser,
  }),
)(SelectTestTemplate);
