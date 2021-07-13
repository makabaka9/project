import React, { useState, useEffect } from 'react';
import { Card, Steps, Tabs } from 'antd';
import { connect } from 'dva';
import { StateType } from './model';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import styles from './style.less';

const { Step } = Steps;
interface SubmitProps {
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

const Submit: React.FC<SubmitProps> = ({ current }) => {//无状态组件,不需要管理内部state
  const [stepComponent, setStepComponent] = useState<React.ReactNode>(<Step1 />);
  const [currentStep, setCurrentStep] = useState<number>(0);

  useEffect(() => {
    const { step, component } = getCurrentStepAndComponent(current);
    setCurrentStep(step);
    setStepComponent(component);
  }, [current]);
const { TabPane } = Tabs;
function callback(key) {
    console.log(key);
  }
  return (
        <Card bordered={false}>
            <>
              <Steps current={currentStep} className={styles.steps}>
                <Step title="申请立项" />
                <Step title="确认信息" />
                <Step title="完成" />
              </Steps>
              {stepComponent}
            </>
          </Card>
  );
};

export default connect(({ SubmitProcess }: { SubmitProcess: StateType }) => ({
  current: SubmitProcess.current,
}))(Submit);
