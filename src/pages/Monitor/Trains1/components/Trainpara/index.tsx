
import React, { useEffect, useState } from 'react';
import { Empty, List, Table, Tabs, Tag } from 'antd';
import styles from '../../style.less';
import CircleIcon from './circleIcon';
import { connect, Dispatch } from 'umi';
import { StateType } from '../../model';
import { queryJsonMap, queryTrainParams } from '../../service';

const { TabPane } = Tabs;
export interface TrainparaMapProps {
  loading: boolean;
  dispatch: Dispatch;
  monitorAndHMI2: StateType;
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  coachColumns: any;
  lineCode: string;
  trainCode: string;
  // lcuList: [];
  data: any;
}


const TrainparaMap: React.FC<TrainparaMapProps> = (props) => {
  const { height = 1,
    data
  } = props;
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


  // const data = {
  //   coach_names: "Tc1,Tc2",
  //   Tc1: [

  //     { value: 0, title: "升弓", },
  //     { value: 0, title: "降弓", },
  //     { value: 0, title: "A1紧急停车", },
  //     { value: 1, title: "HSCB", },
  //     { value: 0, title: "升弓", },
  //     { value: 0, title: "降弓", },
  //     { value: 1, title: "升弓", },
  //     { value: 0, title: "升弓", },
  //     { value: 0, title: "升弓", },
  //     { value: 1, title: "升弓", },
  //     { value: 0, title: "升弓", },
  //     { value: 1, title: "升弓", }
  //   ],
  //   Tc2: [
  //     { value: 0, title: "空转", },
  //     { value: 0, title: "电制动滑行", },
  //     { value: 0, title: "电制动有效", },
  //     { value: 0, title: "电制动可用", },
  //     { value: 1, title: "预留", },
  //     { value: 0, title: "预留", },
  //     { value: 1, title: "预留", },
  //     { value: 0, title: "电制动衰减", },
  //     { value: 1, title: "制动状态", },
  //     { value: 0, title: "牵引状态", },
  //     { value: 1, title: "向后状态", },
  //     { value: 0, title: "向前状态", },
  //   ],
  // }

  // const chartHeight = height + 54;

  return (
    <div
    >
      <Tabs defaultActiveKey="1" type="card"
        style={{ height: 386 }}
      // onChange={changeTab}
      >
        <TabPane tab={<div style={{ width: 85, textAlign: "center" }}>{"司机台指示灯"}</div>} key="司机台指示灯" >

          {typeof data === "undefined" ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> :
            <Tabs tabPosition="right" size="small" type="card"
              onChange={onChange}
            >

              {data?.coach_names?.split(",").map(itemCoach => (
                <>
                  <TabPane tab={itemCoach} key={itemCoach} >
                    <div
                      style={{ height: 330 }} className={styles.system}

                    >
                      <List
                        rowKey="id"
                        grid={{
                          gutter: 6, // 栅格的间距
                          column: 5,
                          xs: 1,
                          sm: 2,
                          md: 3,
                          lg: 5,
                          xl: 5,
                        }}
                        // style={{ width: 200, }}
                        size='small'
                        dataSource={data.record[itemCoach]}
                        renderItem={(item: any) => (
                          <List.Item
                            style={{ width: 50, textAlign: "center" }}
                          >
                            <div style={{
                              padding: 4,
                              // borderRadius: 60,
                              width: 140,

                              // backgroundColor: "#fff",
                              height: 50,
                              borderWidth: 1,
                              // borderStyle: "solid",
                              // borderColor: '#ee3f5f',
                            }}
                            >
                              <div> {item.value === 0 ? < CircleIcon color="#fff" /> : < CircleIcon color="#73d13d" />}</div>
                              <div style={{ paddingLeft: 0, fontSize: 12, textAlign: "center" }}>{item.title}</div>
                            </div>
                          </List.Item>
                        )}
                      >
                      </List>
                    </div>
                  </TabPane>
                </>
              ))}

            </Tabs>
          }
        </TabPane>
      </Tabs>
    </div >
  );
};

// export default TrainparaMap;
export default connect(
  ({
    monitorAndHMI2,
    loading,
  }: {
    monitorAndHMI2: StateType;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    monitorAndHMI2,
    loading: loading.effects['monitorAndHMI2/fetchOtherMap'],
  }),
)(TrainparaMap);
