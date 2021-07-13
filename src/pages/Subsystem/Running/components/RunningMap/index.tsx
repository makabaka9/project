import { Row, Col, Divider, List, Card } from 'antd';
import React from 'react';
import axleIcon from '@/assets/axle.svg';
import styles from '../../style.less';
import { BoxPlotFilled } from '@ant-design/icons';
import Item from 'antd/lib/list/Item';

interface RunningMapProps {
  data: Array<any>;
}
const RunningMap: React.FC<RunningMapProps> = (props) => {
  const { data } = props;
  // const gutters = {};
  // const vgutters = {};
  // const colCounts = {};
  // const gutterKey = 1;
  // const vgutterKey = 1;

  // [8, 16, 24, 32, 40, 48].forEach((value, i) => {
  //   gutters[i] = value;
  // });
  // [8, 16, 24, 32, 40, 48].forEach((value, i) => {
  //   vgutters[i] = value;
  // });
  // [2, 3, 4, 6, 8, 12].forEach((value, i) => {
  //   colCounts[i] = value;
  // });
  // const cols = [];
  // const colCount = colCounts[3];
  // let colCode = '';
  // for (let i = 0; i < colCount; i++) {
  //   cols.push(
  //     <Col
  //       key={i.toString()}
  //       span={24 / colCount}
  //       style={{ textAlign: 'center', transform: 'rotate(' + 90 + 'deg)' }}
  //     >
  //       {/* <div style={{transform:'rotate('+90+'deg)', padding:10}}> */}
  //       <Row justify="center">
  //         <img src={axleIcon} className={styles.icon} />
  //       </Row>
  //       <Row justify="center">
  //         <img src={axleIcon} className={styles.icon} />
  //       </Row>
  //       &emsp;
  //       <Row justify="center">
  //         <img src={axleIcon} className={styles.icon} />
  //       </Row>
  //       <Row justify="center">
  //         <img src={axleIcon} className={styles.icon} />
  //       </Row>
  //       {/* </div> */}
  //       {/* <Divider type="vertical" /> */}
  //     </Col>,
  //   );
  //   colCode += `  <Col span={${24 / colCount}} />\n`;
  // }
  return (
    <div>
      <List
        grid={{
          gutter: 16,
          column: 6,
          // xs: 1,
          // sm: 2,
          // md: 4,
          // lg: 4,
          // xl: 6,
          // xxl: 3,
        }}
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <Card bodyStyle={{ padding: 0, textAlign: "center" }}
              style={{ borderWidth: 1, borderStyle: "solid", borderColor: "gray", borderRadius: 30, }}>
              <div style={{ textAlign: 'center' }}>{item.name}</div>
              <List
                grid={{
                  gutter: 16,
                  column: 4,
                  // xs: 1,
                  // sm: 2,
                  // md: 4,
                  // lg: 4,
                  // xl: 6,
                  // xxl: 3,
                }}
                dataSource={item.value}
                renderItem={item2 => (
                  <List.Item>
                    <BoxPlotFilled style={{
                      color: item2.state === 0 ? "#a0d911" :
                        item2.state === 1 ? "#f5222d" : item2.state === 2 ? "#fa8c16" : "#ffec3d"
                    }} />
                    <div style={{ color: item2.temperature > 60 ? "red" : "#1890ff" }}>{item2.temperature}</div>
                  </List.Item>
                )}
              />
            </Card>
          </List.Item>
        )}
      />
    </div>
    // <div>
    //   <Row
    //     justify="center"
    //     align="middle"
    //     style={{ marginBottom: -20, marginTop: -20 }}
    //     gutter={[gutters[gutterKey], vgutters[vgutterKey]]}
    //   >
    //     {cols}
    //     {/* <img src={doorIcon} className={styles.icon} /> */}
    //   </Row>
    // </div>
  );
};

export default RunningMap;
