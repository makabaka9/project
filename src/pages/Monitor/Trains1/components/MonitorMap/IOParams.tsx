
import React, { useState } from 'react';
import { Descriptions, Pagination, Tabs, Row, Col, Empty } from 'antd';
import CircleIcon from './circleIcon';
import styles from '../../style.less';


const { TabPane } = Tabs;
export interface IOParamsProps {
  // traction: any;
}

const traction = {
  coach_names: "Tc1车IOM1状态数据,Tc1车IOM1诊断数据,Tc2车IOM1状态数据,Tc2车IOM1诊断数据",
  Tc1车IOM1状态数据: [
    {
      // name: "Mp1第一列",
      data: [
        { index: "1_1", value: "0", display: "ATO模式信号", type: "value", },
        { index: "1_2", value: "0", display: "CBTC左门允许", type: "value", },
        { index: "1_3", value: "0", display: "CBTC右门允许", type: "value", },
        { index: "1_4", value: "0", display: "逃生门解锁请求信号", type: "value", },
        { index: "2_1", value: "1", display: "检修模式信号", type: "value", },
        { index: "2_2", value: "0", display: "检修模式信号", type: "value", },
        { index: "2_3", value: "1", display: "预留", type: "value", },
        { index: "2_4", value: "0", display: "预留", type: "value", },
        { index: "3_1", value: "1", display: "预留", type: "value", },
        { index: "3_2", value: "0", display: "升弓允许旁路", type: "value", },
        { index: "3_3", value: "1", display: "司机室钥匙激活", type: "value", },
        { index: "3_4", value: "0", display: "司机室人工占有", type: "value", },
      ]
    },
  ],
  Tc1车IOM1诊断数据: [{
    data: [
      { index: "1_1", value: "0", display: "ATO模式信号", type: "value", },
      { index: "1_2", value: "0", display: "CBTC左门允许", type: "value", },
      { index: "1_3", value: "0", display: "CBTC右门允许", type: "value", },
      { index: "1_4", value: "0", display: "逃生门解锁请求信号", type: "value", },
      { index: "2_1", value: "1", display: "检修模式信号", type: "value", },
      { index: "2_2", value: "0", display: "检修模式信号", type: "value", },
      { index: "2_3", value: "1", display: "预留", type: "value", },
      { index: "2_4", value: "0", display: "预留", type: "value", },
      { index: "3_1", value: "1", display: "预留", type: "value", },
      { index: "3_2", value: "0", display: "升弓允许旁路", type: "value", },
      { index: "3_3", value: "1", display: "司机室钥匙激活", type: "value", },
      { index: "3_4", value: "0", display: "司机室人工占有", type: "value", },
    ]
  }],
  Tc2车IOM1状态数据: [
    {
      // name: "Mp1第一列",
      data: [
        { index: "1_1", value: "0", display: "ATO模式信号", type: "value", },
        { index: "1_2", value: "0", display: "CBTC左门允许", type: "value", },
        { index: "1_3", value: "0", display: "CBTC右门允许", type: "value", },
        { index: "1_4", value: "0", display: "逃生门解锁请求信号", type: "value", },
        { index: "2_1", value: "1", display: "检修模式信号", type: "value", },
        { index: "2_2", value: "0", display: "检修模式信号", type: "value", },
        { index: "2_3", value: "1", display: "预留", type: "value", },
        { index: "2_4", value: "0", display: "预留", type: "value", },
        { index: "3_1", value: "1", display: "预留", type: "value", },
        { index: "3_2", value: "0", display: "升弓允许旁路", type: "value", },
        { index: "3_3", value: "1", display: "司机室钥匙激活", type: "value", },
        { index: "3_4", value: "0", display: "司机室人工占有", type: "value", },
      ]
    },
  ],
  Tc2车IOM1诊断数据: [{
    data: [
      { index: "1_1", value: "0", display: "ATO模式信号", type: "value", },
      { index: "1_2", value: "0", display: "CBTC左门允许", type: "value", },
      { index: "1_3", value: "0", display: "CBTC右门允许", type: "value", },
      { index: "1_4", value: "0", display: "逃生门解锁请求信号", type: "value", },
      { index: "2_1", value: "1", display: "检修模式信号", type: "value", },
      { index: "2_2", value: "0", display: "检修模式信号", type: "value", },
      { index: "2_3", value: "1", display: "预留", type: "value", },
      { index: "2_4", value: "0", display: "预留", type: "value", },
      { index: "3_1", value: "1", display: "预留", type: "value", },
      { index: "3_2", value: "0", display: "升弓允许旁路", type: "value", },
      { index: "3_3", value: "1", display: "司机室钥匙激活", type: "value", },
      { index: "3_4", value: "0", display: "司机室人工占有", type: "value", },
    ]
  }],
}
const IOParams: React.FC<IOParamsProps> = (props) => {
  // const { traction } = props;
  const chartHeight = 380;
  const data1 = {};
  const data2 = {};
  const data3 = {};
  const data4 = {};

  const defaultPage = 1;
  const defaultSize = 2;
  const [page, setPage] = useState(defaultPage);
  const [pageSize, setPageSize] = useState(defaultSize);
  const changePage = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
  };
  const onChange = () => {
    setPage(defaultPage);
    setPageSize(defaultSize);
  }

  var coachArray = traction?.coach_names?.split(",");
  return (
    <div
    // style={{
    //   height: chartHeight,
    // }}
    //   className={styles.system}
    >
      {typeof traction === "undefined" ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> :
        <Tabs tabPosition="right" size="small" type="card" onChange={onChange}>
          {traction?.coach_names?.split(",").map(itemCoach => (
            <>
              <TabPane tab={itemCoach} key={itemCoach} >
                <div style={{ height: chartHeight }} className={styles.system}
                >
                  {traction[itemCoach]?.slice((page - 1) * pageSize, page * pageSize)?.map((itemDec, index) => (
                    <>
                      <Descriptions
                        bordered
                        size="small" >
                        <Descriptions.Item
                          label={itemDec.name}
                          labelStyle={{ width: 90 }}
                        >
                          <div style={{ marginBottom: -10, marginTop: -10, marginRight: -20, marginLeft: -20 }}>
                            <Descriptions

                              column={4}
                              // column={parseInt(itemDec.data[itemDec.data?.length - 1].index.split("_")[0])}
                              size="small"
                              bordered >
                              {itemDec.data?.map(itemData => (
                                <>
                                  <Descriptions.Item style={{ fontSize: 10 }} label={itemData.display} labelStyle={{ width: 130 }}>
                                    {/* {itemData.value} */}
                                  </Descriptions.Item>
                                </>
                              ))}
                            </Descriptions>
                          </div>
                        </Descriptions.Item>
                      </Descriptions>

                    </>
                  ))}
                </div>
                <br />
                <div style={{ float: 'right' }}>
                  <Pagination
                    simple
                    size="small"
                    hideOnSinglePage
                    onChange={changePage}
                    defaultPageSize={pageSize}
                    defaultCurrent={page}
                    total={traction[itemCoach]?.length} />
                </div>
              </TabPane>
            </>
          ))}
        </Tabs>
      }
    </div >
  );
};



export default IOParams;
