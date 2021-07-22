import React, { useState, useEffect } from 'react';
import { Card, Steps, Tabs } from 'antd';
import { connect } from 'dva';
import { StateType } from './model';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import styles from './style.less';
import Nav from '@/pages/Project/components/Bread';

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
  /**useState hook const [变量名,修改变量值的方法setNum(新值) 作用:用新值替换num旧值] = useState(变量初始值)
   * hook语句不能放在条件判断语句之内
   * useEffect(callback,array)
   * callback函数 代表componentDidMount和代表componentDidUpdate 挂载更新
   * array存放的是需要检测变化的变量值 不写useEffect就是检测页面所有值变化
   * callback有return函数时,代表componentWillUnmount卸载阶段
   */
  useEffect(() => {
    const { step, component } = getCurrentStepAndComponent(current);
    setCurrentStep(step);//step传入currentStep
    setStepComponent(component);//component传入stepComponent
  }, [current]);
  return (
    <>
      < Nav />
      <Card bordered={false}>

        <Steps current={currentStep} className={styles.steps}>
          <Step title="申请立项" />
          <Step title="确认信息" />
          <Step title="完成" />
        </Steps>
        {stepComponent}

      </Card>
    </>
  );
};

export default connect(({ SubmitProcess }: { SubmitProcess: StateType }) => ({
  current: SubmitProcess.current,
}))(Submit);
/**
 * connect 连接器 高阶函数export default connect(状态映射,事件派发映射)(组件名称)
 *
 * connect包裹返回的也是一个 React 组件，通常称为容器组件。因为它是原始 UI 组件的容器，即在外面包了一层 State。
 * connect的主要作用是连接React组件与Redux Store,当前组件可以通过props获取应用中的state和Actions。
 * connect常用的两个参数：mapStateToProps()、mapDispatchToProps()
 * 在mapStateToProps()中,选取___中的current参数作为当前组件的current 提交进度
 * 状态映射 建立 State 到 Props 的映射关系
 * ---------------------------------------------------------------------------
 * ,dispatch =>({ cartActions: bindActionCreators(cartActions,dispatch)})视频p55
 * 在mapDispatchToProps()中，使用Redux提供的工具方法将cartActions与dispatch绑定，最后在组件中使用this.props.cartActions。
 */