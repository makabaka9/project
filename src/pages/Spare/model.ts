import { Effect } from 'umi';
import { message } from 'antd';
import { fakeSubmitForm } from './service';

export interface ModelType {
  namespace: string;
  state: {};
  effects: {
    submitAdvancedForm: Effect;
  };
}

const Model: ModelType = {
  namespace: 'spare',

  state: {},

  effects: {
    *submitAdvancedForm({ payload }, { call }) {
      yield call(fakeSubmitForm, payload);
      message.success('ζδΊ€ζε');
    },
  },
};

export default Model;
