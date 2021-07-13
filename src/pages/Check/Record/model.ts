import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import {
  TestSubmitForm,
  queryTestOrderList,
  queryUserList,
  queryTestOrderListLength,
  queryIsTestedOrderList,
  queryIsRejectedOrderList,
} from './service';
import { ListItemDataType } from './data';

export interface StateType {
  current?: string;
  orderID?: string;
  step?: any;
  list?: ListItemDataType[];
  listLength?: number;
  testedList?: ListItemDataType[];
  rejectedList?: ListItemDataType[];
  rejectedLength?: number;
  selectedOrder?: ListItemDataType;
  user?: any[];
  isRevised?:boolean;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    submitStepForm: Effect;
    fetch: Effect;
    appendFetch: Effect;
    fetchUser: Effect;
    fetchTested: Effect;
    appendFetchTested: Effect;
    fetchRejected: Effect;
    appendFetchRejected: Effect;
    fetchListLength: Effect;
  };
  reducers: {
    saveStepFormData: Reducer<StateType>;
    saveCurrentStep: Reducer<StateType>;
    queryList: Reducer<StateType>;
    appendList: Reducer<StateType>;
    select: Reducer<StateType>;
    queryUser: Reducer<StateType>;
    listLength: Reducer<StateType>;
    queryTestedList: Reducer<StateType>;
    appendTestedList: Reducer<StateType>;
    queryRejectedList: Reducer<StateType>;
    appendRejectedList: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'checkAndRecord',

  state: {
    current: 'select',
    orderID: '',
    step: {
      testName: '',
      // metallographyTestPerson: '',
      testUsername: '',
      testUsercode: '',
      testRecordTemplate:'',
      testReviewer:'',
      testLocal: '',
      testTime: '',
      testBasis: [],
      judgeBasis: '',
      testDevice: [],
      testTemperature: '',
      testHumidity: '',
      testRecord: '',
      signature: '',
    },
    list: [],
    listLength: 0,
    testedList: [],
    rejectedList: [],
    rejectedLength: 0,
    user: [],
    // selectedOrder:[],
  },

  effects: {
    *submitStepForm({ payload }, { call, put }) {
      yield call(TestSubmitForm, payload);
      yield put({
        type: 'saveStepFormData',
        payload,
      });
      yield put({
        type: 'saveCurrentStep',
        payload: 'result',
      });
    },
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryTestOrderList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *fetchUser({ payload }, { call, put }) {
      const response = yield call(queryUserList, payload);
      yield put({
        type: 'queryUser',
        payload: response,
      });
    },
    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryTestOrderList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *fetchListLength({ payload }, { call, put }) {
      const response = yield call(queryTestOrderListLength, payload);
      yield put({
        type: 'listLength',
        payload: response,
      });
    },
    *fetchTested({ payload }, { call, put }) {
      const response = yield call(queryIsTestedOrderList, payload);
      yield put({
        type: 'queryTestedList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *appendFetchTested({ payload }, { call, put }) {
      const response = yield call(queryIsTestedOrderList, payload);
      yield put({
        type: 'appendTestedList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *fetchRejected({ payload }, { call, put }) {
      const response = yield call(queryIsRejectedOrderList, payload);
      console.log('responseshs', response);
      yield put({
        type: 'queryRejectedList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *appendFetchRejected({ payload }, { call, put }) {
      const response = yield call(queryIsRejectedOrderList, payload);
      yield put({
        type: 'appendRejectedList',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },

  reducers: {
    select(state, action) {
      return {
        ...state,
        orderID: action.payload.orderID,
        selectedOrder: action.payload.selectedOrder,
        isRevised:action.payload.isRevised,
        current: 'info',
      };
    },
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    appendList(state, action) {
      return {
        ...state,
        list: (state as StateType).list.concat(action.payload),
      };
    },
    listLength(state, action) {
      return {
        ...state,
        listLength: action.payload.listLength,
      };
    },
    queryTestedList(state, action) {
      return {
        ...state,
        testedList: action.payload,
      };
    },
    appendTestedList(state, action) {
      return {
        ...state,
        testedList: (state as StateType).testedList.concat(action.payload),
      };
    },
    queryRejectedList(state, action) {
      return {
        ...state,
        rejectedList: action.payload.slice(1),
        rejectedLength: action.payload[0].rejectedLength,
      };
    },
    appendRejectedList(state, action) {
      return {
        ...state,
        rejectedList: (state as StateType).rejectedList.concat(action.payload),
      };
    },
    saveCurrentStep(state, { payload }) {
      return {
        ...state,
        current: payload,
      };
    },

    saveStepFormData(state, { payload }) {
      console.log('header!');
      return {
        ...state,
        orderID: payload.orderID,
        step: {
          ...(state as StateType).step,
          ...payload,
        },
      };
    },
    queryUser(state, action) {
      return {
        ...state,
        user: action.payload,
      };
    },
  },
};

export default Model;
