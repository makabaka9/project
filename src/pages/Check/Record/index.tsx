import React, { useState, useEffect } from 'react';
import { Card, Steps } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { StateType } from './model';
import Step0 from './components/Step0';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import styles from './style.less';

const { Step } = Steps;

interface RecordProps {
  current: StateType['current'];
}

const getCurrentStepAndComponent = (current?: string) => {
  switch (current) {
    case 'confirm':
      return { step: 2, component: <Step2 /> };
    case 'result':
      return { step: 3, component: <Step3 /> };
    case 'info':
      return { step: 1, component: <Step1 /> };
    default:
    case 'select':
      return { step: 0, component: <Step0 /> };
  }
};

const Record: React.FC<RecordProps> = ({ current }) => {
  const [stepComponent, setStepComponent] = useState<React.ReactNode>(<Step0 />);
  const [currentStep, setCurrentStep] = useState<number>(0);

  useEffect(() => {
    const { step, component } = getCurrentStepAndComponent(current);
    setCurrentStep(step);
    setStepComponent(component);
  }, [current]);

  return (
    <PageHeaderWrapper content="金相检测原始数据录入">
      <Card bordered={false}>
        <>
          <Steps current={currentStep} className={styles.steps}>
            <Step title="浏览检测单" />
            <Step title="填写检测单" />
            <Step title="确认检测单信息" />
            <Step title="完成" />
          </Steps>
          {stepComponent}
        </>
      </Card>
    </PageHeaderWrapper>
  );
};

export default connect(({ checkAndRecord }: { checkAndRecord: StateType }) => ({
  current: checkAndRecord.current,
}))(Record);
