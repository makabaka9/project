import React from 'react';
import { Form, Button, Divider } from 'antd';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { StateType } from '../../model';
import FillPlan from '../FillCalibrationTest';
import styles from './index.less';

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};
interface Step1Props {
  data?: StateType['step'];
  dispatch?: Dispatch<any>;
}

const Step1: React.FC<Step1Props> = props => {
  const { dispatch, data } = props;
  const [form] = Form.useForm();

  if (!data) {
    return null;
  }

  const { validateFields } = form;
  const onValidateForm = async () => {
    const values = await validateFields();
    // values.clientDate.toString();
    // String(values.clientDate);
    // values.clientDate=""+values.clientDate;
    // values.clientDate.toString();

    if (dispatch) {
      dispatch({
        type: 'SubmitProcess/saveStepFormData',
        payload: values,
      });
      dispatch({
        type: 'SubmitProcess/saveCurrentStep',
        payload: 'confirm',
      });
    }
  };
  return (
    <>
      <Form
        {...formItemLayout}
        form={form}
        layout="horizontal"
        hideRequiredMark
        initialValues={data}
      >
      </Form>
      <Divider style={{ margin: '40px 0 24px' }} />
    </>
  );
};

export default connect(({ SubmitProcess }: { SubmitProcess: StateType }) => ({
  data: SubmitProcess.step,
}))(Step1);
