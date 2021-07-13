import React, { useState, useEffect } from 'react';
import { Card, Steps, Tabs } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { StateType } from './model';
import TableList from '@/pages/UserList';
import Mileage from '@/pages/Statistics/Mileage';
import OrderSubmit from '@/pages/Submit/OrderSubmit';
import { render } from 'bizcharts/lib/g-components';
import ReactDOM from 'react-dom';

const Submit: React.FC<{}> = () => {
function callback(key) {
    console.log(key);
  }

const { TabPane } = Tabs;
  return (
    // <PageHeaderWrapper
    // // content="将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。"
    // >
    <>
      <Tabs defaultActiveKey="1" >
        {/* onChange={callback} */}
        <TabPane tab="欢迎页" key="1">
          <TableList/>
          {/* 数据分析 */}
          <Mileage />
        </TabPane>
        <TabPane tab="项目申报" key="2">
          <OrderSubmit />
        </TabPane>
        <TabPane tab="合同签署" key="3">
          Content of Tab Pane 3
        </TabPane>
        <TabPane tab="项目执行" key="4">
          Content of Tab Pane 4
        </TabPane>
        <TabPane tab="项目变更" key="5">
          Content of Tab Pane 5
        </TabPane>
        <TabPane tab="项目结题" key="6">
          Content of Tab Pane 6
        </TabPane>
        <TabPane tab="系统管理" key="7">
          Content of Tab Pane 7
        </TabPane>
      </Tabs>
      {/* </PageHeaderWrapper> */}
      </>
  );
};

export default connect(({ SubmitProcess }: { SubmitProcess: StateType }) => ({
  current: SubmitProcess.current,
}))(Submit);
