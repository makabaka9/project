import { PlusOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import React, { useState, useRef } from 'react';
// import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { SorterResult } from 'antd/es/table/interface';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TableListItem } from './data';
import { queryRule, updateRule, addRule, removeRule } from './service';
import moment from 'moment';
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
  const hide = message.loading('正在配置');

  try {
    await updateRule({
      username: fields.username,
      realname: fields.realname,
      orgCode: fields.orgCode,
      phone: fields.phone,
      email: fields.email,
      password: fields.password,
    });
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
      title: '线路',
      dataIndex: 'line',
      valueType: 'textarea',
    },
    {
      title: '车号',
      dataIndex: 'trainCode',
      valueType: 'textarea',
    },
    {
      title: '所属系统',
      dataIndex: 'system',
      valueType: 'textarea',
    },
    {
      title: '文件名',
      dataIndex: 'name',
      valueType: 'textarea',
    },
    {
      title: '文件大小',
      dataIndex: 'size',
      valueType: 'textarea',
    },
    {
      title: '文件下载时间',
      dataIndex: 'time',
      valueType: 'textarea',
    },
    {
      title: '文件是否分析',
      dataIndex: 'analysis',
      valueType: 'textarea',
    },
  ];

  const fileData: any = [];
  for (let i = 1; i < 10; i += 1) {
    fileData.push({
      id: i,
      line: '4号线',
      trainCode: `040${i}`,
      system: '走行部',
      name: '04_01_4_20200506.gz',
      size: '10MB',
      time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      analysis: '是',
    });
  }

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
            <PlusOutlined /> 新建
          </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Button
              onClick={async (e) => {
                if (e.key === 'remove') {
                  await handleRemove(selectedRows);
                  action.reload();
                }
              }}
              selectedKeys={[]}
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
        // request={params => queryRule(params)}
        request={async (params) => ({
          // data: await queryRule(params),
          data: fileData,
          success: true,
        })}
        columns={columns}
        rowSelection={{}}
      />
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable<TableListItem, TableListItem>
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
        />
      </CreateForm>
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
