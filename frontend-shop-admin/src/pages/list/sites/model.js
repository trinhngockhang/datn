import { addList, queryList, removeFakeList, updateFakeList } from './service';
const Model = {
  namespace: 'listAndbasicList',
  state: {
    list: [],
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      console.log('START YEILD')
      const response = yield call(queryList, payload);
      console.log(response);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },

    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
    },

    *submit({ payload }, { call, put }) {
      let callback;
      console.log('CALL MODEL', payload);
      if (payload.id) {
        callback = Object.keys(payload).length === 1 ? removeFakeList : updateFakeList;
      } else {
        callback = addList;
      }

      yield call(callback, payload); // post
      const response = yield call(queryList, payload);
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
  },
  reducers: {
    queryList(state, action) {
      return { ...state, list: action.payload };
    },

    appendList(
      state = {
        list: [],
      },
      action,
    ) {
      return { ...state, list: state.list.concat(action.payload) };
    },
  },
};
export default Model;
