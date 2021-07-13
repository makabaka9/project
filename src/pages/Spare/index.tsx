import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Form, Input, Popover, Row, Select, TimePicker, Typography } from 'antd';
import React, { FC, useState } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { connect, Dispatch } from 'umi';
import TableList from './components/TableList';
import styles from './style.less';
// import CreateForm from './components/CreateForm';
// import ReduceForm from './components/ReduceForm';
import SortPie from './components/SortPie';
import PurchaseReminder from './components/PurchaseReminder';

type InternalNamePath = (string | number)[];


interface SpareProps {
  dispatch: Dispatch<any>;
  submitting: boolean;
}

interface ErrorField {
  name: InternalNamePath;
  errors: string[];
}

const Spare: FC<SpareProps> = ({
  submitting,
  dispatch,
}) => {

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };



  const sortData = [
    { type: "事故件", value: 1455 },
    { type: "计划维修件", value: 1875 },
    { type: "消耗件", value: 3095 },
    { type: "其他", value: 5005 },
  ]
  return (

    <PageContainer
    // content="高级表单常见于一次性输入和提交大批量数据的场景。"
    >
      <Card className={styles.card} bordered={false}>
        <Row gutter={16}>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
          <Typography.Title level={4}>所属分类统计</Typography.Title>
            <Card bordered={false} >
              <SortPie data={sortData} height={60} />
            </Card>
          </Col>
          <Col xl={4} lg={24} md={24} sm={24} xs={24}>
            <Card  className={styles.card} >
              <Card.Meta
                // avatar={<Avatar size={30} src={MileIcon} />}
                description={<div> <Typography.Text strong style={{ fontSize: 32, color: "#ffa523" }}>

                  23
                        <Typography.Text strong style={{ fontSize: 16 }}>个</Typography.Text>
                </Typography.Text></div>}
                title={<div><Typography.Text strong style={{ fontSize: 16 }}>本月备品备件入库数量 </Typography.Text></div>}
              />

            </Card>
            <Card className={styles.card}>
              <Card.Meta
                // avatar={<Avatar size={30} src={MileIcon} />}
                description={<div> <Typography.Text strong style={{ fontSize: 32, color: "#3779fd" }}>

                  21
                        <Typography.Text strong style={{ fontSize: 16 }}>个 </Typography.Text>
                </Typography.Text></div>}
                title={<div><Typography.Text strong style={{ fontSize: 16 }}>本月备品备件出库数量 </Typography.Text></div>}
              />
            </Card>
          </Col>

          <Col xl={4} lg={24} md={24} sm={24} xs={24}>
            <Card  className={styles.card}>
              <Card.Meta
                // avatar={<Avatar size={30} src={SubwayIcon} />}
                description={<div><Typography.Text strong style={{ fontSize: 32, color: "#3779fd" }}>
                  33

                      </Typography.Text>
                  <Typography.Text strong style={{ fontSize: 16 }}>种 </Typography.Text></div>}
                title={<div><Typography.Text strong style={{ fontSize: 16 }}> 备品备件种类
                      </Typography.Text></div>}
              />
            </Card>
            <Card className={styles.card} >
              <Card.Meta
                // avatar={<Avatar size={30} src={SubwayIcon} />}
                description={<div><Typography.Text strong style={{ fontSize: 32, color: "#f52e5a" }}>
                  12
                      </Typography.Text>
                  <Typography.Text strong style={{ fontSize: 16 }}>种 </Typography.Text></div>}
                title={<div><Typography.Text strong style={{ fontSize: 16 }}> 备品备件采购提醒
                      </Typography.Text></div>}
              />
            </Card>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            {/* <Card bordered={false} > */}
            <Typography.Title level={4}>采购提醒</Typography.Title>
            <div><PurchaseReminder /></div>
            
            {/* </Card> */}
          </Col>
          
        </Row>
      </Card>
      {/* <PurchaseReminder /> */}
      <TableList />
    </PageContainer>
  );
};

export default connect(({ loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
  submitting: loading.effects['spare/submitAdvancedForm'],
}))(Spare);
