
import React, { useState } from 'react';
import { Descriptions, Pagination, Tabs, Row, Col, Empty } from 'antd';
import CircleIcon from './circleIcon';
import styles from '../../style.less';


const { TabPane } = Tabs;
export interface IOParamsProps {
  auxiliary: any;
}

const auxiliary = {
  coach_names: "Tc1,Tc2",
  Tc1: [
    {
      // name: "Mp1第一列",
      data: [
        { index: "1_1", value: "0", display: "线路输入电压（Ud）", type: "value", },
        { index: "1_2", value: "0", display: "逆变器输出电流Iu（A）", type: "value", },
        { index: "2_1", value: "0", display: "逆变器输入电流Id(A)", type: "value", },
        { index: "2_2", value: "0", display: "逆变器输出电流Iv(A)", type: "value", },
        { index: "3_1", value: "0", display: "逆变电路输出线电压Uf（N）", type: "value", },
        { index: "3_2", value: "0", display: "逆变器输出电流Iw(A)", type: "value", },
        { index: "4_1", value: "0", display: "线路输入电压（Ud）", type: "value", },
        { index: "4_2", value: "0", display: "逆变器输出电流Iu（A）", type: "value", },
        { index: "5_1", value: "0", display: "逆变器输入电流Id(A)", type: "value", },
        { index: "5_2", value: "0", display: "逆变器输出电流Iv(A)", type: "value", },
        { index: "6_1", value: "0", display: "逆变电路输出线电压Uf（N）", type: "value", },
        { index: "6_2", value: "0", display: "逆变器输出电流Iv(A)", type: "value", }
      ]
    },
  ],
  Tc2: [{
    data: [
      { index: "1_1", value: "0", display: "线路输入电压（Ud）", type: "value", },
      { index: "1_2", value: "0", display: "逆变器输出电流Iu（A）", type: "value", },
      { index: "2_1", value: "0", display: "逆变器输入电流Id(A)", type: "value", },
      { index: "2_2", value: "0", display: "逆变器输出电流Iv(A)", type: "value", },
      { index: "3_1", value: "0", display: "逆变电路输出线电压Uf（N）", type: "value", },
      { index: "3_2", value: "0", display: "逆变器输出电流Iw(A)", type: "value", },
      { index: "4_1", value: "0", display: "线路输入电压（Ud）", type: "value", },
      { index: "4_2", value: "0", display: "逆变器输出电流Iu（A）", type: "value", },
      { index: "5_1", value: "0", display: "逆变器输入电流Id(A)", type: "value", },
      { index: "5_2", value: "0", display: "逆变器输出电流Iv(A)", type: "value", },
      { index: "6_1", value: "0", display: "逆变电路输出线电压Uf（N）", type: "value", },
      { index: "6_2", value: "0", display: "逆变器输出电流Iv(A)", type: "value", }
    ]
  }],
}
const Auxiliary: React.FC<IOParamsProps> = (props) => {
  const { auxInformation } = props;
  const chartHeight = 380;
  const data1 = {};
  const data2 = {};

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

  auxInformation?.coach_names?.split(",").map((itemCoach) => {
    data1[itemCoach] = [];
    data2[itemCoach] = [];
    auxInformation.record.map((item)=>{
      if(!Array.isArray(item[itemCoach])){
      if (item[itemCoach].index.split("_")[1] === "1") {
        data1[itemCoach].push(item[itemCoach])
      } else if (item[itemCoach].index.split("_")[1] === "2") {
        data2[itemCoach].push(item[itemCoach])
      }
    }
    });
  })

  console.log("data1", data1)
  // console.log("333", data1[itemCoach])
  return (
    <div
    // style={{
    //   height: chartHeight,
    // }}
    //   className={styles.system}
    >
      {typeof auxiliary === "undefined" ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> :
        <Tabs tabPosition="right" size="small" type="card" onChange={onChange}>
          {auxiliary?.coach_names?.split(",").map(itemCoach => (
            <>
              <TabPane tab={itemCoach} key={itemCoach} >
                <div style={{
                  height: chartHeight
                }}
                  className={styles.system}
                >
                  {auxiliary[itemCoach]?.map((itemDec, index) => (
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
                    total={auxiliary[itemCoach]?.length} />
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



export default Auxiliary;
