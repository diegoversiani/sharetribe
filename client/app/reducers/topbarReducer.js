import * as actionTypes from '../constants/topbarConstants';

const initialState = {
  query: {},
};

export default function topbarReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.TOPBAR_SEARCH_SUBMIT:
      return Object.assign({}, state, { query: payload.query });
    default:
      return state;
  }
}
