import React, { Dispatch, useState } from 'react';
import { Card, Select, Button, Typography } from 'antd';

interface LineCodeAndTrainCodeQueryProps {}

const LineCodeAndTrainCodeQuery: React.FC<LineCodeAndTrainCodeQueryProps> = (props) => {
  return (
    <div>
      <div>
        <span>列车号：</span>
        <Select showSearch placeholder="" style={{ maxWidth: 200, width: '100%' }}>
          <Select.Option value="1104">252</Select.Option>
        </Select>{' '}
        &emsp;
        <Button type="primary">查询</Button>
      </div>
    </div>
  );
};

export default LineCodeAndTrainCodeQuery;
