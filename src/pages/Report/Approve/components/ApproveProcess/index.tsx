import { Button, Form, Drawer, Modal, Input } from 'antd';
import React, { useState } from 'react';
import { Dispatch } from 'redux';
import SignaturePad from '@/components/SignaturePad';
import { CurrentUser } from '@/models/user';
import { connect } from 'dva';
import { ListItemDataType } from '../../data.d';
import { StateType } from '../../model';

interface ApproveProcessProps {
  orderID?: string;
  data?: StateType['list'];
  dispatch?: Dispatch<any>;
  submitting?: boolean;
  username: string;
  usercode: string;
  selectedOrder: ListItemDataType;
  group: string;
}
const ApproveProcess: React.FC<ApproveProcessProps> = props => {
  const { data, dispatch, username, usercode, group } = props;
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [passModalVisible, setPassModalVisible] = useState(false);
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  if (!data) {
    return null;
  }
  const { orderID } = data;

  // const [approveInfo] = useState(isApproveed);
  const [form] = Form.useForm();

  const { validateFields } = form;
  const approve = Array<any>();
  const actTime = new Date().getTime();
  const tempUsercode = usercode;
  const tempUsername = username;
  const tempGroup = group;
  approve.actTime = actTime;
  approve.usercode = tempUsercode;
  approve.username = tempUsername;
  approve.group = tempGroup;
  approve.process = '报告批准';

  const onValidateForm = async () => {
    const values = await validateFields();
    if (dispatch) {
      dispatch({
        type: 'reportAndApprove/addApprove',
        payload: {
          ...approve,
          ...values,
          key: orderID,
        },
      });
    }
    setPassModalVisible(false);
    setRejectModalVisible(false);
  };
  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onClose = async () => {
    setDrawerVisible(false);
  };
  const showPassModal = () => {
    setPassModalVisible(true);
  };

  const showRejectModal = () => {
    setRejectModalVisible(true);
  };

  const handleCancel = () => {
    setPassModalVisible(false);
    setRejectModalVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={showDrawer}>
        审核检测报告
      </Button>
      <Drawer
        title={<div>{orderID}-检测报告审核详情</div>}
        width={720}
        onClose={onClose}
        visible={drawerVisible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Form form={form} layout="horizontal" hideRequiredMark initialValues={data}>
              <Button onClick={showRejectModal} style={{ marginRight: 8 }}>
                驳回
              </Button>
              <Modal
                title="驳回原因"
                visible={rejectModalVisible}
                onOk={onValidateForm}
                onCancel={handleCancel}
              >
                <Form.Item
                  name="rejectReason"
                  rules={[{ required: true, message: '请填写驳回原因' }]}
                >
                  <Input.TextArea rows={3} placeholder="请填写驳回原因" />
                </Form.Item>
              </Modal>
              <Button onClick={showPassModal} type="primary">
                审核通过
              </Button>
              <Modal
                title="审核签名"
                visible={passModalVisible}
                onOk={onValidateForm}
                onCancel={handleCancel}
              >
                <Form.Item name="signature">
                  <SignaturePad />
                </Form.Item>
              </Modal>
            </Form>
          </div>
        }
      >
        <div>{/* <Metallography data={data} /> */}</div>
      </Drawer>
    </div>
  );
};

export default connect(
  ({
    reportAndApprove,
    user,
  }: {
    reportAndApprove: StateType;
    user: { currentUser: CurrentUser };
  }) => ({
    reportAndApprove,
    username: user.currentUser.username,
    usercode: user.currentUser.usercode,
    group: user.currentUser.group,
  }),
)(ApproveProcess);
