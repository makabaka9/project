import React, { useEffect } from 'react';
import { Button, Divider, Card, Row, Collapse, Descriptions, List, Tag } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import BasicOrderInfo from '@/components/BasicOrderInfo';
import DetailPhysicalChemical from '@/components/DetailPhysicalChemical';
import { CurrentUser } from '@/models/user';
import { StateType } from '../../model';
import { ListItemDataType } from '../../data.d';
import styles from './index.less';

const { Panel } = Collapse;
const pageSize = 5;

interface Step0Props {
  dispatch: Dispatch<any>;
  data?: StateType['step'];
  list?: ListItemDataType[];
  loading: boolean;
  usercode?: string;
  currentUser: any[];
}

const Step0: React.FC<Step0Props> = props => {
  const { dispatch, data, list, usercode, currentUser, loading } = props;

  useEffect(() => {
    dispatch({
      type: 'checkAndRecord/fetch',
      payload: {
        // count: 5,
        pageSize,
        usercode,
        group: currentUser.group,
      },
    });
  }, []);

  const clickHandle = (event: React.MouseEvent, order: ListItemDataType) => {
    dispatch({
      type: 'checkAndRecord/select',
      payload: {
        orderID: order.orderID,
        selectedOrder: order,
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
                    填写检测单
                  </Button>
                </div>,
              ]}
            >
              <BasicOrderInfo data={item} />
              <div className={styles.listItemContent}>
                <Row gutter={16}>
                  <Divider orientation="left">检测项目</Divider>
                  <Descriptions>
                    <Descriptions.Item label="化学成分检验">
                      {Array.isArray(item.chemicalComposition)
                        ? item.chemicalComposition.map(tag => <Tag key={tag}>{tag}</Tag>)
                        : ''}
                    </Descriptions.Item>
                    <Descriptions.Item label="金相检验">
                      {Array.isArray(item.Metallography)
                        ? item.Metallography.map(tag => <Tag key={tag}>{tag}</Tag>)
                        : ''}
                    </Descriptions.Item>
                  </Descriptions>
                  <Descriptions>
                    <Descriptions.Item label="拉伸试验">
                      {Array.isArray(item.stretchingTest)
                        ? item.stretchingTest.map(tag => <Tag key={tag}>{tag}</Tag>)
                        : ''}
                    </Descriptions.Item>
                    <Descriptions.Item label="弯曲试验">
                      {item.bendingTest}
                      {/* {bendingTest && bendingTest.map(tag => <Tag key={tag}>{tag}</Tag>)} */}
                      &emsp;
                      <Descriptions.Item label="弯曲直径">{item.bendingDiameter}</Descriptions.Item>
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
                        : ''}
                    </Descriptions.Item>
                    <Descriptions.Item label="弹簧测试">
                      {item.springTest}
                      {/* {springTest && springTest.map(tag => <Tag key={tag}>{tag}</Tag>)} */}
                      &emsp;
                      <Descriptions.Item label="工作负载">{item.workLoad}</Descriptions.Item>
                    </Descriptions.Item>
                    <Descriptions.Item label="缺口类型及数量">
                      {item.gaps}
                      &emsp;
                      <Descriptions.Item label="缺口数量">{item.gapsQuantity}</Descriptions.Item>
                    </Descriptions.Item>
                  </Descriptions>
                </Row>
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
    usercode: user.currentUser.usercode,
    currentUser: user.currentUser,
  }),
)(Step0);
