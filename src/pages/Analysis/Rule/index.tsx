import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Avatar } from 'antd';
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
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '报警规则',
      dataIndex: 'line',
      valueType: 'textarea',
      align: 'center'
    },
    {
      title: '参数a',
      dataIndex: 'trainCode',
      valueType: 'textarea',
      align: 'center'
    },
    {
      title: '参数b',
      dataIndex: 'subsystem',
      valueType: 'textarea',
      align: 'center'
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
          <span> </span>
          {/* <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            删除
          </a>
          <span> </span> */}
          {/* <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked /> */}
        </>
      ),
    },
  ];

  const searchData: any = [];
  for (let i = 1; i < 10; i += 1) {
    searchData.push({
      id: i,
      line: 'a-b>=50',
      trainCode: `1号转向架1轴大齿轮车轮侧温度1c1`,
      subsystem: '环境温度',
      name: 'CCU机箱A-PU600逻辑',
      level: '0.0.0',
      status: 0,
      time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    });
  }
  return (
    <>
      <ProTable<TableListItem>
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
          data: searchData,
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
