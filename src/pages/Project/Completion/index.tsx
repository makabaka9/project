import React, { useEffect } from 'react';
import { Button, Card, Col, Form, Input, Row, Space, Typography, Upload } from 'antd';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import DetailProject from '@/components/DetailProject';
import { CurrentUser } from '@/models/user';
import { StateType } from '.././model';
import { ProjectItemDataType } from '.././data.d';
import Nav from '@/pages/Project/components/Bread';
import { UploadOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';
import ProTable from '@ant-design/pro-table';
import styles from '.././style.less';

interface OrderProps {
  match: {
    url: string;
    path: string;
    params: any;
  };
  dispatch: Dispatch<any>;
  Project: StateType;
  usercode: string;
  projectID: string;
  project: ProjectItemDataType;
}
const fieldLabels = {
  projectFunds: "项目实际使用",
  abnormalInstruction: "项目异常使用说明"
};
const tabledata = [
  {
    assessment: '发明专利',
    num: 0,
  },
  {
    assessment: '软件著作权',
    num: 0,
  },
  {
    assessment: '发表论文',
    num: 0,
  },
  {
    assessment: '制定标准',
    num: 0,
  },
  {
    assessment: '其他',
    num: 0,
  },
];
// const props = {
//   name: 'file',//发到后台的文件参数名
//   action: './upload.do',//后台接口地址 上传的地址
//   // headers: {
//   //   authorization: 'authorization-text',
//   // },
//   onChange(info) {
//     if (info.file.status !== 'uploading') {
//       console.log(info.file, info.fileList);
//     }
//     if (info.file.status === 'done') {
//       message.success(`${info.file.name} 文件上传成功`);
//     } else if (info.file.status === 'error') {
//       message.error(`${info.file.name} 文件上传失败`);
//     }
//   },
// };
const ProjectCompletion: React.FC<OrderProps> = (props) => {
  const {
    match,
    dispatch,
    Project: { project },
  } = props;
  useEffect(() => {
    dispatch({
      type: 'Project/fetchById',
      payload: {
        projectID: match.params.id,
      },
    });
  }, []);
  const [form] = Form.useForm();
  const { validateFields, getFieldsValue } = form;
  const onValidateForm = async () => {
    console.log("onValidateForm")
    //const values1 = await validateFields();
    const values = await getFieldsValue();
    if (dispatch) {
      dispatch({
        type: 'Project/submitStepForm',
        payload: {
          projectID: project.projectID,
          //projectFunds: await validateFields(),
          //abnormalInstruction: await getFieldsValue(),
          ...values,

        },
      });
    }
  };
  const columns = [
    {
      title: '序号',
      dataIndex: "key",
      render: (text, record, index: number) => `${index + 1}`,
    },
    {
      title: '考核指标',
      dataIndex: 'assessment',
    },
    {
      title: '完成情况(项)',
      dataIndex: 'num',
      //valueType: 'option',
      // render: (_, record) => (
      //   getInput(record)
      //   // < Link to = "/OrderSubmit/ContractSign" > { record.projectProgress }合同签署</Link >
      // ),
    },
    {
      title: '附件(上传证明材料)',
      dataIndex: '',//格式
      valueType: "option",
      render: (_, record) => (
        <>
          <Row>
            <Upload {...props}>
              <Button icon={<UploadOutlined />} size={'small'} type="primary">
                选择文件
              </Button>
            </Upload>
          </Row>
          {/* <a href="">订阅警报</a> */}
        </>
      ),
    },
  ];
  return (
    <>
      <Nav />
      <Card
        style={{ marginTop: 12 }}
        bordered={false}
        bodyStyle={{ padding: '8px 8px 8px 8px' }}>
        <DetailProject data={project} />
      </Card>
      <Card
        bordered={false}
        style={{ marginTop: 12 }}
        bodyStyle={{ padding: '8px 32px 8px 32px' }}
        title={
          <div>
            <Typography.Title level={4}>
              项目成果填报
            </Typography.Title>
          </div>
        }
      >
        <ProTable
          toolBarRender={false}
          search={false}
          pagination={false}
          size={'small'}
          columns={columns}
          dataSource={tabledata} />
      </Card>
      <Card
        bordered={false}
        style={{ marginTop: 12 }}
        bodyStyle={{ padding: '8px 32px 8px 32px' }}
        title={
          <div>
            <Typography.Title level={4}>
              经费使用说明
            </Typography.Title>
          </div>
        }
      >
        <Row >
          <Col span={2}>
            <label >项目实际使用:</label>
          </Col>
          <Col span={8}>
            <Input placeholder="万元" value={project.projectFunds} disabled />
          </Col>


        </Row>

      </Card>
      <Card
        style={{ marginTop: 12 }}
        bordered={false}
        bodyStyle={{ padding: '8px 32px 32px 32px' }}>
        <Form
          form={form}
          layout="horizontal">
          <Row>
            <Col lg={8} md={12} sm={24}>
              <Form.Item
                label="项目结题简介"
                name="projectResearchContent"
                rules={[{ required: true, message: '请输入项目结题简介' }]}
              >
                <TextArea placeholder="(字数300字以内)" rows={4} showCount maxLength={300} className={styles.context} />
              </Form.Item>
            </Col>

          </Row>
          <Row gutter={0}>
            <label htmlFor="completion">上传自结题 </label>
            <Col span={'8'}>
              <Upload {...props} maxCount={1} className="upload-list-inline">

                <Button icon={<UploadOutlined />} type="primary" id="completion">
                  选择文件
                </Button>
              </Upload>
            </Col>
            <label htmlFor="completion">上传其他材料 </label>
            <Col span={'8'}>
              <Upload {...props}>
                上传其他材料
                <Button icon={<UploadOutlined />} type="primary">
                  上传文件
                </Button>
              </Upload>
            </Col>

          </Row>
          <Row>
            <Button type="primary" onClick={onValidateForm} size={'large'}>
              提交
            </Button>
          </Row>

        </Form>

      </Card>
    </>
  );
};

export default connect(
  ({
    Project,
    loading,
    user,
  }: {
    Project: StateType;
    loading: { models: { [key: string]: boolean } };
    user: { currentUser: CurrentUser };
    projectID: string;
  }) => ({
    Project,
    loading: loading.models.Project,
    usercode: user.currentUser.usercode,
    projectID: Project.projectID,
  }),
)(ProjectCompletion);
