import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { HashRouter as Router, Route, Switch, Link, withRouter } from 'react-router-dom';
import { Breadcrumb } from 'antd';
const breadcrumbNameMap = {
    // '/ProjectHome': '首页',
    '/OrderSubmit': '项目申报',
    '/OrderSubmit/ContractSign': '合同签署',
    '/OrderSubmit/ContractSign/Execute': '项目执行',
    'OrderSubmit/ContractSign/Execute/Completion': '项目结题',
    // '/apps/1/detail': 'Detail',
    // '/apps/2/detail': 'Detail',
};

const Nav = withRouter((props) => {
    const { location } = props;
    const pathSnippets = location.pathname.split("/").filter((i) => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
        return (
            <Breadcrumb.Item key={url}>
                {/* <Link to={url}></Link> */}
                {breadcrumbNameMap[url]}
            </Breadcrumb.Item>
        );
    });
    const breadcrumbItems = [
        <Breadcrumb.Item key="home"><Link to="/ProjectHome">首页</Link></Breadcrumb.Item>
    ].concat(extraBreadcrumbItems);
    return (
        <div className="demo">
            <Breadcrumb separator=">">
                {/* style={{ margin: "16px 0" }} */}
                {breadcrumbItems}
            </Breadcrumb>
        </div>
    );
});
export default Nav;

// const Project: React.FC<{}> = () => {
//   function callback(key) {
//     console.log(key);
//   }
//   const { TabPane } = Tabs;
//   return (
//     // <PageHeaderWrapper
//     // // content="将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。"
//     // >
//     <>
//       <Tabs defaultActiveKey="1" >
//         {/*  */}
//         {/* onChange={callback} */}
//         <TabPane tab="欢迎页" key="1">
//           <TableList />
//           {/* 数据分析 */}
//           <Mileage />
//         </TabPane>
//         <TabPane tab="项目申报" key="2">
//           <OrderSubmit />
//         </TabPane>
//         <TabPane tab="合同签署" key="3" >
//           Content of Tab Pane 3
//         </TabPane>
//         <TabPane tab="项目执行" key="4">
//           Content of Tab Pane 4
//         </TabPane>
//         <TabPane tab="项目变更" key="5">
//           Content of Tab Pane 5
//         </TabPane>
//         <TabPane tab="项目结题" key="6">
//           Content of Tab Pane 6
//         </TabPane>
//         <TabPane tab="系统管理" key="7">
//           Content of Tab Pane 7
//         </TabPane>
//       </Tabs>
//       {/* </PageHeaderWrapper> */}
//     </>
//   );
// };

// export default connect(({ SubmitProcess }: { SubmitProcess: StateType }) => ({
//   current: SubmitProcess.current,
// }))(Submit);