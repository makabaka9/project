import { GridContent } from '@ant-design/pro-layout';
import React, { useState } from 'react';

import ReactFlow, { ReactFlowProvider } from 'react-flow-renderer';
import styles from '../../../style.less';

export interface FlowChartProps {
  // netWork: any,
  data: Array<Object>;
}
const W = 765;
const H = 400;
const W1 = 50;



const FlowChart: React.FC<FlowChartProps> = (props) => {
  // const { data } = props;
  // const [elements, setElements] = useState(initialElements1);

  const initialElements = [
    { id: '0_1', sourcePosition: 'right', className: 'dark-node', data: { label: 'Tc1' }, position: { x: W1, y: 0 }, value: "-1" },
    { id: '0_2', sourcePosition: 'right', className: 'dark-node', data: { label: 'Mp1' }, position: { x: W1 + 110, y: 0 }, value: "-1" },
    { id: '0_3', sourcePosition: 'right', className: 'dark-node', data: { label: 'M1' }, position: { x: W1 + 220, y: 0 }, value: "-1" },
    { id: '0_4', sourcePosition: 'right', className: 'dark-node', data: { label: 'M2' }, position: { x: W1 + 330, y: 0 }, value: "-1" },
    { id: '0_5', sourcePosition: 'right', className: 'dark-node', data: { label: 'Mp1' }, position: { x: W1 + 440, y: 0 }, value: "-1" },
    { id: '0_6', sourcePosition: 'right', className: 'dark-node', data: { label: 'Tc2' }, position: { x: W1 + 550, y: 0 }, value: "-1" },
    // 第一列假数据
    { id: '7_1', sourcePosition: 'top', data: { label: 'REP' }, position: { x: 50, y: 65 }, value: "0" },
    // 第一列数据
    { id: '1_1', sourcePosition: 'top', data: { label: 'REP' }, position: { x: 50, y: 35 }, value: "0" },
    { id: '1_2', sourcePosition: 'top', data: { label: 'REP' }, position: { x: 50, y: 65 }, value: "0" },
    { id: '1_3', sourcePosition: 'right', data: { label: 'MDCU1' }, position: { x: 0, y: 100 }, value: "0" },
    { id: '1_4', sourcePosition: 'left', data: { label: 'IOM2' }, position: { x: 100, y: 100 }, value: "0" },
    { id: '1_5', sourcePosition: 'right', className: 'dark-node', data: { label: 'HVAC' }, position: { x: 0, y: 130 }, value: "0" },
    { id: '1_6', sourcePosition: 'right', className: 'dark-node', data: { label: 'CCU' }, position: { x: 100, y: 130 }, value: "0" },
    { id: '1_7', sourcePosition: 'right', className: 'dark-node', data: { label: 'AODS' }, position: { x: 0, y: 160 }, value: "0" },
    { id: '1_8', sourcePosition: 'right', className: 'dark-node', data: { label: 'ATC' }, position: { x: 0, y: 190 }, value: "0" },
    { id: '1_9', sourcePosition: 'right', className: 'dark-node', data: { label: 'PIS' }, position: { x: 0, y: 220 }, value: "0" },
    { id: '1_10', sourcePosition: 'right', className: 'dark-node', data: { label: 'TDS' }, position: { x: 0, y: 250 }, value: "0" },
    { id: '1_11', sourcePosition: 'right', className: 'dark-node', data: { label: 'HMI' }, position: { x: 100, y: 250 }, value: "0" },
    { id: '1_12', sourcePosition: 'right', className: 'dark-node', data: { label: 'MDCU2' }, position: { x: 0, y: 280 }, value: "0" },
    { id: '1_13', sourcePosition: 'right', className: 'dark-node', data: { label: 'BCU' }, position: { x: 100, y: 280 }, value: "0" },
    { id: '1_14', sourcePosition: 'right', className: 'dark-node', data: { label: 'IOM1' }, position: { x: 0, y: 310 }, value: "0" },
    { id: '1_15', sourcePosition: 'right', className: 'dark-node', data: { label: 'SIV' }, position: { x: 100, y: 310 }, value: "0" },
    { id: '1_16', sourcePosition: 'right', className: 'dark-node', data: { label: 'ERV' }, position: { x: 0, y: 340 }, value: "0" },
    { id: '1_17', sourcePosition: 'right', className: 'dark-node', data: { label: 'FAS' }, position: { x: 100, y: 340 }, value: "0" },
    // 第二列假数据
    { id: '7_2', sourcePosition: 'top', data: { label: 'REP' }, position: { x: 220, y: 65 }, value: "0" },
    // 第二列数据
    { id: '2_1', sourcePosition: 'top', data: { label: 'REP' }, position: { x: 220, y: 35 }, value: "0" },
    { id: '2_2', sourcePosition: 'top', data: { label: 'REP' }, position: { x: 220, y: 65 }, value: "0" },
    { id: '2_3', sourcePosition: 'right', data: { label: 'MDCU1' }, position: { x: 170, y: 100 }, value: "0" },
    { id: '2_4', sourcePosition: 'right', data: { label: 'MDCU2' }, position: { x: 170, y: 130 }, value: "0" },
    { id: '2_5', sourcePosition: 'right', data: { label: 'HVAC' }, position: { x: 170, y: 160 }, value: "0" },
    { id: '2_6', sourcePosition: 'right', data: { label: 'PDS' }, position: { x: 170, y: 220 }, value: "0" },
    { id: '2_7', sourcePosition: 'right', data: { label: 'DCU' }, position: { x: 170, y: 250 }, value: "0" },
    { id: '2_8', sourcePosition: 'right', data: { label: 'WTD' }, position: { x: 170, y: 280 }, value: "0" },
    { id: '2_9', sourcePosition: 'right', data: { label: 'IOM2' }, position: { x: 170, y: 310 }, value: "0" },
    // 第三列假数据
    { id: '7_3', sourcePosition: 'top', data: { label: 'REP' }, position: { x: 300, y: 65 }, value: "0" },
    // 第三列数据
    { id: '3_1', sourcePosition: 'top', data: { label: 'REP' }, position: { x: 300, y: 35 }, value: "0" },
    { id: '3_2', sourcePosition: 'top', data: { label: 'REP' }, position: { x: 300, y: 65 }, value: "0" },
    { id: '3_3', sourcePosition: 'right', data: { label: 'MDCU1' }, position: { x: 260, y: 100 }, value: "0" },
    { id: '3_4', sourcePosition: 'right', data: { label: 'MDCU2' }, position: { x: 260, y: 130 }, value: "0" },
    { id: '3_5', sourcePosition: 'right', data: { label: 'HVAC' }, position: { x: 260, y: 160 }, value: "0" },
    { id: '3_6', sourcePosition: 'right', data: { label: 'BCU' }, position: { x: 260, y: 190 }, value: "0" },
    { id: '3_7', sourcePosition: 'right', data: { label: 'DCU' }, position: { x: 260, y: 250 }, value: "0" },
    { id: '3_8', sourcePosition: 'right', data: { label: 'IOM2' }, position: { x: 260, y: 310 }, value: "0" },
    // 第四列假数据
    { id: '7_4', sourcePosition: 'top', data: { label: 'REP' }, position: { x: 385, y: 65 }, value: "0" },
    // 第四列数据
    { id: '4_1', sourcePosition: 'top', data: { label: 'REP' }, position: { x: 385, y: 35 }, value: "0" },
    { id: '4_2', sourcePosition: 'top', data: { label: 'REP' }, position: { x: 385, y: 65 }, value: "0" },
    { id: '4_3', sourcePosition: 'left', data: { label: 'MDCU1' }, position: { x: 430, y: 100 }, value: "0" },
    { id: '4_4', sourcePosition: 'left', data: { label: 'MDCU2' }, position: { x: 430, y: 130 }, value: "0" },
    { id: '4_5', sourcePosition: 'left', data: { label: 'HVAC' }, position: { x: 430, y: 160 }, value: "0" },
    { id: '4_6', sourcePosition: 'left', data: { label: 'BCU' }, position: { x: 430, y: 190 }, value: "0" },
    { id: '4_7', sourcePosition: 'left', data: { label: 'DCU' }, position: { x: 430, y: 250 }, value: "0" },
    { id: '4_8', sourcePosition: 'left', data: { label: 'IOM2' }, position: { x: 430, y: 310 }, value: "0" },
    // 第五列假数据
    { id: '7_5', sourcePosition: 'top', data: { label: 'REP' }, position: { x: 480, y: 65 }, value: "0" },
    // 第五列数据
    { id: '5_1', sourcePosition: 'top', data: { label: 'REP' }, position: { x: 480, y: 35 }, value: "0" },
    { id: '5_2', sourcePosition: 'top', data: { label: 'REP' }, position: { x: 480, y: 65 }, value: "0" },
    { id: '5_3', sourcePosition: 'left', data: { label: 'MDCU1' }, position: { x: 520, y: 100 }, value: "0" },
    { id: '5_4', sourcePosition: 'left', data: { label: 'MDCU2' }, position: { x: 520, y: 130 }, value: "0" },
    { id: '5_5', sourcePosition: 'left', data: { label: 'HVAC' }, position: { x: 520, y: 160 }, value: "0" },
    { id: '5_6', sourcePosition: 'left', data: { label: 'PDS' }, position: { x: 520, y: 210 }, value: "0" },
    { id: '5_7', sourcePosition: 'left', data: { label: 'DCU' }, position: { x: 520, y: 250 }, value: "0" },
    { id: '5_8', sourcePosition: 'left', data: { label: 'IOM2' }, position: { x: 520, y: 310 }, value: "0" },
    // 第六列假数据
    { id: '7_6', sourcePosition: 'top', data: { label: 'REP' }, position: { x: 630, y: 65 }, value: "0" },
    // 第六列数据
    { id: '6_1', sourcePosition: 'top', data: { label: 'REP' }, position: { x: 630, y: 35 }, value: "0" },
    { id: '6_2', sourcePosition: 'top', data: { label: 'REP' }, position: { x: 630, y: 65 }, value: "0" },
    { id: '6_3', sourcePosition: 'left', data: { label: 'IOM2' }, position: { x: 590, y: 100 }, value: "0" },
    { id: '6_4', sourcePosition: 'right', data: { label: 'MDCU1' }, position: { x: 680, y: 100 }, value: "0" },
    { id: '6_5', sourcePosition: 'left', data: { label: 'CCU' }, position: { x: 590, y: 130 }, value: "0" },
    { id: '6_6', sourcePosition: 'right', data: { label: 'HVAC' }, position: { x: 680, y: 130 }, value: "0" },
    { id: '6_7', sourcePosition: 'right', data: { label: 'AODS' }, position: { x: 680, y: 160 }, value: "0" },
    { id: '6_8', sourcePosition: 'right', data: { label: 'ATC' }, position: { x: 680, y: 190 }, value: "0" },
    { id: '6_9', sourcePosition: 'right', data: { label: 'PIS' }, position: { x: 680, y: 220 }, value: "0" },
    { id: '6_10', sourcePosition: 'left', data: { label: 'HMI' }, position: { x: 590, y: 250 }, value: "0" },
    { id: '6_11', sourcePosition: 'right', data: { label: 'TDS' }, position: { x: 680, y: 250 }, value: "0" },
    { id: '6_12', sourcePosition: 'left', data: { label: 'BCU' }, position: { x: 590, y: 280 }, value: "0" },
    { id: '6_13', sourcePosition: 'right', data: { label: 'MDCU2' }, position: { x: 680, y: 280 }, value: "0" },
    { id: '6_14', sourcePosition: 'left', data: { label: 'SIV' }, position: { x: 590, y: 310 }, value: "0" },
    { id: '6_15', sourcePosition: 'right', data: { label: 'IOM1' }, position: { x: 680, y: 310 }, value: "0" },
    { id: '6_16', sourcePosition: 'left', data: { label: 'FAS' }, position: { x: 590, y: 340 }, value: "0" },
    { id: '6_17', sourcePosition: 'right', data: { label: 'ERV' }, position: { x: 680, y: 340 }, value: "0" },

  ];
  const initialConnectLine: any = [
    //第一列连线
    { source: '1_1', type: 'step', target: '7_1', },
    { source: '1_2', type: 'step', target: '1_3', },
    { source: '1_2', type: 'step', target: '1_4', },
    { source: '1_2', type: 'step', target: '1_5', },
    { source: '1_2', type: 'step', target: '1_6', },
    { source: '1_2', type: 'step', target: '1_7', },
    { source: '1_2', type: 'step', target: '1_8', },
    { source: '1_2', type: 'step', target: '1_9', },
    { source: '1_2', type: 'step', target: '1_10', },
    { source: '1_2', type: 'step', target: '1_11', },
    { source: '1_2', type: 'step', target: '1_12', },
    { source: '1_2', type: 'step', target: '1_13', },
    { source: '1_2', type: 'step', target: '1_14', },
    { source: '1_2', type: 'step', target: '1_15', },
    { source: '1_2', type: 'step', target: '1_16', },
    { source: '1_2', type: 'step', target: '1_17', },
    //第二列连线
    { source: '2_1', type: 'step', target: '7_2', },
    { source: '2_2', type: 'step', target: '2_3', },
    { source: '2_2', type: 'step', target: '2_4', },
    { source: '2_2', type: 'step', target: '2_5', },
    { source: '2_2', type: 'step', target: '2_6', },
    { source: '2_2', type: 'step', target: '2_7', },
    { source: '2_2', type: 'step', target: '2_8', },
    { source: '2_2', type: 'step', target: '2_9', },
    //第三列连线
    { source: '3_1', type: 'step', target: '7_3', },
    { source: '3_2', type: 'step', target: '3_3', },
    { source: '3_2', type: 'step', target: '3_4', },
    { source: '3_2', type: 'step', target: '3_5', },
    { source: '3_2', type: 'step', target: '3_6', },
    { source: '3_2', type: 'step', target: '3_7', },
    { source: '3_2', type: 'step', target: '3_8', },
    //第四列连线
    { source: '4_1', type: 'step', target: '7_4', },
    { source: '4_2', type: 'step', target: '4_3', },
    { source: '4_2', type: 'step', target: '4_4', },
    { source: '4_2', type: 'step', target: '4_5', },
    { source: '4_2', type: 'step', target: '4_6', },
    { source: '4_2', type: 'step', target: '4_7', },
    { source: '4_2', type: 'step', target: '4_8', },
    //第五列连线
    { source: '5_1', type: 'step', target: '7_5', },
    { source: '5_2', type: 'step', target: '5_3', },
    { source: '5_2', type: 'step', target: '5_4', },
    { source: '5_2', type: 'step', target: '5_5', },
    { source: '5_2', type: 'step', target: '5_6', },
    { source: '5_2', type: 'step', target: '5_7', },
    { source: '5_2', type: 'step', target: '5_8', },
    //第六列连线
    { source: '6_1', type: 'step', target: '7_6', },
    { source: '6_2', type: 'step', target: '6_3', },
    { source: '6_2', type: 'step', target: '6_4', },
    { source: '6_2', type: 'step', target: '6_5', },
    { source: '6_2', type: 'step', target: '6_6', },
    { source: '6_2', type: 'step', target: '6_7', },
    { source: '6_2', type: 'step', target: '6_8', },
    { source: '6_2', type: 'step', target: '6_9', },
    { source: '6_2', type: 'step', target: '6_10', },
    { source: '6_2', type: 'step', target: '6_11', },
    { source: '6_2', type: 'step', target: '6_12', },
    { source: '6_2', type: 'step', target: '6_13', },
    { source: '6_2', type: 'step', target: '6_14', },
    { source: '6_2', type: 'step', target: '6_15', },
    { source: '6_2', type: 'step', target: '6_16', },
    { source: '6_2', type: 'step', target: '6_17', },
  ];


  // 给框框增加统一样式等,
  const elementData = initialElements?.map(item => (
    {
      ...item,
      type: 'input',
      style: {
        background: item?.value === '-1' ? '#C0C0C0' : "--",
        color: '#000',
        // border: '1px solid #C0C0C0',
        width: item.value === "-1" ? "14%" : "8%",
        height: item.value === "-1" ? "7%" : "5%",
        lineHeight: item.value === "-1" ? "7%" : "5%",

        fontSize: item.value === "-1" ? 16 : 14,
        textAlign: "center",

      },
      className: styles.node,
      paneMoveable: false,
      draggable: false,
    }
  ))

  // ************** */ 添加连接线
  // 将connect数组拆分散开
  // const connectData = [];
  // for (let i = 0; i < data.length; i++) {
  //   for (let j = 0; j < data[i]?.connect?.length; j++) {
  //     connectData.push({
  //       source: data[i].id,
  //       target: data[i].connect[j].id,
  //       // label: data[i].connect[j].label,
  //       // value: data[i].connect[j].value,
  //     })
  //   }
  // }
  //对线条进行样式处理
  const connectLine = initialConnectLine.map((item, index) => ({
    ...item,
    id: "line" + `${index}`,
    // type: 'step',
    style: {
      stroke: '#d9d9d9'
    },
    // animated: item.value === '0',
    // arrowHeadType: 'arrowclosed',
    // labelStyle: {
    //   fill: '#fff',
    //   fontWeight: 700,
    // },
    // labelBgStyle: { fill: '#31343F', color: '#fff', fillOpacity: 0.7 },
  }))
  const elements = elementData.concat(connectLine);


  return (
    <GridContent >
      <React.Fragment>
        <div style={{ height: 400, width: 765, textAlign: "center" }}>
          <ReactFlowProvider>
            <ReactFlow
              elements={elements}
              minZoom={1}
              maxZoom={1}
              defaultZoom={1}
              paneMoveable={false}
            >
            </ReactFlow>
          </ReactFlowProvider>
        </div >
      </React.Fragment>
    </GridContent >

    // <ReactFlowProvider>
    //   <ReactFlow
    //   <div style={{ height: 400, }}>
    //     elements={elements}
    //     minZoom={1}
    //     maxZoom={1}
    //     defaultZoom={1}
    //     paneMoveable={false}
    //   >
    //   </div>
    //     {/* <Background color="#aaa" gap={16} /> */}
    //   </ReactFlow>
    // </ReactFlowProvider>

  );
};

export default FlowChart;