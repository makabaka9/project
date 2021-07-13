import React, { FC, useEffect, useState } from 'react';
import { Button, List, Modal } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import BasicOrderInfo from '@/components/BasicOrderInfo';
import { CurrentUser } from '@/models/user';
import RejectedInfo from '../RejectedInfo';
import { StateType } from '../../model';
import { ListItemDataType } from '../../data.d';
import styles from './index.less';


const pageSize = 5;

interface IsRejectedProps {
  dispatch: Dispatch<any>;
  // checkAndRecord: StateType;
  rejectedList?: ListItemDataType[];
  loading: boolean;
  currentUser?: any[];
  usercode?: string;
  group?: string;
  data?: ListItemDataType[];
}

const IsRejected: FC<IsRejectedProps> = props => {
  const { dispatch, rejectedList, currentUser, loading } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };
  useEffect(() => {
    dispatch({
      type: 'checkAndRecord/fetchRejected',
      payload: {
        // count: 5,
        pageSize,
        usercode: currentUser ?.usercode,
        group: currentUser ?.group,
      },
    });
  }, []);

  const fetchMore = () => {
    dispatch({
      type: 'checkAndRecord/appendFetchRejected',
      payload: {
        pageSize,
        usercode: currentUser ?.usercode,
        group: currentUser ?.group,
        current: rejectedList ?.length,
      },
    });
  };

  const clickHandle = (event: React.MouseEvent, order: ListItemDataType) => {
    dispatch({
      type: 'checkAndRecord/select',
      payload: {
        orderID: order.orderID,
        isRevised:true,
        selectedOrder: order,
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
          )}{' '}
      </Button>{' '}
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
        renderItem={(item: ListItemDataType) => (
          <List.Item
            key={item.id}
            actions={[
              <div>
                <Button
                  id={item.orderID}
                  onClick={(event: React.MouseEvent) => clickHandle(event, item)}
                  type="primary"
                  disabled={item.rawTestData.filter(
                    i=>i.testGroup===currentUser.group && i.testUsercode===currentUser.usercode)[0].isRevised}
                >
                  修改检测单
              </Button>
              </div>,
              <div>
                <Button onClick={showModal} style={{ marginRight: 8 }}>
                  查看检测记录
                </Button>
                <Modal
                  title="检测记录"
                  visible={modalVisible}
                  onOk={handleCancel}
                  onCancel={handleCancel}
                >
                  检测记录
                </Modal>
              </div>,

            ]}
          >
            <BasicOrderInfo data={item} />
            <div className={styles.listItemContent}>
              <RejectedInfo data={item} />
            </div>
          </List.Item>
        )}
      />
    </>
  );
};

export default connect(
  ({
    checkAndRecord,
    user,
    loading,
  }: {
    checkAndRecord: StateType;
    loading: { models: { [key: string]: boolean } };
    user: { currentUser: CurrentUser };
  }) => ({
    loading: loading.models.checkAndRecord,
    rejectedList: checkAndRecord.rejectedList,
    currentUser: user.currentUser,
  }),
)(IsRejected);
