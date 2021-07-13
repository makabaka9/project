import { Steps } from 'antd';
import React from 'react';
import moment from 'moment';

const { Step } = Steps;

interface OrderWorkFlowStepProps {
  data: {
    submitTime?: number;
    taskAssignTime?: number;
    processFinishTime?: number;
    testAssignTime?: number;
    reviewTime?: number;
    finishTime?: number;
    flowStep?: number;
  };
}

const OrderWorkFlowStep: React.FC<OrderWorkFlowStepProps> = ({ data }) => {
  if (typeof data === 'undefined') {
    return null;
  }
  return (
    <div>
      <Steps progressDot current={data.flowStep} direction="vertical">
        <Step
          title="送检"
          description={
            data.submitTime ? moment(data.submitTime).format('YYYY-MM-DD HH:mm:ss') : null
          }
        />
        <Step
          title="分派"
          description={
            data.taskAssignTime ? moment(data.taskAssignTime).format('YYYY-MM-DD HH:mm:ss') : null
          }
        />
        <Step
          title="加工"
          description={
            data.processFinishTime
              ? moment(data.processFinishTime).format('YYYY-MM-DD HH:mm:ss')
              : null
          }
        />
        <Step
          title="检测"
          description={
            data.testAssignTime ? moment(data.testAssignTime).format('YYYY-MM-DD HH:mm:ss') : null
          }
        />
        <Step
          title="审核"
          description={
            data.reviewTime ? moment(data.reviewTime).format('YYYY-MM-DD HH:mm:ss') : null
          }
        />
        <Step
          title="完成"
          description={
            data.finishTime ? moment(data.finishTime).format('YYYY-MM-DD HH:mm:ss') : null
          }
        />
      </Steps>
    </div>
  );
};

export default OrderWorkFlowStep;
