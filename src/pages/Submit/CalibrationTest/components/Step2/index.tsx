import React from 'react';
import { Form, Alert, Button } from 'antd';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import DetailCalibrationTest from '@/components/DetailCalibrationTest';
import { StateType } from '../../model';
// import { CurrentUser } from '@/models/user';
import styles from './index.less';

interface Step2Props {
  data?: StateType['step'];
  dispatch?: Dispatch<any>;
  submitting?: boolean;
  orderID?: string;
}

const Step2: React.FC<Step2Props> = props => {
  const [form] = Form.useForm();

  function getNowFormatDate() {
    const day = new Date();
    let Year = 0;
    let Month = 0;
    let Day = 0;
    let CurrentDate = '';
    Year = day.getFullYear();
    Month = day.getMonth() + 1;
    Day = day.getDate();
    CurrentDate += Year;
    if (Month >= 10) {
      CurrentDate += Month;
    } else {
      CurrentDate += `0${Month}`;
    }
    if (Day >= 10) {
      CurrentDate += Day;
    } else {
      CurrentDate += `0${Day}`;
    }
    return CurrentDate;
  }

  const { data, dispatch, submitting } = props;
  if (!data) {
    return null;
  }
  const { validateFields, getFieldsValue } = form;
  const onPrev = () => {
    if (dispatch) {
      const values = getFieldsValue();
      dispatch({
        type: 'SubmitProcess/saveStepFormData',
        payload: {
          ...data,
          ...values,
        },
      });
      dispatch({
        type: 'SubmitProcess/saveCurrentStep',
        payload: 'info',
      });
    }
  };

  const onValidateForm = async () => {
    // data(orderID)
    const orderID = getNowFormatDate() + Math.floor(Math.random() * 10000);
    data.orderID = orderID;
    const values = await validateFields();
    // if (dispatch) {
    //   dispatch({
    //     type: 'SubmitProcess/fetchCurrentUser',
    //     payload: {},
    //   });
    // }
    if (dispatch) {
      dispatch({
        type: 'SubmitProcess/submitStepForm',
        payload: {
          ...data,
          ...values,
        },
      });
    }
  };

  return (
    <Form
      form={form}
      layout="horizontal"
      // className={styles.centerButton}
    >
      <Alert closable showIcon message="确认提交后，将无法撤回。" style={{ marginBottom: 24 }} />
      <div>
        <DetailCalibrationTest data={data} />
      </div>
      <div className={styles.centerButton}>
        <Button type="primary" onClick={onValidateForm} loading={submitting}>
          提交
        </Button>
        <Button onClick={onPrev} style={{ marginLeft: 8 }}>
          上一步
        </Button>
      </div>
    </Form>
  );
};
export default connect(
  ({
    SubmitProcess,
    loading,
  }: {
    SubmitProcess: StateType;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    submitting: loading.effects['SubmitProcess/submitStepForm'],
    data: SubmitProcess.step,
  }),
)(Step2);
