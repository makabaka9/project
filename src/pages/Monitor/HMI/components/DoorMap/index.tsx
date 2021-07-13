import { Row, Col, List, Card, Tag, Avatar, Progress } from 'antd';
import React from 'react';
import doorGreenIcon from '@/assets/doorGreen.svg';
import doorRedIcon from '@/assets/doorRed.svg';
import doorYellowIcon from '@/assets/doorYellow.svg';
import styles from '../../style.less';
import { BellFilled, DoubleRightOutlined } from '@ant-design/icons';
// import BcuIcon1 from '../images/制动1.svg';
import BcuIcon2 from '../images/制动2.svg';
// import BcuIcon3 from '../images/制动3.svg';
import DcuIcon from '../images/牵引.svg';
import GreenRectIcon from '../images/greenRect.svg';
import RedRectIcon from '../images/redRect.svg';

interface DoorMapProps {
  // loading: boolean;
  // dispatch: Dispatch<any>;
  // SubsystemAndDoor: BasicProfileDataType;
  // data: Array<string>;
}


const DoorMap: React.FC<DoorMapProps> = (props) => {
  // const { data } = props;
  const coachCode = ["Mp1", "M1", "M2", "Mp2"]
  const data = [
    // { "name": "Tc1", "value": [0, 2, 1, 0, 0, 0, 1, 0] },
    {
      "name": "Mp1", "doorValue1": [0, 2, 1, 0, 0],
      "doorValue2": [0, 1, 0, 1, 0],
      warning: [0, 1, 0], fault: [0, 1, 2, 0], open: 1, media: 1, lcu1: 1, lcu2: null,
    },
    {
      "name": "M1", "doorValue1": [0, 2, 1, 0, 0],
      "doorValue2": [0, 1, 0, 1, 0], warning: [0, 1, 0], fault: [0, 1, 2, 0], open: 1, media: 1, lcu1: null, lcu2: null
    },
    {
      "name": "M2", "doorValue1": [0, 2, 1, 0, 0],
      "doorValue2": [0, 1, 0, 1, 0], warning: [0, 1, 0], fault: [0, 1, 2, 0], open: 1, media: 1, lcu1: null, lcu2: null
    },
    {
      "name": "Mp2", "doorValue1": [0, 2, 1, 0, 0],
      "doorValue2": [0, 1, 0, 1, 0], warning: [0, 1, 0], fault: [0, 1, 2, 0], open: 1, media: 1, lcu1: null, lcu2: 1
    },
    // { "name": "Tc2", "value": [0, 2, 1, 0, 0, 0, 1, 0] },
  ]

  const detector1 = [{ 1: 0 }, { 2: 3 }, { 3: 0 }, { 4: 0 }]
  let detectorMap = [];
  for (let i = 1; i < detector1.length + 1; i++) {
    const arrayMap = detector1[i - 1][i] === 0 ? <Tag color="#1890ff" style={{ width: 14, padding: 0 }}>{detector1[i - 1][i]}</Tag>
      : detector1[i - 1][i] === 1 ? <Tag color="gold" style={{ width: 14, padding: 0 }}>{detector1[i - 1][i]}</Tag>
        : detector1[i - 1][i] === 2 ? <Tag color="pink" style={{ width: 14, padding: 0 }}>{detector1[i - 1][i]}</Tag>
          : detector1[i - 1][i] === 3 ? <Tag color="#f5222d" style={{ width: 14, padding: 0 }}>{detector1[i - 1][i]}</Tag>
            : <Tag color="rgb(0,0,0,0)">{detector1[i - 1][i]}</Tag>
    detectorMap.push(arrayMap)
  }

  return (

    <div>
      <Row justify="center" gutter={24}>
        <Col xl={22}
          lg={12}
          sm={24}
          xs={24}>
          <Row justify="center" gutter={0}>
            <Col span={6}><div style={{ textAlign: "center" }}>Mp1</div> </Col>
            <Col span={6}><div style={{ textAlign: "center" }}>M1</div>
            </Col>
            <Col span={6}><div style={{ textAlign: "center" }}>M2</div>
            </Col>
            <Col span={6}><div style={{ textAlign: "center" }}>Mp2</div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Card
        className={styles.train}
        bordered={false}
        bodyStyle={{
          paddingLeft: 14, paddingRight: 14, paddingTop: 0, paddingBottom: 0
        }}
      >
        <Row justify="center" gutter={0}>
          <Col xl={22}
            lg={12}
            sm={24}
            xs={24}>
            <List
              grid={{
                gutter: 4,
                column: 4,
              }}
              dataSource={data}
              renderItem={itemCoach => (
                <List.Item>
                  {/* <div style={{ textAlign: 'center'}}>{itemCoach.name}<DoubleRightOutlined style={{ color: "green" }} /></div> */}
                  <Card bodyStyle={{
                    paddingTop: 0, paddingBottom: 0, paddingRight: 0, paddingLeft: 4,
                    textAlign: "center", backgroundColor: "rgb(89,126,247,0.4)"
                  }}>
                    <List
                      grid={{
                        gutter: 8,
                        column: 5,
                      }}
                      dataSource={itemCoach.doorValue1}
                      renderItem={itemDoor => (
                        <List.Item>
                          <div> <img src={itemDoor === 0 ? doorGreenIcon
                            : itemDoor === 1 ? doorYellowIcon : doorRedIcon} className={styles.icon} /></div>
                        </List.Item>
                      )}
                    />





                    <div style={{ padding: 6 }}>
                      < svg height="12" width="12" >
                        <polygon points="0,0 0,200 200,200 200,0 "
                          style={{ fill: "green", strokeWidth: 1 }} />
                      </svg >&emsp;
                    < svg height="12" width="12" >
                        <polygon points="0,0 0,200 200,200 200,0 "
                          style={{ fill: "green", strokeWidth: 1 }} />
                      </svg >&emsp;
                    < svg height="12" width="12" >
                        <polygon points="0,0 0,200 200,200 200,0 "
                          style={{ fill: "green", strokeWidth: 1 }} />
                      </svg >&emsp;
                    < svg height="12" width="12" >
                        <polygon points="0,0 0,200 200,200 200,0 "
                          style={{ fill: "#F3303A", strokeWidth: 1 }} />
                      </svg >
                    </div>
                    {/* <div>{rectangle("#F3303A")}</div>  */}
                    {/* {detectorMap[0]}{detectorMap[1]} {detectorMap[2]}{detectorMap[3]} */}
                    <br />
                    <Avatar
                      size="small"
                      src={BcuIcon2}
                    />
                    <br />
                    <Row>
                      <Col span={8}>
                        {itemCoach.lcu2 === 1 ? <Avatar size="small" src={GreenRectIcon} /> :
                          (itemCoach.lcu2 === 0 ? <Avatar size="small" src={RedRectIcon} /> : null)}
                        {/* {itemCoach.lcu2 === 1 ? <Tag color="#52c41a">LCU</Tag> 
                        : itemCoach.lcu2 === 0 ? <Tag color="#f5222d">LCU</Tag> : null} */}
                      </Col>
                      <Col span={8}>
                        <Avatar
                          size="small"
                          src={DcuIcon}
                        />
                      </Col>
                      <Col span={8}>
                        {itemCoach.lcu1 === 1 ? <Avatar size="small" src={GreenRectIcon} /> :
                          (itemCoach.lcu1 === 0 ? <Avatar size="small" src={RedRectIcon} /> : null)}
                        {/* {itemCoach.lcu1 === 1 ? <Tag color="#52c41a" >LCU</Tag> 
                        : itemCoach.lcu1 === 0 ? <Tag color="#f5222d">LCU</Tag> : null} */}
                      </Col>
                    </Row>

                    <List
                      grid={{
                        gutter: 16,
                        column: 3,
                      }}
                      dataSource={itemCoach.warning}
                      renderItem={item2 => (
                        <List.Item>
                          <BellFilled style={{ color: item2 === 1 ? "#faad14" : "#52c41a" }} />
                        </List.Item>
                      )}
                    />
                    <div style={{ padding: 6 }}>
                      < svg height="12" width="12" >
                        <polygon points="0,0 0,200 200,200 200,0 "
                          style={{ fill: "green", strokeWidth: 1 }} />
                      </svg >&emsp;
                    < svg height="12" width="12" >
                        <polygon points="0,0 0,200 200,200 200,0 "
                          style={{ fill: "green", strokeWidth: 1 }} />
                      </svg >&emsp;
                    < svg height="12" width="12" >
                        <polygon points="0,0 0,200 200,200 200,0 "
                          style={{ fill: "green", strokeWidth: 1 }} />
                      </svg >&emsp;
                    < svg height="12" width="12" >
                        <polygon points="0,0 0,200 200,200 200,0 "
                          style={{ fill: "#F3303A", strokeWidth: 1 }} />
                      </svg >
                    </div>
                    {/* {detectorMap[0]}{detectorMap[1]} {detectorMap[2]}{detectorMap[3]} */}
                    <div style={{ paddingTop: 16, marginBottom: -24 }}>
                      <List
                        grid={{
                          gutter: 8,
                          column: 5,
                        }}
                        dataSource={itemCoach.doorValue2}
                        renderItem={itemDoor => (
                          <List.Item>
                            <div> <img src={itemDoor === 0 ? doorGreenIcon
                              : itemDoor === 1 ? doorYellowIcon : doorRedIcon} className={styles.icon} /></div>
                          </List.Item>
                        )}
                      />
                    </div>
                  </Card>
                </List.Item>
              )}
            />
          </Col>
        </Row >
        {/* </div> */}
      </Card >
    </div >
  );
};

export default DoorMap;
