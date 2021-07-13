import React from 'react';
import { Card, Select, Button, Form } from 'antd';

interface LineCodeAndTrainCodeQueryProps {
  defaultTrainCode: string;
  onSubmit: Function;
}

const LineCodeAndTrainCodeQuery: React.FC<LineCodeAndTrainCodeQueryProps> = (props) => {
  const { defaultTrainCode, onSubmit } = props;
  const clickHandle = (event: any) => {
    onSubmit(event);
  };

  return (
    <div style={{ marginBottom: 24 }}>
      {/* <Card bordered={false} style={{ marginBottom: 16, padding: 0 }}> */}
      {/* <div> */}
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
          >
            <Select.Option value="501">501</Select.Option>
            <Select.Option value="502">502</Select.Option>
            <Select.Option value="503">503</Select.Option>
          </Select>
        </Form.Item>
        &emsp;
        <Button type="primary" htmlType="submit">
          查询
        </Button>
      </Form>
      {/* </div> */}
      {/* </Card> */}
    </div>
  );
};

export default LineCodeAndTrainCodeQuery;

// import React, { Dispatch, useState } from 'react';
// import { Card, Select, Button, Typography } from 'antd';

// interface LineCodeAndTrainCodeQueryProps {
// }

// const LineCodeAndTrainCodeQuery: React.FC<LineCodeAndTrainCodeQueryProps> = (props) => {

//   return (
//     <div>
//       <div>
//         <span>列车号：</span>
//         <Select
//           showSearch
//           placeholder="" style={{ maxWidth: 200, width: '100%' }}>
//           <Select.Option value="1104">252</Select.Option>
//         </Select>   &emsp;
//           <Button type="primary">查询</Button>
//       </div>

//     </div>
//   );
// };

// export default LineCodeAndTrainCodeQuery;
