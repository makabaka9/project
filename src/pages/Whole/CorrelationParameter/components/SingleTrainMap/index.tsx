import { Chart, DonutChart, Legend, Line, PieChart, Point, Slider } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';
import { Card, Col, DatePicker, Descriptions, Form, Row, Select, Statistic, Table, Tabs } from 'antd';
import monitor from './monitor.png';
import styles from '../../style.less';
const { Option } = Select;
const { TabPane } = Tabs;
export interface SingleTrainMapProps {
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  singledata: any;
  multipledata: any;
  onSubmit: Function;
}

const SingleTrainMap: React.FC<SingleTrainMapProps> = (props) => {
  const { height = 1, singledata, multipledata, onSubmit } = props;
  const clickHandle = (event: any) => {
    onSubmit(event);
  };
  const { RangePicker } = DatePicker;
  function onChange(value, dateString) {

  }

  function onOk(value) {
  }
  const chartHeight = height + 100;
  let flag = false;
  return (
    <div
    >
      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="单车多参数" key="1">

          <Card bordered={false} bodyStyle={{ padding: 0 }} >
            <Row gutter={24}>
              <Col xl={3} lg={12} sm={24} xs={24}>
                <Form layout="inline" onFinish={clickHandle}>
                  <Form.Item name="lineCode" label="线路号：" style={{ width: 200, marginBottom: 1, marginTop: 10 }}>
                    <Select
                      // onChange={onChange}
                      showSearch
                      defaultValue="5"
                      placeholder=""
                    // style={{ maxWidth: 200, width: '100%' }}
                    >
                      {/* {
              optionTrain.map(item =>
                <Select.Option value={item}>{item}</Select.Option>
              )
            } */}
                    </Select>
                  </Form.Item>
                </Form>
              </Col>
              <Col xl={3} lg={12} sm={24} xs={24}>
                <Form layout="inline" onFinish={clickHandle}>
                  <Form.Item name="lineCode" label="列车号：" style={{ width: 200, marginBottom: 1, marginTop: 10 }}>
                    <Select
                      // onChange={onChange}
                      showSearch
                      defaultValue="5"
                      placeholder=""
                    // style={{ maxWidth: 200, width: '100%' }}
                    >
                      {/* {
              optionTrain.map(item =>
                <Select.Option value={item}>{item}</Select.Option>
              )
            } */}
                    </Select>
                  </Form.Item>
                </Form>
              </Col>
              <Col xl={5} lg={12} sm={24} xs={24}>
                <Form.Item
                  style={{ marginBottom: 1, marginTop: 10 }}
                  name="select-multiple"
                  label="关联参数"
                >
                  <Select style={{ textAlign: "left" }} mode="multiple" placeholder="请选择关键参数！">
                    <Option value="网压">网压</Option>
                    <Option value="电流">电流</Option>
                    <Option value="载荷">载荷</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xl={5} lg={12} sm={24} xs={24}>
                <RangePicker
                  style={{ width: 200, marginBottom: 1, marginTop: 10 }}
                  showTime={{ format: 'HH:mm' }}
                  format="YYYY-MM-DD HH:mm"
                  onChange={onChange}
                  onOk={onOk}
                />
              </Col>
            </Row>
          </Card>
          <Chart
            padding={[10, 20, 50, 40]}
            autoFit
            height={chartHeight}
            data={singledata}
            scale={{ value: { min: 0 } }}

          >
            <Legend position="top-right"
              itemName={{
                spacing: 10, // 文本同滑轨的距离
                style: {
                  // stroke: 'blue',
                  // fill: "red",
                },
              }}
            />
            <Line position="year*value" color="type" />
            <Point position="year*value" color="type" />
            {/* <Slider
              start={0.5}
              formatter={(v, d, i) => {
                flag = !flag;
                return `${v}年${flag ? "开始" : "结束"}`;
              }}
            /> */}
          </Chart>
        </TabPane>
        <TabPane tab="多车单一参数" key="2">
          <Card bordered={false} bodyStyle={{ padding: 0 }} >
            <Row gutter={24}>
              <Col xl={3} lg={12} sm={24} xs={24}>
                <Form layout="inline" onFinish={clickHandle}>
                  <Form.Item name="lineCode" label="线路号：" style={{ width: 200, marginBottom: 1, marginTop: 10 }}>
                    <Select
                      // onChange={onChange}
                      showSearch
                      defaultValue="5"
                      placeholder=""
                    // style={{ maxWidth: 200, width: '100%' }}
                    >
                      {/* {
              optionTrain.map(item =>
                <Select.Option value={item}>{item}</Select.Option>
              )
            } */}
                    </Select>
                  </Form.Item>
                </Form>
              </Col>
              <Col xl={4} lg={12} sm={24} xs={24}>
                <Form layout="inline" onFinish={clickHandle}>
                  <Form.Item name="lineCode" label="列车号：" style={{ width: 260, marginBottom: 1, marginTop: 10 }}>
                    <Select style={{ textAlign: "left" }} mode="multiple" placeholder="请选择列车号！">
                      <Option value="1601">1601</Option>
                      <Option value="1602">1602</Option>
                      <Option value="1603">1603</Option>
                    </Select>
                  </Form.Item>
                </Form>
              </Col>
              <Col xl={5} lg={12} sm={24} xs={24}>
                <Form.Item
                  style={{ marginBottom: 1, marginTop: 10 }}
                  name="select"
                  label="系统参数"
                  hasFeedback
                >
                  <Select placeholder="请选择系统参数">
                    <Option value="china">牵引力-牵引系统</Option>
                    <Option value="usa">网压-牵引系统</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xl={5} lg={12} sm={24} xs={24}>
                <RangePicker
                  style={{ width: 200, marginBottom: 1, marginTop: 10 }}
                  showTime={{ format: 'HH:mm' }}
                  format="YYYY-MM-DD HH:mm"
                  onChange={onChange}
                  onOk={onOk}
                />
              </Col>
            </Row>
          </Card>
          <Chart
            padding={[10, 20, 50, 40]}
            autoFit
            height={chartHeight}
            data={multipledata}
            scale={{ value: { min: 0 } }}

          >
            <Legend position="top-right"
              itemName={{
                spacing: 10, // 文本同滑轨的距离
                style: {
                  // stroke: 'blue',
                  // fill: "red",
                },
              }}
            />
            <Line position="year*value" color="type" />
            <Point position="year*value" color="type" />
            {/* <Slider
              start={0.5}
              formatter={(v, d, i) => {
                flag = !flag;
                return `${v}年${flag ? "开始" : "结束"}`;
              }}
            /> */}
          </Chart>
        </TabPane>
      </Tabs>
    </div >
  );
};

export default SingleTrainMap;
