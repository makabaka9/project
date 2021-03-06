import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message } from 'antd';
import React, { useState, useRef } from 'react';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TableListItem } from './data.d';
import { queryUser, updateUser, addUser, removeUser } from './service';
import { Link } from 'dva/router';
import Record from '../Check/Record';

// /**
//  * 添加节点
//  * @param fields
//  */
// const handleAdd = async (fields: FormValueType) => {
//   const hide = message.loading('正在添加');
//   try {
//     await addUser({
//       key: fields.key,
//       username: fields.username,
//       department: fields.department,
//       role: fields.role,
//       telephone: fields.telephone,
//       password: fields.password,
//       group: fields.group,
//       position: fields.position,
//     });
//     hide();
//     message.success('添加成功');
//     return true;
//   } catch (error) {
//     hide();
//     message.error('添加失败请重试！');
//     return false;
//   }
// };

// /**
//  * 更新节点
//  * @param fields
//  */
// const handleUpdate = async (fields: FormValueType) => {
//   const hide = message.loading('正在配置');
//   try {
//     await updateUser({
//       username: fields.username,
//       key: fields.key,
//     });
//     hide();

//     message.success('配置成功');
//     return true;
//   } catch (error) {
//     hide();
//     message.error('配置失败请重试！');
//     return false;
//   }
// };

// /**
//  *  删除节点
//  * @param selectedRows
//  */
// const handleRemove = async (selectedRows: TableListItem[]) => {
//   const hide = message.loading('正在删除');
//   if (!selectedRows) return true;
//   try {
//     await removeUser({
//       key: selectedRows.map(row => row.key),
//     });
//     hide();
//     message.success('删除成功，即将刷新');
//     return true;
//   } catch (error) {
//     hide();
//     message.error('删除失败，请重试');
//     return false;
//   }
// };
const getInput = (record: TableListItem) => {
  if (record.projectProgress === "等待审批") {
    return record.projectProgress
  }
  else if (record.projectProgress === "同意立项") {
    //加上参数
    return <>{record.projectProgress}-< Link to={`/OrderSubmit/ContractSign/${record.projectID}`} > 合同签署</Link ></>
  } else if (record.projectProgress === "项目执行") {
    return <>{record.projectProgress}-< Link to={`/OrderSubmit/ContractSign/Execute/${record.projectID}`} > 成果填报</Link ></>
  }
  else return "";
}

const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});

  const actionRef = useRef<ActionType>();

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '序号',
      dataIndex: "key",
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: '项目号',
      dataIndex: 'projectID',
    },
    {
      title: '项目名称',
      dataIndex: 'projectName',
    },
    {
      title: '立项年度',
      dataIndex: 'projectStartTime',//格式
    },
    {
      title: '项目类别',
      dataIndex: 'projectCategory',
    },
    {
      title: '单位',
      dataIndex: 'projectCompany',
    },
    {
      title: '工作进度',
      dataIndex: 'projectProgress',
      valueType: 'option',
      render: (_, record) => (
        getInput(record)
        // < Link to = "/OrderSubmit/ContractSign" > { record.projectProgress }合同签署</Link >
      ),
    },
    {
      title: '附件',
      dataIndex: 'annex',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            查看
          </a>
          <Divider type="vertical" />
          {/* <a href="">订阅警报</a> */}
        </>
      ),
    },
    {
      title: '审核意见',
      dataIndex: 'auditOpinion',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            查看
          </a>
          <Divider type="vertical" />
          {/* <a href="">订阅警报</a> */}
        </>
      ),
    },
    {
      title: '专家意见',
      dataIndex: 'expertOpinion',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            查看
          </a>
          <Divider type="vertical" />
          {/* <a href="">订阅警报</a> */}
        </>
      ),
    },
    {
      title: '立项金额',
      dataIndex: 'projectBudget',//立项金额 项目经费预算?
      // sorter: true,
      renderText: (val: string) => `${val} 万`,
    },
    // {
    //   title: '操作',
    //   dataIndex: 'option',
    //   valueType: 'option',
    //   render: (_, record) => (
    //     <>
    //       <a
    //         onClick={() => {
    //           handleUpdateModalVisible(true);
    //           setStepFormValues(record);
    //         }}
    //       >
    //         修改
    //       </a>
    //       <Divider type="vertical" />
    //       {/* <a href="">订阅警报</a> */}
    //     </>
    //   ),
    // },
  ];




  return (
    <>
      <ProTable<TableListItem>
        search={{ searchText: '查询' }}
        headerTitle="项目台账"
        actionRef={actionRef}//用于触发刷新操作等，看api
        rowKey="key"//表格行 key 的取值，可以是字符串或一个函数
        toolBarRender={(action, { selectedRows }) => [
          // <Button icon={<PlusOutlined />} type="primary" onClick={() => handleModalVisible(true)}>

          //   {/* 修改onClick为跳转tab栏 */}
          //   新增项目申请
          // </Button>,
          <Link to="/OrderSubmit">
            <Button icon={<PlusOutlined />} type="primary" >
              新增项目申请
            </Button>
          </Link>,
          // <Link to="/OrderSubmit/ContractSign">
          //   <Button icon={<PlusOutlined />} type="primary" >
          //     合同签署
          //   </Button>
          // </Link>
          // selectedRows && selectedRows.length > 0 && (
          //   <Dropdown
          //     overlay={
          //       <Menu
          //         onClick={async e => {
          //           if (e.key === 'remove') {
          //             await handleRemove(selectedRows);
          //             action.reload();
          //           }
          //         }}
          //         selectedKeys={[]}
          //       >
          //         <Menu.Item key="remove">批量删除</Menu.Item>
          //         <Menu.Item key="approval">批量审批</Menu.Item>
          //       </Menu>
          //     }
          //   >
          //     <Button>
          //       批量操作 <DownOutlined />
          //     </Button>
          //   </Dropdown>
          // ),
        ]}
        // tableAlertRender={(selectedRowKeys, selectedRows) => (
        //   <div>
        //     已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
        //     <span>
        //       服务调用次数总计 {selectedRows.reduce((pre, item) => pre + item.callNo, 0)} 万
        //     </span>
        //   </div>
        // )}
        request={params => queryUser(params)}//请求数据
        columns={columns}
      //rowSelection={{}}//联动的选择框。可以通过 rowSelection.type 属性指定选择类型，默认为 checkbox

      />
      {/* <CreateForm
        onSubmit={async value => {
          const success = await handleAdd(value);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      />
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async value => {
            const success = await handleUpdate(value);
            if (success) {
              handleModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        /> 
      ) : null}*/}
    </>
  );
};

export default TableList;
