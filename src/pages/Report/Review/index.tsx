import React, { FC, useEffect } from 'react';
import { Button, Card, List } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { CurrentUser } from '@/models/user';
import BasicOrderInfo from '@/components/BasicOrderInfo';
// import DetailPhysicalChemical from '@/components/DetailPhysicalChemical';
import { StateType } from './model';
import { ListItemDataType } from './data.d';
// import styles from './style.less';
import ReviewProcess from './components/ReviewProcess';

// const { Panel } = Collapse;

interface ReviewProps {
  dispatch: Dispatch<any>;
  reportAndReview: StateType;
  loading: boolean;
  currentUser: CurrentUser;
  list: ListItemDataType;
}

const Review: FC<ReviewProps> = ({ dispatch, reportAndReview: { list }, currentUser, loading }) => {
  useEffect(() => {
    dispatch({
      type: 'reportAndReview/fetch',
      payload: {
        pageSize: 5,
        group: currentUser.group,
        username: currentUser.username,
      },
    });
  }, []);
  const fetchMore = () => {
    const pageSize = 5;
    dispatch({
      type: 'reportAndReview/appendFetch',
      payload: {
        pageSize,
        current: list?.length,
        group: currentUser.group,
        username: currentUser.username,
      },
    });
  };
  useEffect(() => {
    const pageSize = 500;
    dispatch({
      type: 'reportAndReview/fetchUser',
      payload: {
        pageSize,
        count: 5,
      },
    });
  }, []);

  // const clickAssign = (event, key: string) => {
  //   dispatch({
  //     type: 'reportAndReview/addAssign',
  //     payload: { event, key },
  //   });
  // };

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
                <ReviewProcess data={item} />,
                // <div>
                //   <AssignOrder
                //     itemKey={item.orderID}
                //     testTreeData={testTreeData}
                //     processTreeData={processTreeData}
                //     onSubmit={clickAssign}
                //     isAssigned={
                //       !(
                //         typeof item.processMonitorAssign === 'undefined' &&
                //         typeof item.testMonitorAssign === 'undefined'
                //       )
                //     }
                //   />
                // </div>,
              ]}
            >
              <List.Item.Meta />
              <BasicOrderInfo data={item} />
              {/* <div className={styles.listItemContent}>
                <Collapse>
                  <Panel key="1" header={<div style={{ color: '#1890ff' }}>检测委托单详情</div>}>
                    <DetailPhysicalChemical data={item} />
                  </Panel>
                </Collapse>
              </div> */}
              {/* <div className={styles.listItemContent}>
                <MetallographyReport/>
              </div> */}
            </List.Item>
          )}
        />
      </Card>
    </>
  );
};

export default connect(
  ({
    reportAndReview,
    loading,
    user,
  }: {
    reportAndReview: StateType;
    loading: { models: { [key: string]: boolean } };
    user: { currentUser: CurrentUser };
  }) => ({
    reportAndReview,
    loading: loading.models.reportAndReview,
    currentUser: user.currentUser,
  }),
)(Review);
