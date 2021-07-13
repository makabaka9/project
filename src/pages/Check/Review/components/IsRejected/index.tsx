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

interface TaskRejectListProps {
  dispatch: Dispatch<any>;
  checkAndReview: StateType;
  loading: boolean;
  rejectedList?: ListItemDataType;
  username?: string;
  group?: string;
}

const TaskRejectList: FC<TaskRejectListProps> = ({
  dispatch,
  checkAndReview: { rejectedList },
  username,
  group,
  loading,
}) => {
  useEffect(() => {
    dispatch({
      type: 'checkAndReview/fetchRejected',
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
      type: 'checkAndReview/appendFetchRejected',
      payload: {
        username,
        group,
        pageSize: 5,
        current: rejectedList?.length,
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
      <List<ListItemDataType>
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
                <Panel key="1" header={<div style={{ color: '#1890ff' }}>检测委托单详情</div>}>
                  <DetailPhysicalChemical data={item} />
                </Panel>
              </Collapse>
            </div>
            <div className={styles.listItemContent}>
              <p>
                驳回时间：
                <br />
                驳回人员：
                {Array.isArray(item.rawTestData)
                  ? item.rawTestData.map(tag => <Tag key={tag.testReviewer}>{tag.testReviewer}</Tag>)
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
)(TaskRejectList);
