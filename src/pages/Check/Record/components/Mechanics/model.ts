import { AnyAction } from 'redux';
import { EffectsCommandMap } from 'dva';
import { message } from 'antd';
import { submitForm } from './service';

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: {}) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: {};
  effects: {
    submitAdvancedForm: Effect;
  };
}

const Model: ModelType = {
  namespace: 'formAdvancedFormTwo',

  state: {},

  effects: {
    *submitAdvancedForm({ payload }, { call }) {
      yield call(submitForm, payload);
      message.success('提交成功');
    },
  },
};

export default Model;
