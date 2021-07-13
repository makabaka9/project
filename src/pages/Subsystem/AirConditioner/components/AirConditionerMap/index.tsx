import { Row, Col, Radio, Button, Badge } from 'antd';
import React from 'react';
import airConditionerGreenIcon from '@/assets/airConditionerGreenIcon.svg';
import autoHeight from '@/components/autoHeight';

interface DoorMapProps {
  // loading: boolean;
  // dispatch: Dispatch<any>;
  // SubsystemAndDoor: BasicProfileDataType;
}
const AirConditionerMap: React.FC<DoorMapProps> = (props) => {
  // const info=[
  //     {position:"Tc1左",key:1}
  // ]
  const gutters = {};
  const vgutters = {};
  const colCounts = {};
  const gutterKey = 1;
  const vgutterKey = 1;

  [8, 16, 24, 32, 40, 48].forEach((value, i) => {
    gutters[i] = value;
  });
  [8, 16, 24, 32, 40, 48].forEach((value, i) => {
    vgutters[i] = value;
  });
  [2, 3, 4, 6, 8, 12].forEach((value, i) => {
    colCounts[i] = value;
  });
  const cols = [];
  const colCount = colCounts[4];
  let colCode = '';
  // for (let i = 0; i < colCount; i++) {
  //     cols.push(
  //         <Col key={i.toString()} span={24 / colCount} style={{ textAlign: 'center' }}>
  //             <Row justify='center' style={{ paddingBottom: 10 }}>
  //                 <img src={airConditionerGreenIcon} style={{ height: 30 }} />
  //                 &nbsp;&emsp;
  //                 <img src={airConditionerGreenIcon} style={{ height: 30 }} />
  //             </Row>
  //         </Col>,
  //     );
  //     colCode += `  <Col span={${24 / colCount}} />\n`;
  // }

  const carName = [
    { name: 'Tc1', state: 1 },
    { name: 'Mp1', state: 0 },
    { name: 'M1', state: 5 },
    { name: 'M2', state: 0 },
    { name: 'Mp2', state: 0 },
    { name: 'Tc2', state: 0 },
    { name: 'Tc1', state: 0 },
  ];
  // const iconMap = carName.map(item => (
  //     <Col span={24 / colCount} style={{ textAlign: 'center', }}>
  //          {/* <div style={{ textAlign: 'center' }}>{item.name}</div> */}
  //         <Row justify='center'
  //          style={{ paddingBottom: 10,
  //          backgroundColor: item.state===1?"#0050b3":"#262626" }}>
  //             <img src={airConditionerGreenIcon} style={{ height: 30 }} />
  //             &emsp;{item.name}&emsp;
  //             <img src={airConditionerGreenIcon} style={{ height: 30 }} />
  //         </Row>
  //     </Col>
  // ));
  const iconMap = carName.map((item) => (
    <Col span={24 / colCount} style={{ textAlign: 'center' }}>
      <Badge count={item.state} offset={[-10, -0]}>
        {/* <Radio value={1}>{item.name}</Radio> */}
        <Button
          style={{
            paddingBottom: 30,
          }}
        >
          <img src={airConditionerGreenIcon} style={{ height: 20 }} />
          &emsp;{item.name}&emsp;
          <img src={airConditionerGreenIcon} style={{ height: 20 }} />
        </Button>
      </Badge>
    </Col>
  ));
  return (
    <div>
      <Row justify="center" align="middle" gutter={[gutters[gutterKey], vgutters[vgutterKey]]}>
        {iconMap}
      </Row>
    </div>
  );
};

export default autoHeight()(AirConditionerMap);
