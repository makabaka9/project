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
    submitTime: Date;
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

  //const { orderID, clientCompany, clientAgent, clientPhone, submitTime } = data;
  // const clientDateMoment = moment(clientDate).format('YYYY-MM-DD');
  // const information = (
  //   <div className={styles.information}>
  //     <Descriptions column={1}>
  //       <Descriptions.Item label="项目编号"> {orderID}</Descriptions.Item>
  //       <Descriptions.Item label="负责单位"> {clientCompany}</Descriptions.Item>
  //       <Descriptions.Item label="项目负责人"> {clientAgent}</Descriptions.Item>
  //       {/* <Descriptions.Item label="送检日期"> {clientDateMoment}</Descriptions.Item> */}
  //       <Descriptions.Item label="联系电话">{clientPhone} </Descriptions.Item>
  //       <Descriptions.Item label="提交日期">
  //         {moment(submitTime).format('YYYY-MM-DD HH:mm:ss')}{' '}
  //       </Descriptions.Item>
  //     </Descriptions>
  //   </div>
  // );
  const extra = (
    <>
      <Link to="/ProjectHome">
        <Button type="primary" onClick={onFinish}>
          查看项目
        </Button>
      </Link>
      {/**
       * Link是react-router中用于路由相互跳转。其本质就是一个被处理过的<a>标签，它可以接收Router的状态。
       * Link可以知道哪个Route的链接是激活状态，并可以为该链接添加actionClassName或activeStyle属性。
       * 这就使得当用户在Tab切换的时候，可以方便地设置激活时的样式展示。
       * <Link to="./OrderList"  activeStyle = {{color:'red'}}   activeClassName = "active">  </Link>
       * 如果链接到根路由"/"，要使用<IndexLink>。
       */}
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
      {/* {information} */}
    </Result>
  );
};

export default connect(({ SubmitProcess }: { SubmitProcess: StateType }) => ({
  data: SubmitProcess.step,
}))(Step3);
