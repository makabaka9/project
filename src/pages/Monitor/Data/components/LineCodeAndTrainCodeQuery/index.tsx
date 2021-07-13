import React from 'react';
import { Select, Button, Form, DatePicker } from 'antd';
import { TimePicker } from 'antd';



interface LineCodeAndTrainCodeQueryProps {
  defaultTrainCode: string;
  onSubmit: Function;
}

const LineCodeAndTrainCodeQuery: React.FC<LineCodeAndTrainCodeQueryProps> = (props) => {
  const { defaultTrainCode, onSubmit } = props;
  const clickHandle = (event: any) => {
    onSubmit(event);
  };
  const optionTrain: any[] | undefined = [];
  for (let i = 501; i <= 524; i += 1) {
    optionTrain.push(i)
  }
  const { RangePicker } = TimePicker;
  return (
    <div style={{ marginBottom: 24 }}>
      {/* <Card bordered={false} style={{ marginBottom: 16, padding: 0 }}>
        <div> */}
      <Form layout="inline" onFinish={clickHandle}>
        <Form.Item name="lineCode" label="线路号：" style={{ width: 200 }}>
          <Select
            // onChange={onChange}
            showSearch
            defaultValue="5"
            placeholder=""
            style={{ maxWidth: 200, width: '100%' }}
          >
            {/* {
              optionTrain.map(item =>
                <Select.Option value={item}>{item}</Select.Option>
              )
            } */}
          </Select>
        </Form.Item>
        <Form.Item name="trainCode" label="列车号：" style={{ width: 200 }}>
          <Select
            // onChange={onChange}
            showSearch
            defaultValue={defaultTrainCode}
            placeholder=""
            style={{ maxWidth: 200, width: '100%' }}
          >{
              optionTrain.map(item =>
                <Select.Option value={item}>{item}</Select.Option>
              )
            }
          </Select>
        </Form.Item>
        &emsp;
            <Button type="primary" htmlType="submit" style={{ marginRight: 30 }}>
          查询
            </Button>
        <Form.Item name="trainCode" label="故障日期：" style={{ width: 200 }}>
          <DatePicker />
        </Form.Item>
        <Form.Item name="trainCode" label="时间：" style={{ width: 200 }}>
          <RangePicker />
        </Form.Item>
      </Form>
      {/* </div>
      </Card> */}
    </div>
  );
};

export default LineCodeAndTrainCodeQuery;
