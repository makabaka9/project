import React, { useEffect, useState } from 'react';
import { Button, List, Modal } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import BasicOrderInfo from '@/components/BasicOrderInfo';
// import DetailPhysicalChemical from '@/components/DetailPhysicalChemical';
import { CurrentUser } from '@/models/user';
import { StateType } from '../../model';
import { ListItemDataType } from '../../data';
// import styles from './index.less';

// const { Panel } = Collapse;
const pageSize = 5;

interface IsTestedProps {
  dispatch: Dispatch<any>;
  // data?: StateType['step'];
  testedList?: ListItemDataType[];
  loading: boolean;
  usercode?: string;
  currentUser: any[];
}

const IsTested: React.FC<IsTestedProps> = props => {
  const { dispatch, testedList, usercode, currentUser, loading } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };
  useEffect(() => {
    dispatch({
      type: 'checkAndRecord/fetchTested',
      payload: {
        // count: 5,
        pageSize,
        usercode,
        group: currentUser.group,
      },
    });
  }, []);

  const fetchMore = () => {
    dispatch({
      type: 'checkAndRecord/appendFetchTested',
      payload: {
        pageSize,
        usercode: currentUser.usercode,
        group: currentUser.group,
        current: testedList?.length,
      },
    });
  };
  const loadMore = testedList.length > 0 && (
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
        loading={testedList.length === 0 ? loading : false}
        rowKey="id"
        itemLayout="vertical"
        loadMore={loadMore}
        dataSource={testedList}
        renderItem={(item: ListItemDataType) => (
          <List.Item
            key={item.id}
            actions={[
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
    // data: checkAndRecord.step,
    loading: loading.models.checkAndRecord,
    testedList: checkAndRecord.testedList,
    usercode: user.currentUser.usercode,
    currentUser: user.currentUser,
  }),
)(IsTested);
