import React from 'react';
import { Descriptions, Card, Row, Divider, Tag, Typography } from 'antd';
// import { PrinterTwoTone } from '@ant-design/icons';
// import moment from 'moment';
// import ReactToPrint from 'react-to-print';
import moment from 'moment';
import { ListItemDataType } from './data';
import styles from './style.less';

// const DetailPhysicalChemical = (props: { data: ListItemDataType }) => {
//   const componentRef = useRef(null);

//   const { data } = props;
//   if (!data) {
//     return null;
//   }
//   return (
//     <div>
//       <ReactToPrint
//         trigger={() => (
//           <Button type="primary" shape="round" ghost>
//             {' '}
//             <PrinterTwoTone style={{ fontSize: '24px', color: '#08c' }} />
//           </Button>
//         )}
//         content={() => componentRef.current}
//       />
//       <ComponentToPrint ref={componentRef} data={data} />
//     </div>
//   );
// };

class ComponentToPrint extends React.Component {
  constructor(props: { data: ListItemDataType }) {
    super(props);
    this.state = { data: [] };
  }

  render() {
    const {
      projectID,
      projectManager , 
      projectCompany,
      projectName,
      projectCategory,
      projectStartTime,
      projectEndTime,
      projectBudget,
      projectOutsource,
      projectIntroduction,
      projectResearchContent,

      physicalChemicalType,
      orderID,
      clientCompany,
      submitTime,
      clientAgent,
      clientPhone,
      clientAddress,
      sampleName,
      sampleMaterial,
      sampleModel,
      sampleNumber,
      sampleQuantity,
      sampleDraw,
      sampleState,
      sampleProcess,
      detectionMethod,
      processingMethod,
      processingRequire,
      completeTime,
      disposalMethod,
      chemicalComposition,
      Metallography,
      stretchingTest,
      bendingTest,
      bendingDiameter,
      impactTest,
      hardnessTest,
      springTest,
      gaps,
      impactTestTemperature,
      workLoad,
      gapsQuantity,
    } = this.props.data;
    return (
      <div
      // className={styles.page}
      >
        <Card
          bordered={false}
          title={
            <div>
              <Typography.Title level={4}>
                项目基本信息-{projectID}
                {this.state.data}
              </Typography.Title>
              {/* <p>中车株洲电力机车有限公司试验检测工程中心计量理化部</p> */}
            </div>
          }
        >
          <Row gutter={16}>
            {/* <Divider orientation="left">委托方信息</Divider> */}
            <Descriptions>
              <Descriptions.Item label="项目负责人">{projectManager}</Descriptions.Item>
              <Descriptions.Item label="单位">{projectCompany}</Descriptions.Item>
              <Descriptions.Item label="项目名称">{projectName}</Descriptions.Item>
              <Descriptions.Item label="项目类别">{projectCategory}</Descriptions.Item>
              <Descriptions.Item label="项目开始时间">{projectStartTime}</Descriptions.Item>
              <Descriptions.Item label="项目结束时间">{projectEndTime}</Descriptions.Item>
              <Descriptions.Item label="项目开始时间">
                {projectStartTime ? moment(projectStartTime).format('YYYY-MM-DD HH:mm:ss') : null}
              </Descriptions.Item>
              <Descriptions.Item label="项目结束时间">
                {projectEndTime ? moment(projectEndTime).format('YYYY-MM-DD HH:mm:ss') : null}
              </Descriptions.Item>
              <Descriptions.Item label="项目经费预算">{projectBudget}</Descriptions.Item>
              <Descriptions.Item label="是否委外">{projectOutsource}</Descriptions.Item>
              <Descriptions.Item label="项目简介">{projectIntroduction}</Descriptions.Item>
              <Descriptions.Item label="研究内容">{projectResearchContent}</Descriptions.Item>
              {/* <Descriptions.Item label="送检日期">
                {submitTime ? moment(submitTime).format('YYYY-MM-DD HH:mm:ss') : null}
              </Descriptions.Item>
              <Descriptions.Item label="委托方代理人">{clientAgent}</Descriptions.Item>
              <Descriptions.Item label="联系电话/传真">{clientPhone}</Descriptions.Item>
              <Descriptions.Item label="通信地址">{clientAddress}</Descriptions.Item> */}
            </Descriptions>
          </Row>
          {/* <Row gutter={16}>
            <Divider orientation="left">样品信息</Divider>
            <Descriptions>
              <Descriptions.Item label="样本名称">{sampleName}</Descriptions.Item>
              <Descriptions.Item label="样品编号">{sampleNumber}</Descriptions.Item>
              <Descriptions.Item label="数量">{sampleQuantity}</Descriptions.Item>
              <Descriptions.Item label="材质">{sampleMaterial}</Descriptions.Item>
              <Descriptions.Item label="规格型号">{sampleModel}</Descriptions.Item>
              <Descriptions.Item label="样品图号">{sampleDraw}</Descriptions.Item>
              <Descriptions.Item label="样品状态、外观">{sampleState}</Descriptions.Item>
              <Descriptions.Item label="样本制造工艺">{sampleProcess}</Descriptions.Item>
              <Descriptions.Item label="检测方法">{detectionMethod}</Descriptions.Item>
              <Descriptions.Item label="加工方法">{processingMethod}</Descriptions.Item>
              <Descriptions.Item label="加工特殊要求">{processingRequire}</Descriptions.Item>
              <Descriptions.Item label="完成时间">{completeTime}</Descriptions.Item>
              <Descriptions.Item label="检后样品处置方式">{disposalMethod}</Descriptions.Item>
            </Descriptions>
          </Row> */}
          {/* <Row>
            <Divider orientation="left">检测项目</Divider>
            <Descriptions>
              <Descriptions.Item label="化学成分检验">
                {...chemicalComposition &&
                  chemicalComposition.map(tag => <Tag key={tag}>{tag}</Tag>)}
              </Descriptions.Item>
              <Descriptions.Item label="金相检验">
                {...Metallography && Metallography.map(tag => <Tag key={tag}>{tag}</Tag>)}
              </Descriptions.Item>
            </Descriptions>
            <Descriptions>
              <Descriptions.Item label="拉伸试验">
                {...stretchingTest && stretchingTest.map(tag => <Tag key={tag}>{tag}</Tag>)}
              </Descriptions.Item>
              <Descriptions.Item label="弯曲试验">
                {bendingTest}
                {bendingTest && bendingTest.map(tag => <Tag key={tag}>{tag}</Tag>)}
                &emsp;
                <Descriptions.Item label="弯曲直径">{bendingDiameter}</Descriptions.Item>
              </Descriptions.Item>
              <Descriptions.Item label="冲击试验">
                {impactTest}
                &emsp;
                <Descriptions.Item label="温度">{impactTestTemperature}</Descriptions.Item>
              </Descriptions.Item>
              <Descriptions.Item label="硬度试验">
                {hardnessTest && hardnessTest.map(tag => <Tag key={tag}>{tag}</Tag>)}
              </Descriptions.Item>
              <Descriptions.Item label="弹簧测试">
                {springTest}
                {springTest && springTest.map(tag => <Tag key={tag}>{tag}</Tag>)}
                &emsp;
                <Descriptions.Item label="工作负载">{workLoad}</Descriptions.Item>
              </Descriptions.Item>
              <Descriptions.Item label="缺口类型及数量">
                {gaps}
                &emsp;
                <Descriptions.Item label="缺口数量">{gapsQuantity}</Descriptions.Item>
              </Descriptions.Item>
            </Descriptions>
          </Row> */}
        </Card>
      </div>
      // </Form>
    );
  }
}
export default ComponentToPrint;
