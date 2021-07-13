import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Popconfirm, Table, message } from 'antd';
import React, { FC, useState } from 'react';

import styles from './style.less';

interface TableFormDateType {
  key: string;
  name?: string;
  sampleId: string;
  type: string;
  sampleNumber: string;
  status: string;
  originDiameter1: number;
  originDiameter2: number;
  originMeanDiameter: number;
  originArea: number;
  borkenDiameter: number;
  borkenMinimalArea: number;
  maxForce: number;
  tensileStrength: number;
  yieldForce: number;
  yieldStrength: number;
  reductionOfArea: number;
  originScale: number;
  brokenScale: number;
  brokenElongation: number;
  sampleSize: number;
  testTemperature: number;
  breachShape: string;
  energyAbsorbed: number;
  indentationDiameter1: number;
  indentationDiameter2: number;
  indentationMeanDiameter: number;
  hardness: number;
  isNew?: boolean;
  editable?: boolean;
}
interface TableFormProps {
  value?: TableFormDateType[];
  onChange?: (value: TableFormDateType[]) => void;
}

const TableForm: FC<TableFormProps> = ({ value, onChange }) => {
  const [clickedCancel, setClickedCancel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const [cacheOriginData, setCacheOriginData] = useState({});
  const [data, setData] = useState(value);

  const getRowByKey = (key: string, newData?: TableFormDateType[]) =>
    (newData || data)?.filter(item => item.key === key)[0];

  const toggleEditable = (e: React.MouseEvent | React.KeyboardEvent, key: string) => {
    e.preventDefault();
    const newData = data?.map(item => ({ ...item }));
    const target = getRowByKey(key, newData);
    if (target) {
      // 进入编辑状态时保存原始数据
      if (!target.editable) {
        cacheOriginData[key] = { ...target };
        setCacheOriginData(cacheOriginData);
      }
      target.editable = !target.editable;
      setData(newData);
    }
  };
  const newMember = () => {
    const newData = data?.map(item => ({ ...item })) || [];
    // eslint-disable-next-line no-unused-expressions
    newData?.push({
      key: `NEW_TEMP_ID_${index}`,
      name: '',
      sampleId: '',
      type: '',
      sampleNumber: '',
      status: '',
      originDiameter1: 0,
      originDiameter2: 0,
      originMeanDiameter: 0,
      originArea: 0,
      borkenDiameter: 0,
      borkenMinimalArea: 0,
      maxForce: 0,
      tensileStrength: 0,
      yieldForce: 0,
      yieldStrength: 0,
      reductionOfArea: 0,
      originScale: 0,
      brokenScale: 0,
      brokenElongation: 0,
      sampleSize: 0,
      testTemperature: 0,
      breachShape: '',
      energyAbsorbed: 0,
      indentationDiameter1: 0,
      indentationDiameter2: 0,
      indentationMeanDiameter: 0,
      hardness: 0,
      editable: true,
      isNew: true,
    });
    setIndex(index + 1);
    setData(newData);
  };

  const remove = (key: string) => {
    const newData = data?.filter(item => item.key !== key) as TableFormDateType[];
    setData(newData);
    if (onChange) {
      onChange(newData);
    }
  };

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
    key: string,
  ) => {
    const newData = [...(data as TableFormDateType[])];
    const target = getRowByKey(key, newData);
    if (target) {
      target[fieldName] = e.target.value;
      setData(newData);
    }
  };

  const saveRow = (e: React.MouseEvent | React.KeyboardEvent, key: string) => {
    e.persist();
    setLoading(true);
    setTimeout(() => {
      if (clickedCancel) {
        setClickedCancel(false);
        return;
      }
      const target = getRowByKey(key) || ({} as any);
      if (!target.sampleId || !target.name || !target.sampleNumber) {
        message.error('请填写完整成员信息。');
        (e.target as HTMLInputElement).focus();
        setLoading(false);
        return;
      }
      delete target.isNew;
      toggleEditable(e, key);
      if (onChange) {
        onChange(data as TableFormDateType[]);
      }
      setLoading(false);
    }, 500);
  };

  // const handleKeyPress = (e: React.KeyboardEvent, key: string) => {
  //   if (e.key === 'Enter') {
  //     saveRow(e, key);
  //   }
  // };

  const cancel = (e: React.MouseEvent, key: string) => {
    setClickedCancel(true);
    e.preventDefault();
    const newData = [...(data as TableFormDateType[])];
    // 编辑前的原始数据
    let cacheData = [];
    cacheData = newData.map(item => {
      if (item.key === key) {
        if (cacheOriginData[key]) {
          const originItem = {
            ...item,
            ...cacheOriginData[key],
            editable: false,
          };
          delete cacheOriginData[key];
          setCacheOriginData(cacheOriginData);
          return originItem;
        }
      }
      return item;
    });
    setData(cacheData);
    setClickedCancel(false);
  };

  const columns1 = [
    {
      title: '检测物品名称',
      dataIndex: 'name',
      key: 'name',
      width: '5%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={e => handleFieldChange(e, 'name', record.key)}
              placeholder="检测物品名称"
            />
          );
        }
        return text;
      },
    },
    {
      title: '物品流水号',
      dataIndex: 'sampleId',
      key: 'sampleId',
      width: '5%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={e => handleFieldChange(e, 'sampleId', record.key)}
              placeholder="物品流水号"
            />
          );
        }
        return text;
      },
    },
    {
      title: '型号规格',
      dataIndex: 'type',
      key: 'type',
      width: '5%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={e => handleFieldChange(e, 'type', record.key)}
              placeholder="型号规格"
            />
          );
        }
        return text;
      },
    },
    {
      title: '物品编号',
      dataIndex: 'sampleNumber',
      key: 'sampleNumber',
      width: '5%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={e => handleFieldChange(e, 'sampleNumber', record.key)}
              placeholder="物品编号"
            />
          );
        }
        return text;
      },
    },
    {
      title: '物品状态描述',
      dataIndex: 'status',
      key: 'status',
      width: '5%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={e => handleFieldChange(e, 'status', record.key)}
              placeholder="物品状态描述"
            />
          );
        }
        return text;
      },
    },
    {
      title: '原始直径(mm)d1',
      dataIndex: 'originDiameter1',
      key: 'originDiameter1',
      width: '5%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={e => handleFieldChange(e, 'originDiameter1', record.key)}
              placeholder="原始直径d1"
            />
          );
        }
        return text;
      },
    },
    {
      title: '原始直径(mm)d2',
      dataIndex: 'originDiameter2',
      key: 'originDiameter2',
      width: '5%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={e => handleFieldChange(e, 'originDiameter2', record.key)}
              placeholder="原始直径d2"
            />
          );
        }
        return text;
      },
    },
    {
      title: '原始平均直径mm',
      dataIndex: 'originMeanDiameter',
      key: 'originMeanDiameter',
      width: '5%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={e => handleFieldChange(e, 'originMeanDiameter', record.key)}
              placeholder="原始平均直径"
            />
          );
        }
        return text;
      },
    },
    {
      title: '原始横截面积mm2',
      dataIndex: 'originArea',
      key: 'originArea',
      width: '5%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={e => handleFieldChange(e, 'originArea', record.key)}
              placeholder="原始横截面积"
            />
          );
        }
        return text;
      },
    },
    {
      title: '断后直径mm',
      dataIndex: 'borkenDiameter',
      key: 'borkenDiameter',
      width: '5%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={e => handleFieldChange(e, 'borkenDiameter', record.key)}
              placeholder="断后直径"
            />
          );
        }
        return text;
      },
    },
    {
      title: '断后最小横截面积mm2',
      dataIndex: 'borkenMinimalArea',
      key: 'borkenMinimalArea',
      width: '5%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={e => handleFieldChange(e, 'borkenMinimalArea', record.key)}
              placeholder="断后最小横截面积"
            />
          );
        }
        return text;
      },
    },
    {
      title: '最大力FmkN',
      dataIndex: 'maxForce',
      key: 'maxForce',
      width: '5%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={e => handleFieldChange(e, 'maxForce', record.key)}
              placeholder="最大力"
            />
          );
        }
        return text;
      },
    },
    {
      title: '抗拉强度RmMPa',
      dataIndex: 'tensileStrength',
      key: 'tensileStrength',
      width: '5%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={e => handleFieldChange(e, 'tensileStrength', record.key)}
              placeholder="抗拉强度"
            />
          );
        }
        return text;
      },
    },
    {
      title: '屈服力RmMPa',
      dataIndex: 'yieldForce',
      key: 'yieldForce',
      width: '5%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={e => handleFieldChange(e, 'yieldForce', record.key)}
              placeholder="屈服力"
            />
          );
        }
        return text;
      },
    },
    {
      title: '屈服强度RelMPa',
      dataIndex: 'yieldStrength',
      key: 'yieldStrength',
      width: '5%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={e => handleFieldChange(e, 'yieldStrength', record.key)}
              placeholder="屈服强度"
            />
          );
        }
        return text;
      },
    },
    {
      title: '断面收缩率Z(%)',
      dataIndex: 'reductionOfArea',
      key: 'reductionOfArea',
      width: '5%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={e => handleFieldChange(e, 'reductionOfArea', record.key)}
              placeholder="断面收缩率"
            />
          );
        }
        return text;
      },
    },
    {
      title: '原始标距mm',
      dataIndex: 'originScale',
      key: 'originScale',
      width: '5%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={e => handleFieldChange(e, 'originScale', record.key)}
              placeholder="原始标距"
            />
          );
        }
        return text;
      },
    },
    {
      title: '断后标距mm',
      dataIndex: 'brokenScale',
      key: 'brokenScale',
      width: '5%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={e => handleFieldChange(e, 'brokenScale', record.key)}
              placeholder="断后标距"
            />
          );
        }
        return text;
      },
    },
    {
      title: '断后伸长率A(%)',
      dataIndex: 'brokenElongation',
      key: 'brokenElongation',
      width: '5%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={e => handleFieldChange(e, 'brokenElongation', record.key)}
              placeholder="断后伸长率"
            />
          );
        }
        return text;
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: TableFormDateType) => {
        if (!!record.editable && loading) {
          return null;
        }
        if (record.editable) {
          if (record.isNew) {
            return (
              <span>
                <a onClick={e => saveRow(e, record.key)}>添加</a>
                <Divider type="vertical" />
                <Popconfirm title="是否要删除此行？" onConfirm={() => remove(record.key)}>
                  <a>删除</a>
                </Popconfirm>
              </span>
            );
          }
          return (
            <span>
              <a onClick={e => saveRow(e, record.key)}>保存</a>
              <Divider type="vertical" />
              <a onClick={e => cancel(e, record.key)}>取消</a>
            </span>
          );
        }
        return (
          <span>
            <a onClick={e => toggleEditable(e, record.key)}>编辑</a>
            <Divider type="vertical" />
            <Popconfirm title="是否要删除此行？" onConfirm={() => remove(record.key)}>
              <a>删除</a>
            </Popconfirm>
          </span>
        );
      },
    },
  ];
  const columns2 = [
    {
      title: '检测物品名称',
      dataIndex: 'name',
      key: 'name',
      width: '10%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={e => handleFieldChange(e, 'name', record.key)}
              placeholder="检测物品名称"
            />
          );
        }
        return text;
      },
    },
    {
      title: '物品流水号',
      dataIndex: 'sampleId',
      key: 'sampleId',
      width: '10%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={e => handleFieldChange(e, 'sampleId', record.key)}
              placeholder="物品流水号"
            />
          );
        }
        return text;
      },
    },
    {
      title: '型号规格',
      dataIndex: 'type',
      key: 'type',
      width: '10%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={e => handleFieldChange(e, 'type', record.key)}
              placeholder="型号规格"
            />
          );
        }
        return text;
      },
    },
    {
      title: '物品编号',
      dataIndex: 'sampleNumber',
      key: 'sampleNumber',
      width: '10%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={e => handleFieldChange(e, 'sampleNumber', record.key)}
              placeholder="物品编号"
            />
          );
        }
        return text;
      },
    },
    {
      title: '物品状态描述',
      dataIndex: 'status',
      key: 'status',
      width: '10%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={e => handleFieldChange(e, 'status', record.key)}
              placeholder="物品状态描述"
            />
          );
        }
        return text;
      },
    },
    {
      title: '试样尺寸mm',
      dataIndex: 'sampleSize',
      key: 'sampleSize',
      width: '10%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={e => handleFieldChange(e, 'sampleSize', record.key)}
              placeholder="试样尺寸"
            />
          );
        }
        return text;
      },
    },
    {
      title: '试验温度C',
      dataIndex: 'testTemperature',
      key: 'testTemperature',
      width: '10%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={e => handleFieldChange(e, 'testTemperature', record.key)}
              placeholder="试验温度"
            />
          );
        }
        return text;
      },
    },

    {
      title: '缺口形状',
      dataIndex: 'breachShape',
      key: 'breachShape',
      width: '10%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={e => handleFieldChange(e, 'breachShape', record.key)}
              placeholder="缺口形状"
            />
          );
        }
        return text;
      },
    },
    {
      title: '冲击吸收能量(J)',
      dataIndex: 'energyAbsorbed',
      key: 'energyAbsorbed',
      width: '10%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={e => handleFieldChange(e, 'energyAbsorbed', record.key)}
              placeholder="冲击吸收能量"
            />
          );
        }
        return text;
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: TableFormDateType) => {
        if (!!record.editable && loading) {
          return null;
        }
        if (record.editable) {
          if (record.isNew) {
            return (
              <span>
                <a onClick={e => saveRow(e, record.key)}>添加</a>
                <Divider type="vertical" />
                <Popconfirm title="是否要删除此行？" onConfirm={() => remove(record.key)}>
                  <a>删除</a>
                </Popconfirm>
              </span>
            );
          }
          return (
            <span>
              <a onClick={e => saveRow(e, record.key)}>保存</a>
              <Divider type="vertical" />
              <a onClick={e => cancel(e, record.key)}>取消</a>
            </span>
          );
        }
        return (
          <span>
            <a onClick={e => toggleEditable(e, record.key)}>编辑</a>
            <Divider type="vertical" />
            <Popconfirm title="是否要删除此行？" onConfirm={() => remove(record.key)}>
              <a>删除</a>
            </Popconfirm>
          </span>
        );
      },
    },
  ];
  const columns3 = [
    {
      title: '检测物品名称',
      dataIndex: 'name',
      key: 'name',
      width: '10%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={e => handleFieldChange(e, 'name', record.key)}
              placeholder="检测物品名称"
            />
          );
        }
        return text;
      },
    },
    {
      title: '物品流水号',
      dataIndex: 'sampleId',
      key: 'sampleId',
      width: '10%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={e => handleFieldChange(e, 'sampleId', record.key)}
              placeholder="物品流水号"
            />
          );
        }
        return text;
      },
    },
    {
      title: '型号规格',
      dataIndex: 'type',
      key: 'type',
      width: '10%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={e => handleFieldChange(e, 'type', record.key)}
              placeholder="型号规格"
            />
          );
        }
        return text;
      },
    },
    {
      title: '物品编号',
      dataIndex: 'sampleNumber',
      key: 'sampleNumber',
      width: '10%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={e => handleFieldChange(e, 'sampleNumber', record.key)}
              placeholder="物品编号"
            />
          );
        }
        return text;
      },
    },
    {
      title: '物品状态描述',
      dataIndex: 'status',
      key: 'status',
      width: '10%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={e => handleFieldChange(e, 'status', record.key)}
              placeholder="物品状态描述"
            />
          );
        }
        return text;
      },
    },
    {
      title: '压痕直径(mm)d1',
      dataIndex: 'indentationDiameter1',
      key: 'indentationDiameter1',
      width: '10%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={e => handleFieldChange(e, 'indentationDiameter1', record.key)}
              placeholder="压痕直径d1"
            />
          );
        }
        return text;
      },
    },
    {
      title: '压痕直径(mm)d2',
      dataIndex: 'indentationDiameter2',
      key: 'indentationDiameter2',
      width: '10%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={e => handleFieldChange(e, 'indentationDiameter2', record.key)}
              placeholder="压痕直径d2"
            />
          );
        }
        return text;
      },
    },
    {
      title: '压痕直径(mm)d',
      dataIndex: 'indentationMeanDiameter',
      key: 'indentationMeanDiameter',
      width: '10%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={e => handleFieldChange(e, 'indentationMeanDiameter', record.key)}
              placeholder="压痕直径d"
            />
          );
        }
        return text;
      },
    },
    {
      title: '硬度值HBW',
      dataIndex: 'hardness',
      key: 'hardness',
      width: '10%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={e => handleFieldChange(e, 'hardness', record.key)}
              placeholder="硬度值"
            />
          );
        }
        return text;
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: TableFormDateType) => {
        if (!!record.editable && loading) {
          return null;
        }
        if (record.editable) {
          if (record.isNew) {
            return (
              <span>
                <a onClick={e => saveRow(e, record.key)}>添加</a>
                <Divider type="vertical" />
                <Popconfirm title="是否要删除此行？" onConfirm={() => remove(record.key)}>
                  <a>删除</a>
                </Popconfirm>
              </span>
            );
          }
          return (
            <span>
              <a onClick={e => saveRow(e, record.key)}>保存</a>
              <Divider type="vertical" />
              <a onClick={e => cancel(e, record.key)}>取消</a>
            </span>
          );
        }
        return (
          <span>
            <a onClick={e => toggleEditable(e, record.key)}>编辑</a>
            <Divider type="vertical" />
            <Popconfirm title="是否要删除此行？" onConfirm={() => remove(record.key)}>
              <a>删除</a>
            </Popconfirm>
          </span>
        );
      },
    },
  ];
  return (
    <>
      <div style={{ width: '100%' }}>
        <Table<TableFormDateType>
          loading={loading}
          columns={columns1}
          dataSource={data}
          pagination={false}
          rowClassName={record => (record.editable ? styles.editable : '')}
        />
        <Button
          style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
          type="dashed"
          onClick={newMember}
        >
          <PlusOutlined />
          新增成员
        </Button>
      </div>
      <div style={{ width: '100%' }}>
        <Table<TableFormDateType>
          loading={loading}
          columns={columns2}
          dataSource={data}
          pagination={false}
          rowClassName={record => (record.editable ? styles.editable : '')}
        />
      </div>
      <Table<TableFormDateType>
        loading={loading}
        columns={columns3}
        dataSource={data}
        pagination={false}
        rowClassName={record => (record.editable ? styles.editable : '')}
      />
      <Button
        style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
        type="dashed"
        onClick={newMember}
      >
        <PlusOutlined />
        新增成员
      </Button>
    </>
  );
};

export default TableForm;
