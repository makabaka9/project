import React, { FC, useEffect } from 'react';
import { Button, Card, List, Collapse, Tabs } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { CurrentUser } from '@/models/user';
import BasicOrderInfo from '@/components/BasicOrderInfo';
import DetailPhysicalChemical from '@/components/DetailPhysicalChemical';
import { StateType } from './model';
import { ListItemDataType } from './data.d';
import styles from './style.less';
import ReviewProcess from './components/ReviewProcess';
import IsReviewed from './components/IsReviewed';
import IsRejected from './components/IsRejected';
// import Item from 'antd/lib/list/Item';

const { Panel } = Collapse;

interface ReviewProps {
  dispatch: Dispatch<any>;
  checkAndReview: StateType;
  loading: boolean;
  currentUser: CurrentUser;
  list: ListItemDataType;
  listLength: number;
  username?: string;
  group?: string;
}

const Review: FC<ReviewProps> = ({
  dispatch,
  checkAndReview: { list, listLength },
  currentUser,
  username,
  group,
  loading,
}) => {
  useEffect(() => {
    dispatch({
      type: 'checkAndReview/fetch',
      payload: {
        count: 5,
        group: currentUser.group,
        username: currentUser.username,
      },
    });
    dispatch({
      type: 'checkAndReview/fetchListLength',
      payload: {
        username,
        group,
      },
    });
  }, []);
  const fetchMore = () => {
    const pageSize = 5;
    dispatch({
      type: 'checkAndReview/appendFetch',
      payload: {
        pageSize,
        current: list?.length,
        group: currentUser.group,
        username: currentUser.username,
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
    <>
      <Card
        style={{ marginTop: 24 }}
        bordered={false}
        bodyStyle={{ padding: '8px 32px 32px 32px' }}
      >
        <Tabs type="card">
          <Tabs.TabPane tab={<div>待审核({listLength})</div>} key="1">
            <List<ListItemDataType>
              size="large"
              loading={list.length === 0 ? loading : false}
              rowKey="id"
              itemLayout="vertical"
              loadMore={loadMore}
              dataSource={list}
              renderItem={item => (
                <List.Item
                  key={item.id}
                  actions={[
                    <ReviewProcess
                      data={item}
                    />,
                  ]}
                >
                  <List.Item.Meta />
                  <BasicOrderInfo data={item} />
                  <div className={styles.listItemContent}>
                    <Collapse>
                      <Panel
                        key="1"
                        header={<div style={{ color: '#1890ff' }}>检测委托单详情</div>}
                      >
                        <DetailPhysicalChemical data={item} />
                      </Panel>
                    </Collapse>
                  </div>
                </List.Item>
              )}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="已审核" key="2">
            <IsReviewed />
          </Tabs.TabPane>
          <Tabs.TabPane tab="已驳回" key="3">
            <IsRejected />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </>
  );
};

export default connect(
  ({
    checkAndReview,
    loading,
    user,
  }: {
    checkAndReview: StateType;
    loading: { models: { [key: string]: boolean } };
    user: { currentUser: CurrentUser };
  }) => ({
    checkAndReview,
    loading: loading.models.checkAndReview,
    currentUser: user.currentUser,
    username: user.currentUser.username,
    group: user.currentUser.group,
  }),
)(Review);
