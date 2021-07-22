import React from 'react';
import { Form, Button, Divider, Card, Descriptions, Typography, Tag } from 'antd';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { ListItemDataType } from '@/components/DetailProject/data';
import { CurrentUser } from '@/models/user';
import moment from 'moment';
import { StateType } from '../../model';
import styles from './index.less';
import SelectTestTemplate from '../SelectTestTemplate';
// import { useEffect } from 'react';

// const formItemLayout = {
//   labelCol: {
//     span: 5,
//   },
//   wrapperCol: {
//     span: 19,
//   },
// };

interface Step1Props {
  orderID: string;
  data?: StateType['step'];
  rejectedList?: StateType['rejectedList'];
  dispatch?: Dispatch<any>;
  username?: string;
  usercode?: string;
  selectedOrder: ListItemDataType;
  isRevised: boolean;
}

const Step1: React.FC<Step1Props> = props => {
  const { dispatch, data, rejectedList, username, usercode, selectedOrder, isRevised } = props;
  const [form] = Form.useForm();
  let formData = {};
  const tempData = rejectedList.filter(i => i.orderID === selectedOrder.orderID)[0]
  if (tempData !== undefined) {
    formData = tempData.rawTestData.filter(
      j => j.testUsercode === usercode)[0]
  } else {
    formData = data
  }
  if (!formData) {
    return null;
  }
  const { validateFields } = form;
  const lastStep = async () => {
    if (dispatch) {
      dispatch({
        type: 'checkAndRecord/saveCurrentStep',
        payload: 'select',
      });
    }
  };
  const nextStep = async () => {
    const values = await validateFields();
    values.isRevised = isRevised;
    console.log("修订状态", values)
    if (dispatch) {
      dispatch({
        type: 'checkAndRecord/saveStepFormData',
        payload: values,
      });
      dispatch({
        type: 'checkAndRecord/saveCurrentStep',
        payload: 'confirm',
      });
    }
  };

  return (
    <>
      <Card className={styles.card} bordered={false}>
        <Typography.Title level={4}>检测单号：{selectedOrder.orderID}</Typography.Title>
        {/* <Collapse>
          <Collapse.Panel key="1" header={<div style={{ color: '#1890ff' }}>检测委托单详情</div>}>
            <DetailPhysicalChemical data={selectedOrder} />
          </Collapse.Panel>
        </Collapse> */}
        <Descriptions style={{ marginTop: 32 }}>
          <Descriptions.Item label="检测物品名称">{selectedOrder.sampleName}</Descriptions.Item>
          <Descriptions.Item label="送检日期">
            {selectedOrder.submitTime
              ? moment(selectedOrder.submitTime).format('YYYY-MM-DD HH:mm:ss')
              : null}
          </Descriptions.Item>
          <Descriptions.Item label="检测人员">{username}</Descriptions.Item>
          <Descriptions.Item label="检测项目">
            {Array.isArray(selectedOrder.Metallography)
              ? selectedOrder.Metallography.map(tag => <Tag key={tag}>{tag}</Tag>)
              : ' '}
          </Descriptions.Item>
          <Descriptions.Item label="检测方法">{selectedOrder.detectionMethod}</Descriptions.Item>
          <Descriptions.Item label="检后样品处置方式">
            {selectedOrder.disposalMethod}
          </Descriptions.Item>
        </Descriptions>
      </Card>
      {/* <Card className={styles.card} bordered={false}> */}
      <Form
        // {...formItemLayout}
        form={form}
        layout="horizontal"
        hideRequiredMark
        initialValues={formData}
      >
        <Divider orientation="left">检测过程记录</Divider>
        <SelectTestTemplate />

        <div className={styles.centerButton}>
          <Button type="primary" onClick={lastStep}>
            上一步
          </Button>
          <Button type="primary" style={{ marginLeft: 8 }} onClick={nextStep}>
            下一步
          </Button>
        </div>
      </Form>
      <Divider style={{ margin: '40px 0 24px' }} />
      <div className={styles.desc}>
        <h3>说明</h3>
      </div>
    </>
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
    data: checkAndRecord.step,
    rejectedList: checkAndRecord.rejectedList,
    orderID: checkAndRecord.orderID,
    selectedOrder: checkAndRecord.selectedOrder,
    isRevised: checkAndRecord.isRevised,
    username: user.currentUser.username,
    usercode: user.currentUser.usercode,
  }),
)(Step1);
