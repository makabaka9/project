import React from 'react';
// import XLSX from 'xlsx';
import ExportJsonExcel from 'js-export-excel';
import { Button } from 'antd';

interface exportExcelProps {
  fileName: string; // 下载文件名(默认：download)
  sheetName: string; // sheet名字(可有可无)(默认sheet1)
  sheetHeader: any[]; // 标题（excel第一行数据）
  sheetData: any[]; // 数据源(必须)
  sheetFilter: any[]; // 列过滤(只有在data为object下起作用)(可有可无)
}

const ExportExcel: React.FC<exportExcelProps> = (props) => {
  const { fileName, sheetData, sheetName, sheetHeader, sheetFilter } = props;
  // 案例：
  // var fileName = 'excel';
  // var sheetData = [{ one: '一行一列', two: '一行二列' }, { one: '二行一列', two: '二行二列' }];
  // var sheetName = 'sheet';
  // var sheetFilter = ['two', 'one'];
  // var sheetHeader = ['第一列', '第二列']
  const downloadExcel = () => {
    const option:any = {};
    option.fileName = fileName;
    option.datas = [
      // {
      //   sheetData,
      //   sheetName,
      //   sheetFilter,
      //   sheetHeader,
      // },
      {
        sheetHeader,
        sheetData,
      },
    ];
    const toExcel = new ExportJsonExcel(option);
    toExcel.saveExcel();
  };

  return (
    <div>
      <Button type="primary" ghost onClick={downloadExcel}>
        导出
      </Button>
    </div>
  );
};
export default ExportExcel;
