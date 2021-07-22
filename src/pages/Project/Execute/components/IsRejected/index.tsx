import React, { FC, useState, useEffect } from 'react';
import { Form, Drawer, Button, List, Collapse, Tabs } from 'antd';
import { LoadingOutlined, EditOutlined } from '@ant-design/icons';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import BasicOrderInfo from '@/components/BasicOrderInfo';
import DetailProject from '@/components/DetailProject';
import OrderWorkFlowStep from '@/components/OrderWorkFlowStep';
import { CurrentUser } from '@/models/user';
import { StateType } from '../../model';
import FillProjectApply from '@/pages/Submit/OrderSubmit/components/FillProjectApply';
import { ProjectItemDataType } from '../../data.d';
import styles from '../../style.less';

const { Panel } = Collapse;

interface IsRejectedProps {
  dispatch: Dispatch<any>;
  submitAndOrderList: StateType;
  rejectedList: ProjectItemDataType;
  visible: boolean;
  usercode: string;
  username: string;
  orderID: string;
  loading: boolean;
}

const IsRejected: FC<IsRejectedProps> = ({
  dispatch,
  submitAndOrderList: { rejectedList },
  usercode,
  username,
  loading,
}) => {
  useEffect(() => {
    dispatch({
      type: 'submitAndOrderList/fetchRejected',
      payload: {
        pageSize: 5,
        usercode,
      },
    });
  }, []);
  const fetchMore = () => {
    const pageSize = 5;
    dispatch({
      type: 'submitAndOrderList/appendRejected',
      payload: {
        pageSize,
        current: rejectedList?.length,
        usercode,
      },
    });
  };

  function getNowFormatDate() {
    const day = new Date();
    let Year = 0;
    let Month = 0;
    let Day = 0;
    let CurrentDate = '';
    Year = day.getFullYear();
    Month = day.getMonth() + 1;
    Day = day.getDate();
    CurrentDate += Year;
    if (Month >= 10) {
      CurrentDate += Month;
    } else {
      CurrentDate += `0${Month}`;
    }
    if (Day >= 10) {
      CurrentDate += Day;
    } else {
      CurrentDate += `0${Day}`;
    }
    return CurrentDate;
  }

  const [form] = Form.useForm();
  const { getFieldsValue } = form;
  const [visible, setVisible] = useState(false);
  const [resubmited, setResubmited] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const onSubmit = () => {
    const values = getFieldsValue();
    const orderID = getNowFormatDate() + Math.floor(Math.random() * 10000);
    const submitTime = new Date().getTime();
    const flowStep = 0;
    values.orderID = orderID;
    values.usercode = usercode;
    values.username = username;
    values.submitTime = submitTime;
    values.flowStep = flowStep;
    dispatch({
      type: 'submitAndOrderList/updateForms',
      payload: {
        ...values,
      },
    });
    setVisible(false);
    setResubmited(true);
    dispatch({
      type: 'submitAndOrderList/deleteForms',
      payload: {
        key: rejectedList[0].orderID,
        // 此处需优化
      },
    });
  };

  const loadMore = rejectedList.length > 0 && (
    <div style={{ textAlign: 'center', marginTop: 16 }}>
      <Button onClick={fetchMore} style={{ paddingLeft: 48, paddingRight: 48 }}>
        {loading ? (
          <span>
            <LoadingOutlined /> 加载中...
          </span>
        ) : (
          '加载更多'
        )}
      </Button>
    </div>
  );

  return (
    <>
      <List<ProjectItemDataType>
        size="large"
        loading={rejectedList.length === 0 ? loading : false}
        rowKey="id"
        itemLayout="vertical"
        loadMore={loadMore}
        dataSource={rejectedList}
        renderItem={item => (
          <List.Item key={item.id}>
            <List.Item.Meta />
            <BasicOrderInfo data={item} />
            <div className={styles.listItemContent}>
              <Collapse>
                <Panel key="1" header={<div style={{ color: '#1890ff' }}>查看详情</div>}>
                  <Tabs>
                    <Tabs.TabPane tab="委托单详情" key="1">
                      <DetailProject data={item} />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="送检进度" key="2">
                      <OrderWorkFlowStep
                        data={{
                          submitTime: item.submitTime,
                          taskAssignTime: item.taskAssignTime,
                          processFinishTime: item.processFinishTime,
                          testAssignTime: item.testAssignTime,
                          flowStep: item.flowStep,
                        }}
                      />
                    </Tabs.TabPane>
                  </Tabs>
                </Panel>
              </Collapse>
            </div>
            <div className={styles.listItemContent}>
              <p>
                驳回原因：
                {item.assignRejectReason ? item.assignRejectReason : ' '}
              </p>
            </div>
            {/* <div style={{ marginTop: 12 }}>
              <Link to="/Submit/OrderSubmit">
              <Button type="primary" shape="round" icon={<EditOutlined />}>
                重新填写
                  </Button>
              {stepComponent}
              </Link>
            </div> */}
            <Button type="primary" onClick={showDrawer} disabled={resubmited}>
              <EditOutlined /> 重新填写
            </Button>
            <Drawer
              title="委托单填写"
              width={1240}
              onClose={onClose}
              visible={visible}
              bodyStyle={{ paddingBottom: 80 }}
              footer={
                <div
                  style={{
                    textAlign: 'right',
                  }}
                >
                  <Button onClick={onClose} style={{ marginRight: 8 }}>
                    取消
                  </Button>
                  <Button onClick={onSubmit} type="primary">
                    确认
                  </Button>
                </div>
              }
            >
              <Form form={form} layout="horizontal" hideRequiredMark initialValues={item}>
                <FillProjectApply />
              </Form>
            </Drawer>
          </List.Item>
        )}
      />
    </>
  );
};
export default connect(
  ({
    submitAndOrderList,
    loading,
    user,
  }: {
    submitAndOrderList: StateType;
    loading: { models: { [key: string]: boolean } };
    user: { currentUser: CurrentUser };
  }) => ({
    submitAndOrderList,
    loading: loading.models.submitAndOrderList,
    usercode: user.currentUser.usercode,
    username: user.currentUser.username,
  }),
)(IsRejected);
