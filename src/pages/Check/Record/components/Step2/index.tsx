import React, { useState } from 'react';
import { Form, Alert, Button, Descriptions, Divider, Tag, Modal } from 'antd';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { ListItemDataType } from '@/components/DetailPhysicalChemical/data';
import { CurrentUser } from '@/models/user';
import moment from 'moment';
import SignaturePad from '@/components/SignaturePad';
import { StateType } from '../../model';
import styles from './index.less';

// const formItemLayout = {
//   labelCol: {
//     span: 8,
//   },
//   wrapperCol: {
//     span: 16,
//   },
// };

interface Step2Props {
  orderID: string;
  data?: StateType['step'];
  dispatch?: Dispatch<any>;
  submitting?: boolean;
  username: string;
  usercode: string;
  selectedOrder: ListItemDataType;
  group: string;
}

const Step2: React.FC<Step2Props> = props => {
  const [form] = Form.useForm();
  const { selectedOrder, data, dispatch, username, usercode, group, submitting } = props;
  const [modalVisible, setModalVisible] = useState(false);
  if (!data) {
    return null;
  }
  const { validateFields, getFieldsValue } = form;
  const testTime = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
  const testUsercode = usercode;
  const testUsername = username;
  // const review = Array<any>();
  data.testTime = testTime;
  data.testUsercode = testUsercode;
  data.testUsername = testUsername;
  data.testGroup = group;
  const onPrev = () => {
    if (dispatch) {
      const values = getFieldsValue();
      dispatch({
        type: 'checkAndRecord/saveStepFormData',
        payload: {
          ...data,
          ...values,
        },
      });
      dispatch({
        type: 'checkAndRecord/saveCurrentStep',
        payload: 'info',
      });
    }
  };
  const onValidateForm = async () => {
    const values = await validateFields();
    if (dispatch) {
      dispatch({
        type: 'checkAndRecord/submitStepForm',
        payload: {
          ...data,
          ...values,
          key: selectedOrder.orderID,
        },
      });
    }
  };
  const {
    testLocal,
    testBasis,
    judgeBasis,
    testDevice,
    testTemperature,
    testHumidity,
    testRecord,
    testReviewer,
  } = data;

  const showModal = () => {
    setModalVisible(true);
  };
  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <Form
      // {...formItemLayout}
      form={form}
      layout="horizontal"
      className={styles.stepForm}
      // initialValues={{ password: '123456' }}
    >
      <Alert closable showIcon message="确认提交后， 将无法撤回。" style={{ marginBottom: 24 }} />

      <Descriptions column={1}>
        <Descriptions.Item label="检测单号"> {selectedOrder.orderID}</Descriptions.Item>
        <Descriptions.Item label="检测项目">
          {' '}
          {Array.isArray(selectedOrder.Metallography)
            ? selectedOrder.Metallography.map(tag => <Tag key={tag}>{tag}</Tag>)
            : ' '}
        </Descriptions.Item>
        <Descriptions.Item label="检测人员"> {username}</Descriptions.Item>
        <Descriptions.Item label="审核人员"> {testReviewer}</Descriptions.Item>
        <Descriptions.Item label="检测地点"> {testLocal}</Descriptions.Item>
        <Descriptions.Item label="检测温度"> {testTemperature}</Descriptions.Item>
        <Descriptions.Item label="检测湿度"> {testHumidity}</Descriptions.Item>
        <Descriptions.Item label="检测设备"> {testDevice}</Descriptions.Item>
        <Descriptions.Item label="检测依据"> {testBasis}</Descriptions.Item>
        <Descriptions.Item label="判定依据"> {judgeBasis}</Descriptions.Item>
        <Descriptions.Item label="检测记录"> {testRecord}</Descriptions.Item>
      </Descriptions>
      <Divider style={{ margin: '24px 0' }} />
      <Form.Item
        // style={{ marginBottom: 8 }}
        // wrapperCol={{
        //   xs: { span: 24, offset: 0 },
        //   sm: {
        //     span: formItemLayout.wrapperCol.span,
        //     offset: formItemLayout.labelCol.span,
        //   },
        // }}
        className={styles.centerButton}
      >
        <Button type="primary" onClick={showModal} loading={submitting}>
          提交
        </Button>
        <Button onClick={onPrev} style={{ marginLeft: 8 }}>
          上一步
        </Button>
      </Form.Item>
      <Modal
        title="编制人签名"
        visible={modalVisible}
        onOk={onValidateForm}
        onCancel={handleCancel}
      >
        <Form.Item
          name="testSignature"
          // rules={[{ required: true, message: '请提供签名' }]}
          // value={signatureData}
        >
          <SignaturePad />
        </Form.Item>
      </Modal>
    </Form>
  );
};
export default connect(
  ({
    checkAndRecord,
    loading,
    user,
  }: {
    checkAndRecord: StateType;
    loading: {
      effects: { [key: string]: boolean };
    };
    user: { currentUser: CurrentUser };
  }) => ({
    submitting: loading.effects['checkAndRecord/submitStepForm'],
    data: checkAndRecord.step,
    orderID: checkAndRecord.orderID,
    selectedOrder: checkAndRecord.selectedOrder,
    username: user.currentUser.username,
    usercode: user.currentUser.usercode,
    group: user.currentUser.group,
  }),
)(Step2);
