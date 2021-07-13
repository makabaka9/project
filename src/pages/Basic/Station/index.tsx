import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, message } from 'antd';
import React, { useState, useRef } from 'react';
// import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import ExportJsonExcel from 'js-export-excel';
import { SorterResult } from 'antd/es/table/interface';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TableListItem } from './data';
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

/**
 *  导出节点
 * @param selectedRows
 */
const downloadExcel = (selectedRows: TableListItem[]) => {
  const setData = new Set(selectedRows);
  const data = [...setData];
  const option : any = {};
  const dataTable = [];
  const sheetTitle = [
    '序号',
    '所属线路',
    '列车编号',
    '列车在线运营时长',
    '列车在线运营里程',
    '状态',
    // '故障原因和建议操作',
  ];
  if (data) {
    // eslint-disable-next-line no-restricted-syntax
    for (const i in data) {
      if (data) {
        const obj = {
          序号: data[i].key,
          所属线路: data[i].line,
          列车编号: data[i].trainCode,
          列车在线运营时长: data[i].time,
          列车在线运营里程: data[i].mileage,
          状态: data[i].state,
          // 故障原因和建议操作: [
          //   `故障描述:${data[i].faultDesc}`,
          //   `故障解决方案:${data[i].maintenanceAdvice}`,
          // ],
        };
        dataTable.push(obj);
      }
    }
  }
  option.fileName = '车辆管理信息';
  option.datas = [
    {
      sheetData: dataTable,
      sheetName: 'sheet',
      sheetFilter: sheetTitle,
      sheetHeader: sheetTitle,
    },
  ];

  const toExcel = new ExportJsonExcel(option);
  toExcel.saveExcel();
};

const TableList: React.FC<{}> = () => {
  const [setSorter] = useState<string>('');
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [

    {
      title: '所属线路',
      dataIndex: 'lineCode',
      valueType: 'textarea',
    },
    {
      title: '站点ID',
      dataIndex: 'stationCode',
      valueType: 'textarea',
    },
    {
      title: '站点名称',
      dataIndex: 'siteName',
      valueType: 'textarea',
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
         
        ]}
       
        // request={params => queryRule(params)}
        request={async (params) => ({
          data: await queryRule(params),
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
