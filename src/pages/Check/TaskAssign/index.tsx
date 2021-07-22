import React, { FC, useEffect } from 'react';
import { Button, Card, List, Collapse, Tabs } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import BasicOrderInfo from '@/components/BasicOrderInfo';
import DetailProject from '@/components/DetailProject';
import { CurrentUser } from '@/models/user';
import { StateType } from './model';
import { ListItemDataType } from './data.d';
import AssignOrder from './components/AssignOrder';
import IsAssigned from './components/IsAssigned';
import styles from './style.less';

const { Panel } = Collapse;

interface TaskAssignProps {
  dispatch: Dispatch<any>;
  checkAndTaskAssign: StateType;
  loading: boolean;
  // usercode?: string;
  currentUser: any[];
  listLength?: string;
  list?: ListItemDataType;
}
const TaskAssign: FC<TaskAssignProps> = ({
  dispatch,
  checkAndTaskAssign: { list, user, listLength },
  // usercode,
  loading,
  currentUser,
}) => {
  const clickAssign = (event, key: string) => {
    const userList = [];
    event.testMemberAssign.forEach((item: number) => userList.push(user[item]));
    // console.log(userList);
    // console.log(usercode);
    const testAssignTime = new Date().getTime();
    const flowStep = 3;
    // const tempTestAssignTime = testAssignTime;
    // const tempFlowStep = flowStep;
    event.testAssignTime = testAssignTime;
    event.flowStep = flowStep;
    dispatch({
      type: 'checkAndTaskAssign/addAssign',
      payload: { event: { group: currentUser.group, userList, testAssignTime, flowStep }, key },
    });
  };

  useEffect(() => {
    dispatch({
      type: 'checkAndTaskAssign/fetch',
      payload: {
        pageSize: 5,
        group: currentUser?.group,
      },
    });
    dispatch({
      type: 'checkAndTaskAssign/fetchUser',
      payload: {
        group: currentUser?.group,
      },
    });
    dispatch({
      type: 'checkAndTaskAssign/fetchListLength',
      payload: {
        group: currentUser?.group,
      },
    });
  }, []);
  const fetchMore = () => {
    dispatch({
      type: 'checkAndTaskAssign/appendFetch',
      payload: {
        pageSize: 5,
        current: list?.length,
        group: currentUser?.group,
      },
    });
  };

  const loadMore = list.length > 0 && (
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
    <div>
      <Card
        style={{ marginTop: 24 }}
        bordered={false}
        bodyStyle={{ padding: '8px 32px 32px 32px' }}
      >
        <Tabs type="card">
          <Tabs.TabPane tab={<div>未分发（{listLength}）</div>} key="1">
            <List<ListItemDataType>
              size="large"
              loading={list.length === 0 ? loading : false}
              rowKey="id"
              itemLayout="vertical"
              loadMore={loadMore}
              dataSource={list}
              renderItem={(item: ListItemDataType) => (
                <List.Item
                  key={item.id}
                  actions={[
                    <div>
                      <AssignOrder
                        itemKey={item.orderID}
                        userList={user}
                        onSubmit={clickAssign}
                      // isAssigned={!(typeof item.taskAssign === 'undefined')}
                      />
                    </div>,
                  ]}
                >
                  <List.Item.Meta />
                  <BasicOrderInfo data={item} />
                  <div className={styles.listItemContent}>
                    {/* <Row gutter={16}>
                      <Divider orientation="left">检测项目</Divider>
                      <Descriptions>
                        <Descriptions.Item label="化学成分检验">
                          {Array.isArray(item.chemicalComposition)
                            ? item.chemicalComposition.map(tag => <Tag key={tag}>{tag}</Tag>)
                            : ' '}
                        </Descriptions.Item>
                        <Descriptions.Item label="金相检验">
                          {Array.isArray(item.Metallography)
                            ? item.Metallography.map(tag => <Tag key={tag}>{tag}</Tag>)
                            : ' '}
                        </Descriptions.Item>
                      </Descriptions>
                      <Descriptions>
                        <Descriptions.Item label="拉伸试验">
                          {Array.isArray(item.stretchingTest)
                            ? item.stretchingTest.map(tag => <Tag key={tag}>{tag}</Tag>)
                            : ' '}
                        </Descriptions.Item>
                        <Descriptions.Item label="弯曲试验">
                          {item.bendingTest}
                          &emsp;
                          <Descriptions.Item label="弯曲直径">
                            {item.bendingDiameter}
                          </Descriptions.Item>
                        </Descriptions.Item>
                        <Descriptions.Item label="冲击试验">
                          {item.impactTest}
                          &emsp;
                          <Descriptions.Item label="温度">
                            {item.impactTestTemperature}
                          </Descriptions.Item>
                        </Descriptions.Item>
                        <Descriptions.Item label="硬度试验">
                          {Array.isArray(item.hardnessTest)
                            ? item.hardnessTest.map(tag => <Tag key={tag}>{tag}</Tag>)
                            : ' '}
                        </Descriptions.Item>
                        <Descriptions.Item label="弹簧测试">
                          {item.springTest}
                          {/* {springTest && springTest.map(tag => <Tag key={tag}>{tag}</Tag>)} */}
                    {/* &emsp;
                          <Descriptions.Item label="工作负载">{item.workLoad}</Descriptions.Item>
                        </Descriptions.Item>
                        <Descriptions.Item label="缺口类型及数量">
                          {item.gaps}
                          &emsp;
                          <Descriptions.Item label="缺口数量">
                            {item.gapsQuantity}
                          </Descriptions.Item>
                        </Descriptions.Item>
                      </Descriptions>
                    </Row> */}
                    <Collapse>
                      <Panel
                        key="1"
                        header={<div style={{ color: '#1890ff' }}>检测委托单详情</div>}
                      >
                        <DetailProject data={item} />
                      </Panel>
                    </Collapse>
                  </div>
                </List.Item>
              )}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="已分发" key="2">
            <IsAssigned />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default connect(
  ({
    checkAndTaskAssign,
    loading,
    user,
  }: {
    checkAndTaskAssign: StateType;
    loading: { models: { [key: string]: boolean } };
    user: { currentUser: CurrentUser };
  }) => ({
    checkAndTaskAssign,
    loading: loading.models.checkAndTaskAssign,
    // usercode: user.currentUser.usercode,
    currentUser: user.currentUser,
  }),
)(TaskAssign);
