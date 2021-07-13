
import React, { useState } from 'react';
import { Descriptions, Pagination, Tabs, Row, Col, Empty } from 'antd';
import CircleIcon from './circleIcon';
import styles from '../../style.less';
import { useEffect } from 'react';


const { TabPane } = Tabs;
export interface IOParamsProps {
  traction: any;
}

const traction2 = {
  coach_names: "Mp1,M1,M2,Mp2",
  Mp1: [
    {
      // name: "Mp1第一列",
      data: [
        { index: "1_1", value: "0", display: "本车电制动能力（N）", type: "value", },
        { index: "1_2", value: "0", display: "斩波时间（ms）", type: "value", },
        { index: "2_1", value: "0", display: "本车实际电制动力（N）", type: "value", },
        { index: "2_2", value: "0", display: "电机转速（N)", type: "value", },
        { index: "3_1", value: "0", display: "本车实际牵引力（N）", type: "value", },
        { index: "3_2", value: "0", display: "电机1温度（℃）", type: "value", },
        { index: "4_1", value: "0", display: "DCU给定牵引/制动力（N）", type: "value", },
        { index: "4_2", value: "0", display: "电机2温度（℃）", type: "value", },
        { index: "5_1", value: "0", display: "电机综合转速（km/h）", type: "value", },
        { index: "5_2", value: "0", display: "电机3温度（℃）", type: "value", },
        { index: "6_1", value: "0", display: "电网电压(V)", type: "value", },
        { index: "6_2", value: "0", display: "电机4温度（℃）", type: "value", }
      ]
    },
  ],
  Mp2: [
  ],
  M1: [{
    data: [
      { index: "1_1", value: "0", display: "空转", type: "value", },
      { index: "1_2", value: "0", display: "电制动滑行", type: "value", },
      { index: "1_3", value: "0", display: "电制动有效", type: "value", },
      { index: "1_4", value: "0", display: "电制动可用", type: "value", },
      { index: "2_1", value: "1", display: "预留", type: "value", },
      { index: "2_2", value: "0", display: "预留", type: "value", },
      { index: "2_3", value: "1", display: "预留", type: "value", },
      { index: "2_4", value: "0", display: "电制动衰减", type: "value", },
      { index: "3_1", value: "1", display: "制动状态", type: "value", },
      { index: "3_2", value: "0", display: "牵引状态", type: "value", },
      { index: "3_3", value: "1", display: "向后状态", type: "value", },
      { index: "3_4", value: "0", display: "向前状态", type: "value", },
    ]
  }],
  M2: [],
}
const TractionParams: React.FC<IOParamsProps> = (props) => {
  const { tractionInformation } = props;
  const traction = tractionInformation;
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
  traction?.coach_names?.split(",").map((itemCoach) => {
    data1[itemCoach] = [];
    data2[itemCoach] = [];
    data3[itemCoach] = [];
    data4[itemCoach] = [];
    traction?.record.map((item) => {
      //console.log(item[itemCoach]);
      if(!Array.isArray(item[itemCoach])){
        //console.log(item[itemCoach]);
          if (item[itemCoach].index.split("_")[1] === "1") {
            data1[itemCoach].push(item[itemCoach])
          } else if (item[itemCoach].index.split("_")[1] === "2") {
            data2[itemCoach].push(item[itemCoach])
          } else if (item[itemCoach].index.split("_")[1] === "3") {
            data3[itemCoach].push(item[itemCoach])
          }
          else {
            data4[itemCoach].push(item[itemCoach])
          }
      }

      })
    });
  // traction?.coach_names?.split(",").map((itemCoach) => {
  //   traction?.record.map((item) => {
  //     data1[itemCoach] = [];
  //     data2[itemCoach] = [];
  //     data3[itemCoach] = [];
  //     data4[itemCoach] = [];

  //       // item.index.split("-")[1] === "1" ?
  //       // data1.push(item) : data2.push(item)
  //       if (item[itemCoach][0].index.split("_")[1] === "1") {
  //         data1[itemCoach].push(item[itemCoach])
  //       } else if (item[itemCoach][0].index.split("_")[1] === "2") {
  //         data2[itemCoach].push(item[itemCoach])
  //       } else if (item[itemCoach][0].index.split("_")[1] === "3") {
  //         data3[itemCoach].push(item[itemCoach])
  //       }
  //       else {
  //         data4[itemCoach].push(item[itemCoach])
  //       }
  //     })
  //   });
  // console.log("333", data1[itemCoach])
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
              {itemCoach === "Mp1" || itemCoach === "Mp2" ?
                <TabPane tab={itemCoach} key={itemCoach} >
                  <div style={{
                    height: chartHeight
                  }}
                    className={styles.system}
                  >
                    
                      <>
                        <Row>
                          <Col span={12}>
                            <Descriptions
                              column={1}
                              size="small"
                              bordered>
                              {
                                data1[itemCoach].map(itemData => (
                                  <>
                                    <Descriptions.Item label={itemData.display} span={2}>
                                      {itemData.value}
                                    </Descriptions.Item>
                                  </>
                                ))
                              }
                            </Descriptions>
                          </Col>
                          <Col span={12}>
                            <Descriptions
                              column={1}
                              size="small"
                              bordered>
                              {
                                data2[itemCoach].map(itemData => (
                                  <>
                                    <Descriptions.Item label={itemData.display} span={2}>
                                      {itemData.value}
                                    </Descriptions.Item>
                                  </>
                                ))
                              }
                            </Descriptions>
                          </Col>

                        </Row>
                      </>
                    
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
                </TabPane> :

                <TabPane tab={itemCoach} key={itemCoach} >
                  <div style={{
                    height: chartHeight
                  }}
                    className={styles.system}
                  >

                      <>
                        <Row>
                          <Col span={6}>
                            <Descriptions
                              column={1}
                              size="small"
                              bordered>
                              {
                                data1[itemCoach].map(itemData => (
                                  <>
                                    <Descriptions.Item label={itemData.display} span={2}>
                                    </Descriptions.Item>
                                  </>
                                ))
                              }
                            </Descriptions>
                          </Col>
                          <Col span={6}>
                            <Descriptions
                              column={1}
                              size="small"
                              bordered>
                              {
                                data2[itemCoach].map(itemData => (
                                  <>
                                    <Descriptions.Item label={itemData.display} span={2}>
                                    </Descriptions.Item>
                                  </>
                                ))
                              }
                            </Descriptions>
                          </Col>
                          <Col span={6}>
                            <Descriptions
                              column={1}
                              size="small"
                              bordered>
                              {
                                data3[itemCoach].map(itemData => (
                                  <>
                                    <Descriptions.Item label={itemData.display} span={2}>
                                    </Descriptions.Item>
                                  </>
                                ))
                              }
                            </Descriptions>
                          </Col>
                          <Col span={6}>
                            <Descriptions
                              column={1}
                              size="small"
                              bordered>
                              {
                                data4[itemCoach].map(itemData => (
                                  <>
                                    <Descriptions.Item label={itemData.display} span={2}>
                                    </Descriptions.Item>
                                  </>
                                ))
                              }
                            </Descriptions>
                          </Col>

                        </Row>
                      </>
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
              }
            </>
          ))}
        </Tabs>
      }
    </div >
  );
};



export default TractionParams;
