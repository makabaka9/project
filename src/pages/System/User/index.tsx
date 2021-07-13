import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import React, { useState, useRef } from 'react';
// import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { SorterResult } from 'antd/es/table/interface';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TableListItem } from './data.d';
import { queryRule, updateRule, addRule, removeRule } from './service';
/**
 * 添加节点
 * @param fields
 */

const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading('正在添加');

  try {
    await addRule({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};
/**
 * 更新节点
 * @param fields
 */

const handleUpdate = async (fields: FormValueType) => {
  // console.log('fields', fields)
  const hide = message.loading('正在配置');

  try {
    await updateRule({
      id: fields.id,
      account: fields.account,
      name: fields.name,
      gender: fields.gender,
      department: fields.department,
      position: fields.position,
      role: fields.role,
      phone: fields.phone,
      mail: fields.mail,
      password: fields.password,
    });
    // console.log('data',data)
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};
/**
 *  删除节点
 * @param selectedRows
 */

const handleRemove = async (selectedRows: TableListItem[]) => {
  console.log('selectedRows',selectedRows)
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    await removeRule({
      ids: selectedRows.map((row) => row.id),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC<{}> = () => {
  const [setSorter] = useState<string>('');
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '账号',
      dataIndex: 'account',
      valueType: 'textarea',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      valueType: 'textarea',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      // valueType: 'textarea',
      hideInSearch: true,
      valueEnum: {
        0: '男',
        1: '女',
      }
    },
    {
      title: '部门',
      dataIndex: 'department',
      valueType: 'textarea',
    },
    {
      title: '岗位',
      dataIndex: 'position',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: '角色',
      dataIndex: 'role',
      valueType: 'textarea',
      hideInSearch: true,

    },
    {
      title: '电话',
      dataIndex: 'phone',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: '邮箱',
      dataIndex: 'mail',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: '密码',
      dataIndex: 'password',
      valueType: 'password',
      hideInSearch: true,
      hideInTable: true
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true); // 打开编辑页面
              // console.log(record)
              setStepFormValues(record);
            }}
          >
            编辑
          </a>
          <span> </span>
          <a
            onClick={() => {
              // handleUpdateModalVisible(true);
              // setStepFormValues(record);
              // console.log('record.id',record.id)
              const hide = message.loading('正在删除');
              try {
                removeRule({
                  ids: [record.id],
                }); 
                hide();
                message.success('删除成功，即将刷新');
                actionRef.current?.reloadAndRest?.()
                return true;
              } catch (error) {
                hide();
                message.error('删除失败，请重试');
                return false;
              }
            }}
          >
            删除
          </a>
          <span> </span>
          {/* <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked /> */}
        </>
      ),
    },
  ];
  return (
    <>
      <ProTable<TableListItem>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        onChange={(_, _filter, _sorter) => {
          const sorterResult = _sorter as SorterResult<TableListItem>;

          if (sorterResult.field) {
            setSorter(`${sorterResult.field}_${sorterResult.order}`);
          }
        }}
        params={
          {
            // sorter,
          }
        }
        toolBarRender={(action, { selectedRows }) => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建用户
          </Button>,
        //   <Button type="primary" onClick={() => handleModalVisible(true)}>
        //     <UploadOutlined /> 批量导入
        //  </Button>,
        //   <Button type="primary" onClick={() => handleModalVisible(true)}>
        //     <UploadOutlined /> 批量导出
        // </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Button
              onClick={async () => {
                await handleRemove(selectedRows);
                // selectedKeys={[]};
                actionRef.current?.reloadAndRest?.();
              }}
            >
              批量删除
            </Button>
            // <Dropdown
            //   overlay={
            //     <Menu
            //       onClick={async e => {
            //         if (e.key === 'remove') {
            //           await handleRemove(selectedRows);
            //           action.reload();
            //         }
            //       }}
            //       selectedKeys={[]}
            //     >
            //       <Menu.Item key="remove">批量删除</Menu.Item>
            //       <Menu.Item key="approval">批量审批</Menu.Item>
            //     </Menu>
            //   }
            // >
            //   <Button>
            //     批量操作 <DownOutlined />
            //   </Button>
            // </Dropdown>
          ),
        ]}
        tableAlertRender={({ selectedRowKeys }) => (
          <div>
            已选择{' '}
            <a
              style={{
                fontWeight: 600,
              }}
            >
              {selectedRowKeys.length}
            </a>{' '}
            项&nbsp;&nbsp;
          </div>
        )}
        request={async (params, sort, filter) => queryRule(params)}
        columns={columns}
        rowSelection={{}}
      />

      <CreateForm
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
      {/* <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible} 
          onSubmit={async (value) => {
            const success = await handleAdd(value);

            if (success) {
              handleModalVisible(false);

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="id"
          type="form"
          columns={columns}
          rowSelection={{}}
      /> */}
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value);

            if (success) {
              handleUpdateModalVisible(false);
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
      ) : null}
    </>
  );
};

export default TableList;
