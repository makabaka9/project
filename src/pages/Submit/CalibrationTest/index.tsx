import React, { useState, useEffect, Dispatch } from 'react';
import { Card, Divider, Form, Steps } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { StateType } from './model';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import styles from './style.less';
import FillPlan from './components/FillCalibrationTest';

const { Step } = Steps;//ant design获取step组件
interface SubmitProps {//接口 定义提交参数?类型
  current: StateType['current'];
}

const getCurrentStepAndComponent = (current?: string) => {
  switch (current) {
    case 'confirm':
      return { step: 1, component: <Step2 /> };
    case 'result':
      return { step: 2, component: <Step3 /> };
    case 'info':
    default:
      return { step: 0, component: <Step1 /> };
  }
};

const Submit: React.FC<SubmitProps> = ({ current }) => {
  const [stepComponent, setStepComponent] = useState<React.ReactNode>(<Step1 />);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [form] = Form.useForm();
  //const { dispatch, data } = current;
  useEffect(() => {
    const { step, component } = getCurrentStepAndComponent(current);
    setCurrentStep(step);
    setStepComponent(component);
  }, [current]);
  interface Step1Props {
    data?: StateType['step'];
    dispatch?: Dispatch<any>;//派遣
  }

    const formItemLayout = {
      labelCol: {
        span: 5,
      },
      wrapperCol: {
        span: 19,
      },
    };
  return (
    <PageHeaderWrapper
    // content="将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。"
    >
        <>
        <Form
        
        {...formItemLayout}
        form={form}
        layout="horizontal"
        hideRequiredMark
        //initialValues={data}
      >
          <Steps current={currentStep} className={styles.steps} direction="vertical">
            <Step title="计划阶段" description={<FillPlan/>}/>
            <Step title="技术文件准备阶段" />
            <Step title="采购阶段" />
          </Steps>
          {stepComponent}
          </Form>
      <Divider style={{ margin: '40px 0 24px' }} />
        </>
    </PageHeaderWrapper>
  );
};

export default connect(({ Submit }: { Submit: StateType }) => ({
  current: Submit.current,
}))(Submit);
