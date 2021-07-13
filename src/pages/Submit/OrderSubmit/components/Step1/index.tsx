import React, { useRef, useState } from 'react';
import { Form, Button, Divider, message } from 'antd';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { StateType } from '../../model';
import FillProjectApply from '../FillProjectApply';
import styles from './index.less';
import { PlusOutlined } from '@ant-design/icons';
import CreateForm from '@/pages/File/components/CreateForm';
import { TableListItem } from '@/pages/File/data';
import { addRule } from '@/pages/File/service';
import { ActionType } from '@ant-design/pro-table';

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

    if (dispatch) {//通过dispatch来派发action
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
        <FillProjectApply />

        <div className={styles.centerButton}>
          <Button type="primary" onClick={onValidateForm}>
            下一步
          </Button>
        </div>
      </Form>
      <Divider style={{ margin: '40px 0 24px' }} />
    </>
  );
};

export default connect(({ SubmitProcess }: { SubmitProcess: StateType }) => ({
  data: SubmitProcess.step,
}))(Step1);
