import { ExportOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, message, Switch } from 'antd';
import React, { useState, useRef } from 'react';
// import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { SorterResult } from 'antd/es/table/interface';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import ReduceForm from './components/UpdateForm';
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
      name: fields.name,
      sort: fields.sort,
      type: fields.type,
      number: fields.number,
      warnNumber: fields.warnNumber,
      time: fields.time,
      person: fields.person,
      method: fields.method,
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
  const [reduceModalVisible, handleReduceModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '序号',
      dataIndex: 'id',
      valueType: 'index',
      hideInSearch: true
    },
    {
      title: '类型',
      dataIndex: 'sort',
      // valueType: 'textarea',
      // hideInForm:true
      valueEnum: {
        1: '事故件',
        2: '计划维修件',
        3: '消耗件',
        4: '其他',
      }

    },
    {
      title: '名称',
      dataIndex: 'name',
      valueType: 'textarea',
      // hideInForm:true
    },
    {
      title: '品牌型号',
      dataIndex: 'type',
      valueType: 'textarea',
      hideInSearch: true
    },

    {
      title: '数量',
      dataIndex: 'number',
      // valueType: 'textarea',
      hideInSearch: true
    },
    {
      title: '数量最低警戒值',
      dataIndex: 'warnNumber',
      // valueType: 'textarea',
      hideInSearch: true
    },
    {
      title: '入库时间',
      dataIndex: 'time',
      valueType: 'dateTime',

    },
    {
      title: '入库人',
      dataIndex: 'person',
      valueType: 'textarea',

    },
    {
      title: '入库方式',
      dataIndex: 'method',
      valueType: 'textarea',
      hideInSearch: true
    },
    {
      title: '备注',
      dataIndex: 'remark',
      valueType: 'textarea',
      hideInSearch: true
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      // width: "10%",
      render: (_, record) => (
        <>

          <span> </span>
          <a
            onClick={() => {
              handleUpdateModalVisible(true); // 打开编辑页面
              setStepFormValues(record);
            }}
          >
            编辑
          </a>
          <span> </span>
          <a
            onClick={() => {
              const hide = message.loading('正在删除');
              try {
                removeRule({
                  ids: record.id,
                });
                hide();
                message.success('删除成功，即将刷新');
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
          {/* <span> </span> 
           <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked /> */}
        </>
      ),
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
        search={{
          defaultCollapsed: false,
          span: 4,
        }}
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
            <PlusOutlined />  新增备品备件入库
          </Button>,
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <MinusOutlined />  备品备件出库
        </Button>,
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <ExportOutlined /> 批量导出
      </Button>,
          // selectedRows && selectedRows.length > 0 && (
          //   <Button
          //     onClick={async (e) => {
          //       if (e.key === 'remove') {
          //         await handleRemove(selectedRows);
          //         action.reload();
          //       }
          //     }}
          //     selectedKeys={[]}
          //   >
          //     批量删除
          //   </Button>

          // ),
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
      {/* <ReduceForm
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
      />     */}
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
