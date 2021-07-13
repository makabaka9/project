import React, { FC, useEffect } from 'react';
import { Button, Card, List, Collapse } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { CurrentUser } from '@/models/user';
import BasicOrderInfo from '@/components/BasicOrderInfo';
import DetailPhysicalChemical from '@/components/DetailPhysicalChemical';
import { StateType } from './model';
import { ListItemDataType } from './data.d';
import styles from './style.less';
import ApproveProcess from './components/ApproveProcess';

const { Panel } = Collapse;

interface ApproveProps {
  dispatch: Dispatch<any>;
  reportAndApprove: StateType;
  loading: boolean;
  currentUser: CurrentUser;
  list: ListItemDataType;
}

const Approve: FC<ApproveProps> = ({
  dispatch,
  reportAndApprove: { list },
  // currentUser,
  loading,
}) => {
  useEffect(() => {
    dispatch({
      type: 'reportAndApprove/fetch',
      payload: {
        pageSize: 5,
        // group: currentUser.group,
      },
    });
  }, []);
  const fetchMore = () => {
    const pageSize = 5;
    dispatch({
      type: 'reportAndApprove/appendFetch',
      payload: {
        pageSize,
        current: list?.length,
        // group: currentUser.group,
      },
    });
  };
  // console.log('ggggg', currentUser.group);
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
            <List.Item key={item.id} actions={[<ApproveProcess data={item} />]}>
              <List.Item.Meta />
              <BasicOrderInfo data={item} />
              <div className={styles.listItemContent}>
                <Collapse>
                  <Panel key="1" header={<div style={{ color: '#1890ff' }}>检测委托单详情</div>}>
                    <DetailPhysicalChemical data={item} />
                  </Panel>
                </Collapse>
              </div>
            </List.Item>
          )}
        />
      </Card>
    </>
  );
};

export default connect(
  ({
    reportAndApprove,
    loading,
    user,
  }: {
    reportAndApprove: StateType;
    loading: { models: { [key: string]: boolean } };
    user: { currentUser: CurrentUser };
  }) => ({
    reportAndApprove,
    loading: loading.models.reportAndApprove,
    currentUser: user.currentUser,
  }),
)(Approve);
