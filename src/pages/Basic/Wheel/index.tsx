import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Avatar, Select } from 'antd';
import React, { useState, useRef } from 'react';
// import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { SorterResult } from 'antd/es/table/interface';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TableListItem } from './data';
import { queryRule, updateRule, addRule, removeRule } from './service';
import dotIcon from '@/assets/dotIcon.svg';
import dotIcon1 from '@/assets/dotIcon1.svg';
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
  const trainID: any[] | undefined = [];
  for (let i = 501; i <= 524; i += 1) {
    trainID.push(i)
  }
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
      renderFormItem: (_, { value, ...rest }) => {
        return (
          <Select
            {...rest}
            showSearch
            allowClear
            placeholder="请选择"
            style={{ maxWidth: 335, width: '100%' }}
          >
            {
              trainID.map(item =>
                <Select.Option value={item}>{item}</Select.Option>
              )
            }
          </Select>
        );
      },
    },
    {
      title: '镟轮前轮径',
      dataIndex: 'local',
      valueType: 'textarea',
      hideInSearch: true
    },
    {
      title: '镟轮后轮径',
      dataIndex: 'reason',
      valueType: 'textarea',
      hideInSearch: true
    },
    {
      title: '操作记录',
      dataIndex: 'content',
      valueType: 'textarea',
      hideInSearch: true
    },
    {
      title: '操作者',
      dataIndex: 'person',
      valueType: 'textarea',
      hideInSearch: true
    },
    {
      title: '作业时间',
      dataIndex: 'time',
      valueType: 'textarea',
      hideInSearch: true
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
            修改
          </a>
          <span> </span>&emsp;
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
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

  const searchData: any = [];
  for (let i = 1; i < 10; i += 1) {
    searchData.push({
      id: i,
      line: '5号线',
      trainCode: `050${i}`,
      subsystem: '牵引系统',
      name: 'CCU机箱A-PU600逻辑',
      level: '0.0.0',
      status: 0,
      time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    });
  }
  return (
    <>
      <ProTable<TableListItem>
        headerTitle="查询表格"
        search={{
          defaultCollapsed: false,
          span: 4,
        }}
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
          ),
        ]}
        // request={params => queryRule(params)}
        request={async (params) => ({
          // data: await queryRule(params),
          data: searchData,
          success: true,
        })}
        columns={columns}
      // rowSelection={{}}
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
        // rowSelection={{}}
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
