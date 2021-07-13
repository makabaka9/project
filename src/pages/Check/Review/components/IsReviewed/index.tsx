import React, { FC, useEffect } from 'react';
import { Button, List, Collapse, Tag } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import BasicOrderInfo from '@/components/BasicOrderInfo';
import DetailPhysicalChemical from '@/components/DetailPhysicalChemical';
import { CurrentUser } from '@/models/user';
import { StateType } from '../../model';
import { ListItemDataType } from '../../data.d';
import styles from '../../style.less';

const { Panel } = Collapse;

interface TaskReviewListProps {
  dispatch: Dispatch<any>;
  checkAndReview: StateType;
  loading: boolean;
  reviewedList?: ListItemDataType;
  username?: string;
  group?: string;
}

const TaskReviewList: FC<TaskReviewListProps> = ({
  dispatch,
  checkAndReview: { reviewedList },
  username,
  group,
  loading,
}) => {
  useEffect(() => {
    dispatch({
      type: 'checkAndReview/fetchReviewed',
      payload: {
        username,
        group,
        pageSize: 5,
      },
    });
  }, []);
  const fetchMore = () => {
    // const pageSize = 5;
    dispatch({
      type: 'checkAndReview/appendFetchReviewed',
      payload: {
        username,
        group,
        pageSize: 5,
        current: reviewedList?.length,
      },
    });
  };

  const loadMore = reviewedList.length > 0 && (
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
        loading={reviewedList.length === 0 ? loading : false}
        rowKey="id"
        itemLayout="vertical"
        loadMore={loadMore}
        dataSource={reviewedList}
        renderItem={item => (
          <List.Item key={item.id}>
            <List.Item.Meta />
            <BasicOrderInfo data={item} />
            <div className={styles.listItemContent}>
              <Collapse>
                <Panel key="1" header={<div style={{ color: '#1890ff' }}>检测委托单详情</div>}>
                  <DetailPhysicalChemical data={item} />
                </Panel>
              </Collapse>
            </div>
            <div className={styles.listItemContent}>
              <p>
                审核时间：
                <br />
                审核班组：
                {Array.isArray(item.assignedGroup)
                  ? item.assignedGroup.map(tag => <Tag key={tag}>{tag}</Tag>)
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
    username: user.currentUser.username,
    group: user.currentUser.group,
  }),
)(TaskReviewList);
