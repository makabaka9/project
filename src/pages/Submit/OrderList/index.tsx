import React, { FC, useEffect, useState } from 'react';
import { Button, Card, List, Collapse, Tabs, Cascader, Typography, Row, Col } from 'antd';
import { EditOutlined, LoadingOutlined } from '@ant-design/icons';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import BasicOrderInfo from '@/components/BasicOrderInfo';
import DetailPhysicalChemical from '@/components/DetailPhysicalChemical';
// import { Link } from 'dva/router';
import OrderWorkFlowStep from '@/components/OrderWorkFlowStep';
// import SignaturePad from '@/components/SignaturePad';
import { CurrentUser } from '@/models/user';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { StateType } from './model';
import { ListItemDataType } from '../data.d';
import IsRejected from './components/IsRejected';
import styles from './style.less';
import { Link } from 'umi';

const { Text } = Typography;
const { Panel } = Collapse;
interface OrderListProps {
  dispatch: Dispatch<any>;
  submitAndOrderList: StateType;
  loading: boolean;
  list: ListItemDataType;
  usercode: string;
}

const OrderList: FC<OrderListProps> = ({
  dispatch,
  submitAndOrderList: { list },
  usercode,
  loading,
}) => {
  const [changeValue, setChangeValue] = useState(['', '']);
  const orderType = changeValue[0];
  const timeMark = changeValue[1];
  useEffect(() => {
    dispatch({
      type: 'submitAndOrderList/fetch',
      payload: {
        pageSize: 5,
        usercode,
        orderType,
        timeMark,
      },
    });
  }, []);

  const fetchMore = () => {
    const pageSize = 5;
    dispatch({
      type: 'submitAndOrderList/appendFetch',
      payload: {
        pageSize,
        current: list?.length,
        usercode,
        orderType,
        timeMark,
      },
    });
  };

  const onChange = (value: Array<any>) => {
    setChangeValue(value);
    dispatch({
      type: 'submitAndOrderList/fetch',
      payload: {
        pageSize: 5,
        usercode,
        orderType,
        timeMark,
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

  const options = [
    {
      value: 'physicalChemicalType',
      label: '理化检测委托单',
      children: [
        {
          value: '0',
          label: '未完成',
        },
        {
          value: 'finishTime',
          label: '已完成',
        },
      ],
    },
    {
      value: 'calibrationTestType',
      label: '计量校准委托单',
      children: [
        {
          value: '0',
          label: '未完成',
        },
        {
          value: 'finishTime',
          label: '已完成',
        },
      ],
    },
  ];

  return (
    <>
      <PageHeaderWrapper>
        <Card
          style={{ marginTop: 12 }}
          bordered={false}
          bodyStyle={{ padding: '8px 32px 32px 32px' }}
        >
          {/* <div>
            <SignaturePad />
          </div> */}
          <Row>
            <Col lg={4} md={8} sm={24}>
              <div style={{ marginTop: 12 }}>
                <Link to="./OrderSubmit">
                  <Button type="primary" shape="round" icon={<EditOutlined />}>
                    理化检测委托单
                  </Button>
                </Link>
              </div>
            </Col>
            <Col lg={20} md={8} sm={24}>
              <div style={{ marginTop: 12 }}>
                <Link to="./CalibrationTest">
                  <Button type="primary" shape="round" icon={<EditOutlined />}>
                    计量校准委托单
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
          <p />
          <div>
            <span>
              <Text style={{ color: '#1890ff' }}>查询：</Text>
              <Cascader options={options} onChange={onChange} />
            </span>
          </div>
          <p />
          <Tabs type="card">
            <Tabs.TabPane tab={<div>已申报项目</div>} key="1">
              <List<ListItemDataType>
                size="large"
                loading={list.length === 0 ? loading : false}
                rowKey="id"
                itemLayout="vertical"
                loadMore={loadMore}
                dataSource={list}
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
                  </List.Item>
                )}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="被驳回" key="2">
              <IsRejected />
            </Tabs.TabPane>
          </Tabs>
        </Card>
      </PageHeaderWrapper>
    </>
  );
};

export default connect(
  ({
    submitAndOrderList,
    loading,
    user,
  }: {
    submitAndOrderList: StateType;
    loading: { models: { [key: string]: boolean } };
    user: { currentUser: CurrentUser };
  }) => ({
    submitAndOrderList,
    loading: loading.models.submitAndOrderList,
    usercode: user.currentUser.usercode,
  }),
)(OrderList);
