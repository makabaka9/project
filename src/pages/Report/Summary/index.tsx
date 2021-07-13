import {
  // DownloadOutlined,
  EditOutlined,
  EllipsisOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import {
  Card,
  Col,
  Dropdown,
  List,
  Menu,
  Row,
  Select,
  Tooltip,
  Form,
  DatePicker,
  Input,
  Button,
} from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { connect, Dispatch } from 'dva';
import moment from 'moment';
import { ListItemDataType } from './data.d';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import CardOrder from './components/CardOrder';
import styles from './style.less';
import { StateType } from './model';
import ReportsToPrint from './components/ReportsToPrint';

const { Option } = Select;
const { RangePicker } = DatePicker;
interface SummaryProps {
  dispatch: Dispatch<any>;
  reportAndSummary: StateType;
  loading: boolean;
}

const formItemLayout = {
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

export const Summary: FC<SummaryProps> = props => {
  const {
    dispatch,
    loading,
    reportAndSummary: { list, total },
  } = props;
  const [form] = Form.useForm();
  const { validateFields } = form;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [fetchOther, setFetchOther] = useState();

  useEffect(() => {
    dispatch({
      type: 'reportAndSummary/fetch',
      payload: {
        pageSize,
        current: currentPage,
      },
    });
  }, []);

  const onValidateForm = async () => {
    const values = await validateFields();
    console.log('values查询************:',values)
    if (values.date) {
      const date1 = values.date[0].valueOf();
      const date2 = values.date[1].valueOf();
      values.tempDate = [date1, date2];
    }
    console.log('values查询:',values)
    setFetchOther(values);
    if (dispatch) {
      dispatch({
        type: 'reportAndSummary/fetchOther',
        payload: {
          group: values.group,
          client: values.client,
          date: values.tempDate,
          pageSize,
          current: currentPage,
        },
      });
    }
  };

  const handleChangeOrderID = (value: any) => {
    dispatch({
      type: 'reportAndSummary/fetchOrderID',
      payload: {
        pageSize,
        current: currentPage,
        orderID: value.orderID,
      },
    });
  };
  const changePage = (page: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
    if (dispatch && fetchOther === undefined) {
      dispatch({
        type: 'reportAndSummary/fetchMore',
        payload: {
          pageSize,
          current: page,
        },
      });
    }
    if (dispatch && fetchOther !== undefined) {
      dispatch({
        type: 'reportAndSummary/fetchOther',
        payload: {
          group: fetchOther.group,
          client: fetchOther.client,
          date: fetchOther.tempDate,
          pageSize,
          current: page,
        },
      });
    }
  };
  const itemMenu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.alipay.com/">
          1st menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.taobao.com/">
          2nd menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.tmall.com/">
          3d menu item
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.filterCardList}>
      <Card bordered={false}>
        <Form onValuesChange={handleChangeOrderID}>
          <StandardFormRow title="委托单号查询" block style={{ paddingBottom: 11 }}>
            <Row gutter={16}>
              <Col lg={8} md={10} sm={10} xs={24}>
                <Form.Item {...formItemLayout} name="orderID">
                  <Input.Search placeholder="请输入委托单号" enterButton="🔍" size="large" />
                </Form.Item>
              </Col>
            </Row>
          </StandardFormRow>
        </Form>
        <Form
          form={form}
          // onValuesChange={handleValuesChange}
        >
          <StandardFormRow title="所属类目" block style={{ paddingBottom: 11 }} grid last>
            <Form.Item name="group">
              <TagSelect expandable>
                <TagSelect.Option value="绝缘组">绝缘组</TagSelect.Option>
                <TagSelect.Option value="化学组">化学组</TagSelect.Option>
                <TagSelect.Option value="物理组">物理组</TagSelect.Option>
                <TagSelect.Option value="热电组">热电组</TagSelect.Option>
                <TagSelect.Option value="长度组">长度组</TagSelect.Option>
                <TagSelect.Option value="力学组">力学组</TagSelect.Option>
              </TagSelect>
            </Form.Item>
          </StandardFormRow>
          <StandardFormRow title="其它选项" grid last>
            <Row gutter={16}>
              <Col lg={8} md={10} sm={10} xs={24}>
                <Form.Item {...formItemLayout} name="date" label="日期">
                  <RangePicker
                    ranges={{
                      今天: [moment(), moment()],
                      本月: [moment().startOf('month'), moment().endOf('month')],
                    }}
                    format="YYYY/MM/DD HH:mm:ss"
                  />
                </Form.Item>
              </Col>
              <Col lg={8} md={10} sm={10} xs={24}>
                <Form.Item {...formItemLayout} name="client" label="送检单位">
                  <Select allowClear placeholder="" style={{ maxWidth: 200, width: '100%' }}>
                    <Option value="good">1</Option>
                    <Option value="normal">2</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col lg={8} md={10} sm={10} xs={24}>
                <Button onClick={onValidateForm} type="primary">
                  查询
                </Button>
              </Col>
            </Row>
          </StandardFormRow>
        </Form>
      </Card>
      <br />
      <List<ListItemDataType>
        rowKey="id"
        grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
        loading={loading}
        dataSource={list}
        pagination={{
          pageSize: 8,
          total,
          onChange: changePage,
        }}
        renderItem={item => (
          <List.Item key={item.id}>
            <Card
              hoverable
              bodyStyle={{ paddingBottom: 20 }}
              actions={[
                <Tooltip key="print" title="批量打印">
                  <ReportsToPrint data={item} />
                </Tooltip>,
                <Tooltip key="edit" title="编辑">
                  <EditOutlined />
                </Tooltip>,
                <Tooltip title="分享" key="share">
                  <ShareAltOutlined />
                </Tooltip>,
                <Dropdown key="ellipsis" overlay={itemMenu}>
                  <EllipsisOutlined />
                </Dropdown>,
              ]}
            >
              <CardOrder data={item} />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default connect(
  ({
    reportAndSummary,
    loading,
  }: {
    reportAndSummary: StateType;
    loading: { models: { [key: string]: boolean } };
  }) => ({
    reportAndSummary,
    loading: loading.models.reportAndSummary,
  }),
)(Summary);
