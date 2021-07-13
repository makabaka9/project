import { Button, Result, Descriptions } from 'antd';
import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import moment from 'moment';
import { Link } from 'dva/router';
import { StateType } from '../../model';
import styles from './index.less';

interface Step3Props {
  // data?: StateType['step'];
  data?: {
    orderID: string;
    clientCompany: string;
    clientAgent: string;
    clientPhone: string;
    // clientDate: string;
    submitTime: string;
  };
  dispatch?: Dispatch<any>;
}

const Step3: React.FC<Step3Props> = props => {
  const { data, dispatch } = props;
  if (!data) {
    return null;
  }
  const onFinish = () => {
    if (dispatch) {
      dispatch({
        type: 'SubmitProcess/saveCurrentStep',
        payload: 'select',
      });
    }
  };

  const { orderID, clientCompany, clientAgent, clientPhone, submitTime } = data;
  // const clientDateMoment = moment(clientDate).format('YYYY-MM-DD');
  const information = (
    <div className={styles.information}>
      <Descriptions column={1}>
        <Descriptions.Item label="委托单号"> {orderID}</Descriptions.Item>
        <Descriptions.Item label="委托单位"> {clientCompany}</Descriptions.Item>
        <Descriptions.Item label="委托代理人"> {clientAgent}</Descriptions.Item>
        {/* <Descriptions.Item label="送检日期"> {clientDateMoment}</Descriptions.Item> */}
        <Descriptions.Item label="联系电话">{clientPhone} </Descriptions.Item>
        <Descriptions.Item label="提交日期">
          {moment(submitTime).format('YYYY-MM-DD HH:mm:ss')}{' '}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
  const extra = (
    <>
      <Link to="./OrderList">
        <Button type="primary" onClick={onFinish}>
          查看委托单
        </Button>
      </Link>
      {/* <Button type="primary" onClick={onFinish}>
      委托单
      </Button> */}
    </>
  );
  return (
    <Result
      status="success"
      title="提交成功"
      // subTitle="预计两小时内到账"
      extra={extra}
      className={styles.result}
    >
      {information}
    </Result>
  );
};

export default connect(({ SubmitProcess }: { SubmitProcess: StateType }) => ({
  data: SubmitProcess.step,
}))(Step3);
