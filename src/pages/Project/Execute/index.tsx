import React, { useEffect } from 'react';
import { Button, Card, Col, Form, Input, Row, Typography, Upload } from 'antd';
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
import { Link } from 'dva/router';

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
const ProjectExecute: React.FC<OrderProps> = (props) => {
  const {
    match,
    dispatch,
    Project: { project, submit },
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
    console.log(submit)
  };
  const columns = [
    {
      title: '序号',
      dataIndex: "key",
      render: (text: any, record: any, index: number) => `${index + 1}`,
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
        style={{ marginTop: 12 }}
        bordered={false}
        bodyStyle={{ padding: '8px 32px 32px 32px' }}>
        <Form
          form={form}
          layout="horizontal">
          <Row>
            <Col >
              <Form.Item
                label={fieldLabels.projectFunds}
                name="projectFunds"
                rules={[{ required: true, message: '请输入项目实际使用费用' }]}
              >
                {/* <TextArea /> */}
                <Input placeholder="万元" />
              </Form.Item>
            </Col>
            <Col >
              <Form.Item
                label={fieldLabels.abnormalInstruction}
                name="abnormalInstruction"
              //rules={[{ required: true, message: '请输入项目简介' }]}
              >
                <TextArea />
              </Form.Item>
            </Col>
            <Button type="primary" onClick={onValidateForm}>
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
    loading: {
      models: { [key: string]: boolean }
    };
    user: { currentUser: CurrentUser };
    projectID: string;
  }) => ({
    Project,
    loading: loading.models.Project,
    usercode: user.currentUser.usercode,
    projectID: Project.projectID,
  }),
)(ProjectExecute);
