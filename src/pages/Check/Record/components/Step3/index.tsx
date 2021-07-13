import { Button, Result, Descriptions, Tag } from 'antd';
import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'dva';
// import moment from 'moment';
import { CurrentUser } from '@/models/user';
import { StateType } from '../../model';
import styles from './index.less';
import { ListItemDataType } from '../../data';

interface Step3Props {
  data?: StateType['step'];
  dispatch?: Dispatch<any>;
  username: string;
  orderID: string;
  selectedOrder: ListItemDataType;
}

const Step3: React.FC<Step3Props> = props => {
  const { data, dispatch, username, selectedOrder } = props;
  if (!data) {
    return null;
  }
  const { testTime, testLocal, testSignature } = data;
  const onFinish = () => {
    if (dispatch) {
      dispatch({
        type: 'checkAndRecord/saveCurrentStep',
        payload: 'select',
      });
    }
  };

  const information = (
    <div className={styles.information}>
      <Descriptions column={1}>
        <Descriptions.Item label="检测单号"> {selectedOrder.orderID}</Descriptions.Item>
        <Descriptions.Item label="检测项目">
          {' '}
          {Array.isArray(selectedOrder.Metallography)
            ? selectedOrder.Metallography.map(tag => <Tag key={tag}>{tag}</Tag>)
            : ' '}
        </Descriptions.Item>
        <Descriptions.Item label="检测人员"> {username}</Descriptions.Item>
        <Descriptions.Item label="检测地点"> {testLocal}</Descriptions.Item>
        <Descriptions.Item label="检测时间">{testTime}</Descriptions.Item>
        <Descriptions.Item label="签名">
          <img alt="" src={testSignature} height="100" />
        </Descriptions.Item>
        {/* <Descriptions.Item label="检测日期">{metallographyTestDateMoment} </Descriptions.Item> */}
      </Descriptions>
    </div>
  );
  const extra = (
    <>
      <Button type="primary" onClick={onFinish}>
        确认完成
      </Button>
    </>
  );
  return (
    <Result status="success" title="提交成功" extra={extra} className={styles.result}>
      {information}
    </Result>
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
    username: user.currentUser.username,
    orderID: checkAndRecord.orderID,
    selectedOrder: checkAndRecord.selectedOrder,
  }),
)(Step3);
