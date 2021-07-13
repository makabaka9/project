import React, { FC, useEffect } from 'react';
import { Button, List, Collapse, Tabs } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import BasicOrderInfo from '@/components/BasicOrderInfo';
import DetailPhysicalChemical from '@/components/DetailPhysicalChemical';
import OrderWorkFlowStep from '@/components/OrderWorkFlowStep';
import { CurrentUser } from '@/models/user';
// import moment from 'moment';
import moment from 'moment';
import { StateType } from '../../model';
import { ListItemDataType } from '../../data.d';
import styles from '../../style.less';

const { Panel } = Collapse;

interface IsAssignedProps {
  dispatch: Dispatch<any>;
  checkAndTaskAssign: StateType;
  loading: boolean;
  assignedList?: ListItemDataType;
  currentUser?: any[];
}

const IsAssigned: FC<IsAssignedProps> = ({
  dispatch,
  checkAndTaskAssign: { assignedList },
  loading,
  currentUser,
}) => {
  useEffect(() => {
    console.log(currentUser);
    dispatch({
      type: 'checkAndTaskAssign/fetchAssigned',
      payload: {
        pageSize: 5,
        group: currentUser?.group,
      },
    });
  }, []);
  const fetchMore = () => {
    dispatch({
      type: 'checkAndTaskAssign/appendFetchAssigned',
      payload: {
        pageSize: 5,
        current: assignedList?.length,
        group: currentUser?.group,
      },
    });
  };
  console.log('assignedList', assignedList);
  const loadMore = assignedList.length > 0 && (
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
      <List<ListItemDataType>
        size="large"
        loading={assignedList.length === 0 ? loading : false}
        rowKey="id"
        itemLayout="vertical"
        loadMore={loadMore}
        dataSource={assignedList}
        renderItem={item => (
          <List.Item key={item.id}>
            <List.Item.Meta />
            <BasicOrderInfo data={item} />
            <div className={styles.listItemContent}>
              <Collapse>
                <Panel key="1" header={<div style={{ color: '#1890ff' }}>查看详情</div>}>
                  <Tabs>
                    <Tabs.TabPane tab="委托单详情" key="1">
                      <DetailPhysicalChemical data={item} />
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
                分配组员：
                {/* {Array.isArray((item.taskAssign.filter(item => item.group === currentUser.group)[0].userList).username)
            ? (item.taskAssign.filter(item => item.group === currentUser.group)[0].userList).username.map(tag => <Tag key={tag}>{tag}</Tag>)
            : ' '} */}
                {
                  item.taskAssign.filter(tempItem => tempItem.group === currentUser.group)[0]
                    .userList[0].username
                }
                &emsp; 日期：
                {item.taskAssign.filter(tempItem => tempItem.group === currentUser.group)[0]
                  .testAssignTime
                  ? moment(
                      item.taskAssign.filter(tempItem => tempItem.group === currentUser.group)[0]
                        .testAssignTime,
                    ).format('YYYY-MM-DD HH:mm:ss')
                  : null}
              </p>
            </div>
          </List.Item>
        )}
      />
    </>
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
)(IsAssigned);
