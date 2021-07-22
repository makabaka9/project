import React from 'react';
import { Descriptions, Card, Row, Typography, Radio } from 'antd';
// import { PrinterTwoTone } from '@ant-design/icons';
// import moment from 'moment';
// import ReactToPrint from 'react-to-print';
import styles from './style.less';
import { ProjectItemDataType } from '@/pages/Project/data';

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
  constructor(props: { data: ProjectItemDataType }) {
    super(props);
    this.state = { data: [] };
  }

  render() {
    const {
      projectID,
      projectManager,
      projectCompany,
      projectName,
      projectCategory,
      projectStartTime,
      projectEndTime,
      projectBudget,
      projectOutsource,
      projectIntroduction,
      projectResearchContent,
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
              </Typography.Title>
              {/* <p>中车株洲电力机车有限公司试验检测工程中心计量理化部</p> */}
            </div>
          }
        >
          <Row >
            {/* gutter={16} */}
            <Descriptions>
              <Descriptions.Item label="项目负责人">{projectManager}</Descriptions.Item>
              <Descriptions.Item label="单位">{projectCompany}</Descriptions.Item>
              <Descriptions.Item label="项目名称">{projectName}</Descriptions.Item>
              <Descriptions.Item label="项目类别">{projectCategory}</Descriptions.Item>
              <Descriptions.Item label="项目开始时间">{projectStartTime}</Descriptions.Item>
              <Descriptions.Item label="项目结束时间">{projectEndTime}</Descriptions.Item>
              {/* <Descriptions.Item label="项目开始时间">
                {projectStartTime ? moment(projectStartTime).format('YYYY-MM-DD') : null}
              </Descriptions.Item>
              <Descriptions.Item label="项目结束时间">
                {projectEndTime ? moment(projectEndTime).format('YYYY-MM-DD') : null}
              </Descriptions.Item> */}
              <Descriptions.Item label="项目经费预算">{projectBudget}万元</Descriptions.Item>
              <Descriptions.Item label="是否委外">
                <Radio.Group defaultValue={projectOutsource} disabled>
                  <Radio value={"是"}>是</Radio>
                  <Radio value={"否"}>否</Radio>
                </Radio.Group></Descriptions.Item>

              {/* <Descriptions.Item label="项目简介">{projectIntroduction}</Descriptions.Item>
              <Descriptions.Item label="研究内容">{projectResearchContent}</Descriptions.Item> */}
            </Descriptions>
          </Row>
        </Card>
      </div>
      // </Form>
    );
  }
}
export default ComponentToPrint;
