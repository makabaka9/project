import React, { useEffect } from 'react';
import { Button, Divider, Card, Row, Collapse, Descriptions, List, Tag, Tabs } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import BasicOrderInfo from '@/components/BasicOrderInfo';
import { CurrentUser } from '@/models/user';
import { StateType } from '../../model';
import { ListItemDataType } from '../../data';
import styles from './index.less';
import IsTested from '../IsTested';
import IsRejected from '../IsRejected';

const { Panel } = Collapse;
const pageSize = 5;

interface Step0Props {
  dispatch: Dispatch<any>;
  data?: StateType['step'];
  list?: ListItemDataType[];
  listLength?: number;
  rejectedLength?: number;
  loading: boolean;
  usercode?: string;
  currentUser: any[];
}

const Step0: React.FC<Step0Props> = props => {
  const {
    dispatch,
    data,
    list,
    listLength,
    rejectedLength,
    usercode,
    currentUser,
    loading,
  } = props;

  useEffect(() => {
    dispatch({
      type: 'checkAndRecord/fetch',
      payload: {
        // count: 5,
        pageSize,
        usercode,
        group: currentUser.group,
        // isTested:true
      },
    });
    dispatch({
      type: 'checkAndRecord/fetchListLength',
      payload: {
        usercode,
        group: currentUser?.group,
      },
    });
    dispatch({
      type: 'checkAndRecord/fetchRejected',
      payload: {
        pageSize,
        usercode: currentUser?.usercode,
        group: currentUser?.group,
      },
    });
  }, []);

  const clickHandle = (event: React.MouseEvent, order: ListItemDataType) => {
    dispatch({
      type: 'checkAndRecord/select',
      payload: {
        orderID: order.orderID,
        selectedOrder: order,
        isRevised:false
      },
    });
  };
  if (!data) {
    return null;
  }

  const fetchMore = () => {
    dispatch({
      type: 'checkAndRecord/appendFetch',
      payload: {
        pageSize,
        usercode: currentUser.usercode,
        group: currentUser.group,
        current: list?.length,
      },
    });
  };
  const loadMore = list.length > 0 && (
    <div style={{ textAlign: 'center', marginTop: 16 }}>
      <Button onClick={fetchMore} style={{ paddingLeft: 48, paddingRight: 48 }}>
        {loading ? (
          <span>
            <LoadingOutlined /> ?????????...
          </span>
        ) : (
          '????????????'
        )}{' '}
      </Button>{' '}
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
          <Tabs.TabPane tab={<div>?????????({listLength})</div>} key="1">
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
                      <Button
                        id={item.orderID}
                        onClick={(event: React.MouseEvent) => clickHandle(event, item)}
                        type="primary"
                        // disabled={true}
                        // disabled={
                        //   typeof item.rawTestData.filter(
                        //     tempItem => tempItem.testUsercode === currentUser?.usercode,
                        //   )[0].testTime !== 'undefined'
                        // }
                      >
                        ???????????????
                      </Button>
                    </div>,
                  ]}
                >
                  <BasicOrderInfo data={item} />
                  <div className={styles.listItemContent}>
                    <Collapse>
                      <Panel key="1" header={<div style={{ color: '#1890ff' }}>??????????????????</div>}>
                        <Card bordered={false}>
                          <Row gutter={16}>
                            <Divider orientation="left">????????????</Divider>
                            <Descriptions>
                              <Descriptions.Item label="??????????????????">
                                {Array.isArray(item.chemicalComposition)
                                  ? item.chemicalComposition.map(tag => <Tag key={tag}>{tag}</Tag>)
                                  : ''}
                              </Descriptions.Item>
                              <Descriptions.Item label="????????????">
                                {Array.isArray(item.Metallography)
                                  ? item.Metallography.map(tag => <Tag key={tag}>{tag}</Tag>)
                                  : ''}
                              </Descriptions.Item>
                            </Descriptions>
                            <Descriptions>
                              <Descriptions.Item label="????????????">
                                {Array.isArray(item.stretchingTest)
                                  ? item.stretchingTest.map(tag => <Tag key={tag}>{tag}</Tag>)
                                  : ''}
                              </Descriptions.Item>
                              <Descriptions.Item label="????????????">
                                {item.bendingTest}
                                {/* {bendingTest && bendingTest.map(tag => <Tag key={tag}>{tag}</Tag>)} */}
                                &emsp;
                                <Descriptions.Item label="????????????">
                                  {item.bendingDiameter}
                                </Descriptions.Item>
                              </Descriptions.Item>
                              <Descriptions.Item label="????????????">
                                {item.impactTest}
                                &emsp;
                                <Descriptions.Item label="??????">
                                  {item.impactTestTemperature}
                                </Descriptions.Item>
                              </Descriptions.Item>
                              <Descriptions.Item label="????????????">
                                {Array.isArray(item.hardnessTest)
                                  ? item.hardnessTest.map(tag => <Tag key={tag}>{tag}</Tag>)
                                  : ''}
                              </Descriptions.Item>
                              <Descriptions.Item label="????????????">
                                {item.springTest}
                                {/* {springTest && springTest.map(tag => <Tag key={tag}>{tag}</Tag>)} */}
                                &emsp;
                                <Descriptions.Item label="????????????">
                                  {item.workLoad}
                                </Descriptions.Item>
                              </Descriptions.Item>
                              <Descriptions.Item label="?????????????????????">
                                {item.gaps}
                                &emsp;
                                <Descriptions.Item label="????????????">
                                  {item.gapsQuantity}
                                </Descriptions.Item>
                              </Descriptions.Item>
                              <Descriptions.Item label="????????????">
                                {item.detectionMethod}
                              </Descriptions.Item>
                              <Descriptions.Item label="????????????????????????">
                                {item.disposalMethod}
                              </Descriptions.Item>
                            </Descriptions>
                          </Row>
                        </Card>
                        {/* <DetailPhysicalChemical data={item} /> */}
                      </Panel>
                    </Collapse>
                  </div>
                  {/* <Collapse>
                    <Panel key="1" header={<div style={{ color: '#1890ff' }}>?????????????????????</div>}>
                      <DetailPhysicalChemical data={item} />
                    </Panel>
                  </Collapse> */}
                </List.Item>
              )}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab={<div>?????????({rejectedLength})</div>} key="3">
            <IsRejected />
          </Tabs.TabPane>
          <Tabs.TabPane tab="?????????" key="2">
            <IsTested />
          </Tabs.TabPane>
        </Tabs>
      </Card>
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
    data: checkAndRecord.step,
    loading: loading.models.checkAndRecord,
    list: checkAndRecord.list,
    listLength: checkAndRecord.listLength,
    rejectedLength: checkAndRecord.rejectedLength,
    usercode: user.currentUser.usercode,
    currentUser: user.currentUser,
  }),
)(Step0);
