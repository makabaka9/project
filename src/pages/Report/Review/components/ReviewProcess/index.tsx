import { Button, Form, Drawer, Modal, Input } from 'antd';
import React, { useState } from 'react';
import { Dispatch } from 'redux';
import SignaturePad from '@/components/SignaturePad';
import { CurrentUser } from '@/models/user';
import { connect } from 'dva';
// import Metallography from '../Metallography';
import { ListItemDataType } from '../../data.d';
import { StateType } from '../../model';
// import styles from './style.less';

interface ReviewProcessProps {
  orderID?: string;
  data?: StateType['list'];
  dispatch?: Dispatch<any>;
  submitting?: boolean;
  username: string;
  usercode: string;
  selectedOrder: ListItemDataType;
  group: string;
  isReviewed: boolean;
}
const ReviewProcess: React.FC<ReviewProcessProps> = props => {
  const { data, dispatch, username, usercode, group, isReviewed } = props;
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [passModalVisible, setPassModalVisible] = useState(false);
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [reviewInfo] = useState(isReviewed);
  if (!data) {
    return null;
  }
  const { orderID } = data;

  const [form] = Form.useForm();
  const { validateFields } = form;
  const review = Array<any>();
  const actTime = new Date().getTime();
  const tempUsercode = usercode;
  const tempUsername = username;
  const tempGroup = group;
  review.actTime = actTime;
  review.usercode = tempUsercode;
  review.username = tempUsername;
  review.group = tempGroup;
  review.process = '报告审核';

  const onValidateForm = async () => {
    const values = await validateFields();
    if (dispatch) {
      dispatch({
        type: 'reportAndReview/addReview',
        payload: {
          ...review,
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
              <Button onClick={showRejectModal} style={{ marginRight: 8 }} disabled={reviewInfo}>
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
              <Button onClick={showPassModal} type="primary" disabled={reviewInfo}>
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
    reportAndReview,
    user,
  }: {
    reportAndReview: StateType;
    user: { currentUser: CurrentUser };
  }) => ({
    reportAndReview,
    username: user.currentUser.username,
    usercode: user.currentUser.usercode,
    group: user.currentUser.group,
  }),
)(ReviewProcess);

// const ReviewProcess = (props: { data: ListItemDataType }) => {
//   const { data } = props;
//   const { orderID } = data;
//   const [drawerVisible, setDrawerVisible] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [form] = Form.useForm();
//   const { validateFields } = form;
//   if (!data) {
//     return null;
//   }
//   const showDrawer = () => {
//     setDrawerVisible(true);
//   };

//   const onClose = async () => {
//     setDrawerVisible(false);
//   };

//   const onSubmit = async () => {
//     const values = await validateFields();
//     values.clientDate.toString();
//     setDrawerVisible(false);
//   };

//   const showModal = () => {
//     setModalVisible(true);
//   };

//   const handleCancel = () => {
//     setModalVisible(false);
//   };

//   return (
//     <div>
//       <Form>
//         <Button type="primary" onClick={showDrawer}>
//           审核报告
//         </Button>
//         <Drawer
//           title={<div>{orderID}-检测报告审核详情</div>}
//           width={720}
//           onClose={onClose}
//           visible={drawerVisible}
//           bodyStyle={{ paddingBottom: 80 }}
//           footer={
//             <div
//               style={{
//                 textAlign: 'right',
//               }}
//             >
//               <Button onClick={showModal} style={{ marginRight: 8 }}>
//                 驳回
//               </Button>
//               <Modal
//                 title="驳回原因"
//                 visible={modalVisible}
//                 onOk={onSubmit}
//                 onCancel={handleCancel}
//               >
//                 <Form form={form} layout="horizontal" hideRequiredMark initialValues={data}>
//                   <Form.Item
//                     name="rejectReason"
//                     rules={[{ required: true, message: '请填写驳回理由' }]}
//                   >
//                     <Input placeholder="请填写驳回理由" />
//                   </Form.Item>
//                 </Form>
//               </Modal>
//               <Button onClick={onClose} type="primary" htmlType="submit">
//                 审核通过
//               </Button>
//             </div>
//           }
//         >
//           <Tabs
//             type="card"
//           >
//             {data.rawTestData.map(item => (
//               <Tabs.TabPane tab={item.reportRecordTemplate} key={item.reportRecordTemplate} />
//             ))}
//           </Tabs>
//         </Drawer>
//       </Form>
//     </div>
//   );
// };
