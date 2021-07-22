import React, { useEffect } from 'react';
import { Button, Card, Col, message, Row, Typography, Upload } from 'antd';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import DetailProject from '@/components/DetailProject';
import { CurrentUser } from '@/models/user';
import { StateType } from '.././model';
import { ProjectItemDataType } from '../data.d';
import Nav from '@/pages/Project/components/Bread';
import { UploadOutlined } from '@ant-design/icons';

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
const props = {
  name: 'file',
  action: './upload.do',//后台接口地址
  // headers: {
  //   authorization: 'authorization-text',
  // },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 文件上传成功`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 文件上传失败`);
    }
  },
};
const ContractSign: React.FC<OrderProps> = (props) => {
  const {
    match,
    dispatch,
    Project: { project },
  } = props;
  // const [ID, setProjectID] = useState(match.params.id === ":id" ? project : match.params.id);
  useEffect(() => {
    dispatch({
      type: 'Project/fetchById',
      payload: {
        projectID: match.params.id,
      },
    });
  }, []);
  const onValidateForm = async () => {
    // data(projectID)
    // data.projectID = projectID;
    // const values = await validateFields();
    // if (dispatch) {
    //   dispatch({
    //     type: 'SubmitProcess/submitStepForm',
    //     payload: {
    //       ...data,
    //       ...values,
    //     },
    //   });
    // }
  };
  return (
    <>
      <Nav />
      <Card
        style={{ marginTop: 12 }}
        bordered={false}
        bodyStyle={{ padding: '8px 32px 32px 32px' }}
      >
        <DetailProject data={project} />
      </Card>
      <Card
        bordered={false}
        style={{ marginTop: 12 }}
        bodyStyle={{ padding: '8px 32px 32px 32px' }}
        title={
          <div>
            <Typography.Title level={4}>
              需上传的材料
            </Typography.Title>
          </div>
        }
      >
        <Row gutter={0}>
          <Col span={8} >
            <Upload {...props} maxCount={1} className="upload-list-inline">
              上传项目合同
              <Button icon={<UploadOutlined />} type="primary">
                上传文件
              </Button>
            </Upload>
          </Col>
          <Col span={8}>
            <Upload {...props}>
              上传委外合同
              <Button icon={<UploadOutlined />} type="primary">
                上传文件
              </Button>
            </Upload>
          </Col>
          <Col >
            <Button type="primary" onClick={onValidateForm} >
              {/*  */}
              提交
            </Button>
          </Col>

        </Row>
      </Card>
    </>
  );
};
export default connect(
  ({
    Project,
    loading,
    user,
    projectID,
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
)(ContractSign);
