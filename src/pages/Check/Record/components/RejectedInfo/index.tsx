import { Descriptions, Typography } from 'antd';
import React, { FC } from 'react';
import { connect } from 'dva';
import { CurrentUser } from '@/models/user';
import { ListItemDataType } from '../../data.d';
import moment from 'moment';

interface RejectedInfoProps {
  currentUser?: any[];
  data?: ListItemDataType[];
}
const RejectedInfo: FC<RejectedInfoProps> = props => {
  const { data, currentUser } = props;
  if (!data) {
    return null;
  }
  const data1 = data.rawTestData.filter(i => i.testUsercode === currentUser.usercode);
  let data2 = [];
  if (!data1[0].reportReview) {
    data2 = data1[0].testReview.filter(i => typeof i.rejectReason !== 'undefined');
  } else if (data1[0].reportReview && !data1[0].reportApprove) {
    data2 = data1[0].reportReview.filter(i => typeof i.rejectReason !== 'undefined');
  } else if (data1[0].reportApprove) {
    data2 = data1[0].reportApprove.filter(i => typeof i.rejectReason !== 'undefined');
  }
  console.log(data2);

  return (
    <div>
      <Typography.Text type="danger">驳回环节：{data2[0].process}</Typography.Text>
      <Descriptions>
        <Descriptions.Item label="驳回原因">{data2[0].rejectReason}</Descriptions.Item>
        <Descriptions.Item label="驳回人">{data2[0].username}</Descriptions.Item>
        <Descriptions.Item label="驳回日期">
          {data2[0].actTime ? moment(data2[0].actTime).format('YYYY-MM-DD HH:mm:ss') : null}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default connect(({ user }: { user: { currentUser: CurrentUser } }) => ({
  currentUser: user.currentUser,
}))(RejectedInfo);
